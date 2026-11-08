import { RppDocument } from '../types/rpp';

export const INITIAL_RPP_DOCUMENT: RppDocument = {
  id: 'rpp-smk-akl-rekonsiliasi-demo',
  createdAt: '2026-11-06T08:00:00.000Z',
  updatedAt: '2026-11-06T08:00:00.000Z',
  materiAsli: 'Rekonsiliasi Bank dan Pencatatan Jurnal Penyesuaian Kas Perusahaan',
  identitas: {
    namaSatuanPendidikan: 'SMK Negeri 1 Indonesia',
    namaGuru: 'Ahmad Fauzi, S.Pd., Gr.',
    nipGuru: '19870315 201201 1 003',
    mataPelajaran: 'Akuntansi Keuangan (Konsentrasi Keahlian AKL)',
    faseKelasSemester: 'Fase F / Kelas XI SMK / Semester Ganjil',
    topikPembelajaran: 'Rekonsiliasi Bank & Penyesuaian Saldo Kas Perusahaan',
    alokasiWaktu: '2 Pertemuan x 3 JP (135 Menit per pertemuan)',
    tahunPelajaran: '2026/2027',
  },
  identifikasi: {
    kesiapanBelajar: {
      sudahPaham: 'Mampu membedakan mutasi debit/kredit pada buku kas perusahaan vs rekening koran bank dan memahami konsep setoran dalam perjalanan (DIT) serta cek beredar (OC) secara mandiri.',
      sedangBerkembang: 'Memahami pencatatan kas masuk dan keluar namun masih memerlukan panduan dalam menentukan posisi penyesuaian biaya administrasi bank dan pendapatan jasa giro.',
      perluBantuan: 'Masih membutuhkan bimbingan intensif dalam mengidentifikasi transaksi penyebab selisih kas dan pemulihan piutang dari cek kosong (NSF check).',
    },
    minatGayaBelajar: 'Visual (40% - menyukai bagan alur rekening koran dan spreadsheet), Auditori (25% - menyukai telaah kasus dan diskusi kelompok), Praktik/Kinestetik (35% - antusias mengerjakan simulasi bukti transaksi kas dan jobsheet komputer akuntansi).',
    latarBelakangKebutuhanKhusus: 'Murid dipersiapkan untuk Praktik Kerja Lapangan (PKL) di divisi keuangan perbankan atau kantor akuntan publik; dibutuhkan penguatan integritas data finansial.',
    jenisPengetahuanMateri: 'Konseptual (penyebab selisih kas bank), Prosedural (langkah penyusunan kertas kerja rekonsiliasi bank metode saldo yang benar), Metakognitif (evaluasi ketelitian dan deteksi potensi fraud).',
    relevansiKehidupanNyata: 'Penyusunan laporan kas bank riil pada entitas bisnis, pengendalian internal kas perusahaan, dan rekonsiliasi mutasi rekening digital (internet banking bisnis).',
    dimensiProfilLulusan: [
      { name: 'Keimanan dan ketakwaan kepada Tuhan YME', selected: true, keterangan: 'Menjunjung tinggi kejujuran dan amanah dalam mengelola serta mencatat keuangan lembaga.' },
      { name: 'Kewargaan', selected: false, keterangan: '' },
      { name: 'Penalaran kritis', selected: true, keterangan: 'Menganalisis perbedaan transaksi antara rekening koran dan pembukuan internal secara logis.' },
      { name: 'Kreativitas', selected: false, keterangan: '' },
      { name: 'Kolaborasi', selected: true, keterangan: 'Bekerja sama dalam tim auditor junior saat memverifikasi bukti transaksi finansial.' },
      { name: 'Kemandirian', selected: true, keterangan: 'Teliti dan bertanggung jawab penuh menyelesaikan kertas kerja rekonsiliasi secara presisi.' },
      { name: 'Kesehatan', selected: false, keterangan: '' },
      { name: 'Komunikasi', selected: true, keterangan: 'Menyampaikan hasil laporan rekonsiliasi bank kepada pimpinan keuangan secara lugas dan profesional.' },
    ],
  },
  desainPembelajaran: {
    capaianPembelajaran: 'Peserta didik mampu mengelola kas bank, menyusun rekonsiliasi bank, mencatat ayat jurnal penyesuaian kas bank, serta menyajikan laporan mutasi kas sesuai Standar Akuntansi Keuangan (SAK) dan SOP industri perbankan.',
    lintasDisiplinIlmu: 'Informatika (Spreadsheet / Microsoft Excel lanjutan formula VLOOKUP & IF), Matematika Bisnis (perhitungan persentase bunga dan jasa giro).',
    tujuanPembelajaran: [
      'Pertemuan 1: Murid dapat mengidentifikasi 5 faktor penyebab perbedaan saldo kas perusahaan dengan saldo rekening koran bank berdasarkan telaah bukti transaksi secara cermat.',
      'Pertemuan 2: Murid dapat menyusun kertas kerja rekonsiliasi bank metode saldo yang benar (True Cash Balance) dan membuat ayat jurnal penyesuaian yang diperlukan secara teliti.',
    ],
    topikPembelajaranKontekstual: 'Studi kasus audit kas PT Mandiri Perkasa yang mengalami selisih saldo rekening koran Bank BCA per 31 Oktober sebesar Rp18.500.000.',
    praktikPedagogis: 'Problem Based Learning (PBL) berorientasi DUDIKA dan simulasi meja kerja staf akuntansi keuangan.',
    kemitraanPembelajaran: 'Bank mitra sekolah / Bank Mini Sekolah dan Kantor Akuntan Publik (KAP) rekanan sebagai penyedia template studi kasus riil.',
    lingkunganPembelajaran: 'Laboratorium Komputer Akuntansi / Meja Kerja Simulasi Akuntansi Keuangan SMK.',
    pemanfaatanDigital: 'Software Spreadsheet (Microsoft Excel), aplikasi Google Sheets kolaboratif, dan modul digital internet banking interface.',
  },
  pengalamanBelajar: [
    {
      pertemuanKe: 1,
      durasiJP: '3 JP (135 Menit)',
      fokusTopik: 'Analisis Faktor Penyebab Selisih Saldo Kas Bank & Rekening Koran',
      awalSalamDoaPresensi: {
        kegiatan: 'Guru membuka kelas dengan salam, berdoa bersama, memeriksa kehadiran murid, dan menegakkan budaya kerja 5R (kebersihan workstation lab akuntansi).',
        waktuMenit: 10,
      },
      awalApersepsiPertanyaanPemantik: {
        kegiatan: 'Guru menayangkan perbandingan screenshot saldo aplikasi mobile banking perusahaan sebesar Rp45.000.000 dengan saldo pada Buku Besar Kas sebesar Rp38.200.000.',
        waktuMenit: 15,
        pertanyaanPemantik: [
          'Mengapa saldo uang perusahaan di rekening bank bisa berbeda dengan saldo yang dicatat oleh bagian pembukuan internal?',
          'Jika ada pelanggan membayar via transfer di akhir bulan tanggal 31 pukul 23.00, pihak manakah yang terlambat mencatat transaksi tersebut?',
        ],
      },
      awalPenyampaianTujuanIceBreaking: {
        kegiatan: 'Menyampaikan tujuan pembelajaran dan ice breaking "Tebak Pos Akun" (kuis reaksi cepat membedakan transaksi penambah vs pengurang saldo bank).',
        waktuMenit: 10,
        iceBreaking: 'Game "Debit atau Kredit": Guru menyebutkan pos transaksi (contoh: Beban Administrasi Bank), murid mengangkat kartu arah yang tepat.',
      },
      intiMemahami: {
        kegiatan: 'Murid menyimak paparan konsep rekonsiliasi bank, membaca modul SAK entitas kas, dan mengidentifikasi dokumen transaksi: rekening koran bank, bukti kas masuk, memo kredit, dan memo debit.',
        waktuMenit: 40,
      },
      intiMengaplikasi: {
        kegiatan: 'Murid dalam kelompok 3 orang (tim auditor staf keuangan) mengerjakan Jobsheet Bagian 1: Melakukan ticking (pemberian tanda silang/centang) membandingkan mutasi Buku Kas PT Sejahtera Abadi vs Rekening Koran Bank BCA bulan berjalan.',
        waktuMenit: 40,
      },
      intiMerefleksi: {
        kegiatan: 'Setiap kelompok memaparkan temuan selisih kas (menemukan 2 setoran dalam perjalanan, 3 cek beredar, dan 1 biaya kliring yang belum dicatat). Bersama guru menarik simpulan klasifikasi selisih.',
        waktuMenit: 15,
      },
      penutupKesimpulanRefleksi: {
        kegiatan: 'Murid menyimpulkan bahwa rekonsiliasi bank merupakan prosedur pengendalian internal vital untuk memastikan tidak ada dana perusahaan yang bocor atau salah catat.',
        waktuMenit: 5,
      },
      penutupUmpanBalikInfoDoa: {
        kegiatan: 'Guru memberikan apresiasi atas ketelitian analisis murid, mengingatkan membawa kalkulator finansial/laptop untuk menyusun kertas kerja pada pertemuan ke-2, doa dan salam penutup.',
        waktuMenit: 5,
      },
    },
    {
      pertemuanKe: 2,
      durasiJP: '3 JP (135 Menit)',
      fokusTopik: 'Penyusunan Kertas Kerja Rekonsiliasi & Jurnal Penyesuaian Kas',
      awalSalamDoaPresensi: {
        kegiatan: 'Guru menyapa murid, berdoa bersama, memeriksa kehadiran, dan mengingatkan etika ketelitian serta kejujuran dalam profesi akuntan.',
        waktuMenit: 10,
      },
      awalApersepsiPertanyaanPemantik: {
        kegiatan: 'Guru mengulas kembali hasil temuan selisih pertemuan 1 dan mengajukan pertanyaan pemantik mengenai perlunya penyesuaian jurnal.',
        waktuMenit: 10,
        pertanyaanPemantik: [
          'Apakah semua selisih yang ditemukan pada rekonsiliasi bank wajib dibuatkan jurnal penyesuaian oleh perusahaan?',
          'Pos transaksi manakah yang HANYA dicatat oleh bank dan tidak perlu dijurnal oleh kasir perusahaan?',
        ],
      },
      awalPenyampaianTujuanIceBreaking: {
        kegiatan: 'Penyampaian tujuan penyusunan format saldo yang benar dan ice breaking game konsentrasi "Neraca Seimbang".',
        waktuMenit: 10,
        iceBreaking: 'Senam Jari Akuntan: Latihan peregangan koordinasi jari tangan untuk kecepatan mengetik angka 10-key numeric keypad.',
      },
      intiMemahami: {
        kegiatan: 'Murid mempelajari format kertas kerja rekonsiliasi bank 2 kolom (True Balance Method) dan logika pembukuan jurnal penyesuaian untuk pos memo debit (biaya bank, cek kosong) dan memo kredit (jasa giro).',
        waktuMenit: 35,
      },
      intiMengaplikasi: {
        kegiatan: 'Murid secara mandiri dan kolaboratif menyelesaikan Jobsheet Praktik Bagian 2: Menyusun Laporan Rekonsiliasi Bank PT Sejahtera Abadi per 31 Oktober hingga kedua saldo kas menghasilkan nilai yang tepat seimbang (balance Rp52.450.000) dan mencatat 4 ayat jurnal penyesuaian.',
        waktuMenit: 45,
      },
      intiMerefleksi: {
        kegiatan: 'Peer-review: Murid bertukar lembar kerja untuk saling memverifikasi akurasi saldo akhir dan kesesuaian akun jurnal penyesuaian sesuai kode akun (Chart of Accounts).',
        waktuMenit: 15,
      },
      penutupKesimpulanRefleksi: {
        kegiatan: 'Murid membuat refleksi tertulis: "Satu hal penting yang harus diperhatikan kasir perusahaan saat menerima rekening koran bank setiap awal bulan".',
        waktuMenit: 5,
      },
      penutupUmpanBalikInfoDoa: {
        kegiatan: 'Guru memberikan apresiasi kepada murid dengan hasil rekonsiliasi 100% balance dan akurat, menyampaikan materi pekan depan tentang Pengelolaan Dana Kas Kecil, doa dan salam penutup.',
        waktuMenit: 5,
      },
    },
  ],
  asesmenPembelajaran: {
    asesmenAwal: {
      jenis: 'Diagnostik Kognitif (Prasyarat)',
      teknikInstrumen: 'Tes tertulis 5 butir soal singkat mengenai mutasi debit/kredit akun kas dan buku besar pembantu bank.',
      waktuPelaksanaan: 'Awal pertemuan ke-1 (10 menit)',
    },
    asesmenProses: {
      jenis: 'Formatif (Unjuk Kerja & Jobsheet)',
      teknikInstrumen: 'Lembar observasi ketelitian pencocokan data rekening koran, keaktifan diskusi, dan kebenaran formula spreadsheet.',
      waktuPelaksanaan: 'Selama kegiatan inti pertemuan 1 dan 2',
    },
    asesmenAkhir: {
      jenis: 'Sumatif (Praktik Kinerja / Portofolio)',
      teknikInstrumen: 'Rubrik penilaian kertas kerja laporan rekonsiliasi bank lengkap dan ketepatan posting ayat jurnal penyesuaian.',
      waktuPelaksanaan: 'Akhir pertemuan ke-2',
    },
    rubrikPenilaian: [
      {
        kriteria: 'Keterampilan Mengidentifikasi & Mengklasifikasi Selisih Kas',
        sangatBaik4: 'Mampu menemukan seluruh pos penyebab selisih kas (DIT, OC, NSF, Biaya Bank, Jasa Giro, Koreksi) tanpa ada yang terlewat serta mengklasifikasikan posisinya dengan sempurna.',
        baik3: 'Mampu menemukan sebagian besar pos selisih kas dengan benar, hanya terdapat 1 kekeliruan kecil pada analisis transaksi.',
        cukup2: 'Dapat mengidentifikasi selisih umum (setoran dalam perjalanan & cek beredar) namun masih keliru pada penanganan cek kosong dan koreksi pencatatan.',
        perluBimbingan1: 'Belum mampu membandingkan rekening koran dengan buku kas secara mandiri dan membutuhkan panduan langkah demi langkah.',
      },
      {
        kriteria: 'Ketepatan Penyusunan Kertas Kerja Rekonsiliasi Bank',
        sangatBaik4: 'Laporan rekonsiliasi tersusun rapi, sistematis, saldo akhir kedua belah pihak 100% seimbang (balance) sesuai format standar akuntansi industri.',
        baik3: 'Laporan rekonsiliasi seimbang namun terdapat kesalahan minor dalam penulisan nama pos akun atau format rupiah.',
        cukup2: 'Format rekonsiliasi sudah benar namun saldo akhir belum seimbang karena kesalahan perhitungan aritmetika.',
        perluBimbingan1: 'Belum mampu menyusun kertas kerja rekonsiliasi bank sesuai format baku.',
      },
      {
        kriteria: 'Ketepatan Pembuatan Ayat Jurnal Penyesuaian',
        sangatBaik4: 'Seluruh ayat jurnal penyesuaian untuk pos memo debit dan kredit dibuat dengan akun debit/kredit dan nominal rupiah yang tepat 100%.',
        baik3: 'Jurnal penyesuaian dibuat dengan benar, hanya terdapat 1 kesalahan pada akun lawan.',
        cukup2: 'Jurnal penyesuaian dibuat namun masih tertukar antara posisi debit dan kredit pada pos pendapatan bunga atau biaya administrasi bank.',
        perluBimbingan1: 'Belum mampu menentukan jurnal penyesuaian yang diperlukan dari laporan rekonsiliasi.',
      },
      {
        kriteria: 'Sikap Kerja Industri (Integritas, Ketelitian, dan K3 Workstation)',
        sangatBaik4: 'Sangat teliti, jujur, menjaga kerapian dokumen kerja (budaya 5R), dan menyelesaikan seluruh tugas tepat sebelum batas waktu yang ditetapkan.',
        baik3: 'Menunjukkan sikap kerja teliti, rapi, dan mampu menyelesaikan tugas tepat waktu.',
        cukup2: 'Cukup teliti namun masih terburu-buru dan perlu diingatkan mengenai kerapian meja kerja lab akuntansi.',
        perluBimbingan1: 'Kurang teliti, banyak kesalahan ceroboh dalam penulisan angka, dan pasif saat praktik.',
      },
    ],
  },
  lampiran: {
    lkpd: {
      judul: 'Jobsheet Praktik Akuntansi Keuangan: Rekonsiliasi Bank PT Sejahtera Abadi',
      tujuan: 'Peserta didik mampu melakukan rekonsiliasi bank dan menyusun jurnal penyesuaian saldo kas bank berdasarkan studi kasus transaksi riil.',
      petunjukPengerjaan: [
        'Bacalah data rekening koran Bank BCA dan Buku Kas PT Sejahtera Abadi periode 31 Oktober 2026 secara cermat.',
        'Lakukan ticking / centang pada transaksi yang jumlah dan posisinya sudah sama antara rekening koran dan pembukuan internal.',
        'Identifikasi seluruh transaksi yang belum dicatat oleh salah satu pihak atau yang mengalami kesalahan pencatatan.',
        'Susunlah Laporan Rekonsiliasi Bank format Saldo yang Benar (True Cash Balance) pada lembar kerja yang tersedia.',
        'Buatlah ayat jurnal penyesuaian yang diperlukan pada buku jurnal umum perusahaan.',
      ],
      stimulusRingkas: 'Pada tanggal 31 Oktober 2026, saldo kas PT Sejahtera Abadi menurut catatan Buku Besar menunjukkan jumlah Rp42.800.000. Pada tanggal yang sama, laporan Rekening Koran yang diterima dari Bank BCA menunjukkan saldo kredit sebesar Rp56.350.000. Setelah diteliti oleh staf akuntansi, ditemukan setoran tanggal 31 Oktober Rp9.500.000 belum tampak di rekening koran, cek nomor 104 senilai Rp6.200.000 belum dicairkan pemegang cek, bank mendebit biaya administrasi Rp150.000, serta bank mengkredit pendapatan jasa giro Rp800.000.',
      langkahAktivitas: [
        'Langkah 1: Periksa setiap item penerimaan dan pengeluaran kas pada Buku Kas Bank dan cocokkan dengan kolom debit/kredit Rekening Koran.',
        'Langkah 2: Kelompokkan pos penambah dan pengurang bagi saldo menurut catatan kas perusahaan.',
        'Langkah 3: Kelompokkan pos penambah dan pengurang bagi saldo menurut laporan rekening koran bank.',
        'Langkah 4: Hitung saldo kas yang disesuaikan (adjusted balance) hingga kedua sisi menghasilkan nilai yang sama persis.',
        'Langkah 5: Catat ayat jurnal penyesuaian untuk pos-pos yang mempengaruhi pembukuan kas perusahaan.',
      ],
      soalDanTugas: [
        'Hitunglah berapa saldo kas yang benar (True Balance) per 31 Oktober 2026 setelah dilakukan rekonsiliasi bank!',
        'Buatlah ayat jurnal penyesuaian untuk mencatat pendapatan jasa giro bank sebesar Rp800.000 dan beban administrasi bank sebesar Rp150.000!',
        'Jika perusahaan menerima cek dari debitur sebesar Rp4.000.000 yang ternyata ditolak oleh bank karena tidak memiliki dana yang cukup (NSF check), bagaimanakah ayat jurnal penyesuaian yang harus dicatat oleh staf akuntansi?',
      ],
    },
    bahanBacaan: {
      ringkasanMateri: `Rekonsiliasi bank adalah instrumen pengawasan kas yang krusial bagi setiap entitas bisnis dan lembaga. 
Perbedaan antara saldo buku kas perusahaan dengan saldo rekening koran timbul karena faktor perbedaan waktu pencatatan (timing differences) dan kesalahan pencatatan (errors).
Pos penyesuaian saldo bank:
1. Menambah saldo bank: Setoran dalam perjalanan (Deposit in Transit) dan setoran tunai malam hari.
2. Mengurangi saldo bank: Cek yang masih beredar (Outstanding Checks).
Pos penyesuaian saldo perusahaan:
1. Menambah saldo perusahaan: Penagihan piutang via bank (Notes Receivable collected), pendapatan jasa giro/bunga bank.
2. Mengurangi saldo perusahaan: Beban administrasi bank, cek kosong (NSF checks), biaya cetak buku cek/bilyet giro.
Hanya transaksi pada sisi saldo perusahaan yang memerlukan pembuatan ayat jurnal penyesuaian (adjusting journal entries) untuk memperbarui saldo buku besar sebelum laporan keuangan diterbitkan.`,
      glosarium: [
        { istilah: 'Deposit in Transit', arti: 'Setoran kas yang telah dicatat perusahaan pada akhir periode tetapi belum dibukukan oleh pihak bank.' },
        { istilah: 'Outstanding Check', arti: 'Cek yang telah dikeluarkan oleh perusahaan namun belum diserahkan atau dicairkan oleh penerima cek ke bank.' },
        { istilah: 'NSF Check (Not Sufficient Fund)', arti: 'Cek kosong yang ditolak oleh bank pembayar karena saldo rekening penerbit cek tidak mencukupi.' },
        { istilah: 'Bank Service Charge', arti: 'Biaya administrasi yang dibebankan bank kepada nasabah atas layanan pemeliharaan rekening dan kliring.' },
        { istilah: 'Adjusting Journal Entry', arti: 'Ayat jurnal yang dibuat pada akhir periode akuntansi untuk memutakhirkan saldo akun kas agar mencerminkan saldo yang sesungguhnya.' },
      ],
      mediaAjar: 'Spesimen Rekening Koran Bank BCA, Lembar Bukti Kas Masuk/Keluar, Komputer Lab dengan Microsoft Excel, LCD Proyektor, dan Kalkulator Finansial.',
    },
    instrumenRefleksi: {
      refleksiMurid: [
        'Apakah saya sudah memahami sepenuhnya mengapa transaksi setoran dalam perjalanan (DIT) tidak perlu dibuatkan jurnal penyesuaian di pembukuan perusahaan?',
        'Langkah mana yang paling menantang dalam menganalisis selisih rekening koran hari ini?',
        'Bagaimana nilai ketelitian dan kejujuran dalam materi ini membentuk kesiapan saya untuk bekerja di dunia industri akuntansi?',
      ],
      refleksiGuru: [
        'Apakah simulasi studi kasus transaksi rekening koran riil mampu membangkitkan rasa ingin tahu dan nalar kritis murid?',
        'Bagaimana efektivitas kolaborasi antarmurid saat saling memeriksa kertas kerja rekonsiliasi pada sesi peer-review?',
        'Penyesuaian apa yang perlu disiapkan untuk mendukung murid yang masih kesulitan memahami konsep cek kosong (NSF)?',
      ],
    },
    rencanaDiferensiasi: {
      konten: 'Menyediakan data transaksi dalam dua format: lembar cetak fisik dengan bukti transaksi riil (faktur, slip setoran) dan file digital spreadsheet untuk murid yang lebih cepat belajar.',
      proses: 'Kelompok yang membutuhkan bimbingan diberikan panduan scaffolding bertahap dengan kode warna selisih, sedangkan kelompok mahir diberikan tantangan transaksi koreksi kesalahan pencatatan angka terbalik (transposition error).',
      produk: 'Murid dapat memilih mengumpulkan tugas dalam bentuk kertas kerja manual folio berkolom atau file spreadsheet (.xlsx) lengkap dengan formula otomatis.',
    },
    pengesahan: {
      tempatTanggal: 'Surabaya, 6 November 2026',
      kepalaSekolahNama: 'Drs. H. Bambang Sudarmono, M.M.',
      kepalaSekolahNIP: '19720412 199802 1 001',
      guruNama: 'Ahmad Fauzi, S.Pd., Gr.',
      guruNIP: '19870315 201201 1 003',
    },
  },
};
