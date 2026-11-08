import React from 'react';
import { BookOpen, CheckCircle2, HeartHandshake, Smile, Eye, ArrowRight, Calculator } from 'lucide-react';

interface GuideModalProps {
  onStartGenerator: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onStartGenerator }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Panduan Resmi Guru Indonesia</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Format Rencana Pembelajaran Mendalam
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Mengacu pada prinsip Kurikulum Merdeka dan pendekatan Pembelajaran Mendalam (Deep Learning) yang berkesadaran, bermakna, dan menggembirakan.
        </p>
      </div>

      {/* 3 Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">1. Berkesadaran (Mindful)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Murid menyadari sepenuhnya apa tujuan belajarnya, mengapa materi tersebut penting, dan bagaimana proses berpikir mereka berlangsung (metakognisi).
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">2. Bermakna (Meaningful)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Konsep yang dipelajari selalu dikaitkan dengan konteks nyata kehidupan murid di lingkungan sekitarnya serta lintas disiplin ilmu.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Smile className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">3. Menggembirakan (Joyful)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Suasana belajar yang aman, hangat, menantang, serta dilengkapi ice breaking edukatif dan kolaborasi yang aktif.
          </p>
        </div>
      </div>

      {/* 6 Structural Components Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span>Struktur Baku 6 Komponen RPP / Modul Ajar</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="font-bold text-emerald-800 text-sm mb-1">1. Identitas</div>
            <p className="text-slate-600">
              Nama sekolah, nama & NIP guru, mata pelajaran, fase/kelas/semester, topik pembelajaran, alokasi waktu, dan tahun pelajaran.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="font-bold text-emerald-800 text-sm mb-1">2. Identifikasi</div>
            <p className="text-slate-600">
              Kesiapan belajar murid (paham utuh, berkembang, perlu bantuan), minat & gaya belajar, relevansi kehidupan, serta 8 dimensi profil lulusan.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="font-bold text-emerald-800 text-sm mb-1">3. Desain Pembelajaran</div>
            <p className="text-slate-600">
              Capaian Pembelajaran (CP), lintas disiplin ilmu, Tujuan Pembelajaran (TP), praktik pedagogis (PBL/PjBL), lingkungan & digital.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="font-bold text-emerald-800 text-sm mb-1">4. Pengalaman Belajar</div>
            <p className="text-slate-600">
              Tahap Awal (salam, apersepsi, ice breaking), Inti (memahami, mengaplikasi, merefleksi), dan Penutup lengkap dengan alokasi menit per pertemuan.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="font-bold text-emerald-800 text-sm mb-1">5. Asesmen Pembelajaran</div>
            <p className="text-slate-600">
              Asesmen diagnostik awal, formatif proses, dan sumatif akhir dilengkapi matriks rubrik 4 level: Sangat Baik, Baik, Cukup, Perlu Bimbingan.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="font-bold text-emerald-800 text-sm mb-1">6. Lampiran & Pengesahan</div>
            <p className="text-slate-600">
              LKPD siap pakai, bahan bacaan guru & murid, glosarium, diferensiasi konten/proses/produk, dan kolom pengesahan Kepala Sekolah & Guru.
            </p>
          </div>
        </div>

        {/* Dedicated Jurusan Akuntansi (AKL) Curriculum Structure Callout */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-300 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm mb-2">
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>📊 Struktur Resmi Kurikulum Merdeka Jurusan Akuntansi (AKL)</span>
          </div>
          <p className="leading-relaxed mb-3">
            Aplikasi ini telah <strong>dikhususkan untuk Jurusan Akuntansi dan Keuangan Lembaga (AKL)</strong> SMK guna mencetak profil kompetensi <strong>Teknisi Akuntansi Junior</strong> berstandar DUDIKA dan SAK:
          </p>
          <div className="space-y-3 text-slate-800">
            <div className="p-3 bg-white rounded-lg border border-emerald-200">
              <strong className="text-emerald-800 block mb-1">1. Dasar-dasar Program Keahlian AKL (Fase E - Kelas X):</strong>
              <p className="text-slate-600 mb-1">Membangun fondasi sikap kerja, keselamatan, dan literasi finansial digital:</p>
              <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                <li>Etika Profesi Akuntan & Prinsip Integritas / Kerahasiaan IAI</li>
                <li>K3LH dan Penerapan Budaya Kerja 5R di Lingkungan Kerja Akuntansi</li>
                <li>Dasar-dasar Perbankan dan Sistem Lembaga Keuangan</li>
                <li>Proses Bisnis dan Siklus Akuntansi Dasar di Era Digital</li>
                <li>Penggunaan Aplikasi Spreadsheet / Pengolah Angka (Formula SUMIF, VLOOKUP)</li>
              </ul>
            </div>

            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <strong className="text-blue-800 block mb-1">2. Konsentrasi Keahlian Produktif AKL (Fase F - Kelas XI & XII):</strong>
              <p className="text-slate-600 mb-1">Mencetak Teknisi Akuntansi Junior melalui 7 Elemen Kompetensi Kejuruan:</p>
              <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
                <li><strong>Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur:</strong> Siklus akuntansi manual lengkap dari bukti transaksi hingga laporan keuangan.</li>
                <li><strong>Akuntansi Keuangan:</strong> Pengelolaan kas, rekonsiliasi bank, kartu piutang, persediaan FIFO/Average, aset tetap, dan kewajiban.</li>
                <li><strong>Akuntansi Lembaga/Instansi Pemerintah:</strong> Akuntansi sektor publik, APBDes, BKU, SP2D, dan laporan keuangan desa/daerah.</li>
                <li><strong>Komputer Akuntansi:</strong> Mengoperasikan software akuntansi digital (MYOB, Accurate, atau spreadsheet akuntansi).</li>
                <li><strong>Perpajakan:</strong> Administrasi pajak, perhitungan PPh Pasal 21 skema TER UU HPP, PPN 11%, dan pengisian SPT.</li>
                <li><strong>Mata Pelajaran Pilihan:</strong> Perbankan Syariah, Digital Marketing, atau Lembaga Keuangan Mikro.</li>
                <li><strong>Projek Kreatif dan Kewirausahaan (PKK):</strong> Pembelajaran berbasis unit jasa pembukuan UMKM dan jiwa entrepreneur.</li>
              </ol>
            </div>

            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <strong className="text-purple-800 block mb-1">3. Kelompok Mata Pelajaran Umum (Fase F - Kelas XI & XII):</strong>
              <p className="text-slate-600 mb-1">Porsi jam disesuaikan dengan tetap memperkuat etika, literasi, dan komunikasi akuntan:</p>
              <p className="text-slate-700">Pendidikan Agama & Budi Pekerti (Etika Muamalah), Pendidikan Pancasila (Integritas Anti-Fraud), Bahasa Indonesia (Laporan Analisis Keuangan), Bahasa Inggris (Business English), Sejarah (Sistem Keuangan Nasional), dan PJOK (Ergonomi Kerja Duduk).</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-200 flex justify-center">
          <button
            onClick={onStartGenerator}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
          >
            <span>Mulai Susun RPP dengan AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
