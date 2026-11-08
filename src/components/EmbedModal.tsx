import React, { useState } from 'react';
import {
  X,
  Code2,
  Copy,
  Check,
  Globe,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const [activePlatform, setActivePlatform] = useState<'gsites' | 'wordpress' | 'blogger' | 'html'>('gsites');
  const [frameHeight, setFrameHeight] = useState<string>('850');

  if (!isOpen) return null;

  // URL of the current app
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-e524bx2aiabqseghl4mayt-449235772478.asia-northeast1.run.app';

  const embedCode = `<iframe 
  src="${currentUrl}" 
  width="100%" 
  height="${frameHeight}" 
  style="border: none; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-width: 100%; min-height: 700px;" 
  title="RPP Pintar - Generator RPP Kurikulum Merdeka AI"
  allow="clipboard-write"
></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Pasang RPP Pintar di Website Mana Saja</h3>
              <p className="text-xs text-emerald-100">
                Sematkan ke Web Sekolah, WordPress, Google Sites, Portal Guru, atau Blog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white rounded-lg p-1 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Key Affirmation */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 leading-relaxed">
              <span className="font-bold">Bisa dipasang di semua website!</span> Aplikasi ini bersifat responsif dan mendukung penyematan melalui <strong>iframe</strong>, integrasi tombol menu web sekolah, maupun dipasang di platform CMS seperti WordPress, Google Sites, Moodle, dan Blogger.
            </div>
          </div>

          {/* Embed Code Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>Kode Semat (HTML / Iframe Code):</span>
              </label>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Tinggi:</span>
                <select
                  value={frameHeight}
                  onChange={(e) => setFrameHeight(e.target.value)}
                  className="px-2 py-0.5 border border-slate-300 rounded text-xs bg-white font-medium"
                >
                  <option value="750">750 px</option>
                  <option value="850">850 px (Direkomendasikan)</option>
                  <option value="1000">1000 px</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <textarea
                readOnly
                value={embedCode}
                rows={4}
                className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-xl border border-slate-800 leading-relaxed select-all"
              />
              <button
                onClick={handleCopy}
                className="absolute top-2.5 right-2.5 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
              </button>
            </div>
          </div>

          {/* Step by Step Guide per Platform */}
          <div>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              Panduan Pemasangan Langkah demi Langkah:
            </span>

            <div className="flex gap-1.5 mb-3 border-b border-slate-200 pb-2 overflow-x-auto">
              {[
                { id: 'wordpress', name: 'WordPress' },
                { id: 'gsites', name: 'Google Sites' },
                { id: 'blogger', name: 'Blogger / Blogspot' },
                { id: 'html', name: 'Web Sekolah / Portal' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatform(tab.id as any)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                    activePlatform === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 text-slate-700">
              {activePlatform === 'gsites' && (
                <div className="space-y-3">
                  <div className="p-2.5 bg-blue-50/80 border border-blue-200 rounded-lg">
                    <span className="font-bold text-blue-900 block mb-1">
                      Metode 1: Sematkan dengan URL Langsung (Paling Praktis)
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700 leading-relaxed">
                      <li>Buka Google Sites sekolah Anda (<code className="bg-blue-100/60 px-1 rounded text-blue-950 font-mono">sites.google.com</code>).</li>
                      <li>Di panel kanan, klik menu <strong>Sisipkan (Insert) &gt; Sematkan (Embed)</strong>.</li>
                      <li>Pilih tab <strong>Berdasarkan URL (By URL)</strong>.</li>
                      <li>Tempelkan (*paste*) URL aplikasi: <br/>
                        <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-900 font-mono text-[11px] select-all inline-block mt-0.5">
                          {currentUrl}
                        </code>
                      </li>
                      <li>Pilih opsi <strong>Seluruh halaman (Whole page)</strong>, lalu klik <strong>Sisipkan</strong>.</li>
                      <li>Tarik tepi bingkai agar pas dengan lebar halaman situs Anda, lalu klik <strong>Publikasikan (Publish)</strong>.</li>
                    </ol>
                  </div>

                  <div className="p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-lg">
                    <span className="font-bold text-emerald-900 block mb-1">
                      Metode 2: Sematkan Kode Iframe (Ukuran Rapi & Terkunci)
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700 leading-relaxed">
                      <li>Klik <strong>Sisipkan &gt; Sematkan</strong>, lalu pilih tab <strong>Sematkan Kode (Embed Code)</strong>.</li>
                      <li>Salin dan tempelkan kode iframe di atas, lalu klik <strong>Berikutnya &gt; Sisipkan</strong>.</li>
                      <li>Sesuaikan tinggi dan lebar kotak, lalu klik <strong>Publikasikan</strong>.</li>
                    </ol>
                  </div>

                  <div className="p-2.5 bg-purple-50/80 border border-purple-200 rounded-lg">
                    <span className="font-bold text-purple-900 block mb-1">
                      Metode 3: Jadikan Menu Navigasi di Bilah Menu Atas
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      Klik tab <strong>Halaman (Pages)</strong> di panel kanan &gt; arahkan ke tombol <strong>(+)</strong> di bawah &gt; pilih <strong>Tautan Baru (New Link)</strong> &gt; beri nama <em>"RPP Pintar Merdeka"</em> &gt; masukkan URL aplikasi &gt; klik <strong>Selesai</strong>.
                    </p>
                  </div>
                </div>
              )}

              {activePlatform === 'wordpress' && (
                <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                  <li>Buka dasbor WordPress sekolah Anda, masuk ke menu <strong>Halaman (Pages) &gt; Tambah Baru</strong>.</li>
                  <li>Beri judul halaman, misalnya <em>"Aplikasi RPP Pintar Guru"</em>.</li>
                  <li>Tambahkan blok baru dengan mengklik tanda plus (+), lalu pilih blok <strong>Custom HTML</strong>.</li>
                  <li>Tempelkan (*paste*) kode semat di atas ke dalam blok tersebut.</li>
                  <li>Klik <strong>Terbitkan (Publish)</strong>. RPP Pintar langsung siap digunakan oleh seluruh guru di web Anda!</li>
                </ol>
              )}

              {activePlatform === 'blogger' && (
                <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                  <li>Buka dasbor Blogger, pilih menu <strong>Halaman &gt; Halaman Baru</strong>.</li>
                  <li>Pada tombol ikon pensil di pojok kiri atas editor, ubah dari *Tampilan Menulis* ke <strong>Tampilan HTML</strong>.</li>
                  <li>Tempelkan kode semat iframe tersebut di halaman HTML.</li>
                  <li>Klik <strong>Publikasikan</strong>. Halaman generator RPP otomatis aktif di blog sekolah Anda.</li>
                </ol>
              )}

              {activePlatform === 'html' && (
                <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                  <li>Buka file template HTML website sekolah atau LMS Moodle Anda.</li>
                  <li>Tempelkan kode <code>&lt;iframe&gt;</code> di dalam tag kontainer halaman yang Anda inginkan (misal di dalam <code>&lt;main&gt;</code> atau <code>&lt;div class="container"&gt;</code>).</li>
                  <li>Anda juga bisa menambahkan menu navigasi langsung ke URL aplikasi: <br/>
                    <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px] text-slate-900 select-all font-mono">
                      {currentUrl}
                    </code>
                  </li>
                </ol>
              )}
            </div>
          </div>

          {/* Direct Link Option */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              Atau Tautkan Langsung Melalui Menu Web:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-300 rounded-lg text-slate-800 font-mono select-all"
              />
              <button
                type="button"
                onClick={handleCopyUrl}
                className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold shrink-0 transition-colors"
                title="Salin tautan langsung"
              >
                {urlCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{urlCopied ? 'Tersalin' : 'Salin URL'}</span>
              </button>
              <a
                href={currentUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shrink-0 transition-colors"
              >
                <span>Buka</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Admin web sekolah dapat membuat menu navbar seperti <strong>"Layanan Guru &gt; Generator RPP Kurikulum Merdeka"</strong> yang mengarah ke link di atas.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
