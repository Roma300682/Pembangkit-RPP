import { RppDocument } from '../types/rpp';
import { normalizeRppDocument, synthesizeRppFromMaterial } from './synthesizer';

/**
 * Robust JSON parser capable of repairing:
 * - Markdown codeblocks (```json ... ```)
 * - Leading / trailing conversational text
 * - Trailing commas in arrays or objects (, } or , ])
 * - Missing closing braces/brackets from truncated LLM outputs
 * - Unescaped newlines within string literals
 */
export function robustJsonParse<T = any>(
  rawText: string
): { success: true; data: T } | { success: false; error: string; rawText: string } {
  if (!rawText || typeof rawText !== 'string') {
    return { success: false, error: 'Teks input kosong atau bukan string', rawText: '' };
  }

  const trimmed = rawText.trim();

  // Step 1: Direct JSON.parse
  try {
    const data = JSON.parse(trimmed);
    return { success: true, data };
  } catch (_e1) {
    // Continue to repair strategies
  }

  // Step 2: Strip markdown code fences if wrapped in ```json ... ``` or ``` ... ```
  let cleaned = trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    const data = JSON.parse(cleaned);
    return { success: true, data };
  } catch (_e2) {
    // Continue
  }

  // Step 3: Extract outermost { ... } or [ ... ]
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  let startIndex = -1;
  let isObject = true;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIndex = firstBrace;
    isObject = true;
  } else if (firstBracket !== -1) {
    startIndex = firstBracket;
    isObject = false;
  }

  if (startIndex !== -1) {
    const lastBrace = cleaned.lastIndexOf('}');
    const lastBracket = cleaned.lastIndexOf(']');
    const endIndex = isObject ? lastBrace : lastBracket;

    if (endIndex > startIndex) {
      const extracted = cleaned.substring(startIndex, endIndex + 1);
      try {
        const data = JSON.parse(extracted);
        return { success: true, data };
      } catch (_e3) {
        cleaned = extracted;
      }
    } else {
      // Missing closing delimiter (truncated output)
      cleaned = cleaned.substring(startIndex);
    }
  }

  // Step 4: Fix common JSON syntax errors
  let sanitized = cleaned
    // Remove trailing commas before } or ]
    .replace(/,\s*([}\]])/g, '$1')
    // Fix single-quoted keys: {'foo': -> {"foo":
    .replace(/([{,]\s*)'([^'\n\r]+)'\s*:/g, '$1"$2":')
    // Remove comments (single line // or multi-line /* ... */)
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');

  try {
    const data = JSON.parse(sanitized);
    return { success: true, data };
  } catch (_e4) {
    // Continue to truncation auto-balance
  }

  // Step 5: Auto-balance truncated JSON (e.g. when LLM token limit was hit)
  const balanced = repairTruncatedJson(sanitized);
  try {
    const data = JSON.parse(balanced);
    return { success: true, data };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Format JSON tidak valid dan tidak dapat diperbaiki secara otomatis',
      rawText,
    };
  }
}

/**
 * Attempts to repair truncated JSON by balancing open braces and brackets
 */
function repairTruncatedJson(text: string): string {
  let inString = false;
  let escape = false;
  const stack: ('{' | '[')[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;

    if (char === '{') {
      stack.push('{');
    } else if (char === '[') {
      stack.push('[');
    } else if (char === '}') {
      if (stack.length > 0 && stack[stack.length - 1] === '{') {
        stack.pop();
      }
    } else if (char === ']') {
      if (stack.length > 0 && stack[stack.length - 1] === '[') {
        stack.pop();
      }
    }
  }

  let result = text;
  // If string was left open, close it
  if (inString) {
    result += '"';
  }

  // Remove any trailing dangling comma or colon
  result = result.replace(/[,:\s]+$/, '');

  // Close remaining open brackets / braces in reverse order
  while (stack.length > 0) {
    const open = stack.pop();
    if (open === '{') result += '}';
    if (open === '[') result += ']';
  }

  return result;
}

/**
 * Validates if parsed object is or can be normalized to an RppDocument
 */
export function isValidRppStructure(obj: any): boolean {
  if (!obj || typeof obj !== 'object') return false;
  // Check for common RPP properties
  return (
    Boolean(obj.identitas) ||
    Boolean(obj.desainPembelajaran) ||
    Boolean(obj.pengalamanBelajar) ||
    Boolean(obj.tujuanPembelajaran) ||
    Boolean(obj.mataPelajaran) ||
    Boolean(obj.topikPembelajaran) ||
    Boolean(obj.materiAsli)
  );
}

/**
 * Parse an RPP JSON and return a normalized RppDocument
 */
export function parseAndNormalizeRppJson(jsonString: string): {
  success: boolean;
  document?: RppDocument;
  error?: string;
} {
  const parsedResult = robustJsonParse(jsonString);
  if (!parsedResult.success) {
    return {
      success: false,
      error: `Format JSON tidak valid: ${parsedResult.error}`,
    };
  }

  const raw = parsedResult.data;
  if (!isValidRppStructure(raw)) {
    return {
      success: false,
      error: 'Data JSON tidak memiliki struktur RPP / Modul Ajar yang dikenali (kurang elemen identitas/desain/pengalaman belajar).',
    };
  }

  const normalized = normalizeRppDocument(raw, raw.materiAsli || raw.materi || 'Materi dari berkas JSON', {
    namaSekolah: raw.identitas?.namaSatuanPendidikan,
    namaGuru: raw.identitas?.namaGuru,
    nipGuru: raw.identitas?.nipGuru,
    mataPelajaran: raw.identitas?.mataPelajaran,
    faseKelasSemester: raw.identitas?.faseKelasSemester,
    topikPembelajaran: raw.identitas?.topikPembelajaran,
    alokasiWaktu: raw.identitas?.alokasiWaktu,
    tahunPelajaran: raw.identitas?.tahunPelajaran,
  });

  const doc: RppDocument = {
    id: raw.id || `rpp-${Date.now()}`,
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    materiAsli: raw.materiAsli || raw.materi || 'Impor dari Berkas JSON RPP',
    identitas: normalized.identitas,
    identifikasi: normalized.identifikasi,
    desainPembelajaran: normalized.desainPembelajaran,
    pengalamanBelajar: normalized.pengalamanBelajar,
    asesmenPembelajaran: normalized.asesmenPembelajaran,
    lampiran: normalized.lampiran,
  };

  return {
    success: true,
    document: doc,
  };
}

/**
 * Download an RPP document as a formatted JSON file
 */
export function exportRppToJsonFile(doc: RppDocument): void {
  const jsonString = JSON.stringify(doc, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const filename = `RPP_${(doc.identitas.mataPelajaran || 'Mapel').replace(/[^a-zA-Z0-9]/g, '_')}_${(
    doc.identitas.topikPembelajaran || 'Topik'
  )
    .substring(0, 30)
    .replace(/[^a-zA-Z0-9]/g, '_')}.json`;

  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download all RPP documents as a single JSON backup file
 */
export function exportAllRppBackupToJson(docs: RppDocument[]): void {
  const backup = {
    app: 'RPP Pintar - Generator RPP Kurikulum Merdeka AI',
    exportedAt: new Date().toISOString(),
    totalDocuments: docs.length,
    documents: docs,
  };
  const jsonString = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const filename = `Backup_RPP_Pintar_${new Date().toISOString().split('T')[0]}.json`;

  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
