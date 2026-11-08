export interface PresetMateri {
  id: string;
  judul: string;
  jenjang: 'SMK';
  fase: 'Fase E' | 'Fase F';
  kelas: 'Kelas X' | 'Kelas XI' | 'Kelas XII';
  kategori: 'DASAR_X' | 'PRODUKTIF_XI_XII' | 'UMUM_XI_XII';
  elemen: string;
  mapel: string;
  alokasi: string;
  pedagogi: string;
  materi: string;
  deskripsi: string;
}

export const PRESET_MATERI: PresetMateri[] = [
  // =========================================================================
  // 1. KELAS X (FASE E) - DASAR-DASAR PROGRAM KEAHLIAN AKUNTANSI & KEUANGAN LEMBAGA
  // =========================================================================
  {
    id: 'akl-x-etika-k3lh',
    judul: 'Dasar AKL (Kelas X): Etika Profesi Akuntan & Budaya Kerja K3LH 5R',
    jenjang: 'SMK',
    fase: 'Fase E',
    kelas: 'Kelas X',
    kategori: 'DASAR_X',
    elemen: 'Etika Profesi & K3LH',
    mapel: 'Dasar-dasar Program Keahlian Akuntansi dan Keuangan Lembaga',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Problem Based Learning (PBL) & Simulasi Sikap Kerja Industri',
    deskripsi: 'Prinsip etika profesi Ikatan Akuntan Indonesia (IAI), integritas, kerahasiaan data keuangan, serta penerapan K3LH dan budaya kerja 5R di kantor akuntan.',
    materi: `Materi Pokok: Prinsip Etika Profesi Akuntan, Kerahasiaan Data Finansial, dan Penerapan K3LH serta Budaya Kerja 5R di Tempat Kerja

1. Prinsip Dasar Etika Profesi Teknisi Akuntansi (Standar IAI & IFAC):
- Integritas: Bersikap lugas, jujur, dan berani menolak segala bentuk manipulasi angka atau penipuan laporan (fraud).
- Objektivitas: Tidak membiarkan benturan kepentingan, bias, atau pengaruh pihak lain mengompromikan pertimbangan profesional akuntan.
- Kompetensi dan Kehati-hatian Profesional: Menjaga pengetahuan dan keterampilan akuntansi mutakhir serta bertindak cermat sesuai standar teknis SAK.
- Kerahasiaan (Confidentiality): Menjaga kerahasiaan informasi keuangan nasabah/perusahaan dan tidak menggunakannya untuk keuntungan pribadi.
- Perilaku Profesional: Menjunjung tinggi reputasi profesi dan mematuhi seluruh peraturan perundang-undangan perpajakan dan keuangan.

2. Keselamatan, Kesehatan Kerja, dan Lingkungan Hidup (K3LH) di Lingkungan Kantor:
- Bahaya ergonomi kerja akuntan: Pencegahan repetitive strain injury (RSI), posisi duduk ergonomis dengan kursi berpenopang lumbal, dan penyesuaian sudut pandang monitor 20 derajat untuk menjaga kesehatan mata.
- Bahaya kelistrikan workstation lab akuntansi: Jalur kabel tertata rapi dalam cable duct, pembumian (grounding) yang aman, dan ketersediaan APAR jenis CO2.
- Prosedur tanggap darurat bencana dan jalur evakuasi di gedung perkantoran.

3. Penerapan Budaya Kerja 5R (Ringkas, Rapi, Resik, Rawat, Rajin):
- Ringkas: Memisahkan dokumen transaksi yang aktif digunakan dari arsip kadaluarsa.
- Rapi: Mengindeks ordner dan berkas faktur/kuitansi dengan label kode akun baku agar mudah ditemukan dalam hitungan detik.
- Resik: Membersihkan meja kerja, keyboard, dan perangkat komputer setiap awal dan akhir jam kerja.
- Rawat: Memastikan perangkat lunak akuntansi dan hardware selalu terkalibrasi dan di-update.
- Rajin: Membiasakan disiplin waktu kerja dan kepatuhan terhadap Standar Operasional Prosedur (SOP).

4. Simulasi Studi Kasus:
Siswa menelaah dilema etika seorang staf junior yang ditekan oleh atasan untuk mengubah tanggal transaksi bukti kas keluar, kemudian merumuskan tindakan etis sesuai kode etik akuntan.`,
  },
  {
    id: 'akl-x-spreadsheet',
    judul: 'Dasar AKL (Kelas X): Aplikasi Spreadsheet & Formula Akuntansi Finansial',
    jenjang: 'SMK',
    fase: 'Fase E',
    kelas: 'Kelas X',
    kategori: 'DASAR_X',
    elemen: 'Aplikasi Spreadsheet / Pengolah Angka',
    mapel: 'Dasar-dasar Program Keahlian Akuntansi dan Keuangan Lembaga',
    alokasi: '2 Pertemuan x 4 JP (180 Menit)',
    pedagogi: 'Hands-on Lab Practice & Project Based Learning',
    deskripsi: 'Menguasai formula spreadsheet akuntansi (SUM, SUMIF, VLOOKUP, HLOOKUP, IF bertingkat), format accounting, validasi data, dan penyusunan kertas kerja neraca lajur digital.',
    materi: `Materi Pokok: Pengoperasian Aplikasi Spreadsheet (Pengolah Angka) untuk Pembuatan Template Akuntansi dan Siklus Kertas Kerja Digital

1. Antarmuka dan Manajemen Data Finansial Spreadsheet:
- Pengaturan format sel akuntansi: Number, Currency, Accounting (simbol Rp, desimal 0, format minus dalam kurung).
- Penguncian referensi sel: Sel relatif vs sel absolut ($A$1) untuk formula pembagian dan perkalian bertingkat.
- Data Validation: Membuat drop-down list untuk pemilihan Kode Akun (Chart of Accounts) guna menghindari kesalahan pengetikan nama akun.

2. Fungsi dan Formula Finansial Kunci dalam Akuntansi:
- Fungsi Aritmetika & Statistik: SUM, AVERAGE, ROUNDDOWN, MAX, MIN.
- Fungsi Logika Bersyarat: IF tunggal dan IF bercabang (Nested IF) untuk penentuan status debit/kredit dan kelayakan saldo normal.
- Fungsi Akumulasi Bersyarat: SUMIF dan SUMIFS untuk memposting mutasi jurnal umum ke neraca saldo secara otomatis berdasarkan kode akun.
- Fungsi Pembacaan Tabel: VLOOKUP dan HLOOKUP untuk memanggil nama akun dan jenis saldo normal dari tabel referensi bagan akun.

3. Pembuatan Format Lembar Kerja Akuntansi Otomatis:
- Format Jurnal Umum 5 Kolom: Tanggal, Nomor Bukti, Nama Akun, Ref, Debit, Kredit.
- Validasi Keseimbangan (Balance Check): Formula '=IF(SUM(Debit)=SUM(Kredit), "BALANCE", "SELISIH")' dengan conditional formatting warna hijau/merah.
- Penyusunan Neraca Lajur (Worksheet) 10 Kolom: Neraca Saldo, Penyesuaian, Neraca Saldo Disesuaikan, Laba Rugi, dan Neraca Akhir.

4. Praktik Mandiri Siswa (Jobsheet Lab):
Siswa menginput 15 transaksi operasional usaha jasa ke template spreadsheet terformula, memastikan fungsi VLOOKUP dan SUMIF bekerja otomatis, serta memverifikasi bahwa laporan laba rugi dan neraca menghasilkan angka seimbang.`,
  },
  {
    id: 'akl-x-dasar-perbankan',
    judul: 'Dasar AKL (Kelas X): Sistem Perbankan, Lembaga Keuangan, & Proses Bisnis Akuntansi',
    jenjang: 'SMK',
    fase: 'Fase E',
    kelas: 'Kelas X',
    kategori: 'DASAR_X',
    elemen: 'Dasar Perbankan & Proses Bisnis',
    mapel: 'Dasar-dasar Program Keahlian Akuntansi dan Keuangan Lembaga',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Inquiry Learning & Simulasi Transaksi Teller/Customer Service',
    deskripsi: 'Pengenalan fungsi bank sentral, bank umum, BPR, lembaga keuangan non-bank, produk simpanan/kredit, kliring, dan alur proses bisnis akuntansi di era digital.',
    materi: `Materi Pokok: Sistem Lembaga Keuangan Perbankan, Produk Simpanan/Pinjaman, dan Alur Dokumen Transaksi Bisnis

1. Struktur Sistem Keuangan Indonesia:
- Otoritas Pengatur: Bank Indonesia (stabilitas moneter), Otoritas Jasa Keuangan (OJK - pengawasan prudensial), dan Lembaga Penjamin Simpanan (LPS - penjamin simpanan nasabah hingga 2 miliar rupiah).
- Jenis Lembaga Perbankan: Bank Umum Konvensional, Bank Umum Syariah, dan Bank Perekonomian Rakyat (BPR).
- Lembaga Keuangan Non-Bank: Lembaga pembiayaan (leasing), asuransi, dana pensiun, pegadaian, dan koperasi simpan pinjam (KSP).

2. Produk dan Layanan Transaksi Perbankan:
- Simpanan Dana Pihak Ketiga (DPK): Tabungan (saving deposit), Giro (demand deposit - penarikan via cek/bilyet giro), dan Deposito Berjangka (time deposit).
- Penyaluran Kredit: Kredit modal kerja, kredit investasi, dan kredit konsumtif.
- Jasa Lalu Lintas Pembayaran: BI-FAST, kliring elektronik (SKNBI), Real Time Gross Settlement (RTGS), transfer valuta asing, dan payment gateway digital (QRIS).

3. Alur Dokumen Transaksi Bisnis (Proses Bisnis Akuntansi):
- Alur Pembelian: Surat Permintaan Barang -> Surat Pesanan (PO) -> Surat Jalan Penerimaan Barang -> Faktur Pembelian -> Bukti Kas Keluar.
- Alur Penjualan: Purchase Order Pelanggan -> Surat Jalan Pengiriman -> Faktur Penjualan -> Kuitansi / Bukti Kas Masuk.
- Verifikasi Keabsahan Dokumen: Tanda tangan otorisasi pejabat berwenang, cap basah/digital signature, kesesuaian tanggal transaksi, dan bukti transfer perbankan.

4. Praktik Kerja Siswa:
Simulasi pengisian warkat perbankan (slip setoran tunai, slip penarikan giro, formulir pembukaan rekening tabungan) serta verifikasi kelengkapan bukti transaksi sebelum dicatat ke buku jurnal kas.`,
  },

  // =========================================================================
  // 2. KELAS XI & XII (FASE F) - KELOMPOK KEJURUAN PRODUKTIF (TEKNISI AKUNTANSI JUNIOR)
  // =========================================================================
  {
    id: 'akl-f-jasa-dagang-manufaktur',
    judul: '1. Akuntansi Perusahaan Jasa, Dagang & Manufaktur: Siklus Manual & Penyesuaian',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    kategori: 'PRODUKTIF_XI_XII',
    elemen: 'Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
    mapel: 'Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
    alokasi: '2 Pertemuan x 4 JP (180 Menit)',
    pedagogi: 'Problem Based Learning (PBL) & Siklus Akuntansi Manual',
    deskripsi: 'Siklus akuntansi manual lengkap dari bukti transaksi, jurnal khusus, buku besar pembantu, neraca saldo, jurnal penyesuaian, hingga laporan laba rugi dan neraca.',
    materi: `Materi Pokok: Siklus Akuntansi Manual Lengkap Perusahaan Dagang & Manufaktur Sesuai Standar Akuntansi Keuangan (SAK)

1. Karakteristik Akuntansi Perusahaan Dagang & Manufaktur:
- Perusahaan Dagang: Membeli barang jadi dan menjualnya kembali tanpa mengubah bentuk fisik. Menggunakan Jurnal Khusus (Jurnal Penjualan, Pembelian, Penerimaan Kas, Pengeluaran Kas, dan Jurnal Umum).
- Perusahaan Manufaktur: Mengolah bahan baku menjadi produk jadi melalui aliran 3 elemen biaya produksi: Biaya Bahan Baku (BBB), Biaya Tenaga Kerja Langsung (BTKL), dan Biaya Overhead Pabrik (BOP).

2. Sistem Pencatatan dan Penilaian Persediaan Barang Dagang:
- Sistem Fisik / Periodik: Nilai persediaan akhir dihitung melalui stock opname fisik pada akhir periode.
- Sistem Perpetual: Setiap mutasi masuk/keluar barang langsung dicatat pada Kartu Persediaan dan akun Persediaan Barang Dagang serta Harga Pokok Penjualan (HPP).
- Metode Penilaian Arus Biaya: Metode FIFO (First In First Out) dan Metode Rata-Rata Tertimbang (Weighted Average).

3. Penyusunan Jurnal Penyesuaian Akhir Periode (Adjusting Journal Entries):
- Pembebanan perlengkapan kantor yang terpakai.
- Penyusutan aset tetap (garis lurus / saldo menurun).
- Beban yang masih harus dibayar (accrued expenses) dan pendapatan yang masih harus diterima.
- Penyesuaian persediaan barang dagang (pendekatan Ikhtisar Laba Rugi atau pendekatan HPP).
- Alokasi biaya overhead pabrik sesungguhnya ke barang dalam proses (BDP).

4. Pelaporan Keuangan SAK Entitas Privat:
- Laporan Laba Rugi dan Penghasilan Komprehensif Lain (Single step / Multiple step).
- Laporan Perubahan Ekuitas.
- Laporan Posisi Keuangan (Neraca) terklasifikasi aset lancar, aset tetap, liabilitas jangka pendek, liabilitas jangka panjang, dan ekuitas.

5. Praktik Jobsheet Teknisi Akuntansi:
Siswa menganalisis set 20 bukti transaksi UD Berkah Jaya bulan Desember, memposting ke buku besar utama dan buku besar pembantu (piutang & utang), menyusun neraca lajur 10 kolom, serta menutup buku besar dengan jurnal penutup.`,
  },
  {
    id: 'akl-f-akuntansi-keuangan-kas',
    judul: '2. Akuntansi Keuangan: Rekonsiliasi Bank & Prosedur Pengelolaan Saldo Kas',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    kategori: 'PRODUKTIF_XI_XII',
    elemen: 'Akuntansi Keuangan',
    mapel: 'Akuntansi Keuangan',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Problem Based Learning & Kasus Audit Kas Perusahaan',
    deskripsi: 'Analisis penyebab perbedaan saldo kas perusahaan vs rekening koran bank, penyusunan rekonsiliasi format saldo yang benar, dan pembuatan jurnal penyesuaian kas.',
    materi: `Materi Pokok: Prosedur Pengendalian Internal Kas, Rekonsiliasi Bank, dan Jurnal Penyesuaian Kas Bank

1. Konsep Dasar Pengendalian Kas dan Rekonsiliasi Bank:
Rekonsiliasi bank adalah proses analisis sistematis terhadap perbedaan antara saldo kas menurut pembukuan perusahaan (Buku Kas Bank) dengan saldo kas menurut rekening koran yang diterbitkan bank rekanan per tanggal tutup buku.

2. Faktor Penyebab Perbedaan Saldo Kas:
a. Transaksi dicatat perusahaan namun belum dibukukan bank:
   - Setoran dalam perjalanan (Deposit in Transit / DIT).
   - Cek yang masih beredar (Outstanding Check / OC).
b. Transaksi dicatat bank namun belum dibukukan perusahaan:
   - Pendapatan bunga / jasa giro bank (Interest Revenue).
   - Biaya administrasi bank (Bank Service Charge).
   - Cek kosong / dana tidak cukup (Not Sufficient Fund / NSF Check) dari debitur.
   - Inkaso piutang wesel yang ditagihkan langsung oleh bank.
c. Kesalahan pencatatan angka (Transposition / Error): baik oleh kasir perusahaan maupun operator bank.

3. Kertas Kerja Rekonsiliasi Bank:
Menggunakan metode Saldo yang Benar (True Cash Balance 2 Kolom) untuk memperoleh saldo kas yang tepat dan siap disajikan dalam Laporan Posisi Keuangan.

4. Pencatatan Jurnal Penyesuaian Kas:
Hanya transaksi pada kolom pembukuan perusahaan yang dibuatkan jurnal penyesuaian:
- Debit: Kas Bank, Kredit: Pendapatan Bunga.
- Debit: Beban Administrasi Bank, Kredit: Kas Bank.
- Debit: Piutang Dagang (pemulihan cek kosong), Kredit: Kas Bank.

5. Praktik Kasus Kerja:
Siswa menganalisis data rekening koran Bank Mandiri PT Sentosa Abadi per 31 Oktober dan buku besar kas, menemukan selisih sebesar Rp14.250.000, menyusun kertas kerja rekonsiliasi hingga balance, dan menjurnal pos-pos penyesuaian.`,
  },
  {
    id: 'akl-f-akuntansi-keuangan-piutang',
    judul: '2. Akuntansi Keuangan: Pengelolaan Kartu Piutang Dagang & Estimasi Kerugian',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    kategori: 'PRODUKTIF_XI_XII',
    elemen: 'Akuntansi Keuangan',
    mapel: 'Akuntansi Keuangan',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Problem Based Learning & Simulasi Kartu Piutang',
    deskripsi: 'Pengelolaan kartu piutang pelanggan, konfirmasi saldo piutang, penaksiran kerugian piutang tak tertagih (metode persentase penjualan & umur piutang), dan penghapusan piutang.',
    materi: `Materi Pokok: Pengelolaan Piutang Dagang, Analisis Umur Piutang (Aging Schedule), dan Penaksiran Kerugian Piutang Tak Tertagih

1. Pengendalian Internal Piutang Usaha:
- Mutasi piutang timbul dari transaksi penjualan kredit (syarat pembayaran 2/10, n/30 atau EOM).
- Buku besar pembantu piutang (Accounts Receivable Subsidiary Ledger) untuk memonitor saldo per debitur.
- Surat konfirmasi saldo piutang (konfirmasi positif vs negatif).

2. Metode Pencatatan Piutang Tak Tertagih:
- Metode Penghapusan Langsung (Direct Write-Off Method): Beban kerugian piutang baru diakui saat debitur benar-benar dinyatakan pailit/tidak mampu bayar.
- Metode Cadangan / Penyisihan (Allowance Method): Kerugian ditaksir dan dicadangkan pada akhir periode berjalan sesuai prinsip matching principle.

3. Penaksiran Cadangan Kerugian Piutang:
- Pendekatan Laba Rugi (Persentase dari total penjualan kredit tahun berjalan).
- Pendekatan Posisi Keuangan / Neraca (Persentase dari saldo piutang akhir atau menggunakan Daftar Umur Piutang / Aging Schedule: belum jatuh tempo 1%, lewat tempo 1-30 hari 3%, 31-60 hari 5%, >90 hari 20%).

4. Akuntansi Penghapusan dan Pemulihan Piutang:
- Jurnal penghapusan piutang: Debit Cadangan Kerugian Piutang, Kredit Piutang Usaha.
- Jurnal penerimaan kembali piutang yang telah dihapuskan pada periode yang sama atau periode berikutnya.

5. Praktik Kerja Lapangan:
Siswa menyusun Daftar Umur Piutang 10 pelanggan PT Mitra Kencana, menghitung taksiran cadangan kerugian piutang, dan membukukan ayat jurnal penyesuaian akhir tahun.`,
  },
  {
    id: 'akl-f-akuntansi-lembaga-desa',
    judul: '3. Akuntansi Lembaga / Instansi Pemerintah: APBDes, BKU, & Penatausahaan SP2D',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XII',
    kategori: 'PRODUKTIF_XI_XII',
    elemen: 'Akuntansi Lembaga / Instansi Pemerintah',
    mapel: 'Praktikum Akuntansi Lembaga/Instansi Pemerintah',
    alokasi: '2 Pertemuan x 4 JP (180 Menit)',
    pedagogi: 'Problem Based Learning & Simulasi Kasus Siskeudes',
    deskripsi: 'Standar Akuntansi Pemerintahan (SAP), struktur APBDes (Pendapatan, Belanja, Pembiayaan), Buku Kas Umum (BKU), pencairan SP2D, pemotongan pajak, dan Laporan Realisasi Anggaran.',
    materi: `Materi Pokok: Tata Kelola Keuangan Sektor Publik dan Penatausahaan Anggaran Keuangan Desa Berbasis Permendagri No. 20 Tahun 2018

1. Asas Pengelolaan Keuangan Desa:
Pengelolaan keuangan desa dilaksanakan secara transparan, akuntabel, partisipatif, serta tertib dan disiplin anggaran. Peran Pelaksana Pengelolaan Keuangan Desa (PPKD): Kepala Desa (PKPKD), Sekretaris Desa (Koordinator PPKD), Kepala Urusan / Kepala Seksi (Pelaksana Kegiatan), dan Bendahara Desa.

2. Struktur Anggaran Pendapatan dan Belanja Desa (APBDes):
- Pendapatan: Pendapatan Asli Desa (PADes), Dana Desa (APBN), Alokasi Dana Desa (ADD), Bagi Hasil Pajak dan Retribusi Daerah, serta Bantuan Keuangan Provinsi/Kabupaten.
- Belanja Desa: Bidang Penyelenggaraan Pemerintahan, Bidang Pembangunan Desa, Bidang Pembinaan Kemasyarakatan, Bidang Pemberdayaan Masyarakat, dan Bidang Penanggulangan Bencana/Darurat.
- Pembiayaan: Penerimaan Pembiayaan (SiLPA tahun lalu) dan Pengeluaran Pembiayaan (Penyertaan Modal BUMDes).

3. Penatausahaan Bukti Transaksi dan Pembukuan Bendahara Desa:
- Dokumen Pengeluaran: Surat Permintaan Pembayaran (SPP), Surat Perintah Pencairan Dana (SP2D), dan Bukti Kas Keluar.
- Buku Pembantu: Buku Kas Umum (BKU), Buku Pembantu Kas, Buku Pembantu Bank, dan Buku Pembantu Pajak.
- Kewajiban Perpajakan Bendahara Pengeluaran: Pemotongan PPh Pasal 21 (honorarium narasumber/tukang), PPh Pasal 22 (belanja barang > 2 juta), dan PPN 11% atas pengadaan material proyek.

4. Praktik Kerja Simulasi Siskeudes:
Siswa memproses 8 berkas transaksi pengeluaran proyek paving jalan desa, mencatat ke Buku Kas Umum, memotong PPh 22 dan PPN atas faktur material semen/batu, dan menyusun Laporan Realisasi Pelaksanaan APBDes semester ganjil.`,
  },
  {
    id: 'akl-f-komputer-akuntansi-myob',
    judul: '4. Komputer Akuntansi: Setup Data Awal & Siklus Transaksi Dagang (MYOB / Accurate)',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    kategori: 'PRODUKTIF_XI_XII',
    elemen: 'Komputer Akuntansi',
    mapel: 'Komputer Akuntansi',
    alokasi: '2 Pertemuan x 4 JP (180 Menit)',
    pedagogi: 'Project Based Learning & Praktik Lab Komputerisasi',
    deskripsi: 'Setup profil bisnis, impor bagan akun (COA), linked accounts, saldo awal kartu piutang/utang/persediaan, entri transaksi modul sales & purchase, dan generate laporan keuangan.',
    materi: `Materi Pokok: Komputerisasi Akuntansi Siklus Perusahaan Dagang Menggunakan Perangkat Lunak Akuntansi Digital (MYOB / Accurate / Spreadsheet)

1. Setup Informasi Entitas Bisnis & Periode Akuntansi:
- Company Information: Nama perusahaan dagang, NPWP, alamat kantor, nomor telepon, dan email.
- Accounting Period: Current financial year, conversion month, last month of financial year, dan number of accounting periods (12 atau 13 bulan untuk periode penyesuaian).

2. Pengaturan Bagan Akun (Chart of Accounts) dan Link Accounts:
- Klasifikasi Akun Standar: 1-Asset, 2-Liability, 3-Equity, 4-Income, 5-Cost of Sales, 6-Expense, 8-Other Income, 9-Other Expense.
- Pengaturan Linked Accounts: Link untuk Accounts Receivable (Piutang) ke Kas Bank, Link Accounts Payable (Utang) ke Kas Bank, dan Historical Balancing.
- Pengaturan Kode Pajak: PPN Masukan dan PPN Keluaran tarif 11%.

3. Penginputan Kartu Pembantu dan Saldo Awal (Card File & Balances):
- Card File Customer: Data debitur dan saldo awal faktur piutang dagang.
- Card File Vendor: Data pemasok dan saldo awal faktur utang dagang.
- Item List Persediaan: Kode barang, nama barang dagang, metode pencatatan persediaan perpetual (I Buy, I Sell, I Inventory), kuantitas saldo awal, dan harga pokok per unit.

4. Pencatatan Transaksi Keuangan Harian pada Modul:
- Modul Banking: Penerimaan uang tunai (Receive Money) dan pengeluaran kas operasional (Spend Money).
- Modul Sales: Penerimaan pesanan, penerbitan faktur penjualan kredit (Sales Invoice), penerimaan pelunasan piutang (Receive Payments), dan retur penjualan.
- Modul Purchases: Pembelian barang dagang kredit (Enter Purchases), pembayaran utang usaha (Pay Bills), dan retur pembelian.
- Modul Record Journal Entry: Pencatatan ayat jurnal penyesuaian akhir periode.

5. Pelaporan dan Pengarsipan Digital:
Menghasilkan Neraca Saldo (Trial Balance), Laporan Laba Rugi (Standard Balance Sheet & Profit & Loss Statement), serta melakukan Backup File (.myo / .gdb) sesuai SOP keamanan data industri.`,
  },
  {
    id: 'akl-f-perpajakan-pph21',
    judul: '5. Perpajakan: Administrasi Pajak PPh Pasal 21 Karyawan (Skema TER UU HPP)',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    kategori: 'PRODUKTIF_XI_XII',
    elemen: 'Perpajakan',
    mapel: 'Administrasi Perpajakan',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Problem Based Learning & Simulasi e-Bupot 21/26 DJP Online',
    deskripsi: 'Ketentuan PTKP, Tarif Efektif Rata-Rata (TER) PP 58/2023 & PMK 168/2023, tarif progresif Pasal 17 UU HPP, pembuatan bukti potong 1721-A1, dan pelaporan SPT Masa PPh 21.',
    materi: `Materi Pokok: Perhitungan, Pemotongan, dan Pelaporan Pajak Penghasilan (PPh) Pasal 21 atas Pegawai Tetap

1. Regulasi dan Dasar Hukum PPh Pasal 21:
Berdasarkan Undang-Undang Harmonisasi Peraturan Perpajakan (UU HPP No. 7 Tahun 2021) dan aturan turunan PP No. 58 Tahun 2023 serta PMK No. 168 Tahun 2023, pemotongan PPh Pasal 21 untuk masa pajak Januari s.d. November menggunakan Tarif Efektif Rata-Rata (TER), sedangkan masa pajak Desember menggunakan tarif progresif Pasal 17 ayat (1) huruf a UU PPh.

2. Komponen Perhitungan Pajak Pegawai:
- Penghasilan Bruto: Gaji pokok, tunjangan keluarga, tunjangan jabatan, uang lembur, dan premi asuransi kecelakaan/kematian (JKK/JKM) yang dibayar pemberi kerja.
- Pengurang Penghasilan Bruto: Biaya Jabatan (5% dari penghasilan bruto, maksimal Rp500.000/bulan atau Rp6.000.000/tahun), iuran pensiun dan iuran JHT yang dibayar sendiri oleh pegawai.
- Penghasilan Tidak Kena Pajak (PTKP):
  * Wajib Pajak Sendiri (TK/0): Rp54.000.000 per tahun.
  * Tambahan Wajib Pajak Kawin (K/0): Rp4.500.000.
  * Tambahan tanggungan keluarga sedarah (maksimal 3 orang): @ Rp4.500.000.
- Kategori TER Bulanan (A, B, C): Didasarkan pada status PTKP pegawai.
- Tarif Progresif Lapisan Pasal 17:
  * s.d. Rp60 juta: 5%
  * > Rp60 juta s.d. Rp250 juta: 15%
  * > Rp250 juta s.d. Rp500 juta: 25%
  * > Rp500 juta s.d. Rp5 miliar: 30%
  * > Rp5 miliar: 35%

3. Praktik Studi Kasus Payroll Industri:
Siswa menganalisis slip gaji 5 karyawan dengan variasi status PTKP (TK/0, K/1, K/2), menghitung PPh 21 bulanan dengan tabel TER, menghitung PPh 21 masa Desember terutang, serta menerbitkan Formulir Bukti Potong 1721-A1 untuk pelaporan SPT Tahunan Orang Pribadi.`,
  },
  {
    id: 'akl-f-perpajakan-ppn',
    judul: '5. Perpajakan: Pajak Pertambahan Nilai (PPN 11%), Faktur Pajak & e-Faktur',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XII',
    kategori: 'PRODUKTIF_XI_XII',
    elemen: 'Perpajakan',
    mapel: 'Administrasi Perpajakan',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Problem Based Learning & Simulasi Faktur Pajak Elektronik',
    deskripsi: 'Pengusaha Kena Pajak (PKP), objek PPN, tarif 11%, mekanisme PPN Masukan vs PPN Keluaran, pembuatan e-Faktur, dan pengisian SPT Masa PPN 1111.',
    materi: `Materi Pokok: Konsep, Mekanisme Pengkreditan, dan Administrasi Pajak Pertambahan Nilai (PPN) serta Pajak Penjualan atas Barang Mewah (PPnBM)

1. Hakikat dan Subjek PPN:
PPN adalah pajak yang dikenakan atas konsumsi Barang Kena Pajak (BKP) dan/atau Jasa Kena Pajak (JKP) di dalam Daerah Pabean yang dilakukan oleh Pengusaha Kena Pajak (PKP) dengan omzet usaha melebihi Rp4,8 miliar per tahun buku. Tarif umum PPN saat ini adalah 11% sesuai UU HPP.

2. Mekanisme Pengkreditan Pajak (Credit Method):
- Pajak Keluaran (Output Tax): PPN yang dipungut oleh PKP saat melakukan penyerahan BKP/JKP kepada pembeli/konsumen.
- Pajak Masukan (Input Tax): PPN yang dibayar oleh PKP saat melakukan pembelian BKP/JKP dari PKP lain yang dibuktikan dengan Faktur Pajak yang sah.
- Kondisi Akhir Masa Pajak:
  * Kurang Bayar (Pajak Keluaran > Pajak Masukan): Selisih disetor ke kas negara via e-Billing sebelum SPT Masa dilaporkan.
  * Lebih Bayar (Pajak Masukan > Pajak Keluaran): Dapat diajukan kompensasi ke masa pajak berikutnya atau restitusi.

3. Tata Cara Penerbitan Faktur Pajak Elektronik (e-Faktur):
- Komponen Faktur Pajak: Kode dan Nomor Seri Faktur Pajak (NSFP), identitas PKP penjual dan pembeli (NPWP/NIK), rincian kuantitas barang, Dasar Pengenaan Pajak (DPP), dan jumlah rupiah PPN 11%.
- Batas waktu penerbitan dan pengunggahan (upload) e-Faktur maksimal tanggal 15 bulan berikutnya.

4. Praktik Kerja Siswa:
Siswa memeriksa 10 transaksi penjualan dan pembelian PT Cahaya Logistik PKP, menghitung DPP dan PPN 11%, membuat draft Faktur Pajak Standar, serta mengisi Formulir Induk SPT Masa PPN 1111 beserta Lampiran AB.`,
  },
  {
    id: 'akl-f-mapel-pilihan-syariah',
    judul: '6. Mapel Pilihan: Perbankan Syariah & Akad Pembiayaan (Murabahah & Mudharabah)',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    kategori: 'PRODUKTIF_XI_XII',
    elemen: 'Mata Pelajaran Pilihan',
    mapel: 'Mata Pelajaran Pilihan: Perbankan Syariah',
    alokasi: '2 Pertemuan x 3 JP (135 Menit)',
    pedagogi: 'Problem Based Learning & Simulasi Meja Pembiayaan Syariah',
    deskripsi: 'Prinsip operasional bank syariah, larangan riba, gharar, maysir; akad titipan (Wadi\'ah), akad jual beli (Murabahah), dan akad bagi hasil (Mudharabah/Musyarakah).',
    materi: `Materi Pokok: Karakteristik Akuntansi Perbankan Syariah dan Pencatatan Transaksi Akad Murabahah serta Mudharabah

1. Karakteristik Perbankan Syariah:
Beroperasi berdasarkan prinsip syariat Islam tanpa sistem bunga (anti-riba). Menghindari transaksi yang mengandung gharar (ketidakpastian spekulatif), maysir (perjudian), dan objek haram. Mengharuskan Dewan Pengawas Syariah (DPS) untuk memverifikasi kesesuaian produk dengan fatwa DSN-MUI.

2. Akad-Akad Utama Transaksi Keuangan Syariah:
- Akad Titipan (Wadi'ah Yad Dhamanah / Amanah): Diterapkan pada rekening tabungan dan giro syariah.
- Akad Jual Beli (Murabahah): Bank membelikan barang yang diinginkan nasabah dan menjualnya kembali dengan menambahkan margin keuntungan (profit margin) yang disepakati bersama. Harga jual bersifat tetap hingga masa cicilan berakhir.
- Akad Bagi Hasil (Mudharabah): Kerjasama antara pemilik modal (shahibul maal) dengan pengelola dana (mudharib) dengan nisbah bagi hasil yang disepakati di awal (contoh: 60:40).
- Akad Kemitraan (Musyarakah): Kerjasama dua pihak atau lebih yang menyatukan modal untuk suatu usaha dan berbagi risiko serta hasil.

3. Pencatatan Akuntansi Akad Murabahah (Standar SAK Syariah):
- Saat perolehan aset murabahah oleh bank: Debit Aset Murabahah, Kredit Kas/Rekening Pemasok.
- Saat penyerahan barang kepada nasabah: Debit Piutang Murabahah (senilai total harga jual), Kredit Aset Murabahah (senilai harga pokok), Kredit Margin Murabahah Tangguhan (selisih keuntungan).
- Saat penerimaan angsuran bulanan: Debit Kas/Rekening Nasabah, Kredit Piutang Murabahah, serta pengakuan pendapatan margin (Debit Margin Murabahah Tangguhan, Kredit Pendapatan Margin Murabahah).

4. Praktik Kerja Simulasi:
Siswa menghitung skema pembiayaan kepemilikan sepeda motor syariah senilai Rp24.000.000 tenor 2 tahun dengan margin 15% per tahun, menyusun jadwal angsuran bulanan, dan membukukan ayat jurnal akuntansi perbankan syariah.`,
  },
  {
    id: 'akl-f-pkk-jasa-akuntansi',
    judul: '7. Projek Kreatif & Kewirausahaan (PKK): Jasa Pembukuan & Laporan Keuangan UMKM',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XII',
    kategori: 'PRODUKTIF_XI_XII',
    elemen: 'Projek Kreatif dan Kewirausahaan (PKK)',
    mapel: 'Projek Kreatif dan Kewirausahaan (PKK Akuntansi)',
    alokasi: '2 Pertemuan x 4 JP (180 Menit)',
    pedagogi: 'Project Based Learning (PjBL) & Teaching Factory (TeFa)',
    deskripsi: 'Merancang unit usaha jasa pembukuan (Accounting Service Bureau), penyusunan proposal bisnis, penetapan tarif jasa, pencatatan transaksi riil UMKM mitra, dan presentasi laporan.',
    materi: `Materi Pokok: Perancangan Model Bisnis Jasa Akuntansi dan Penyusunan Laporan Keuangan SAK EMKM untuk Pelaku Usaha Mikro, Kecil, dan Menengah (UMKM)

1. Karakteristik Peluang Usaha Bidang Akuntansi (Accounting Service Entrepreneur):
Banyak pelaku UMKM lokal yang belum memiliki pembukuan keuangan yang tertib sehingga kesulitan mengakses pembiayaan perbankan. Teknisi akuntansi junior dapat membuka layanan jasa:
- Jasa Penataan dan Penyusunan Bukti Transaksi.
- Jasa Pembukuan Kas Harian dan Buku Besar Berbasis Aplikasi Digital.
- Jasa Pembuatan Laporan Keuangan SAK EMKM (Laporan Laba Rugi, Laporan Posisi Keuangan, dan Catatan atas Laporan Keuangan / CaLK).
- Jasa Perhitungan dan Pelaporan SPT Tahunan PPh Final UMKM 0,5%.

2. Perancangan Proposal Usaha Jasa (Business Plan):
- Ringkasan Eksekutif, Analisis Target Pasar UMKM di lingkungan sekitar sekolah.
- Analisis Biaya dan Penetapan Harga Jasa (Pricing Strategy): Biaya tetap (software, kertas, transport) dan margin jasa pembukuan per klien (Rp250.000 - Rp500.000 per bulan).
- Rencana Pemasaran Jasa (Digital Marketing via media sosial dan promosi dari mulut ke mulut).

3. Alur Pengerjaan Proyek TeFa Pembukuan UMKM:
- Wawancara dan pengumpulan bukti nota/bon penjualan mitra UMKM binaan (contoh: warung kopi, toko kelontong, usaha katering).
- Rekapitulasi transaksi bulanan ke software spreadsheet / aplikasi pembukuan UKM.
- Menghasilkan laporan laba rugi bulanan dan neraca sederhana.
- Memberikan konsultasi keuangan ringan mengenai pemisahan uang pribadi dan uang usaha.

4. Unjuk Kerja Portofolio Siswa:
Kelompok siswa mempresentasikan portofolio buku laporan keuangan UMKM mitra yang telah berhasil disusun secara rapi di depan dewan guru pembimbing dan pelaku usaha mitra.`,
  },

  // =========================================================================
  // 3. KELAS XI & XII (FASE F) - KELOMPOK MATA PELAJARAN UMUM (PENYESUAIAN JAM AKL)
  // =========================================================================
  {
    id: 'akl-umum-bindo-laporan',
    judul: 'Mapel Umum: Bahasa Indonesia - Menyusun Laporan Analisis Keuangan Objektif',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    kategori: 'UMUM_XI_XII',
    elemen: 'Bahasa Indonesia (Penyesuaian Jam Mapel Umum)',
    mapel: 'Bahasa Indonesia (Kelompok Mapel Umum AKL)',
    alokasi: '2 Pertemuan x 2 JP (90 Menit)',
    pedagogi: 'Genre-Based Approach & Problem Based Learning',
    deskripsi: 'Menulis teks laporan analisis kinerja keuangan dan audit internal dengan struktur baku, pilihan diksi lugas, data tabel/grafik akurat, dan format laporan resmi.',
    materi: `Materi Pokok: Penulisan Teks Laporan Analisis Keuangan Perusahaan yang Objektif, Efektif, dan Lugas

1. Fungsi Komunikasi Laporan Keuangan dalam Dunia Bisnis:
Laporan tertulis berfungsi menyajikan fakta keuangan hasil analisis neraca dan laba rugi kepada jajaran direksi, komisaris, atau pihak perbankan. Bahasa laporan wajib menggunakan ragam bahasa resmi (baku), denotatif, tidak bermakna ganda, dan didukung bukti data angka yang valid.

2. Struktur Baku Teks Laporan Hasil Analisis Keuangan:
- Bagian Pendahuluan: Latar belakang analisis, ruang lingkup periode pembukuan, dan tujuan penyusunan laporan.
- Bagian Isi (Pembahasan): Uraian tren pendapatan, perbandingan biaya operasional, analisis rasio likuiditas dan profitabilitas, serta temuan selisih kas/piutang.
- Bagian Penutup: Kesimpulan umum kinerja keuangan dan rekomendasi perbaikan pengendalian internal (internal control).

3. Kaidah Kebahasaan Teks Bisnis:
- Kalimat efektif: Hemat kata, lugas, dan memiliki struktur subjek-predikat yang tegas.
- Pemilihan istilah teknis akuntansi yang tepat (likuiditas, solvabilitas, rasio laba kotor, depresiasi).
- Integrasi tabel rekapitulasi angka dan grafik batang/lingkaran yang informatif dalam tubuh teks laporan.

4. Praktik Menulis Laporan:
Siswa menerima data ringkasan kinerja keuangan CV Prima Abadi selama kuartal III, lalu menulis laporan analisis resmi sepanjang 2 halaman lengkap dengan rekomendasi penghematan beban operasional kantor.`,
  },
  {
    id: 'akl-umum-pancasila-integritas',
    judul: 'Mapel Umum: Pendidikan Pancasila - Integritas Profesi & Pencegahan Fraud Finansial',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    kategori: 'UMUM_XI_XII',
    elemen: 'Pendidikan Pancasila (Penyesuaian Jam Mapel Umum)',
    mapel: 'Pendidikan Pancasila (Kelompok Mapel Umum AKL)',
    alokasi: '2 Pertemuan x 2 JP (90 Menit)',
    pedagogi: 'Case Study Analysis & Diskusi Nilai Kewargaan',
    deskripsi: 'Penerapan nilai Sila Keadilan Sosial dan Kemanusiaan dalam menjaga transparansi pembukuan kas, kepatuhan pembayaran pajak negara, dan budaya anti-korupsi.',
    materi: `Materi Pokok: Nilai-Nilai Pancasila dalam Membangun Integritas Budaya Kerja, Kepatuhan Pajak, dan Pencegahan Korupsi

1. Hubungan Nilai Pancasila dengan Tanggung Jawab Profesi Akuntan:
- Sila ke-1: Kejujuran mencatat keuangan adalah bentuk pertanggungjawaban moral tertinggi kepada Tuhan Yang Maha Esa.
- Sila ke-2: Menghormati hak-hak karyawan (gaji, tunjangan, jaminan sosial) dan perlakuan adil kepada seluruh pemangku kepentingan.
- Sila ke-5: Pajak yang dibayarkan perusahaan merupakan sarana redistribusi pendapatan demi terwujudnya keadilan sosial bagi seluruh rakyat Indonesia.

2. Memahami Bahaya Segitiga Kecurangan (Fraud Triangle):
- Pressure (Tekanan finansial atau target laba tidak realistis).
- Opportunity (Kelemahan sistem pengendalian internal dan ketiadaan pemisahan fungsi).
- Rationalization (Pembenaran sikap salah, misal: "perusahaan sangat kaya, mengambil sedikit tidak apa-apa").

3. Studi Kasus dan Refleksi Kritis:
Siswa menganalisis dampak kasus penggelapan pajak atau manipulasi laporan keuangan bagi perekonomian nasional dan merumuskan komitmen pakta integritas calon teknisi akuntansi muda.`,
  },
  {
    id: 'akl-umum-bing-business',
    judul: 'Mapel Umum: Bahasa Inggris - Business & Accounting English (Financial Presentation)',
    jenjang: 'SMK',
    fase: 'Fase F',
    kelas: 'Kelas XI',
    kategori: 'UMUM_XI_XII',
    elemen: 'Bahasa Inggris (Penyesuaian Jam Mapel Umum)',
    mapel: 'Bahasa Inggris (Kelompok Mapel Umum AKL)',
    alokasi: '2 Pertemuan x 2 JP (90 Menit)',
    pedagogi: 'Role Play & Business Presentation Simulation',
    deskripsi: 'Vocabulary akuntansi internasional (assets, liabilities, equity, cash flow), korespondensi email bisnis dengan klien luar negeri, dan presentasi laporan keuangan sederhana dalam Bahasa Inggris.',
    materi: `Materi Pokok: Business English for Accounting - Communicating Financial Data and Explaining Company Performance

1. Essential Accounting Vocabulary:
- Assets: Current assets (cash, accounts receivable, inventory, prepaid expenses), non-current assets (equipment, building, accumulated depreciation).
- Liabilities: Accounts payable, notes payable, accrued wages, unearned revenue, long-term bonds.
- Equity: Capital stock, retained earnings, owner's drawings.
- Profit & Loss: Revenue, sales returns, cost of goods sold (COGS), gross profit, operating expenses, net income.

2. Business Correspondence & Inquiry Letters:
- Formatting professional business emails regarding invoice verification and overdue payment reminders.
- Courteous phrases for requesting missing receipts or transaction documentation.

3. Describing Financial Trends (Graphs & Charts):
- Upward movement: increased, rose, surged, peaked at.
- Downward movement: declined, dropped, decreased, plummeted.
- Stability: remained steady, plateaued, leveled off.

4. Speaking Task:
Students work in pairs acting as Accounting Staff presenting a 3-minute financial briefing of the fourth-quarter performance to the managing director in clear, confident English.`,
  },
];
