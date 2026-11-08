import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { synthesizeRppFromMaterial, synthesizeRefinedContent, normalizeRppDocument } from './src/utils/synthesizer.ts';
import { robustJsonParse } from './src/utils/jsonUtils.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));

// Express JSON body-parser error handler to prevent HTML 400 responses
app.use((err: any, req: Request, res: Response, next: any) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Format data JSON yang dikirimkan tidak valid. Periksa kembali struktur data.',
    });
  }
  next(err);
});

// Middleware for CORS
app.use((req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isApiTransientOrQuotaError(err: any): boolean {
  if (!err) return false;
  const status = err.status || err.code || err.statusCode;
  const message = (err.message || '') + JSON.stringify(err);
  return (
    status === 429 ||
    status === 503 ||
    status === 500 ||
    status === 504 ||
    status === 'RESOURCE_EXHAUSTED' ||
    status === 'UNAVAILABLE' ||
    message.includes('429') ||
    message.includes('503') ||
    message.includes('RESOURCE_EXHAUSTED') ||
    message.includes('UNAVAILABLE') ||
    message.includes('quota') ||
    message.includes('rate-limit') ||
    message.includes('high demand') ||
    message.includes('overloaded') ||
    message.includes('fetch failed') ||
    message.includes('TIMEOUT')
  );
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Generator endpoint supporting ANY subject freely across SMK & SMA without search grounding overhead
app.post('/api/generate-rpp', async (req: Request, res: Response) => {
  try {
    const { materi, settings } = req.body;

    if (!materi || typeof materi !== 'string' || materi.trim().length === 0) {
      return res.status(400).json({ error: 'Materi atau bahan ajar wajib diisi.' });
    }

    const requestedMapel = settings?.mataPelajaran && settings.mataPelajaran !== 'Auto-detect dari materi'
      ? settings.mataPelajaran
      : '';
    const requestedTopik = settings?.topikPembelajaran && settings.topikPembelajaran !== 'Auto-detect dari materi'
      ? settings.topikPembelajaran
      : '';
    const requestedFase = settings?.faseKelasSemester || 'Fase E / Kelas X';

    // Validate if the requested topic conflicts with user's inputted material (e.g. leftover demo preset)
    const isMateriRekonsiliasi = materi.toLowerCase().includes('rekonsiliasi');
    const cleanTopic = (requestedTopik === 'Rekonsiliasi Bank & Penyesuaian Saldo Kas Perusahaan' && !isMateriRekonsiliasi)
      ? ''
      : requestedTopik;

    const promptText = `
Anda adalah konsultan ahli Kurikulum Merdeka Kemendikbudristek RI dan perancang Pembelajaran Mendalam (Deep Learning: Berkesadaran, Bermakna, Menggembirakan) untuk SELURUH JENJANG PENDIDIKAN dan MATA PELAJARAN (termasuk SMK Jurusan Akuntansi & Keuangan Lembaga, Kejuruan lainnya, maupun SMA/Umum).

--- MATERI / BAHAN AJAR DARI GURU (SUMBER RUJUKAN UTAMA) ---
${materi.trim()}
------------------------------------------------------------

INSTRUKSI & PREFERENSI GURU:
- Mata Pelajaran: ${requestedMapel || 'Tentukan dari materi bahan ajar di atas'}
- Topik Pembelajaran: ${cleanTopic || 'Ekstrak dan tentukan topik spesifik dari materi bahan ajar di atas'}
- Fase / Kelas / Semester: ${requestedFase}
- Satuan Pendidikan: ${settings?.namaSekolah || 'Satuan Pendidikan'}
- Nama Guru: ${settings?.namaGuru || 'Guru Pengampu'}
- NIP Guru: ${settings?.nipGuru || '-'}
- Model Pembelajaran / Pedagogis: ${settings?.praktikPedagogis || 'Problem Based Learning (PBL)'}
- Alokasi Waktu: ${settings?.alokasiWaktu || '2 Pertemuan x 3 JP (135 Menit)'}
- Tahun Pelajaran: ${settings?.tahunPelajaran || '2026/2027'}
- Kota: ${settings?.kota || 'Indonesia'}

PEDOMAN MUTLAK KESESUAIAN MATERI:
1. SUMBER UTAMA ADALAH MATERI DI ATAS: Seluruh isi RPP (Capaian Pembelajaran, Tujuan Pembelajaran, Aktivitas Belajar Inti, Asesmen, LKPD, Soal-soal, dan Glosarium) WAJIB 100% SESUAI DAN MEREFLEKSIKAN MATERI DI ATAS.
2. INTEGRASI DETAIL NYATA: Ekstrak konsep, nama akun, transaksi angka riil, jurnal debet/kredit, rumus kalkulasi, SOP, dan studi kasus yang ada di bahan ajar ke dalam kegiatan pembelajaran dan LKPD. JANGAN membuat RPP generik atau sekadar template kosong!
3. Jika materi yang diinput guru adalah tentang Akuntansi (misalnya Jurnal Penyesuaian, Kas Kecil, Perpajakan, Persediaan, Kas Bank, Siklus Akuntansi, dll), buatlah RPP akuntansi yang sangat presisi, lengkap dengan studi kasus data angka dan penjurnalan standar SAK.

HASILKAN RESPON DALAM STRUKTUR JSON VALID DENGAN SKEMA PERSIS SEBAGAI BERIKUT:
{
  "identitas": {
    "namaSatuanPendidikan": "...",
    "namaGuru": "...",
    "nipGuru": "...",
    "mataPelajaran": "...",
    "faseKelasSemester": "...",
    "topikPembelajaran": "...",
    "alokasiWaktu": "...",
    "tahunPelajaran": "..."
  },
  "identifikasi": {
    "kesiapanBelajar": {
      "sudahPaham": "deskripsi detail kesiapan materi spesifik ini",
      "sedangBerkembang": "deskripsi detail",
      "perluBantuan": "deskripsi scaffolding detail"
    },
    "minatGayaBelajar": "Visual (diagram alur & jobsheet), Auditori (diskusi), Kinestetik/Praktik (simulasi meja kerja/spreadsheet)",
    "latarBelakangKebutuhanKhusus": "kebutuhan khusus / persiapan PKL & UKK industri",
    "jenisPengetahuanMateri": "Konseptual, Prosedural, Metakognitif terkait materi ini",
    "relevansiKehidupanNyata": "relevansi di dunia industri / entitas bisnis nyata",
    "dimensiProfilLulusan": [
      { "name": "Keimanan dan ketakwaan kepada Tuhan YME", "selected": true, "keterangan": "integritas & kejujuran akuntansi" },
      { "name": "Penalaran kritis", "selected": true, "keterangan": "analisis transaksi & verifikasi data" },
      { "name": "Kolaborasi", "selected": true, "keterangan": "kerja sama tim dalam penyelesaian jobsheet" },
      { "name": "Kemandirian", "selected": true, "keterangan": "ketelitian dan disiplin waktu" },
      { "name": "Komunikasi", "selected": true, "keterangan": "presentasi hasil analisis" }
    ]
  },
  "desainPembelajaran": {
    "capaianPembelajaran": "CP resmi terkait materi dan fase ini",
    "lintasDisiplinIlmu": "keterkaitan dengan disiplin ilmu lain (Spreadsheet, Matematika Bisnis, dll)",
    "tujuanPembelajaran": [
      "Pertemuan 1: Murid mampu menganalisis...",
      "Pertemuan 2: Murid mampu menerapkan prosedur..."
    ],
    "topikPembelajaranKontekstual": "studi kasus nyata terkait materi",
    "praktikPedagogis": "model pembelajaran yang dipilih",
    "kemitraanPembelajaran": "kemitraan DUDIKA / industri mitra",
    "lingkunganPembelajaran": "Lab / Ruang Kelas Kolaboratif",
    "pemanfaatanDigital": "software / spreadsheet / aplikasi pendukung"
  },
  "pengalamanBelajar": [
    {
      "pertemuanKe": 1,
      "durasiJP": "3 JP (135 Menit)",
      "fokusTopik": "fokus pertemuan 1",
      "awalSalamDoaPresensi": { "kegiatan": "...", "waktuMenit": 10 },
      "awalApersepsiPertanyaanPemantik": {
        "kegiatan": "...",
        "waktuMenit": 15,
        "pertanyaanPemantik": ["pertanyaan 1?", "pertanyaan 2?"]
      },
      "awalPenyampaianTujuanIceBreaking": {
        "kegiatan": "...",
        "waktuMenit": 10,
        "iceBreaking": "ice breaking edukatif"
      },
      "intiMemahami": { "kegiatan": "eksplorasi konsep spesifik materi input", "waktuMenit": 35 },
      "intiMengaplikasi": { "kegiatan": "penyelesaian LKPD studi kasus transaksi spesifik materi input", "waktuMenit": 45 },
      "intiMerefleksi": { "kegiatan": "presentasi kelompok dan telaah kritis", "waktuMenit": 15 },
      "penutupKesimpulanRefleksi": { "kegiatan": "...", "waktuMenit": 5 },
      "penutupUmpanBalikInfoDoa": { "kegiatan": "...", "waktuMenit": 5 }
    },
    {
      "pertemuanKe": 2,
      "durasiJP": "3 JP (135 Menit)",
      "fokusTopik": "fokus pertemuan 2",
      "awalSalamDoaPresensi": { "kegiatan": "...", "waktuMenit": 10 },
      "awalApersepsiPertanyaanPemantik": {
        "kegiatan": "...",
        "waktuMenit": 10,
        "pertanyaanPemantik": ["pertanyaan 1?", "pertanyaan 2?"]
      },
      "awalPenyampaianTujuanIceBreaking": {
        "kegiatan": "...",
        "waktuMenit": 10,
        "iceBreaking": "ice breaking peregangan / fokus"
      },
      "intiMemahami": { "kegiatan": "penelaahan format standar dan formula kerja spesifik", "waktuMenit": 35 },
      "intiMengaplikasi": { "kegiatan": "praktik unjuk kerja mandiri jobsheet spesifik materi input", "waktuMenit": 45 },
      "intiMerefleksi": { "kegiatan": "peer-review silang antar siswa", "waktuMenit": 15 },
      "penutupKesimpulanRefleksi": { "kegiatan": "...", "waktuMenit": 5 },
      "penutupUmpanBalikInfoDoa": { "kegiatan": "...", "waktuMenit": 5 }
    }
  ],
  "asesmenPembelajaran": {
    "asesmenAwal": { "jenis": "Diagnostik Kognitif", "teknikInstrumen": "Kuis singkat materi prasyarat", "waktuPelaksanaan": "Awal pertemuan 1" },
    "asesmenProses": { "jenis": "Formatif", "teknikInstrumen": "Observasi kinerja diskusi & ketelitian analisis dokumen", "waktuPelaksanaan": "Selama kegiatan inti" },
    "asesmenAkhir": { "jenis": "Sumatif Unjuk Kerja", "teknikInstrumen": "Rubrik penilaian jobsheet laporan akhir", "waktuPelaksanaan": "Akhir pertemuan 2" },
    "rubrikPenilaian": [
      {
        "kriteria": "Penguasaan Konsep & Identifikasi Dokumen Terkait Materi",
        "sangatBaik4": "...",
        "baik3": "...",
        "cukup2": "...",
        "perluBimbingan1": "..."
      },
      {
        "kriteria": "Ketelitian Kalkulasi & Format Kertas Kerja",
        "sangatBaik4": "...",
        "baik3": "...",
        "cukup2": "...",
        "perluBimbingan1": "..."
      },
      {
        "kriteria": "Keterampilan Pemecahan Masalah (Problem Solving)",
        "sangatBaik4": "...",
        "baik3": "...",
        "cukup2": "...",
        "perluBimbingan1": "..."
      },
      {
        "kriteria": "Sikap Profesionalisme (Integritas & Budaya Kerja 5R)",
        "sangatBaik4": "...",
        "baik3": "...",
        "cukup2": "...",
        "perluBimbingan1": "..."
      }
    ]
  },
  "lampiran": {
    "lkpd": {
      "judul": "Lembar Kerja Peserta Didik (LKPD): Praktik Studi Kasus ...",
      "tujuan": "tujuan spesifik LKPD materi ini",
      "petunjukPengerjaan": ["petunjuk 1", "petunjuk 2", "petunjuk 3"],
      "stimulusRingkas": "deskripsi kasus atau data transaksi angka riil yang bersumber dari materi",
      "langkahAktivitas": ["Langkah 1...", "Langkah 2...", "Langkah 3..."],
      "soalDanTugas": [
        "Soal 1 spesifik materi...",
        "Soal 2 spesifik hitungan/analisis...",
        "Soal 3 rekomendasi profesional..."
      ]
    },
    "bahanBacaan": {
      "ringkasanMateri": "ringkasan komprehensif materi bahan ajar dari guru",
      "glosarium": [
        { "istilah": "Istilah 1 dari materi", "arti": "Definisi istilah 1" },
        { "istilah": "Istilah 2 dari materi", "arti": "Definisi istilah 2" },
        { "istilah": "Istilah 3 dari materi", "arti": "Definisi istilah 3" },
        { "istilah": "Istilah 4 dari materi", "arti": "Definisi istilah 4" }
      ],
      "mediaAjar": "Jobsheet, Modul Ajar Digital, Spreadsheet, LCD Proyektor"
    },
    "instrumenRefleksi": {
      "refleksiMurid": ["pertanyaan refleksi murid 1", "pertanyaan 2", "pertanyaan 3"],
      "refleksiGuru": ["pertanyaan refleksi guru 1", "pertanyaan 2", "pertanyaan 3"]
    },
    "rencanaDiferensiasi": {
      "konten": "diferensiasi materi visual/teks/jobsheet",
      "proses": "scaffolding bertahap vs studi kasus pengayaan",
      "produk": "kertas kerja manual vs digital spreadsheet"
    },
    "pengesahan": {
      "tempatTanggal": "${settings?.kota || 'Indonesia'}, ...",
      "kepalaSekolahNama": "${settings?.namaKepalaSekolah || 'Kepala Sekolah'}",
      "kepalaSekolahNIP": "${settings?.nipKepalaSekolah || '-'}",
      "guruNama": "${settings?.namaGuru || 'Guru Pengampu'}",
      "guruNIP": "${settings?.nipGuru || '-'}"
    }
  }
}
HANYA RESPON DENGAN JSON MURNI TANPA PEMBUKA/PENUTUP MARKDOWN.`;

    const systemInstruction = `Anda adalah asisten AI perancang RPP Kurikulum Merdeka Kemendikbudristek RI. Anda selalu menyusun RPP yang 100% akurat dan mendalam sesuai materi bahan ajar yang dimasukkan guru, dalam format JSON terstruktur rapi.`;

    // Multi-tier execution using clean JSON response format (fast, lightweight, highly resilient)
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];

    let lastError: any = null;
    let response: any = null;

    for (let i = 0; i < modelsToTry.length; i++) {
      const modelName = modelsToTry[i];
      try {
        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents: promptText,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
          },
        });
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('TIMEOUT: Gemini call exceeded 10s')), 10000)
        );
        response = await Promise.race([generatePromise, timeoutPromise]);
        break; // Success!
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemini API] Attempt ${i + 1} (${modelName}) failed:`, err?.message || err);

        if (isApiTransientOrQuotaError(err) && i < modelsToTry.length - 1) {
          await sleep(800);
          continue;
        }
        // If not transient or last model, stop and activate fallback
        break;
      }
    }

    if (!response) {
      console.warn('[Gemini API] External AI call unavailable. Activating intelligent Kurikulum Merdeka synthesis engine...');
      const fallbackData = synthesizeRppFromMaterial(materi, settings);
      return res.json({
        success: true,
        isFallbackMode: true,
        notice: 'RPP berhasil disusun menggunakan Engine Kurikulum Merdeka Berkelanjutan.',
        data: fallbackData,
      });
    }

    const textOutput = response.text;
    if (!textOutput) {
      console.warn('[Gemini API] Empty text response from model. Falling back to Kurikulum Merdeka synthesis...');
      const fallbackData = synthesizeRppFromMaterial(materi, settings);
      return res.json({
        success: true,
        isFallbackMode: true,
        notice: 'RPP berhasil disusun menggunakan Engine Kurikulum Merdeka Berkelanjutan.',
        data: fallbackData,
      });
    }

    const parsedResult = robustJsonParse(textOutput);
    let parsedData: any;

    if (parsedResult.success && parsedResult.data) {
      parsedData = parsedResult.data;
    } else {
      console.warn(
        '[Gemini API] Output was not valid JSON, activating Kurikulum Merdeka synthesis engine:',
        !parsedResult.success ? parsedResult.error : 'Unknown'
      );
      const fallbackData = synthesizeRppFromMaterial(materi, settings);
      return res.json({
        success: true,
        isFallbackMode: true,
        notice: 'RPP berhasil disusun menggunakan Engine Kurikulum Merdeka Berkelanjutan.',
        data: fallbackData,
      });
    }

    const finalData = normalizeRppDocument(parsedData, materi, settings);

    res.json({
      success: true,
      data: finalData,
    });
  } catch (error: any) {
    console.warn('Handling RPP generation fallback after error:', error?.message || error);
    const fallbackData = synthesizeRppFromMaterial(req.body?.materi || '', req.body?.settings);
    res.json({
      success: true,
      isFallbackMode: true,
      notice: 'RPP berhasil disusun menggunakan Engine Kurikulum Merdeka Berkelanjutan.',
      data: fallbackData,
    });
  }
});

// Refine section endpoint with fallback
app.post('/api/refine-section', async (req: Request, res: Response) => {
  try {
    const { sectionName, currentContent, userInstruction, contextInfo } = req.body;

    if (!sectionName || !userInstruction) {
      return res.status(400).json({ error: 'Section dan instruksi perbaikan wajib diisi.' });
    }

    const promptText = `
