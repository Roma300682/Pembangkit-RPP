import React from 'react';
import { Sparkles, FileText, History, HelpCircle, School, BookOpen, Globe } from 'lucide-react';
import { UserSchoolProfile } from '../types/rpp';

interface HeaderProps {
  activeTab: 'generator' | 'document' | 'history' | 'guide';
  setActiveTab: (tab: 'generator' | 'document' | 'history' | 'guide') => void;
  savedCount: number;
  profile: UserSchoolProfile;
  onOpenProfile: () => void;
  onOpenEmbed: () => void;
  hasActiveDoc: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  profile,
  onOpenProfile,
  onOpenEmbed,
  hasActiveDoc,
}) => {
  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                  RPP Pintar Akuntansi
                </span>
                <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  SMK Jurusan AKL
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Generator RPP Mendalam Kurikulum Merdeka • Program Keahlian Akuntansi & Keuangan Lembaga
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'generator'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Susun RPP</span>
            </button>

            <button
              onClick={() => setActiveTab('document')}
              disabled={!hasActiveDoc}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                !hasActiveDoc
                  ? 'text-slate-300 cursor-not-allowed'
                  : activeTab === 'document'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Dokumen RPP</span>
              {hasActiveDoc && (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden md:inline">Riwayat</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={setActiveTab.bind(null, 'guide')}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'guide'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Panduan Format RPP Mendalam"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden lg:inline">Format Standar</span>
            </button>

            {/* Embed / Pasang di Website Trigger */}
            <button
              onClick={onOpenEmbed}
              className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs"
              title="Pasang aplikasi ini di Website Sekolah / WordPress / Blog Anda"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span className="hidden sm:inline">Pasang di Web</span>
            </button>

            <div className="h-5 w-px bg-slate-200 mx-1"></div>

            {/* Teacher Profile Trigger */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-slate-700 text-xs transition-colors"
              title="Data Guru & Sekolah"
            >
              <School className="w-4 h-4 text-emerald-600" />
              <div className="text-left hidden md:block">
                <div className="font-semibold leading-tight truncate max-w-[120px]">
                  {profile.namaGuru || 'Profil Guru'}
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                  {profile.namaSekolah || 'Belum diatur'}
                </div>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
