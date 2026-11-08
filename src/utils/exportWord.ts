import { RppDocument } from '../types/rpp';

export function exportRppToWord(doc: RppDocument): void {
  const sanitize = (str?: string) => (str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');

  const meetingsHtml = (doc.pengalamanBelajar || [])
    .map(
      (m, idx) => `
    <h3 style="font-size: 13pt; margin-top: 18px; margin-bottom: 6px; color: #1e3a8a;">
      Pertemuan ke-${m.pertemuanKe || idx + 1} (${m.durasiJP || '2 JP'}) ${m.fokusTopik ? `- ${sanitize(m.fokusTopik)}` : ''}
    </h3>
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 16px; border: 1px solid #333333; font-size: 10.5pt;">
      <tr style="background-color: #f1f5f9; font-weight: bold;">
        <th style="width: 25%; text-align: left; padding: 8px;">Tahap</th>
        <th style="width: 60%; text-align: left; padding: 8px;">Kegiatan Pembelajaran</th>
        <th style="width: 15%; text-align: center; padding: 8px;">Waktu</th>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #fafafa;">Awal: salam, doa, presensi</td>
        <td>${sanitize(m.awalSalamDoaPresensi?.kegiatan)}</td>
        <td style="text-align: center;">${m.awalSalamDoaPresensi?.waktuMenit || 5} menit</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #fafafa;">Awal: apersepsi dan pertanyaan pemantik</td>
        <td>
          ${sanitize(m.awalApersepsiPertanyaanPemantik?.kegiatan)}
          ${m.awalApersepsiPertanyaanPemantik?.pertanyaanPemantik?.length ? `
            <div style="margin-top: 4px; font-style: italic;">
              <strong>Pertanyaan Pemantik:</strong>
              <ul>
                ${m.awalApersepsiPertanyaanPemantik.pertanyaanPemantik.map(p => `<li>${sanitize(p)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </td>
        <td style="text-align: center;">${m.awalApersepsiPertanyaanPemantik?.waktuMenit || 10} menit</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #fafafa;">Awal: penyampaian tujuan dan ice breaking</td>
        <td>
          ${sanitize(m.awalPenyampaianTujuanIceBreaking?.kegiatan)}
          ${m.awalPenyampaianTujuanIceBreaking?.iceBreaking ? `<br/><em>Ice Breaking:</em> ${sanitize(m.awalPenyampaianTujuanIceBreaking.iceBreaking)}` : ''}
        </td>
        <td style="text-align: center;">${m.awalPenyampaianTujuanIceBreaking?.waktuMenit || 10} menit</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #eff6ff;">Inti: memahami</td>
        <td>${sanitize(m.intiMemahami?.kegiatan)}</td>
        <td style="text-align: center;">${m.intiMemahami?.waktuMenit || 25} menit</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #eff6ff;">Inti: mengaplikasi</td>
        <td>${sanitize(m.intiMengaplikasi?.kegiatan)}</td>
        <td style="text-align: center;">${m.intiMengaplikasi?.waktuMenit || 35} menit</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #eff6ff;">Inti: merefleksi</td>
        <td>${sanitize(m.intiMerefleksi?.kegiatan)}</td>
        <td style="text-align: center;">${m.intiMerefleksi?.waktuMenit || 15} menit</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #fafafa;">Penutup: kesimpulan dan refleksi</td>
        <td>${sanitize(m.penutupKesimpulanRefleksi?.kegiatan)}</td>
        <td style="text-align: center;">${m.penutupKesimpulanRefleksi?.waktuMenit || 10} menit</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #fafafa;">Penutup: umpan balik, info berikutnya, doa</td>
        <td>${sanitize(m.penutupUmpanBalikInfoDoa?.kegiatan)}</td>
        <td style="text-align: center;">${m.penutupUmpanBalikInfoDoa?.waktuMenit || 5} menit</td>
      </tr>
    </table>
  `
    )
    .join('');

  const rubrikRows = (doc.asesmenPembelajaran?.rubrikPenilaian || [])
    .map(
      (r) => `
    <tr>
      <td style="font-weight: bold; vertical-align: top; padding: 6px;">${sanitize(r.kriteria)}</td>
      <td style="vertical-align: top; padding: 6px;">${sanitize(r.sangatBaik4)}</td>
      <td style="vertical-align: top; padding: 6px;">${sanitize(r.baik3)}</td>
      <td style="vertical-align: top; padding: 6px;">${sanitize(r.cukup2)}</td>
      <td style="vertical-align: top; padding: 6px;">${sanitize(r.perluBimbingan1)}</td>
    </tr>
  `
    )
    .join('');

  const profilList = (doc.identifikasi?.dimensiProfilLulusan || [])
    .map(
      (p) =>
        `<li>[${p.selected ? '✓' : ' '}] <strong>${sanitize(p.name)}</strong>: ${sanitize(p.keterangan || '')}</li>`
    )
    .join('');

  const htmlContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${sanitize(doc.identitas.topikPembelajaran || 'RPP Kurikulum Merdeka')}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      line-height: 1.35;
      color: #111111;
      margin: 20mm;
    }
    h1 { font-size: 15pt; text-align: center; margin-bottom: 2px; text-transform: uppercase; font-weight: bold; }
    h2 { font-size: 13pt; text-align: center; margin-top: 0; margin-bottom: 12px; font-weight: normal; }
    h3 { font-size: 12pt; margin-top: 14px; margin-bottom: 6px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10.5pt; }
    th, td { border: 1px solid #333333; padding: 6px 8px; vertical-align: top; }
    th { background-color: #f1f5f9; }
    .table-label { width: 28%; font-weight: bold; background-color: #f8fafc; }
    ul, ol { margin-top: 4px; margin-bottom: 4px; padding-left: 20px; }
    li { margin-bottom: 3px; }
  </style>
</head>
<body>
  <h1>RENCANA PEMBELAJARAN MENDALAM</h1>
  <h2>(KURIKULUM MERDEKA)</h2>
  <hr style="border: 0; border-top: 2px solid #000; margin-bottom: 16px;"/>

  <h3>1. Identitas</h3>
  <table>
    <tr>
      <td class="table-label">Nama Satuan Pendidikan</td>
      <td>${sanitize(doc.identitas.namaSatuanPendidikan)}</td>
    </tr>
    <tr>
      <td class="table-label">Nama Guru</td>
      <td>${sanitize(doc.identitas.namaGuru)} ${doc.identitas.nipGuru ? `(NIP. ${sanitize(doc.identitas.nipGuru)})` : ''}</td>
    </tr>
    <tr>
      <td class="table-label">Mata Pelajaran</td>
      <td>${sanitize(doc.identitas.mataPelajaran)}</td>
    </tr>
    <tr>
      <td class="table-label">Fase / Kelas / Semester</td>
      <td>${sanitize(doc.identitas.faseKelasSemester)}</td>
    </tr>
    <tr>
      <td class="table-label">Topik Pembelajaran</td>
      <td><strong>${sanitize(doc.identitas.topikPembelajaran)}</strong></td>
    </tr>
    <tr>
      <td class="table-label">Alokasi Waktu</td>
      <td>${sanitize(doc.identitas.alokasiWaktu)}</td>
    </tr>
    <tr>
      <td class="table-label">Tahun Pelajaran</td>
      <td>${sanitize(doc.identitas.tahunPelajaran)}</td>
    </tr>
  </table>

  <h3>2. Identifikasi</h3>
  <table>
    <tr>
      <td class="table-label">Kesiapan Belajar Murid</td>
      <td>
        <strong>Sudah Paham:</strong> ${sanitize(doc.identifikasi?.kesiapanBelajar?.sudahPaham)}<br/>
        <strong>Sedang Berkembang:</strong> ${sanitize(doc.identifikasi?.kesiapanBelajar?.sedangBerkembang)}<br/>
        <strong>Perlu Bantuan:</strong> ${sanitize(doc.identifikasi?.kesiapanBelajar?.perluBantuan)}
      </td>
    </tr>
    <tr>
      <td class="table-label">Minat dan Gaya Belajar</td>
      <td>${sanitize(doc.identifikasi?.minatGayaBelajar)}</td>
    </tr>
    <tr>
      <td class="table-label">Latar Belakang & Kebutuhan Khusus</td>
      <td>${sanitize(doc.identifikasi?.latarBelakangKebutuhanKhusus)}</td>
    </tr>
    <tr>
      <td class="table-label">Jenis Pengetahuan Materi</td>
      <td>${sanitize(doc.identifikasi?.jenisPengetahuanMateri)}</td>
    </tr>
    <tr>
      <td class="table-label">Relevansi Materi dengan Kehidupan Nyata</td>
      <td>${sanitize(doc.identifikasi?.relevansiKehidupanNyata)}</td>
    </tr>
    <tr>
      <td class="table-label">Dimensi Profil Lulusan yang Ditargetkan</td>
      <td>
        <ul style="margin: 0; padding-left: 18px;">
          ${profilList}
        </ul>
      </td>
    </tr>
  </table>

  <h3>3. Desain Pembelajaran</h3>
  <table>
    <tr>
      <td class="table-label">Capaian Pembelajaran (CP)</td>
      <td>${sanitize(doc.desainPembelajaran?.capaianPembelajaran)}</td>
    </tr>
    <tr>
      <td class="table-label">Lintas Disiplin Ilmu</td>
      <td>${sanitize(doc.desainPembelajaran?.lintasDisiplinIlmu)}</td>
    </tr>
    <tr>
      <td class="table-label">Tujuan Pembelajaran (TP)</td>
      <td>
        <ol style="margin: 0; padding-left: 18px;">
          ${(doc.desainPembelajaran?.tujuanPembelajaran || []).map((tp) => `<li>${sanitize(tp)}</li>`).join('')}
        </ol>
      </td>
    </tr>
    <tr>
      <td class="table-label">Topik Pembelajaran Kontekstual</td>
      <td>${sanitize(doc.desainPembelajaran?.topikPembelajaranKontekstual)}</td>
    </tr>
    <tr>
      <td class="table-label">Praktik Pedagogis</td>
      <td>${sanitize(doc.desainPembelajaran?.praktikPedagogis)}</td>
    </tr>
    <tr>
      <td class="table-label">Kemitraan Pembelajaran</td>
      <td>${sanitize(doc.desainPembelajaran?.kemitraanPembelajaran)}</td>
    </tr>
    <tr>
      <td class="table-label">Lingkungan Pembelajaran</td>
      <td>${sanitize(doc.desainPembelajaran?.lingkunganPembelajaran)}</td>
    </tr>
    <tr>
      <td class="table-label">Pemanfaatan Digital</td>
      <td>${sanitize(doc.desainPembelajaran?.pemanfaatanDigital)}</td>
    </tr>
  </table>

  <h3>4. Pengalaman Belajar</h3>
  ${meetingsHtml}

  <h3>5. Asesmen Pembelajaran</h3>
  <table>
    <tr style="background-color: #f1f5f9; font-weight: bold;">
      <th style="width: 25%;">Jenis Asesmen</th>
      <th style="width: 50%;">Teknik dan Instrumen</th>
      <th style="width: 25%;">Waktu Pelaksanaan</th>
    </tr>
    <tr>
      <td><strong>Asesmen Awal (Diagnostik)</strong></td>
      <td>${sanitize(doc.asesmenPembelajaran?.asesmenAwal?.teknikInstrumen)}</td>
      <td>${sanitize(doc.asesmenPembelajaran?.asesmenAwal?.waktuPelaksanaan)}</td>
    </tr>
    <tr>
      <td><strong>Asesmen Proses (Formatif)</strong></td>
      <td>${sanitize(doc.asesmenPembelajaran?.asesmenProses?.teknikInstrumen)}</td>
      <td>${sanitize(doc.asesmenPembelajaran?.asesmenProses?.waktuPelaksanaan)}</td>
    </tr>
    <tr>
      <td><strong>Asesmen Akhir (Sumatif)</strong></td>
      <td>${sanitize(doc.asesmenPembelajaran?.asesmenAkhir?.teknikInstrumen)}</td>
      <td>${sanitize(doc.asesmenPembelajaran?.asesmenAkhir?.waktuPelaksanaan)}</td>
    </tr>
  </table>

  <h4>Rubrik Penilaian</h4>
  <table>
    <tr style="background-color: #f1f5f9; font-weight: bold;">
      <th style="width: 24%;">Kriteria / Indikator</th>
      <th style="width: 19%;">Sangat Baik (4)</th>
      <th style="width: 19%;">Baik (3)</th>
      <th style="width: 19%;">Cukup (2)</th>
      <th style="width: 19%;">Perlu Bimbingan (1)</th>
    </tr>
    ${rubrikRows}
  </table>

  <h3>6. Lampiran</h3>

  <div style="background-color: #fcfcfc; border: 1px solid #ccc; padding: 12px; margin-bottom: 14px;">
    <h4 style="margin-top: 0; text-decoration: underline;">A. Lembar Kerja Peserta Didik (LKPD): ${sanitize(doc.lampiran?.lkpd?.judul)}</h4>
    <p><strong>Tujuan Aktivitas:</strong> ${sanitize(doc.lampiran?.lkpd?.tujuan)}</p>
    <p><strong>Stimulus / Pengantar:</strong><br/>${sanitize(doc.lampiran?.lkpd?.stimulusRingkas)}</p>
    <p><strong>Petunjuk Pengerjaan:</strong></p>
    <ol>
      ${(doc.lampiran?.lkpd?.petunjukPengerjaan || []).map((p) => `<li>${sanitize(p)}</li>`).join('')}
    </ol>
    <p><strong>Langkah Kerja & Pertanyaan:</strong></p>
    <ol>
      ${(doc.lampiran?.lkpd?.langkahAktivitas || []).map((l) => `<li>${sanitize(l)}</li>`).join('')}
      ${(doc.lampiran?.lkpd?.soalDanTugas || []).map((s) => `<li><strong>Tugas:</strong> ${sanitize(s)}</li>`).join('')}
    </ol>
  </div>

  <div style="background-color: #fcfcfc; border: 1px solid #ccc; padding: 12px; margin-bottom: 14px;">
    <h4 style="margin-top: 0; text-decoration: underline;">B. Bahan Bacaan Guru & Murid</h4>
    <p>${sanitize(doc.lampiran?.bahanBacaan?.ringkasanMateri)}</p>
    ${
      doc.lampiran?.bahanBacaan?.glosarium?.length
        ? `
      <p><strong>Glosarium:</strong></p>
      <ul>
        ${doc.lampiran.bahanBacaan.glosarium.map((g) => `<li><strong>${sanitize(g.istilah)}:</strong> ${sanitize(g.arti)}</li>`).join('')}
      </ul>
    `
        : ''
    }
    <p><strong>Media Ajar yang Digunakan:</strong> ${sanitize(doc.lampiran?.bahanBacaan?.mediaAjar)}</p>
  </div>

  <div style="background-color: #fcfcfc; border: 1px solid #ccc; padding: 12px; margin-bottom: 14px;">
    <h4 style="margin-top: 0; text-decoration: underline;">C. Rencana Pembelajaran Diferensiasi</h4>
    <p><strong>Diferensiasi Konten:</strong> ${sanitize(doc.lampiran?.rencanaDiferensiasi?.konten)}</p>
    <p><strong>Diferensiasi Proses:</strong> ${sanitize(doc.lampiran?.rencanaDiferensiasi?.proses)}</p>
    <p><strong>Diferensiasi Produk:</strong> ${sanitize(doc.lampiran?.rencanaDiferensiasi?.produk)}</p>
  </div>

  <table style="width: 100%; border: none; margin-top: 30px;">
    <tr style="border: none;">
      <td style="width: 50%; border: none; text-align: center; vertical-align: top;">
        Mengetahui,<br/>
        Kepala Sekolah<br/><br/><br/><br/>
        <strong><u>${sanitize(doc.lampiran?.pengesahan?.kepalaSekolahNama || doc.identitas.namaSatuanPendidikan)}</u></strong><br/>
        NIP. ${sanitize(doc.lampiran?.pengesahan?.kepalaSekolahNIP || '-')}
      </td>
      <td style="width: 50%; border: none; text-align: center; vertical-align: top;">
        ${sanitize(doc.lampiran?.pengesahan?.tempatTanggal || 'Indonesia')}<br/>
        Guru Mata Pelajaran<br/><br/><br/><br/>
        <strong><u>${sanitize(doc.lampiran?.pengesahan?.guruNama || doc.identitas.namaGuru)}</u></strong><br/>
        NIP. ${sanitize(doc.lampiran?.pengesahan?.guruNIP || doc.identitas.nipGuru || '-')}
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const filename = `RPP_${(doc.identitas.mataPelajaran || 'ModulAjar').replace(/\s+/g, '_')}_${(doc.identitas.topikPembelajaran || 'Materi').substring(0, 25).replace(/\s+/g, '_')}.doc`;
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
