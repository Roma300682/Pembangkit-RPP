import React, { useState } from 'react';
import {
  Printer,
  Download,
  Copy,
  Edit3,
  Check,
  Wand2,
  Save,
  CheckSquare,
  Square,
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  Compass,
  ListOrdered,
  FileCheck2,
  Layers,
  Globe,
  PlusCircle,
  Trash2,
  Plus,
  FileJson,
} from 'lucide-react';
import { RppDocument, PengalamanBelajarPertemuan } from '../types/rpp';
import { exportRppToWord } from '../utils/exportWord';
import { rppToPlainText } from '../utils/exportText';
import { exportRppToJsonFile } from '../utils/jsonUtils';

interface RppViewProps {
  document: RppDocument;
  onUpdateDocument: (updated: RppDocument) => void;
  onOpenRefine: (sectionName: string, currentContent: any) => void;
  onSaveToHistory: () => void;
  onOpenEmbed?: () => void;
}

export const RppView: React.FC<RppViewProps> = ({
  document: doc,
  onUpdateDocument,
  onOpenRefine,
  onSaveToHistory,
  onOpenEmbed,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Quick field updater
  const updateField = (path: string[], value: any) => {
    const updated = JSON.parse(JSON.stringify(doc));
    let cur: any = updated;
    for (let i = 0; i < path.length - 1; i++) {
      cur = cur[path[i]];
    }
    cur[path[path.length - 1]] = value;
    onUpdateDocument(updated);
  };

  const handleCopy = () => {
    const text = rppToPlainText(doc);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    onSaveToHistory();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const toggleDimensi = (index: number) => {
    const list = [...(doc.identifikasi?.dimensiProfilLulusan || [])];
    if (list[index]) {
      list[index].selected = !list[index].selected;
      updateField(['identifikasi', 'dimensiProfilLulusan'], list);
    }
  };

  const handleAddMeeting = () => {
    const list: PengalamanBelajarPertemuan[] = [...(doc.pengalamanBelajar || [])];
    const nextNum = list.length + 1;
    list.push({
      pertemuanKe: nextNum,
      durasiJP: '3 JP (135 Menit)',
      fokusTopik: `Penguatan & Praktik Lanjutan Pertemuan ke-${nextNum}`,
      awalSalamDoaPresensi: {
        kegiatan: 'Guru menyapa murid, memimpin doa, memeriksa kehadiran, serta menegakkan budaya kerja 5R di ruang kelas/lab.',
        waktuMenit: 10,
      },
      awalApersepsiPertanyaanPemantik: {
        kegiatan: 'Guru mengulas materi sebelumnya dan menyajikan tantangan kasus pemecahan masalah baru berorientasi DUDIKA.',
        waktuMenit: 10,
        pertanyaanPemantik: [
          'Bagaimana penerapan konsep ini pada industri / dunia kerja nyata?',
          'Tantangan apa yang paling sering muncul saat menghadapi kasus di lapangan?',
        ],
      },
      awalPenyampaianTujuanIceBreaking: {
        kegiatan: 'Menyampaikan tujuan pembelajaran pertemuan ini dan ice breaking fokus konsentrasi.',
        waktuMenit: 10,
        iceBreaking: 'Game interaktif kilat pemantik nalar kritis murid.',
      },
      intiMemahami: {
        kegiatan: 'Murid mendalami studi kasus lanjutan dan berdiskusi secara mendalam bersama kelompok kerja.',
        waktuMenit: 35,
      },
      intiMengaplikasi: {
        kegiatan: 'Murid menyelesaikan Jobsheet Praktik / Proyek lanjutan secara kolaboratif sesuai SOP standar industri.',
        waktuMenit: 45,
      },
      intiMerefleksi: {
        kegiatan: 'Presentasi hasil karya kelompok, saling memberikan umpan balik konstruktif (peer-review).',
        waktuMenit: 15,
      },
      penutupKesimpulanRefleksi: {
        kegiatan: 'Menyimpulkan intisari pembelajaran dan mencatat refleksi bermakna dalam jurnal belajar.',
        waktuMenit: 5,
      },
      penutupUmpanBalikInfoDoa: {
        kegiatan: 'Apresiasi kerja keras murid, penyampaian agenda pertemuan mendatang, doa bersama, dan salam.',
        waktuMenit: 5,
      },
    });
    updateField(['pengalamanBelajar'], list);
  };

  const handleRemoveMeeting = (indexToRemove: number) => {
    if ((doc.pengalamanBelajar || []).length <= 1) return;
    const list = (doc.pengalamanBelajar || [])
      .filter((_, idx) => idx !== indexToRemove)
      .map((m, idx) => ({
        ...m,
        pertemuanKe: idx + 1,
      }));
    updateField(['pengalamanBelajar'], list);
  };

  const handleAddLkpdQuestion = () => {
    const list = [...(doc.lampiran?.lkpd?.soalDanTugas || [])];
    list.push(`Tugas tambahan: Analisislah studi kasus tersebut dan buatlah simpulan kritis mengenai dampaknya terhadap operasional lembaga!`);
    updateField(['lampiran', 'lkpd', 'soalDanTugas'], list);
  };

  const handleAddGlosarium = () => {
    const list = [...(doc.lampiran?.bahanBacaan?.glosarium || [])];
    list.push({
      istilah: 'Istilah Baru',
      arti: 'Penjelasan istilah dalam konteks mata pelajaran dan dunia industri.',
    });
    updateField(['lampiran', 'bahanBacaan', 'glosarium'], list);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Floating Action Bar */}
      <div className="no-print bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md p-3 mb-6 sticky top-20 z-20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[240px] sm:max-w-xs">
            {doc.identitas.topikPembelajaran || 'Rencana Pembelajaran'}
          </span>
          <span className="text-[11px] text-slate-400 hidden md:inline">
            • {doc.identitas.faseKelasSemester}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              isEditing
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Klik untuk mengedit langsung sel teks RPP"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Selesai Edit' : 'Edit Langsung'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
          </button>

          <button
            onClick={() => exportRppToWord(doc)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
            title="Unduh file Microsoft Word (.doc) terformat rapi"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Word</span>
          </button>

          <button
            onClick={() => exportRppToJsonFile(doc)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
            title="Unduh berkas JSON RPP resmi untuk cadangan atau dibagikan"
          >
            <FileJson className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ekspor JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
            title="Cetak langsung atau simpan sebagai PDF A4"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / PDF</span>
          </button>

          {onOpenEmbed && (
            <button
              onClick={onOpenEmbed}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
              title="Pasang formulir generator atau RPP di situs web sekolah/blog Anda"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Pasang di Web</span>
            </button>
          )}

          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white transition-colors"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
            <span>{savedSuccess ? 'Tersimpan!' : 'Simpan'}</span>
          </button>
        </div>
      </div>

      {/* Official Document Sheet */}
      <div
        id="rpp-document"
        className="bg-white rounded-2xl shadow-xl border border-slate-300/80 p-6 sm:p-10 text-slate-900 print:p-0 print:border-none print:shadow-none"
      >
        {/* Document Header / Kop Surat */}
        <div className="text-center pb-5 mb-6 border-b-2 border-slate-900">
          <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-1">
            PEMERINTAH DAERAH • DINAS PENDIDIKAN
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">
            {doc.identitas.namaSatuanPendidikan || 'SEKOLAH INDONESIA'}
          </h1>
          <div className="text-sm font-bold text-slate-700 uppercase tracking-wide mt-1">
            RENCANA PEMBELAJARAN MENDALAM (KURIKULUM MERDEKA)
          </div>
          <p className="text-xs text-slate-600 italic mt-0.5">
            Pendekatan Pembelajaran Mendalam yang Berkesadaran, Bermakna, dan Menggembirakan
          </p>
        </div>

        {/* Section 1: Identitas */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-6 h-6 rounded-md bg-emerald-700 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Identitas</span>
            </h2>
            <button
              onClick={() => onOpenRefine('Identitas Pembelajaran', doc.identitas)}
              className="no-print text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-medium"
            >
              <Wand2 className="w-3 h-3" /> Perbaiki dengan AI
            </button>
          </div>

          <table className="document-table">
            <thead>
              <tr>
                <th className="w-1/3 text-left">Komponen</th>
                <th className="w-2/3 text-left">Isian</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold bg-slate-50">Nama satuan pendidikan</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-xs"
                      value={doc.identitas.namaSatuanPendidikan}
                      onChange={(e) => updateField(['identitas', 'namaSatuanPendidikan'], e.target.value)}
                    />
                  ) : (
                    doc.identitas.namaSatuanPendidikan
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Nama guru</td>
                <td>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="w-2/3 border rounded px-2 py-1 text-xs"
                        value={doc.identitas.namaGuru}
                        onChange={(e) => updateField(['identitas', 'namaGuru'], e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="NIP"
                        className="w-1/3 border rounded px-2 py-1 text-xs"
                        value={doc.identitas.nipGuru || ''}
                        onChange={(e) => updateField(['identitas', 'nipGuru'], e.target.value)}
                      />
                    </div>
                  ) : (
                    <span>
                      {doc.identitas.namaGuru} {doc.identitas.nipGuru ? `(NIP: ${doc.identitas.nipGuru})` : ''}
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Mata pelajaran</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-xs"
                      value={doc.identitas.mataPelajaran}
                      onChange={(e) => updateField(['identitas', 'mataPelajaran'], e.target.value)}
                    />
                  ) : (
                    <span className="font-semibold text-emerald-900">{doc.identitas.mataPelajaran}</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Fase / kelas / semester</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-xs"
                      value={doc.identitas.faseKelasSemester}
                      onChange={(e) => updateField(['identitas', 'faseKelasSemester'], e.target.value)}
                    />
                  ) : (
                    doc.identitas.faseKelasSemester
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Topik pembelajaran</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-xs font-bold"
                      value={doc.identitas.topikPembelajaran}
                      onChange={(e) => updateField(['identitas', 'topikPembelajaran'], e.target.value)}
                    />
                  ) : (
                    <span className="font-bold text-slate-900">{doc.identitas.topikPembelajaran}</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Alokasi waktu</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-xs"
                      value={doc.identitas.alokasiWaktu}
                      onChange={(e) => updateField(['identitas', 'alokasiWaktu'], e.target.value)}
                    />
                  ) : (
                    doc.identitas.alokasiWaktu
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Tahun pelajaran</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-xs"
                      value={doc.identitas.tahunPelajaran}
                      onChange={(e) => updateField(['identitas', 'tahunPelajaran'], e.target.value)}
                    />
                  ) : (
                    doc.identitas.tahunPelajaran
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2: Identifikasi */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-6 h-6 rounded-md bg-emerald-700 text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Identifikasi</span>
            </h2>
            <button
              onClick={() => onOpenRefine('Identifikasi Kebutuhan & Profil Murid', doc.identifikasi)}
              className="no-print text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-medium"
            >
              <Wand2 className="w-3 h-3" /> Perbaiki dengan AI
            </button>
          </div>

          <table className="document-table">
            <thead>
              <tr>
                <th className="w-1/3 text-left">Aspek</th>
                <th className="w-2/3 text-left">Isian</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold bg-slate-50">Kesiapan belajar murid</td>
                <td>
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="font-bold text-emerald-800">• Sudah paham: </span>
                      {doc.identifikasi?.kesiapanBelajar?.sudahPaham}
                    </div>
                    <div>
                      <span className="font-bold text-amber-800">• Sedang berkembang: </span>
                      {doc.identifikasi?.kesiapanBelajar?.sedangBerkembang}
                    </div>
                    <div>
                      <span className="font-bold text-rose-800">• Perlu bantuan: </span>
                      {doc.identifikasi?.kesiapanBelajar?.perluBantuan}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Minat dan gaya belajar</td>
                <td>{doc.identifikasi?.minatGayaBelajar}</td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Latar belakang dan kebutuhan khusus</td>
                <td>{doc.identifikasi?.latarBelakangKebutuhanKhusus}</td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Jenis pengetahuan materi</td>
                <td>
                  <span className="font-semibold text-slate-800">{doc.identifikasi?.jenisPengetahuanMateri}</span>
                </td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Relevansi materi dengan kehidupan nyata</td>
                <td>{doc.identifikasi?.relevansiKehidupanNyata}</td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">
                  Dimensi Profil Lulusan yang ditargetkan
                </td>
                <td>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(doc.identifikasi?.dimensiProfilLulusan || []).map((dim, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleDimensi(idx)}
                        className={`flex items-start gap-1.5 p-1.5 rounded cursor-pointer transition-colors ${
                          dim.selected ? 'bg-emerald-50 text-emerald-950 font-medium' : 'text-slate-500'
                        }`}
                      >
                        {dim.selected ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className={dim.selected ? 'font-bold' : ''}>{dim.name}</span>
                          {dim.keterangan && (
                            <p className="text-[11px] text-slate-600 font-normal leading-tight mt-0.5">
                              {dim.keterangan}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Desain Pembelajaran */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-6 h-6 rounded-md bg-emerald-700 text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Desain Pembelajaran</span>
            </h2>
            <button
              onClick={() => onOpenRefine('Desain Pembelajaran & CP-TP', doc.desainPembelajaran)}
              className="no-print text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-medium"
            >
              <Wand2 className="w-3 h-3" /> Perbaiki dengan AI
            </button>
          </div>

          <table className="document-table">
            <thead>
              <tr>
                <th className="w-1/3 text-left">Komponen</th>
                <th className="w-2/3 text-left">Isian</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold bg-slate-50">Capaian Pembelajaran (CP)</td>
                <td>{doc.desainPembelajaran?.capaianPembelajaran}</td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Lintas disiplin ilmu</td>
                <td>{doc.desainPembelajaran?.lintasDisiplinIlmu}</td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Tujuan pembelajaran (TP)</td>
                <td>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    {(doc.desainPembelajaran?.tujuanPembelajaran || []).map((tp, idx) => (
                      <li key={idx} className="font-medium text-slate-800">
                        {tp}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Topik pembelajaran kontekstual</td>
                <td>{doc.desainPembelajaran?.topikPembelajaranKontekstual}</td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Praktik pedagogis</td>
                <td>
                  <span className="font-bold text-emerald-800">{doc.desainPembelajaran?.praktikPedagogis}</span>
                </td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Kemitraan pembelajaran</td>
                <td>{doc.desainPembelajaran?.kemitraanPembelajaran}</td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Lingkungan pembelajaran</td>
                <td>{doc.desainPembelajaran?.lingkunganPembelajaran}</td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Pemanfaatan digital</td>
                <td>{doc.desainPembelajaran?.pemanfaatanDigital}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4: Pengalaman Belajar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                <span className="w-6 h-6 rounded-md bg-emerald-700 text-white text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span>Pengalaman Belajar</span>
              </h2>
              <p className="text-xs text-slate-500 italic mt-0.5">
                Rancangan kegiatan agar berkesadaran, bermakna, dan menggembirakan
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddMeeting}
                className="no-print text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-semibold transition-colors"
                title="Tambah pertemuan baru ke rencana pembelajaran"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>+ Tambah Pertemuan</span>
              </button>
              <button
                onClick={() => onOpenRefine('Pengalaman Belajar Per Pertemuan', doc.pengalamanBelajar)}
                className="no-print text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-medium"
              >
                <Wand2 className="w-3 h-3" /> Perbaiki dengan AI
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {(doc.pengalamanBelajar || []).map((m, mIdx) => (
              <div key={mIdx} className="border border-slate-300 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2.5 font-bold text-xs sm:text-sm text-slate-800 border-b border-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>
                      Pertemuan ke-{m.pertemuanKe || mIdx + 1} ({m.durasiJP || '3 JP'})
                    </span>
                    {m.fokusTopik && <span className="text-emerald-800 font-semibold">— {m.fokusTopik}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    {(doc.pengalamanBelajar || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMeeting(mIdx)}
                        className="no-print text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-0.5 rounded transition-colors flex items-center gap-1"
                        title="Hapus Pertemuan ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Hapus</span>
                      </button>
                    )}
                    <span className="text-xs font-normal text-slate-500 hidden sm:inline">Alokasi Waktu Terinci</span>
                  </div>
                </div>

                <table className="document-table">
                  <thead>
                    <tr>
                      <th className="w-1/4 text-left">Tahap</th>
                      <th className="w-3/5 text-left">Kegiatan Pembelajaran</th>
                      <th className="w-1/6 text-center">Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Awal 1 */}
                    <tr>
                      <td className="font-semibold bg-slate-50">Awal: salam, doa, presensi</td>
                      <td>{m.awalSalamDoaPresensi?.kegiatan}</td>
                      <td className="text-center font-medium">{m.awalSalamDoaPresensi?.waktuMenit || 5} mnt</td>
                    </tr>
                    {/* Awal 2 */}
                    <tr>
                      <td className="font-semibold bg-slate-50">Awal: apersepsi dan pertanyaan pemantik</td>
                      <td>
                        <div>{m.awalApersepsiPertanyaanPemantik?.kegiatan}</div>
                        {m.awalApersepsiPertanyaanPemantik?.pertanyaanPemantik?.length ? (
                          <div className="mt-2 p-2 bg-amber-50/70 border border-amber-200/60 rounded text-xs">
                            <span className="font-bold text-amber-900">Pertanyaan Pemantik:</span>
                            <ul className="list-disc list-inside mt-1 text-amber-950 space-y-0.5">
                              {m.awalApersepsiPertanyaanPemantik.pertanyaanPemantik.map((q, qIdx) => (
                                <li key={qIdx}>{q}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </td>
                      <td className="text-center font-medium">{m.awalApersepsiPertanyaanPemantik?.waktuMenit || 10} mnt</td>
                    </tr>
                    {/* Awal 3 */}
                    <tr>
                      <td className="font-semibold bg-slate-50">Awal: penyampaian tujuan dan ice breaking</td>
                      <td>
                        <div>{m.awalPenyampaianTujuanIceBreaking?.kegiatan}</div>
                        {m.awalPenyampaianTujuanIceBreaking?.iceBreaking && (
                          <div className="mt-1 text-xs text-emerald-800 italic">
                            🎯 <strong>Ice Breaking:</strong> {m.awalPenyampaianTujuanIceBreaking.iceBreaking}
                          </div>
                        )}
                      </td>
                      <td className="text-center font-medium">{m.awalPenyampaianTujuanIceBreaking?.waktuMenit || 10} mnt</td>
                    </tr>
                    {/* Inti: Memahami */}
                    <tr className="bg-emerald-50/30">
                      <td className="font-bold text-emerald-950">Inti: memahami</td>
                      <td>
                        <p className="font-medium text-slate-800">{m.intiMemahami?.kegiatan}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 italic">
                          (Murid membangun pemahaman mendalam lewat stimulus, eksplorasi materi, dan diskusi terbimbing)
                        </p>
                      </td>
                      <td className="text-center font-bold text-emerald-900">{m.intiMemahami?.waktuMenit || 25} mnt</td>
                    </tr>
                    {/* Inti: Mengaplikasi */}
                    <tr className="bg-emerald-50/30">
                      <td className="font-bold text-emerald-950">Inti: mengaplikasi</td>
                      <td>
                        <p className="font-medium text-slate-800">{m.intiMengaplikasi?.kegiatan}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 italic">
                          (Murid menerapkan konsep lewat pengerjaan LKPD, pemecahan masalah nyata, simulasi, atau karya kolaboratif)
                        </p>
                      </td>
                      <td className="text-center font-bold text-emerald-900">{m.intiMengaplikasi?.waktuMenit || 35} mnt</td>
                    </tr>
                    {/* Inti: Merefleksi */}
                    <tr className="bg-emerald-50/30">
                      <td className="font-bold text-emerald-950">Inti: merefleksi</td>
                      <td>
                        <p className="font-medium text-slate-800">{m.intiMerefleksi?.kegiatan}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 italic">
                          (Murid menilai proses belajar, mempresentasikan temuan, dan menarik intisari bermakna)
                        </p>
                      </td>
                      <td className="text-center font-bold text-emerald-900">{m.intiMerefleksi?.waktuMenit || 15} mnt</td>
                    </tr>
                    {/* Penutup 1 */}
                    <tr>
                      <td className="font-semibold bg-slate-50">Penutup: kesimpulan dan refleksi</td>
                      <td>{m.penutupKesimpulanRefleksi?.kegiatan}</td>
                      <td className="text-center font-medium">{m.penutupKesimpulanRefleksi?.waktuMenit || 10} mnt</td>
                    </tr>
                    {/* Penutup 2 */}
                    <tr>
                      <td className="font-semibold bg-slate-50">Penutup: umpan balik, info berikutnya, doa</td>
                      <td>{m.penutupUmpanBalikInfoDoa?.kegiatan}</td>
                      <td className="text-center font-medium">{m.penutupUmpanBalikInfoDoa?.waktuMenit || 5} mnt</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Asesmen Pembelajaran */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-6 h-6 rounded-md bg-emerald-700 text-white text-xs flex items-center justify-center font-bold">
                5
              </span>
              <span>Asesmen Pembelajaran</span>
            </h2>
            <button
              onClick={() => onOpenRefine('Asesmen & Rubrik Penilaian', doc.asesmenPembelajaran)}
              className="no-print text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-medium"
            >
              <Wand2 className="w-3 h-3" /> Perbaiki dengan AI
            </button>
          </div>

          <table className="document-table mb-4">
            <thead>
              <tr>
                <th className="w-1/4 text-left">Jenis Asesmen</th>
                <th className="w-1/2 text-left">Teknik dan Instrumen</th>
                <th className="w-1/4 text-left">Waktu Pelaksanaan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold bg-slate-50">Asesmen awal (diagnostik)</td>
                <td>{doc.asesmenPembelajaran?.asesmenAwal?.teknikInstrumen}</td>
                <td>{doc.asesmenPembelajaran?.asesmenAwal?.waktuPelaksanaan}</td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Asesmen proses (formatif)</td>
                <td>{doc.asesmenPembelajaran?.asesmenProses?.teknikInstrumen}</td>
                <td>{doc.asesmenPembelajaran?.asesmenProses?.waktuPelaksanaan}</td>
              </tr>
              <tr>
                <td className="font-semibold bg-slate-50">Asesmen akhir (sumatif)</td>
                <td>{doc.asesmenPembelajaran?.asesmenAkhir?.teknikInstrumen}</td>
                <td>{doc.asesmenPembelajaran?.asesmenAkhir?.waktuPelaksanaan}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Rubrik Penilaian Ketercapaian
          </h3>
          <div className="overflow-x-auto">
            <table className="document-table">
              <thead>
                <tr>
                  <th className="w-1/5 text-left">Kriteria / Indikator</th>
                  <th className="w-1/5 text-left bg-emerald-100/60 text-emerald-950">Sangat Baik (4)</th>
                  <th className="w-1/5 text-left bg-blue-100/60 text-blue-950">Baik (3)</th>
                  <th className="w-1/5 text-left bg-amber-100/60 text-amber-950">Cukup (2)</th>
                  <th className="w-1/5 text-left bg-rose-100/60 text-rose-950">Perlu Bimbingan (1)</th>
                </tr>
              </thead>
              <tbody>
                {(doc.asesmenPembelajaran?.rubrikPenilaian || []).map((rubrik, rIdx) => (
                  <tr key={rIdx}>
                    <td className="font-bold text-slate-800 bg-slate-50/70">{rubrik.kriteria}</td>
                    <td>{rubrik.sangatBaik4}</td>
                    <td>{rubrik.baik3}</td>
                    <td>{rubrik.cukup2}</td>
                    <td>{rubrik.perluBimbingan1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 6: Lampiran */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-6 h-6 rounded-md bg-emerald-700 text-white text-xs flex items-center justify-center font-bold">
                6
              </span>
              <span>Lampiran Lengkap</span>
            </h2>
            <button
              onClick={() => onOpenRefine('Lampiran LKPD & Diferensiasi', doc.lampiran)}
              className="no-print text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-medium"
            >
              <Wand2 className="w-3 h-3" /> Perbaiki dengan AI
            </button>
          </div>

          <div className="space-y-4">
            {/* Lampiran 1: LKPD */}
            <div className="border border-slate-300 rounded-xl p-4 bg-slate-50/40">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2 border-b border-slate-200 pb-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>A. Lembar Kerja Peserta Didik (LKPD): {doc.lampiran?.lkpd?.judul}</span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800">Tujuan Aktivitas: </span>
                  {doc.lampiran?.lkpd?.tujuan}
                </div>
                <div>
                  <span className="font-bold text-slate-800">Stimulus / Bahan Pengantar: </span>
                  <div className="p-2.5 bg-white border border-slate-200 rounded mt-1 italic text-slate-700 leading-relaxed">
                    {doc.lampiran?.lkpd?.stimulusRingkas}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-slate-800">Petunjuk Pengerjaan:</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700">
                    {(doc.lampiran?.lkpd?.petunjukPengerjaan || []).map((p, pIdx) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-slate-800">Langkah-langkah Aktivitas Murid:</span>
                  <ol className="list-decimal list-inside mt-1 space-y-1 text-slate-800 font-medium">
                    {(doc.lampiran?.lkpd?.langkahAktivitas || []).map((l, lIdx) => (
                      <li key={lIdx}>{l}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">Tugas / Pertanyaan Diskusi Terstruktur:</span>
                    <button
                      type="button"
                      onClick={handleAddLkpdQuestion}
                      className="no-print text-[11px] text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded flex items-center gap-1 font-semibold transition-colors"
                    >
                      <Plus className="w-3 h-3 text-emerald-600" />
                      <span>Tambah Butir Soal</span>
                    </button>
                  </div>
                  <div className="space-y-1.5 mt-1">
                    {(doc.lampiran?.lkpd?.soalDanTugas || []).map((s, sIdx) => (
                      <div key={sIdx} className="p-2 bg-white border border-slate-200 rounded">
                        <span className="font-bold text-emerald-800">Soal {sIdx + 1}: </span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lampiran 2: Bahan Bacaan & Media */}
            <div className="border border-slate-300 rounded-xl p-4 bg-slate-50/40">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2 border-b border-slate-200 pb-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>B. Bahan Bacaan Guru & Murid</span>
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="whitespace-pre-line leading-relaxed bg-white p-3 border border-slate-200 rounded">
                  {doc.lampiran?.bahanBacaan?.ringkasanMateri}
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">Glosarium Istilah:</span>
                    <button
                      type="button"
                      onClick={handleAddGlosarium}
                      className="no-print text-[11px] text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded flex items-center gap-1 font-semibold transition-colors"
                    >
                      <Plus className="w-3 h-3 text-emerald-600" />
                      <span>Tambah Istilah</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                    {(doc.lampiran?.bahanBacaan?.glosarium || []).map((g, gIdx) => (
                      <div key={gIdx} className="p-1.5 bg-white border border-slate-200 rounded text-[11px]">
                        <strong>{g.istilah}: </strong> {g.arti}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  <strong>Media & Sumber Ajar: </strong> {doc.lampiran?.bahanBacaan?.mediaAjar}
                </div>
              </div>
            </div>

            {/* Lampiran 3: Diferensiasi */}
            <div className="border border-slate-300 rounded-xl p-4 bg-slate-50/40">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2 border-b border-slate-200 pb-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>C. Rencana Pembelajaran Diferensiasi</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 bg-white border border-slate-200 rounded">
                  <div className="font-bold text-emerald-800 mb-1">Diferensiasi Konten</div>
                  <p className="text-slate-700">{doc.lampiran?.rencanaDiferensiasi?.konten}</p>
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded">
                  <div className="font-bold text-blue-800 mb-1">Diferensiasi Proses</div>
                  <p className="text-slate-700">{doc.lampiran?.rencanaDiferensiasi?.proses}</p>
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded">
                  <div className="font-bold text-purple-800 mb-1">Diferensiasi Produk</div>
                  <p className="text-slate-700">{doc.lampiran?.rencanaDiferensiasi?.produk}</p>
                </div>
              </div>
            </div>

            {/* Lampiran 4: Instrumen Refleksi */}
            <div className="border border-slate-300 rounded-xl p-4 bg-slate-50/40">
              <div className="font-bold text-slate-900 text-sm mb-2 border-b border-slate-200 pb-2">
                D. Instrumen Refleksi Belajar (Murid & Guru)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-2.5 border border-slate-200 rounded">
                  <span className="font-bold text-emerald-900">Pertanyaan Refleksi Murid:</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700">
                    {(doc.lampiran?.instrumenRefleksi?.refleksiMurid || []).map((rm, idx) => (
                      <li key={idx}>{rm}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-2.5 border border-slate-200 rounded">
                  <span className="font-bold text-blue-900">Pertanyaan Refleksi Guru:</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700">
                    {(doc.lampiran?.instrumenRefleksi?.refleksiGuru || []).map((rg, idx) => (
                      <li key={idx}>{rg}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Official Signatures / Pengesahan */}
        <div className="pt-6 border-t-2 border-slate-400 mt-10">
          <div className="grid grid-cols-2 gap-8 text-center text-xs sm:text-sm">
            <div>
              <p>Mengetahui,</p>
              <p className="font-semibold">Kepala {doc.identitas.namaSatuanPendidikan}</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-[10px] text-slate-300 italic no-print">(Tanda Tangan & Cap)</span>
              </div>
              <p className="font-bold underline uppercase">
                {doc.lampiran?.pengesahan?.kepalaSekolahNama || 'Kepala Sekolah, M.Pd.'}
              </p>
              <p className="text-xs text-slate-600">
                NIP. {doc.lampiran?.pengesahan?.kepalaSekolahNIP || '19750505 200003 1 002'}
              </p>
            </div>

            <div>
              <p>{doc.lampiran?.pengesahan?.tempatTanggal || `${doc.identitas.namaSatuanPendidikan}, 2026`}</p>
              <p className="font-semibold">Guru Mata Pelajaran</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-[10px] text-slate-300 italic no-print">(Tanda Tangan)</span>
              </div>
              <p className="font-bold underline uppercase">
                {doc.lampiran?.pengesahan?.guruNama || doc.identitas.namaGuru}
              </p>
              <p className="text-xs text-slate-600">
                NIP. {doc.lampiran?.pengesahan?.guruNIP || doc.identitas.nipGuru || '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
