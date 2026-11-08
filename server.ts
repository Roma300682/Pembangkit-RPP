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

    const promptText = `
Anda adalah konsultan ahli Kurikulum Merdeka Kemendikbudristek RI dan perancang Pembelajaran Mendalam (Deep Learning) spesialis Jurusan Akuntansi dan Keuangan Lembaga (AKL) SMK untuk mencetak Teknisi Akuntansi Junior yang berkesadaran, bermakna, dan menggembirakan.

Anda menguasai secara mendalam Struktur Kurikulum Akuntansi SMK:
1. Kelas X (Fase E) - Dasar-dasar Program Keahlian Akuntansi dan Keuangan Lembaga:
   - Fokus: Etika profesi akuntan, K3LH & budaya kerja 5R di kantor, dasar perbankan dan lembaga keuangan, proses bisnis akuntansi, dan aplikasi spreadsheet pengolah angka finansial.
2. Struktur Kurikulum Kelas XI dan XII (Fase F) - Konsentrasi Keahlian Akuntansi (Mencetak Teknisi Akuntansi Junior):
   A. Kelompok Mata Pelajaran Umum (Penyesuaian jam): Agama & Budi Pekerti, Pendidikan Pancasila, Bahasa Indonesia, Sejarah, PJOK, Bahasa Inggris.
   B. Kelompok Mata Pelajaran Kejuruan (Elemen Kompetensi Akuntansi):
      1. Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur: Siklus akuntansi manual lengkap dari penjurnalan hingga laporan keuangan untuk berbagai bentuk perusahaan.
      2. Akuntansi Keuangan: Pengelolaan kas, rekonsiliasi bank, kartu piutang, persediaan FIFO/Average, aset tetap, hingga kewajiban.
      3. Akuntansi Lembaga/Instansi Pemerintah: Penerapan akuntansi sektor publik, APBDes, BKU, SP2D, dan laporan keuangan desa/daerah.
      4. Komputer Akuntansi: Mengoperasikan aplikasi akuntansi digital (MYOB, Accurate, atau spreadsheet akuntansi).
      5. Perpajakan: Administrasi pajak, perhitungan PPh Pasal 21 skema TER UU HPP, PPN 11%, dan tata cara pengisian SPT.
      6. Mata Pelajaran Pilihan: Perbankan Syariah, Digital Marketing, atau Lembaga Keuangan Mikro.
      7. Projek Kreatif dan Kewirausahaan (PKK): Jasa pembukuan dan akuntansi untuk UMKM serta menumbuhkan jiwa entrepreneur.

Susunlah Rencana Pembelajaran Mendalam (RPP / Modul Ajar) LENGKAP, SIAP CETAK, dan BERMUTU TINGGI berdasarkan MATERI / BAHAN AJAR berikut:

--- MATERI / BAHAN AJAR INPUT DARI GURU ---
${materi.trim()}
-------------------------------------------

Informasi Tambahan / Preferensi Guru (Gunakan jika relevan, atau lengkapi secara profesional jika kosong):
- Nama Satuan Pendidikan: ${settings?.namaSekolah || 'SMK Negeri 1 Indonesia (Program Keahlian AKL)'}
- Nama Guru: ${settings?.namaGuru || 'Guru Produktif Akuntansi, S.Pd., Gr.'}
- NIP Guru: ${settings?.nipGuru || '19850101 201001 1 001'}
- Nama Kepala Sekolah: ${settings?.namaKepalaSekolah || 'Kepala Sekolah, M.Pd.'}
- NIP Kepala Sekolah: ${settings?.nipKepalaSekolah || '19750505 200003 1 002'}
- Mata Pelajaran / Konsentrasi Keahlian: ${settings?.mataPelajaran || 'Akuntansi Keuangan (AKL)'}
- Fase / Kelas / Semester: ${settings?.faseKelasSemester || 'Fase F / Kelas XI SMK / Semester Ganjil'}
- Topik Pembelajaran: ${settings?.topikPembelajaran || 'Auto-detect dari materi'}
- Alokasi Waktu: ${settings?.alokasiWaktu || '2 Pertemuan x 3 JP (135 Menit)'}
- Tahun Pelajaran: ${settings?.tahunPelajaran || '2026/2027'}
- Praktik Pedagogis Utama: ${settings?.praktikPedagogis || 'Problem Based Learning (PBL) Berorientasi DUDIKA'}
- Kota/Kabupaten Pengesahan: ${settings?.kota || 'Surabaya'}

PEDOMAN PENYUSUNAN PEDAGOGIS:
- Terapkan pendekatan Teaching Factory (TeFa), Project Based Learning (PjBL) atau Problem Based Learning (PBL) berorientasi DUDIKA (KAP, Bank, Kantor Pajak, Instansi Pemerintah, UMKM).
- Integrasikan etika profesi, Standar Akuntansi Keuangan (SAK), regulasi perpajakan terkini (UU HPP & PMK), budaya kerja 5R, dan SOP ketelitian angka.
- Format LKPD disajikan sebagai Jobsheet Praktik Teknisi Akuntansi Junior yang nyata dengan studi kasus dokumen transaksi bisnis.

Format yang dihasilkan WAJIB mengikuti struktur standar 6 komponen:
1. Identitas (Nama satuan pendidikan, Nama guru, Mata pelajaran/Konsentrasi Keahlian, Fase/kelas/semester, Topik pembelajaran, Alokasi waktu, Tahun pelajaran)
2. Identifikasi (Kesiapan belajar murid [sudah paham, sedang berkembang, perlu bantuan], Minat & gaya belajar [visual, auditori, kinestetik], Latar belakang & kebutuhan khusus, Jenis pengetahuan materi [faktual, konseptual, prosedural, metakognitif], Relevansi materi dengan kehidupan nyata / dunia kerja di Indonesia, Dimensi Profil Lulusan yang ditargetkan dengan centang boolean dan penjelasan operasional)
3. Desain Pembelajaran (Capaian Pembelajaran/CP resmi elemen terkait, Lintas disiplin ilmu, Tujuan Pembelajaran kompetensi+konten, Topik pembelajaran kontekstual, Praktik pedagogis, Kemitraan pembelajaran, Lingkungan pembelajaran, Pemanfaatan digital)
4. Pengalaman Belajar (Rincian per pertemuan lengkap dengan alokasi waktu menit. Tahap awal: salam/doa/presensi, apersepsi & pertanyaan pemantik yang merangsang rasa ingin tahu, penyampaian tujuan dan ice breaking yang seru dan edukatif. Tahap inti: Memahami, Mengaplikasi [praktik/proyek], Merefleksi. Tahap penutup: kesimpulan & refleksi, umpan balik/info pertemuan berikutnya/doa)
5. Asesmen Pembelajaran (Asesmen awal diagnostik, Asesmen proses formatif, Asesmen akhir sumatif / unjuk kerja, serta Rubrik Penilaian 4 Kategori: Sangat Baik [4], Baik [3], Cukup [2], Perlu Bimbingan [1] untuk indikator TP dan Dimensi Profil Lulusan)
6. Lampiran (Lembar Kerja Peserta Didik / Jobsheet riil berisi langkah aktivitas/praktik dan soal-soal relevan; Bahan bacaan ringkas guru & murid serta glosarium istilah teknis; Instrumen refleksi murid & guru; Rencana pembelajaran diferensiasi konten, proses, produk; Pengesahan resmi)

HASILKAN DALAM FORMAT JSON MURNI yang valid dan terstruktur tanpa pembuka/penutup basa-basi.`;

    const systemInstruction = `Anda adalah asisten kecerdasan buatan spesialis penyusunan RPP dan Modul Ajar Kurikulum Merdeka Kemendikbudristek RI untuk seluruh mata pelajaran. Anda selalu merespons dengan JSON yang valid, terstruktur rapi, mendalam, dan kaya konten pendidikan berkualitas tinggi dalam Bahasa Indonesia.`;

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

