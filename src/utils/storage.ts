import { RppDocument, UserSchoolProfile } from '../types/rpp';

const STORAGE_KEYS = {
  RPP_LIST: 'rpp_pintar_saved_documents',
  ACTIVE_RPP: 'rpp_pintar_active_document',
  PROFILE: 'rpp_pintar_school_profile',
};

export const DEFAULT_PROFILE: UserSchoolProfile = {
  namaSekolah: 'SMK Negeri 1 Indonesia',
  namaGuru: 'Ahmad Fauzi, S.Pd., Gr.',
  nipGuru: '19870315 201201 1 003',
  namaKepalaSekolah: 'Drs. H. Bambang Sudarmono, M.M.',
  nipKepalaSekolah: '19720412 199802 1 001',
  kota: 'Surabaya',
  mataPelajaranDefault: 'Akuntansi Keuangan (AKL)',
  faseDefault: 'Fase F (Kelas XI - XII SMK)',
  tahunPelajaranDefault: '2026/2027',
};

export function getSavedProfile(): UserSchoolProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Error loading profile from localStorage', e);
  }
  return DEFAULT_PROFILE;
}

export function saveProfile(profile: UserSchoolProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile to localStorage', e);
  }
}

export function getSavedRppList(): RppDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RPP_LIST);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading saved RPP list', e);
  }
  return [];
}

export function saveRppDocument(rpp: RppDocument): void {
  try {
    const list = getSavedRppList();
    const existingIndex = list.findIndex((item) => item.id === rpp.id);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...rpp, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({ ...rpp, updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEYS.RPP_LIST, JSON.stringify(list));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_RPP, JSON.stringify(rpp));
  } catch (e) {
    console.error('Error saving RPP document', e);
  }
}

export function deleteRppDocument(id: string): void {
  try {
    const list = getSavedRppList().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.RPP_LIST, JSON.stringify(list));
  } catch (e) {
    console.error('Error deleting RPP document', e);
  }
}

export function getActiveRppDocument(): RppDocument | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_RPP);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading active RPP document', e);
  }
  return null;
}
