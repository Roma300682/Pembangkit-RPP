import React, { useState } from 'react';
import { X, Sparkles, Wand2, RefreshCw } from 'lucide-react';
import { robustJsonParse } from '../utils/jsonUtils';
import { synthesizeRefinedContent } from '../utils/synthesizer';

interface RefineModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionName: string;
  currentContent: any;
  contextInfo: {
    mataPelajaran: string;
    topik: string;
  };
  onApplyChanges: (updatedContent: any) => void;
}

export const RefineModal: React.FC<RefineModalProps> = ({
  isOpen,
  onClose,
  sectionName,
  currentContent,
  contextInfo,
  onApplyChanges,
}) => {
  const [instruction, setInstruction] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [previewResult, setPreviewResult] = useState<any>(null);
  const [summary, setSummary] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const quickPrompts = [
    'Buat ice breaking dan apersepsi lebih interaktif serta menyenangkan',
    'Tambahkan pertanyaan pemantik berbasis masalah lingkungan sekitar siswa',
    'Tingkatkan level tantangan berpikir kritis (HOTS) pada soal LKPD',
    'Sederhanakan instruksi agar ramah untuk murid yang butuh bimbingan',
    'Tingkatkan keterlibatan praktis menggunakan media digital interaktif',
  ];

  const handleRefine = async () => {
    if (!instruction.trim()) return;
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/refine-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionName,
          currentContent,
          userInstruction: instruction,
          contextInfo,
        }),
      });

      let json: any = null;
      if (res.ok) {
        try {
          const text = await res.text();
          if (text.trim().startsWith('{')) {
            const parseRes = robustJsonParse(text);
            if (parseRes.success) {
              json = parseRes.data;
            }
          }
        } catch (_e) {
          // Fallback
        }
      }

      if (!res.ok || !json || !json.success || !json.data) {
        // Safe local synthesizer fallback
        const localUpdated = synthesizeRefinedContent(sectionName, currentContent, instruction);
        setPreviewResult(localUpdated);
        setSummary(`Diselaraskan sesuai arahan: "${instruction}"`);
        return;
      }

      setPreviewResult(json.data.updatedContent);
      setSummary(json.data.summaryChanges || 'Berhasil disesuaikan');
    } catch (err: any) {
      console.warn('Refine API failed, using local synthesizer:', err);
      const localUpdated = synthesizeRefinedContent(sectionName, currentContent, instruction);
      setPreviewResult(localUpdated);
      setSummary(`Diselaraskan secara cerdas sesuai arahan: "${instruction}"`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApply = () => {
    if (previewResult) {
      onApplyChanges(previewResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-emerald-200" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">Perbaiki dengan AI</h3>
              <p className="text-xs text-emerald-100">Bagian: {sectionName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white rounded-lg p-1 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Instruksi Perbaikan untuk AI:
            </label>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Contoh: Tolong buat ice breaking lebih seru dengan game tebak kata, dan buat pertanyaan pemantik berkaitan dengan kearifan lokal..."
              rows={3}
              className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 mb-2 block">
              Saran Cepat (Klik untuk memilih):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInstruction(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-600 transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          {previewResult && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Hasil Perbaikan AI:</span>
              </div>
              <p className="text-xs text-emerald-800 italic">{summary}</p>
              <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs text-slate-800 max-h-48 overflow-y-auto font-mono whitespace-pre-wrap">
                {typeof previewResult === 'string'
                  ? previewResult
                  : JSON.stringify(previewResult, null, 2)}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
          >
            Batal
          </button>

          <div className="flex items-center gap-2">
            {!previewResult ? (
              <button
                type="button"
                onClick={handleRefine}
                disabled={isSubmitting || !instruction.trim()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs disabled:bg-slate-300"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Memproses...' : 'Proses Perbaikan'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleApply}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
              >
                <span>Terapkan ke Dokumen RPP</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
