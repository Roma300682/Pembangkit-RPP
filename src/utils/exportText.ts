import { RppDocument } from '../types/rpp';

export function rppToPlainText(doc: RppDocument): string {
  const lines: string[] = [];
  lines.push('FORMAT ISIAN RENCANA PEMBELAJARAN MENDALAM (KURIKULUM MERDEKA)');
  lines.push('Pendekatan Pembelajaran Mendalam: Berkesadaran, Bermakna, dan Menggembirakan');
  lines.push('----------------------------------------------------------------------');
  lines.push('');
  lines.push('1. IDENTITAS');
  lines.push(`Nama satuan pendidikan : ${doc.identitas.namaSatuanPendidikan}`);
  lines.push(`Nama guru              : ${doc.identitas.namaGuru} ${doc.identitas.nipGuru ? `(NIP: ${doc.identitas.nipGuru})` : ''}`);
  lines.push(`Mata pelajaran         : ${doc.identitas.mataPelajaran}`);
  lines.push(`Fase / kelas / semester: ${doc.identitas.faseKelasSemester}`);
  lines.push(`Topik pembelajaran     : ${doc.identitas.topikPembelajaran}`);
  lines.push(`Alokasi waktu          : ${doc.identitas.alokasiWaktu}`);
  lines.push(`Tahun pelajaran        : ${doc.identitas.tahunPelajaran}`);
  lines.push('');
  lines.push('2. IDENTIFIKASI');
  lines.push(`Kesiapan belajar murid :`);
  lines.push(`  - Sudah paham        : ${doc.identifikasi?.kesiapanBelajar?.sudahPaham || '-'}`);
  lines.push(`  - Sedang berkembang  : ${doc.identifikasi?.kesiapanBelajar?.sedangBerkembang || '-'}`);
  lines.push(`  - Perlu bantuan      : ${doc.identifikasi?.kesiapanBelajar?.perluBantuan || '-'}`);
  lines.push(`Minat dan gaya belajar : ${doc.identifikasi?.minatGayaBelajar || '-'}`);
  lines.push(`Latar belakang & khusus: ${doc.identifikasi?.latarBelakangKebutuhanKhusus || '-'}`);
  lines.push(`Jenis pengetahuan      : ${doc.identifikasi?.jenisPengetahuanMateri || '-'}`);
  lines.push(`Relevansi kehidupan    : ${doc.identifikasi?.relevansiKehidupanNyata || '-'}`);
  lines.push('Dimensi Profil Lulusan yang ditargetkan:');
  (doc.identifikasi?.dimensiProfilLulusan || []).forEach((d) => {
    lines.push(`  [${d.selected ? 'X' : ' '}] ${d.name}${d.keterangan ? ` - ${d.keterangan}` : ''}`);
  });
  lines.push('');
  lines.push('3. DESAIN PEMBELAJARAN');
  lines.push(`Capaian Pembelajaran (CP)      : ${doc.desainPembelajaran?.capaianPembelajaran}`);
  lines.push(`Lintas disiplin ilmu           : ${doc.desainPembelajaran?.lintasDisiplinIlmu}`);
  lines.push('Tujuan pembelajaran            :');
  (doc.desainPembelajaran?.tujuanPembelajaran || []).forEach((tp, i) => {
    lines.push(`  ${i + 1}. ${tp}`);
  });
  lines.push(`Topik kontekstual              : ${doc.desainPembelajaran?.topikPembelajaranKontekstual}`);
  lines.push(`Praktik pedagogis              : ${doc.desainPembelajaran?.praktikPedagogis}`);
  lines.push(`Kemitraan pembelajaran         : ${doc.desainPembelajaran?.kemitraanPembelajaran}`);
  lines.push(`Lingkungan pembelajaran        : ${doc.desainPembelajaran?.lingkunganPembelajaran}`);
  lines.push(`Pemanfaatan digital            : ${doc.desainPembelajaran?.pemanfaatanDigital}`);
  lines.push('');
  lines.push('4. PENGALAMAN BELAJAR');
  (doc.pengalamanBelajar || []).forEach((m, idx) => {
    lines.push(`Pertemuan ke-${m.pertemuanKe || idx + 1} (${m.durasiJP || '2 JP'}) ${m.fokusTopik ? `- ${m.fokusTopik}` : ''}`);
    lines.push(`- Awal (Salam, doa, presensi)         [${m.awalSalamDoaPresensi?.waktuMenit || 5} mnt] : ${m.awalSalamDoaPresensi?.kegiatan}`);
    lines.push(`- Awal (Apersepsi & pertanyaan)       [${m.awalApersepsiPertanyaanPemantik?.waktuMenit || 10} mnt] : ${m.awalApersepsiPertanyaanPemantik?.kegiatan}`);
    if (m.awalApersepsiPertanyaanPemantik?.pertanyaanPemantik?.length) {
      lines.push(`  Pertanyaan: ${m.awalApersepsiPertanyaanPemantik.pertanyaanPemantik.join(' | ')}`);
    }
    lines.push(`- Awal (Tujuan & ice breaking)        [${m.awalPenyampaianTujuanIceBreaking?.waktuMenit || 10} mnt] : ${m.awalPenyampaianTujuanIceBreaking?.kegiatan}`);
    lines.push(`- Inti (Memahami)                     [${m.intiMemahami?.waktuMenit || 25} mnt] : ${m.intiMemahami?.kegiatan}`);
    lines.push(`- Inti (Mengaplikasi)                 [${m.intiMengaplikasi?.waktuMenit || 35} mnt] : ${m.intiMengaplikasi?.kegiatan}`);
    lines.push(`- Inti (Merefleksi)                   [${m.intiMerefleksi?.waktuMenit || 15} mnt] : ${m.intiMerefleksi?.kegiatan}`);
    lines.push(`- Penutup (Kesimpulan & refleksi)     [${m.penutupKesimpulanRefleksi?.waktuMenit || 10} mnt] : ${m.penutupKesimpulanRefleksi?.kegiatan}`);
    lines.push(`- Penutup (Umpan balik, info & doa)   [${m.penutupUmpanBalikInfoDoa?.waktuMenit || 5} mnt] : ${m.penutupUmpanBalikInfoDoa?.kegiatan}`);
    lines.push('');
  });
  lines.push('5. ASESMEN PEMBELAJARAN');
  lines.push(`Asesmen awal (diagnostik) : ${doc.asesmenPembelajaran?.asesmenAwal?.teknikInstrumen} (${doc.asesmenPembelajaran?.asesmenAwal?.waktuPelaksanaan})`);
  lines.push(`Asesmen proses (formatif) : ${doc.asesmenPembelajaran?.asesmenProses?.teknikInstrumen} (${doc.asesmenPembelajaran?.asesmenProses?.waktuPelaksanaan})`);
  lines.push(`Asesmen akhir (sumatif)   : ${doc.asesmenPembelajaran?.asesmenAkhir?.teknikInstrumen} (${doc.asesmenPembelajaran?.asesmenAkhir?.waktuPelaksanaan})`);
  lines.push('');
  lines.push('Rubrik Penilaian:');
  (doc.asesmenPembelajaran?.rubrikPenilaian || []).forEach((r) => {
    lines.push(`* Indikator: ${r.kriteria}`);
    lines.push(`  - Sangat Baik (4) : ${r.sangatBaik4}`);
    lines.push(`  - Baik (3)        : ${r.baik3}`);
    lines.push(`  - Cukup (2)       : ${r.cukup2}`);
    lines.push(`  - Perlu Bimb. (1) : ${r.perluBimbingan1}`);
  });
  lines.push('');
  lines.push('6. LAMPIRAN');
  lines.push(`[LKPD] ${doc.lampiran?.lkpd?.judul}`);
  lines.push(`Tujuan: ${doc.lampiran?.lkpd?.tujuan}`);
  lines.push(`Stimulus: ${doc.lampiran?.lkpd?.stimulusRingkas}`);
  lines.push('Langkah Kerja:');
  (doc.lampiran?.lkpd?.langkahAktivitas || []).forEach((l, i) => lines.push(`  ${i + 1}. ${l}`));
  lines.push('Soal & Tugas:');
  (doc.lampiran?.lkpd?.soalDanTugas || []).forEach((s, i) => lines.push(`  ${i + 1}. ${s}`));
  lines.push('');
  lines.push('[Bahan Bacaan & Media]');
  lines.push(doc.lampiran?.bahanBacaan?.ringkasanMateri || '');
  lines.push('');
  lines.push('[Diferensiasi Pembelajaran]');
  lines.push(`- Konten : ${doc.lampiran?.rencanaDiferensiasi?.konten}`);
  lines.push(`- Proses : ${doc.lampiran?.rencanaDiferensiasi?.proses}`);
  lines.push(`- Produk : ${doc.lampiran?.rencanaDiferensiasi?.produk}`);
  lines.push('');

  lines.push(`Mengetahui, Kepala Sekolah : ${doc.lampiran?.pengesahan?.kepalaSekolahNama} (NIP. ${doc.lampiran?.pengesahan?.kepalaSekolahNIP})`);
  lines.push(`Guru Mata Pelajaran        : ${doc.lampiran?.pengesahan?.guruNama} (NIP. ${doc.lampiran?.pengesahan?.guruNIP})`);

  return lines.join('\n');
}