Anda adalah pakar kurikulum Merdeka. Perbaiki atau kembangkan bagian berikut dari Rencana Pembelajaran Mendalam (RPP) sesuai instruksi guru:

Bagian yang diperbaiki: "${sectionName}"
Konteks Mata Pelajaran & Topik: "${contextInfo?.mataPelajaran || ''} - ${contextInfo?.topik || ''}"
Konten Saat Ini:
${typeof currentContent === 'object' ? JSON.stringify(currentContent, null, 2) : currentContent}

Instruksi Perbaikan dari Guru:
"${userInstruction}"

Hasilkan konten hasil perbaikan dalam format JSON:
{
  "updatedContent": ... (konten baru yang disempurnakan sesuai tipe aslinya, baik object, array, atau string) ...,
  "summaryChanges": "penjelasan singkat 1 kalimat apa yang telah diubah"
}
`;

    const models = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    let response: any = null;
    let lastError: any = null;

    for (let i = 0; i < models.length; i++) {
      try {
        const generatePromise = ai.models.generateContent({
          model: models[i],
          contents: promptText,
          config: {
            responseMimeType: 'application/json',
          },
        });
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('TIMEOUT: Refine call exceeded 8s')), 8000)
        );
        response = await Promise.race([generatePromise, timeoutPromise]);
        break;
      } catch (err: any) {
        lastError = err;
        if (isApiTransientOrQuotaError(err) && i < models.length - 1) {
          await sleep(600);
          continue;
        }
        break;
      }
    }

    if (!response) {
      console.warn('[Gemini API] Refine API unavailable. Using Kurikulum Merdeka synthesizeRefinedContent...');
      return res.json({
        success: true,
        isFallbackMode: true,
        data: {
          updatedContent: synthesizeRefinedContent(sectionName, currentContent, userInstruction),
          summaryChanges: `Diselaraskan sesuai arahan: "${userInstruction}"`,
        },
      });
    }

    const textOutput = response.text || '{}';
    const parsedResult = robustJsonParse(textOutput);

    if (parsedResult.success && parsedResult.data) {
      return res.json({
        success: true,
        data: parsedResult.data,
      });
    }

    console.warn(
      '[Gemini API] Refine output was not valid JSON, using synthesis fallback:',
      !parsedResult.success ? parsedResult.error : 'Unknown'
    );
    return res.json({
      success: true,
      isFallbackMode: true,
      data: {
        updatedContent: synthesizeRefinedContent(
          sectionName,
          currentContent,
          userInstruction
        ),
        summaryChanges: `Diselaraskan sesuai arahan: "${userInstruction}"`,
      },
    });
  } catch (error: any) {
    console.warn('Handling refine section fallback after error:', error?.message || error);
    res.json({
      success: true,
      isFallbackMode: true,
      data: {
        updatedContent: synthesizeRefinedContent(
          req.body?.sectionName || '',
          req.body?.currentContent,
          req.body?.userInstruction || ''
        ),
        summaryChanges: `Diselaraskan sesuai arahan: "${req.body?.userInstruction || ''}"`,
      },
    });
  }
});

// Catch-all route for unmatched /api endpoints to ensure JSON is returned
app.all('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Rute API ${req.method} ${req.path} tidak ditemukan.`,
  });
});

// Global API error handler ensuring all /api requests return valid JSON, NEVER HTML
app.use((err: any, req: Request, res: Response, next: any) => {
  if (req.path.startsWith('/api')) {
    console.error('API Error intercepted:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Terjadi kesalahan sistem internal.',
    });
  }
  next(err);
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `RPP Pintar Server running at http://0.0.0.0:${PORT} [${
        isProduction ? 'PRODUCTION' : 'DEVELOPMENT'
      }]`
    );
  });
}

// Only start standalone HTTP server when not running in Vercel serverless environment
if (!process.env.VERCEL && !process.env.NOW_REGION) {
  startServer();
}

export default app;

