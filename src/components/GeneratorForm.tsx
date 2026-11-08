import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  BookOpen,
  Sliders,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle2,
  Clock,
  GraduationCap,
  RotateCcw,
  AlertTriangle,
  X,
  Compass,
  Calculator,
  FileJson,
  ArrowRight,
  PenTool,
  Layers,
  FileText,
} from 'lucide-react';
import { PRESET_MATERI, PresetMateri } from '../data/presets';
import { UserSchoolProfile, RppDocument } from '../types/rpp';
import { parseAndNormalizeRppJson } from '../utils/jsonUtils';

interface GeneratorFormProps {
  onGenerate: (payload: {
    materi: string;
    settings: any;
  }) => Promise<void>;
  isLoading: boolean;
  profile: UserSchoolProfile;
  onImportDoc?: (doc: RppDocument) => void;
}

// Helper function to extract topic from raw text
function extractTopicFromText(text: string): string {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  for (const l of lines) {
    const m = l.match(/^(?:materi pokok|topik pembelajaran|topik|bab|modul|bahan ajar|judul)\s*[:\-]\s*(.+)$/i);
    if (m && m[1].trim()) {
      return m[1].trim();
    }
  }
  if (lines.length > 0) {
    const first = lines[0].replace(/^[#\*\-=\d\.\s]+/, '').trim();
    if (first.length > 3 && first.length <= 80 && !first.includes(':')) {
      return first;
    }
  }
  return '';
}

// Structured curriculum for SMK Jurusan Akuntansi dan Keuangan Lembaga (AKL)
export const AKL_CURRICULUM_SECTIONS = [
  {
    id: 'DASAR_X',
    title: '1. Dasar-dasar Program Keahlian AKL (Fase E - Kelas X)',
    badge: 'Fondasi Akuntansi',
    color: 'emerald',
    description: 'Fokus: Etika profesi, K3LH, dasar perbankan, proses bisnis akuntansi, dan aplikasi spreadsheet',
    subjects: [
      {
        name: 'Dasar AKL: Etika Profesi & Kode Etik Akuntan',
        fase: 'Fase E / Kelas X SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 3 JP (135 Menit)',
        pedagogi: 'Problem Based Learning (PBL)',
        topics: [
          'Prinsip Integritas, Objektivitas & Kerahasiaan IAI',
          'Dilema Etika Manipulasi Laporan Finansial',
          'Standar Kompetensi Kerja Teknisi Akuntansi Junior',
        ],
      },
      {
        name: 'Dasar AKL: K3LH & Budaya Kerja 5R di Ruang Kerja',
        fase: 'Fase E / Kelas X SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 3 JP (135 Menit)',
        pedagogi: 'Praktik Bengkel / Studio & Simulasi SOP K3LH',
        topics: [
          'Ergonomi Kerja Duduk & Pencegahan Repetitive Strain Injury',
          'Keselamatan Kelistrikan Workstation Lab Akuntansi',
          'Penerapan Budaya 5R pada Pengarsipan Bukti Transaksi',
        ],
      },
      {
        name: 'Dasar AKL: Penggunaan Aplikasi Spreadsheet / Pengolah Angka',
        fase: 'Fase E / Kelas X SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 4 JP (180 Menit)',
        pedagogi: 'Project Based Learning (PjBL)',
        topics: [
          'Formula Finansial SUMIF, VLOOKUP & Data Validation',
          'Pembuatan Format Jurnal Umum 5 Kolom Otomatis',
          'Penyusunan Kertas Kerja Neraca Lajur 10 Kolom',
        ],
      },
      {
        name: 'Dasar AKL: Dasar-dasar Perbankan & Lembaga Keuangan',
        fase: 'Fase E / Kelas X SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 3 JP (135 Menit)',
        pedagogi: 'Inkuiri Terbimbing (Guided Inquiry)',
        topics: [
          'Produk Simpanan Giro, Tabungan, & Deposito Berjangka',
          'Lembaga Keuangan Bank, Non-Bank, OJK & LPS',
          'Pengisian Warkat Perbankan, Cek & Bilyet Giro',
        ],
      },
      {
        name: 'Dasar AKL: Proses Bisnis Akuntansi di Era Digital',
        fase: 'Fase E / Kelas X SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 3 JP (135 Menit)',
        pedagogi: 'Problem Based Learning (PBL)',
        topics: [
          'Alur Dokumen Pembelian & Penjualan Entitas Bisnis',
          'Verifikasi Keabsahan Faktur, Kuitansi, & Bukti Kas',
          'Digitalisasi Pembayaran Kas & QRIS dalam Pembukuan',
        ],
      },
    ],
  },
  {
    id: 'PRODUKTIF_XI_XII',
    title: '2. Konsentrasi Keahlian Produktif (Fase F - Kelas XI & XII)',
    badge: 'Mencetak Teknisi Akuntansi Junior',
    color: 'blue',
    description: '7 Elemen Kompetensi Kejuruan Produktif Akuntansi Lengkap',
    subjects: [
      {
        name: 'Akuntansi Keuangan (Kas, Piutang, Persediaan, Aset Tetap, Utang)',
        fase: 'Fase F / Kelas XI SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 3 JP (135 Menit)',
        pedagogi: 'Problem Based Learning (PBL)',
        topics: [
          'Rekonsiliasi Bank & Penyesuaian Saldo Kas Perusahaan',
          'Pengelolaan Kas Kecil (Metode Imprest & Fluktuasi)',
          'Pengelolaan Kartu Piutang & Estimasi Kerugian Piutang',
          'Metode Penilaian Persediaan Perpetual FIFO & Rata-rata',
          'Penyusutan Aset Tetap Metode Garis Lurus & Saldo Menurun',
        ],
      },
      {
        name: 'Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
        fase: 'Fase F / Kelas XI SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 4 JP (180 Menit)',
        pedagogi: 'Problem Based Learning (PBL)',
        topics: [
          'Siklus Akuntansi Perusahaan Dagang & Jurnal Khusus',
          'Jurnal Penyesuaian & Neraca Lajur 10 Kolom',
          'Aliran Biaya Manufaktur: BBB, BTKL, dan BOP Pesanan',
        ],
      },
      {
        name: 'Akuntansi Lembaga / Instansi Pemerintah',
        fase: 'Fase F / Kelas XII SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 4 JP (180 Menit)',
        pedagogi: 'Problem Based Learning (PBL)',
        topics: [
          'Struktur Anggaran APBDes & Pendapatan Asli Desa',
          'Buku Kas Umum (BKU) & Pencairan SP2D Siskeudes',
          'Pemotongan Pajak Belanja Barang PPh 22 & PPN 11%',
          'Laporan Realisasi Anggaran Pelaksanaan APBDes',
        ],
      },
      {
        name: 'Komputer Akuntansi (MYOB / Accurate / Spreadsheet)',
        fase: 'Fase F / Kelas XI SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 4 JP (180 Menit)',
        pedagogi: 'Project Based Learning (PjBL)',
        topics: [
          'Setup Data Awal Perusahaan & Bagan Akun (COA)',
          'Entri Bukti Transaksi Modul Sales & Purchases',
          'Rekonsiliasi Bank & Audit Trail Report',
          'Generate Laporan Keuangan Otomatis & Backup File',
        ],
      },
      {
        name: 'Administrasi Perpajakan (PPh, PPN, dan SPT)',
        fase: 'Fase F / Kelas XI SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 3 JP (135 Menit)',
        pedagogi: 'Problem Based Learning (PBL)',
        topics: [
          'Perhitungan PPh Pasal 21 Karyawan Skema TER UU HPP',
          'Pajak Pertambahan Nilai (PPN 11%) & e-Faktur Pajak',
          'Pembuatan Bukti Potong 1721-A1 & SPT Masa',
          'Rekonsiliasi Fiskal & SPT Tahunan Wajib Pajak Badan',
        ],
      },
      {
        name: 'Mata Pelajaran Pilihan: Perbankan Syariah',
        fase: 'Fase F / Kelas XI SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 3 JP (135 Menit)',
        pedagogi: 'Inkuiri Terbimbing (Guided Inquiry)',
        topics: [
          'Prinsip Transaksi Bebas Riba & Fatwa DSN-MUI',
          'Akad Jual Beli Murabahah & Perhitungan Margin',
          'Akad Bagi Hasil Mudharabah & Musyarakah',
          'Akad Titipan Wadi\'ah Tabungan & Giro Syariah',
        ],
      },
      {
        name: 'Projek Kreatif dan Kewirausahaan (PKK Akuntansi)',
        fase: 'Fase F / Kelas XII SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 4 JP (180 Menit)',
        pedagogi: 'Teaching Factory (TeFa - Standar Industri / DUDIKA)',
        topics: [
          'Model Bisnis Jasa Pembukuan & Akuntansi untuk UMKM',
          'Penetapan Harga Pokok Penjualan (HPP) & Tarif Jasa',
          'Penyusunan Laporan Keuangan SAK EMKM Mitra Binaan',
        ],
      },
    ],
  },
  {
    id: 'UMUM_XI_XII',
    title: '3. Kelompok Mata Pelajaran Umum (Fase F - Kelas XI & XII)',
    badge: 'Penyesuaian Konteks SMK',
    color: 'purple',
    description: 'Muatan literasi, etika kerja, dan komunikasi profesional',
    subjects: [
      {
        name: 'Pendidikan Agama dan Budi Pekerti (Konteks AKL)',
        fase: 'Fase F / Kelas XI SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 2 JP (90 Menit)',
        pedagogi: 'Problem Based Learning (PBL)',
        topics: [
          'Etika Muamalah & Kejujuran Pengelolaan Keuangan',
          'Amanah Jabatan & Larangan Perbuatan Curang (Fraud)',
        ],
      },
      {
        name: 'Pendidikan Pancasila (Integritas Profesi AKL)',
        fase: 'Fase F / Kelas XI SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 2 JP (90 Menit)',
        pedagogi: 'Case Study Analysis',
        topics: [
          'Keadilan Sosial & Kepatuhan Membayar Pajak',
          'Integritas Anti-Korupsi & Pencegahan Kecurangan Finansial',
        ],
      },
      {
        name: 'Bahasa Indonesia (Kelompok Mapel Umum AKL)',
        fase: 'Fase F / Kelas XI SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 2 JP (90 Menit)',
        pedagogi: 'Genre-Based Approach',
        topics: [
          'Penulisan Teks Laporan Hasil Analisis Keuangan Objektif',
          'Penyusunan Surat Konfirmasi Saldo Piutang & Tagihan',
        ],
      },
      {
        name: 'Bahasa Inggris (Business & Accounting English)',
        fase: 'Fase F / Kelas XI SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 2 JP (90 Menit)',
        pedagogi: 'Problem Based Learning (PBL)',
        topics: [
          'International Accounting Terminology & Vocabulary',
          'Professional Business Email for Invoice Inquiries',
        ],
      },
      {
        name: 'Matematika Terapan & Statistika Keuangan',
        fase: 'Fase F / Kelas XI SMK / Semester Ganjil',
        alokasi: '2 Pertemuan x 2 JP (90 Menit)',
        pedagogi: 'Problem Based Learning (PBL)',
        topics: [
          'Bunga Tunggal, Bunga Majemuk, & Anuitas Pinjaman',
          'Penyusutan Aset dan Tabel Amortisasi',
        ],
      },
    ],
  },
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  onGenerate,
  isLoading,
  profile,
  onImportDoc,
}) => {
  const [activeMode, setActiveMode] = useState<'custom' | 'preset'>('custom');
  const [materi, setMateri] = useState<string>(PRESET_MATERI[0].materi);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_MATERI[0].id);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [filterKategori, setFilterKategori] = useState<'ALL' | 'DASAR_X' | 'PRODUKTIF_XI_XII' | 'UMUM_XI_XII'>('ALL');
  const [activeCurriculumTab, setActiveCurriculumTab] = useState<'DASAR_X' | 'PRODUKTIF_XI_XII' | 'UMUM_XI_XII'>('PRODUKTIF_XI_XII');
  const [formError, setFormError] = useState<{ message: string; isRateLimit?: boolean } | null>(null);

  // JSON detection state
  const [detectedJsonRpp, setDetectedJsonRpp] = useState<RppDocument | null>(null);
  const [jsonNotice, setJsonNotice] = useState<{ type: 'info' | 'error'; text: string } | null>(null);

  // Core customizable settings (freely editable for ANY subject)
  const [mataPelajaran, setMataPelajaran] = useState<string>('Akuntansi Keuangan');
  const [topikPembelajaran, setTopikPembelajaran] = useState<string>('Rekonsiliasi Bank & Penyesuaian Saldo Kas Perusahaan');
  const [faseKelas, setFaseKelas] = useState<string>('Fase F / Kelas XI SMK / Semester Ganjil');
  const [alokasiWaktu, setAlokasiWaktu] = useState<string>('2 Pertemuan x 3 JP (135 Menit)');
  const [praktikPedagogis, setPraktikPedagogis] = useState<string>('Problem Based Learning (PBL)');
  const [tahunPelajaran, setTahunPelajaran] = useState<string>(profile.tahunPelajaranDefault || '2026/2027');

  const [loadingStep, setLoadingStep] = useState<number>(0);

  const filteredPresets = filterKategori === 'ALL'
    ? PRESET_MATERI
    : PRESET_MATERI.filter((p) => p.kategori === filterKategori);

  const handleClearForm = () => {
    setMateri('');
    setSelectedPresetId('');
    setTopikPembelajaran('');
    setDetectedJsonRpp(null);
    setJsonNotice(null);
    setFormError(null);
  };

  const handleMateriChange = (newVal: string) => {
    setMateri(newVal);
    if (selectedPresetId) setSelectedPresetId('');

    // If user pastes or writes new material, auto-detect topic if topic was empty or was the demo default
    const detected = extractTopicFromText(newVal);
    if (detected && (!topikPembelajaran || topikPembelajaran === 'Rekonsiliasi Bank & Penyesuaian Saldo Kas Perusahaan')) {
      setTopikPembelajaran(detected);
    }

    if (newVal.trim().startsWith('{')) {
      processTextForJson(newVal, false);
    } else if (detectedJsonRpp || jsonNotice) {
      setDetectedJsonRpp(null);
      setJsonNotice(null);
    }
  };

  const handleAutoDetectTopic = () => {
    const detected = extractTopicFromText(materi);
    if (detected) {
      setTopikPembelajaran(detected);
    }
  };

  const applyPreset = (preset: PresetMateri) => {
    setSelectedPresetId(preset.id);
    setMateri(preset.materi);
    setMataPelajaran(preset.mapel);
    setTopikPembelajaran(preset.judul.replace(/^[^:]+:\s*/, ''));
    setFaseKelas(`${preset.fase} / ${preset.kelas} / Semester Ganjil`);
    setAlokasiWaktu(preset.alokasi);
    setPraktikPedagogis(preset.pedagogi);
    setFormError(null);
    setDetectedJsonRpp(null);
    setJsonNotice(null);
  };

  const handleSelectCurriculumSubject = (subj: {
    name: string;
    fase: string;
    alokasi: string;
    pedagogi: string;
    topics: string[];
  }) => {
    setMataPelajaran(subj.name);
    setFaseKelas(subj.fase);
    setAlokasiWaktu(subj.alokasi);
    setPraktikPedagogis(subj.pedagogi);
    if (subj.topics && subj.topics.length > 0) {
      setTopikPembelajaran(subj.topics[0]);
    }
    setSelectedPresetId('');
    setFormError(null);
    setDetectedJsonRpp(null);
    setJsonNotice(null);
  };

  const processTextForJson = (text: string, isFromExplicitJsonUpload = false) => {
    const trimmed = text.trim();
    if (trimmed.startsWith('{') || isFromExplicitJsonUpload) {
      const parsed = parseAndNormalizeRppJson(trimmed);
      if (parsed.success && parsed.document) {
        setDetectedJsonRpp(parsed.document);
        setJsonNotice({
          type: 'info',
          text: `Dokumen RPP JSON valid terdeteksi: "${parsed.document.identitas.topikPembelajaran || parsed.document.identitas.mataPelajaran}". Klik tombol "Buka Sebagai RPP" di bawah untuk langsung menampilkannya.`,
        });
        if (parsed.document.identitas?.mataPelajaran) {
          setMataPelajaran(parsed.document.identitas.mataPelajaran);
        }
        if (parsed.document.identitas?.topikPembelajaran) {
          setTopikPembelajaran(parsed.document.identitas.topikPembelajaran);
        }
        return;
      } else if (isFromExplicitJsonUpload) {
        setDetectedJsonRpp(null);
        setJsonNotice({
          type: 'error',
          text: parsed.error || 'Format berkas JSON tidak valid atau tidak memiliki struktur RPP yang dikenali.',
        });
        return;
      }
    }
    setDetectedJsonRpp(null);
    setJsonNotice(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isJson = file.name.toLowerCase().endsWith('.json') || file.type === 'application/json';

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || '';
      if (text) {
        handleMateriChange(text);
        processTextForJson(text, isJson);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    if (!materi.trim()) return;

    setFormError(null);
    setLoadingStep(1);
    const t1 = setTimeout(() => setLoadingStep(2), 1800);
    const t2 = setTimeout(() => setLoadingStep(3), 3600);
    const t3 = setTimeout(() => setLoadingStep(4), 5800);

    try {
      await onGenerate({
        materi,
        settings: {
          namaSekolah: profile.namaSekolah || 'SMK Negeri 1 Indonesia (Program Keahlian AKL)',
          namaGuru: profile.namaGuru || 'Guru Produktif Akuntansi',
          nipGuru: profile.nipGuru,
          namaKepalaSekolah: profile.namaKepalaSekolah,
          nipKepalaSekolah: profile.nipKepalaSekolah,
          kota: profile.kota,
          mataPelajaran: mataPelajaran.trim() || 'Akuntansi Keuangan',
          faseKelasSemester: faseKelas,
          topikPembelajaran: topikPembelajaran.trim(),
          alokasiWaktu,
          praktikPedagogis,
          tahunPelajaran,
        },
      });
    } catch (err: any) {
      const msg = err?.message || 'Gagal memproses materi dengan AI.';
      setFormError({
        message: msg,
      });
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setLoadingStep(0);
    }
  };

  const currentSection = AKL_CURRICULUM_SECTIONS.find((s) => s.id === activeCurriculumTab) || AKL_CURRICULUM_SECTIONS[1];

  // Quick subjects recommendation chips
  const popularSubjects = [
    'Akuntansi Keuangan',
    'Akuntansi Perusahaan Dagang & Manufaktur',
    'Praktikum Akuntansi Lembaga / Pemerintah',
    'Administrasi Perpajakan',
    'Komputer Akuntansi (MYOB / Accurate)',
    'Dasar AKL: Aplikasi Spreadsheet',
    'Dasar AKL: Etika Profesi & K3LH',
    'Matematika Bisnis',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Title */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200 shadow-2xs">
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          <span>Kurikulum Merdeka Kemendikbudristek • Berbasis Bahan Ajar Guru</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Generator RPP & Modul Ajar{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            Jurusan Akuntansi (AKL)
          </span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          Ketik atau tempel materi bahan ajar akuntansi apa saja. AI dan Engine Kurikulum Merdeka akan menyusun RPP mendalam yang <strong>100% presisi sesuai topik & data materi</strong> yang Anda masukkan.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveMode('custom')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-2xs ${
            activeMode === 'custom'
              ? 'bg-emerald-700 text-white shadow-emerald-700/20'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Input Materi Bebas Guru</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('preset')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-2xs ${
            activeMode === 'preset'
              ? 'bg-emerald-700 text-white shadow-emerald-700/20'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Pilih Contoh Modul & Kurikulum AKL</span>
        </button>
      </div>

      {/* Quota / Rate Limit Alert Banner if error occurred */}
      {formError && (
        <div className="mb-6 p-4 rounded-2xl border border-rose-200 bg-rose-50/90 text-rose-950 shadow-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <h4 className="font-bold text-rose-900 text-sm mb-1">
                Terjadi Kendala Penyusunan
              </h4>
              <p className="leading-relaxed text-rose-800">{formError.message}</p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="px-3.5 py-1.5 rounded-lg font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Coba Lagi Sekarang</span>
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFormError(null)}
              className="text-rose-400 hover:text-rose-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Preset Mode Card */}
      {activeMode === 'preset' && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-200 shadow-sm mb-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Pilih Modul / Bahan Ajar AKL Siap Pakai:</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {(
                [
                  { id: 'ALL', label: 'Semua Materi' },
                  { id: 'DASAR_X', label: '📘 Kelas X (Fase E)' },
                  { id: 'PRODUKTIF_XI_XII', label: '📊 Produktif (Fase F)' },
                  { id: 'UMUM_XI_XII', label: '📖 Mapel Umum' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilterKategori(cat.id)}
                  className={`text-[11px] px-3 py-1 rounded-full font-bold transition-colors ${
                    filterKategori === cat.id
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  applyPreset(preset);
                  setActiveMode('custom');
                }}
                className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                  selectedPresetId === preset.id
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium shadow-2xs ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold truncate text-[11px] ${
                    preset.kategori === 'DASAR_X'
                      ? 'text-emerald-700'
                      : preset.kategori === 'PRODUKTIF_XI_XII'
                      ? 'text-blue-700'
                      : 'text-purple-700'
                  }`}>
                    {preset.kelas} • {preset.elemen}
                  </span>
                  <span className="text-[10px] text-slate-400">{preset.fase}</span>
                </div>
                <div className="font-semibold text-slate-900 line-clamp-1">
                  {preset.judul}
                </div>
              </button>
            ))}
          </div>

          {/* Curriculum Explorer Selector */}
          <div className="mt-4 pt-3 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-600 block mb-2">
              Atau Telusuri Elemen Berdasarkan Kurikulum:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
              {AKL_CURRICULUM_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveCurriculumTab(sec.id as any)}
                  className={`p-2 rounded-lg text-left text-xs font-bold border transition-colors ${
                    activeCurriculumTab === sec.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-emerald-700 font-semibold">{sec.badge}</div>
                  <div className="truncate">{sec.title.split('(')[0]}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {currentSection.subjects.map((subj) => (
                <button
                  key={subj.name}
                  type="button"
                  onClick={() => {
                    handleSelectCurriculumSubject(subj);
                    setActiveMode('custom');
                  }}
                  className="p-2 rounded-lg text-left text-xs border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-slate-800 transition-colors"
                >
                  <div className="font-bold truncate">{subj.name}</div>
                  <div className="text-[11px] text-slate-500">{subj.fase.split('/')[1]?.trim()} • {subj.alokasi.split('(')[0].trim()}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 space-y-5">
          {/* Section 1: Mata Pelajaran & Topik Pembelajaran (Visible & Direct) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>Identitas Mata Pelajaran & Topik</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Dapat diedit bebas atau terisi otomatis dari materi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Mata Pelajaran Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Mata Pelajaran <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={mataPelajaran}
                  onChange={(e) => {
                    setMataPelajaran(e.target.value);
                    if (selectedPresetId) setSelectedPresetId('');
                  }}
                  required
                  placeholder="Contoh: Akuntansi Keuangan, Administrasi Perpajakan, dll"
                  className="w-full px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Topik Pembelajaran Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800">
                    Topik Pembelajaran <span className="text-red-500">*</span>
                  </label>
                  {materi.trim() && (
                    <button
                      type="button"
                      onClick={handleAutoDetectTopic}
                      className="text-[10px] text-emerald-700 hover:underline font-semibold flex items-center gap-0.5"
                    >
                      <Sparkles className="w-2.5 h-2.5" /> Deteksi dari Teks
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={topikPembelajaran}
                  onChange={(e) => {
                    setTopikPembelajaran(e.target.value);
                    if (selectedPresetId) setSelectedPresetId('');
                  }}
                  required
                  placeholder="Contoh: Jurnal Penyesuaian, Kas Kecil, Persediaan Barang, dll"
                  className="w-full px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Quick Mapel Recommendation Chips */}
            <div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                Pilihan Cepat Mata Pelajaran:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {popularSubjects.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => {
                      setMataPelajaran(sub);
                      if (selectedPresetId) setSelectedPresetId('');
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md transition-all ${
                      mataPelajaran === sub
                        ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Main Textarea Materi Bahan Ajar */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Materi atau Bahan Ajar</span>
                <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="text-xs font-semibold text-slate-600 hover:text-rose-700 flex items-center gap-1 bg-slate-100 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition-colors border border-slate-200"
                  title="Kosongkan teks materi dan topik untuk memulai dari awal"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Mulai Materi Baru</span>
                </button>

                <label className="cursor-pointer text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors border border-emerald-200">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah File (.txt / .json)</span>
                  <input
                    type="file"
                    accept=".txt,.md,.doc,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* JSON Notice Banner */}
            {jsonNotice && (
              <div
                className={`mb-3 p-3.5 rounded-xl border text-xs flex items-start justify-between gap-3 animate-in fade-in ${
                  jsonNotice.type === 'info'
                    ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  <FileJson className={`w-4 h-4 shrink-0 mt-0.5 ${jsonNotice.type === 'info' ? 'text-emerald-600' : 'text-rose-600'}`} />
                  <div>
                    <span className="font-bold block mb-0.5">
                      {jsonNotice.type === 'info' ? 'Berkas JSON RPP Dikenali' : 'Pemberitahuan Format JSON'}
                    </span>
                    <p className="leading-relaxed">{jsonNotice.text}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {detectedJsonRpp && onImportDoc && (
                    <button
                      type="button"
                      onClick={() => onImportDoc(detectedJsonRpp)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-2xs transition-colors"
                    >
                      <span>Buka Sebagai RPP</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setJsonNotice(null);
                      setDetectedJsonRpp(null);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <textarea
              value={materi}
              onChange={(e) => handleMateriChange(e.target.value)}
              rows={9}
              required
              placeholder="Ketik atau tempelkan (paste) ringkasan materi bahan ajar di sini. Bisa berupa catatan guru, Jobsheet, studi kasus transaksi akuntansi, rangkuman bab, atau teks materi apa saja..."
              className="w-full p-4 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono leading-relaxed"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mt-1.5 text-xs text-slate-400">
              <span>{materi.length} karakter • Bahan ajar ini akan menjadi rujukan mutlak penyusunan CP, TP, LKPD, & Glosarium</span>
              {topikPembelajaran && (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target Topik: <strong>{topikPembelajaran}</strong></span>
                </span>
              )}
            </div>
          </div>

          {/* Collapsible Fine Tuning Settings */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/70 text-left flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Pengaturan Tambahan (Opsional)
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  — Fase / Kelas, Alokasi Waktu, Model Pembelajaran & Tahun Pelajaran
                </span>
              </div>
              <div className="text-slate-400">
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showAdvanced && (
              <div className="p-4 sm:p-5 bg-white space-y-4 border-t border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Fase / Kelas / Semester
                    </label>
                    <input
                      type="text"
                      value={faseKelas}
                      onChange={(e) => setFaseKelas(e.target.value)}
                      placeholder="contoh: Fase F / Kelas XI SMK / Semester Ganjil"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alokasi Waktu
                    </label>
                    <input
                      type="text"
                      value={alokasiWaktu}
                      onChange={(e) => setAlokasiWaktu(e.target.value)}
                      placeholder="contoh: 2 Pertemuan x 3 JP (135 Menit)"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Praktik Pedagogis / Model Pembelajaran
                    </label>
                    <select
                      value={praktikPedagogis}
                      onChange={(e) => setPraktikPedagogis(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="Problem Based Learning (PBL)">Problem Based Learning (PBL)</option>
                      <option value="Project Based Learning (PjBL)">Project Based Learning (PjBL)</option>
                      <option value="Teaching Factory (TeFa - Standar Industri / DUDIKA)">Teaching Factory (TeFa - Standar Industri / DUDIKA)</option>
                      <option value="Praktik Bengkel / Studio & Simulasi SOP K3LH">Praktik Lab & Simulasi SOP K3LH</option>
                      <option value="Inkuiri Terbimbing (Guided Inquiry)">Inkuiri Terbimbing (Guided Inquiry)</option>
                      <option value="Discovery Learning">Discovery Learning</option>
                      <option value="Genre-Based Approach (Pendekatan Berbasis Genre)">Genre-Based Approach (Pendekatan Berbasis Genre)</option>
                      <option value="Pembelajaran Berdiferensiasi & Kolaboratif">Pembelajaran Berdiferensiasi & Kolaboratif</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tahun Pelajaran
                    </label>
                    <input
                      type="text"
                      value={tahunPelajaran}
                      onChange={(e) => setTahunPelajaran(e.target.value)}
                      placeholder="contoh: 2026/2027"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              Mapel: <strong>{mataPelajaran || 'Akuntansi'}</strong> • Topik:{' '}
              <strong>{topikPembelajaran || 'Sesuai Bahan Ajar'}</strong>
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !materi.trim()}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all ${
              isLoading || !materi.trim()
                ? 'bg-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/25 active:scale-[0.98]'
            }`}
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>{isLoading ? 'Sedang Menyusun RPP...' : '✨ Susun RPP Sesuai Bahan Ajar (AI)'}</span>
          </button>
        </div>
      </form>

      {/* Stepped Loading Animation */}
      {isLoading && (
        <div className="mt-8 bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 animate-spin">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                Menyusun RPP Mendalam Berdasarkan Bahan Ajar...
              </h3>
              <p className="text-xs text-slate-500">
                AI sedang menelaah materi bahan ajar untuk topik <strong>{topikPembelajaran || mataPelajaran}</strong>.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">Menganalisis konsep esensial, istilah teknis, dan studi kasus dari bahan ajar</span>
            </div>
            <div
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                loadingStep >= 2 ? 'text-slate-700 opacity-100' : 'text-slate-400 opacity-60'
              }`}
            >
              {loadingStep >= 2 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span>Merumuskan Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP) spesifik</span>
            </div>
            <div
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                loadingStep >= 3 ? 'text-slate-700 opacity-100' : 'text-slate-400 opacity-60'
              }`}
            >
              {loadingStep >= 3 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span>Menyusun alur belajar berkesadaran: Memahami, Mengaplikasi (LKPD konkret), Merefleksi</span>
            </div>
            <div
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                loadingStep >= 4 ? 'text-slate-700 opacity-100' : 'text-slate-400 opacity-60'
              }`}
            >
              {loadingStep >= 4 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span>Menyiapkan Lembar Kerja Peserta Didik (LKPD), rubrik penilaian, dan glosarium istilah</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
