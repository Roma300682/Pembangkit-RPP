export interface RppIdentitas {
  namaSatuanPendidikan: string;
  namaGuru: string;
  nipGuru?: string;
  mataPelajaran: string;
  faseKelasSemester: string;
  topikPembelajaran: string;
  alokasiWaktu: string;
  tahunPelajaran: string;
}

export interface ProfilLulusanItem {
  name: string;
  selected: boolean;
  keterangan: string;
}

export interface RppIdentifikasi {
  kesiapanBelajar: {
    sudahPaham: string;
    sedangBerkembang: string;
    perluBantuan: string;
  };
  minatGayaBelajar: string;
  latarBelakangKebutuhanKhusus: string;
  jenisPengetahuanMateri: string; // faktual, konseptual, prosedural, metakognitif
  relevansiKehidupanNyata: string;
  dimensiProfilLulusan: ProfilLulusanItem[];
}

export interface RppDesain {
  capaianPembelajaran: string;
  lintasDisiplinIlmu: string;
  tujuanPembelajaran: string[];
  topikPembelajaranKontekstual: string;
  praktikPedagogis: string;
  kemitraanPembelajaran: string;
  lingkunganPembelajaran: string;
  pemanfaatanDigital: string;
}

export interface KegiatanTahap {
  kegiatan: string;
  waktuMenit: number | string;
  subDetail?: string;
}

export interface PertemuanBelajar {
  pertemuanKe: number;
  durasiJP: string;
  fokusTopik?: string;
  awalSalamDoaPresensi: KegiatanTahap;
  awalApersepsiPertanyaanPemantik: KegiatanTahap & { pertanyaanPemantik?: string[] };
  awalPenyampaianTujuanIceBreaking: KegiatanTahap & { iceBreaking?: string };
  intiMemahami: KegiatanTahap;
  intiMengaplikasi: KegiatanTahap;
  intiMerefleksi: KegiatanTahap;
  penutupKesimpulanRefleksi: KegiatanTahap;
  penutupUmpanBalikInfoDoa: KegiatanTahap;
}

export type PengalamanBelajarPertemuan = PertemuanBelajar;

export interface AsesmenItem {
  jenis: string;
  teknikInstrumen: string;
  waktuPelaksanaan: string;
}

export interface RubrikIndikator {
  kriteria: string;
  sangatBaik4: string;
  baik3: string;
  cukup2: string;
  perluBimbingan1: string;
}

export interface RppAsesmen {
  asesmenAwal: AsesmenItem;
  asesmenProses: AsesmenItem;
  asesmenAkhir: AsesmenItem;
  rubrikPenilaian: RubrikIndikator[];
}

export interface RppLkpd {
  judul: string;
  tujuan: string;
  petunjukPengerjaan: string[];
  stimulusRingkas: string;
  langkahAktivitas: string[];
  soalDanTugas: string[];
}

export interface RppBahanBacaan {
  ringkasanMateri: string;
  glosarium: Array<{ istilah: string; arti: string }>;
  mediaAjar: string;
}

export interface RppDiferensiasi {
  konten: string;
  proses: string;
  produk: string;
}

export interface RppPengesahan {
  tempatTanggal: string;
  kepalaSekolahNama: string;
  kepalaSekolahNIP: string;
  guruNama: string;
  guruNIP: string;
}

export interface RppLampiran {
  lkpd: RppLkpd;
  bahanBacaan: RppBahanBacaan;
  instrumenRefleksi: {
    refleksiMurid: string[];
    refleksiGuru: string[];
  };
  rencanaDiferensiasi: RppDiferensiasi;
  pengesahan: RppPengesahan;
}

export interface RppDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  materiAsli: string;
  identitas: RppIdentitas;
  identifikasi: RppIdentifikasi;
  desainPembelajaran: RppDesain;
  pengalamanBelajar: PertemuanBelajar[];
  asesmenPembelajaran: RppAsesmen;
  lampiran: RppLampiran;
  groundingSources?: Array<{ title: string; uri: string }>;
  searchQueries?: string[];
}

export interface UserSchoolProfile {
  namaSekolah: string;
  namaGuru: string;
  nipGuru: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  kota: string;
  mataPelajaranDefault: string;
  faseDefault: string;
  tahunPelajaranDefault: string;
}
