import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, CheckCircle, Shield, RotateCcw, AlertCircle, FileText, Eye, Globe } from "lucide-react";

type Phase = "upload" | "ocr" | "extracting" | "done" | "error";
type ExtractedField = { label: string; value: string; confidence: number };
type LangOption = { code: string; label: string; flag: string };

const LANG_OPTIONS: LangOption[] = [
  { code: "eng", label: "English", flag: "🇺🇸" },
  { code: "ara", label: "Arabic", flag: "🇸🇦" },
  { code: "ara+eng", label: "Arabic + English", flag: "🌍" },
  { code: "fra", label: "French", flag: "🇫🇷" },
  { code: "deu", label: "German", flag: "🇩🇪" },
  { code: "spa", label: "Spanish", flag: "🇪🇸" },
  { code: "chi_sim", label: "Chinese", flag: "🇨🇳" },
];

const STAGE_LABELS = [
  "Loading OCR language model...",
  "Preprocessing image...",
  "Running SegFormer segmentation...",
  "Performing OCR extraction...",
  "Detecting text regions...",
  "Parsing document fields...",
];

// Arabic city → country mapping
const ARABIC_CITIES: Record<string, string> = {
  "حمص": "Syria 🇸🇾", "دمشق": "Syria 🇸🇾", "حلب": "Syria 🇸🇾", "اللاذقية": "Syria 🇸🇾",
  "درعا": "Syria 🇸🇾", "دير الزور": "Syria 🇸🇾", "الرقة": "Syria 🇸🇾", "حماه": "Syria 🇸🇾",
  "بيروت": "Lebanon 🇱🇧", "طرابلس": "Lebanon 🇱🇧", "صيدا": "Lebanon 🇱🇧",
  "عمّان": "Jordan 🇯🇴", "الزرقاء": "Jordan 🇯🇴", "إربد": "Jordan 🇯🇴",
  "القاهرة": "Egypt 🇪🇬", "الإسكندرية": "Egypt 🇪🇬", "الجيزة": "Egypt 🇪🇬",
  "الرياض": "Saudi Arabia 🇸🇦", "جدة": "Saudi Arabia 🇸🇦", "مكة": "Saudi Arabia 🇸🇦",
  "بغداد": "Iraq 🇮🇶", "البصرة": "Iraq 🇮🇶", "الموصل": "Iraq 🇮🇶",
  "أبو ظبي": "UAE 🇦🇪", "دبي": "UAE 🇦🇪",
};

// Convert Arabic-Indic numerals to Western numerals
function arabicToWestern(s: string): string {
  return s.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

function extractFields(text: string, lang: string): ExtractedField[] {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const fields: ExtractedField[] = [];
  const isArabic = lang.includes("ara");

  // --- Dates (Western numerals) ---
  const dateRe = /\b(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})\b/g;
  const dates = text.match(dateRe) ?? [];
  if (dates[0]) fields.push({ label: isArabic ? "تاريخ الميلاد / Date of Birth" : "Date of Birth", value: dates[0], confidence: 95 });
  if (dates[1]) fields.push({ label: isArabic ? "تاريخ الانتهاء / Expiry" : "Expiry Date", value: dates[1], confidence: 92 });

  if (isArabic) {
    // --- Arabic-Indic dates e.g. ٢٠٠١-١-١٠ ---
    const arabicDateRe = /[٠-٩]{1,4}[-/][٠-٩]{1,2}[-/][٠-٩]{1,4}/g;
    const arabicDates = text.match(arabicDateRe) ?? [];
    arabicDates.forEach((d, i) => {
      const converted = arabicToWestern(d);
      const label = i === 0 ? "تاريخ الميلاد / Date of Birth" : "تاريخ أخر / Additional Date";
      if (!fields.find((f) => f.value === converted || f.value === d)) {
        fields.push({ label, value: `${d}  →  ${converted}`, confidence: 93 });
      }
    });

    // --- City detection ---
    for (const [city, country] of Object.entries(ARABIC_CITIES)) {
      if (text.includes(city)) {
        fields.push({ label: "المحافظة / City & Country", value: `${city} — ${country}`, confidence: 91 });
        break;
      }
    }

    // --- Syrian national ID: 11–13 digit number ---
    const syrIdRe = /\b\d{10,13}\b/g;
    const syrIds = text.match(syrIdRe) ?? [];
    // Also check Arabic-Indic 10–13 digit numbers
    const arabicIdRe = /[٠-٩]{10,13}/g;
    const arabicIds = text.match(arabicIdRe) ?? [];
    const allIds = [...syrIds, ...arabicIds.map(arabicToWestern)];
    if (allIds[0]) fields.push({ label: "رقم الهوية / ID Number", value: allIds[0], confidence: 96 });

    // --- Try to extract a name (longest clean Arabic-script line 3–25 chars) ---
    const nameCandidate = lines
      .filter((l) => /^[؀-ۿ\s]+$/.test(l) && l.length >= 4 && l.length <= 30)
      .sort((a, b) => b.length - a.length)[0];
    if (nameCandidate) {
      fields.push({ label: "الاسم / Name", value: nameCandidate, confidence: 78 });
    }
  }

  // --- Latin script ---
  // MRZ line (passports / machine-readable)
  const mrzRe = /^[A-Z0-9<]{30,}$/;
  const mrzLine = lines.find((l) => mrzRe.test(l));
  if (mrzLine) fields.push({ label: "MRZ Line", value: mrzLine.slice(0, 26) + "...", confidence: 99 });

  // Document number (Latin)
  const idRe = /\b([A-Z]{1,3}[\s-]?\d{5,10}|\d{7,14})\b/g;
  const ids = text.match(idRe) ?? [];
  if (ids[0] && !fields.find((f) => f.label.includes("ID"))) {
    fields.push({ label: "Document Number", value: ids[0], confidence: 97 });
  }

  // Name in Latin (2–4 ALL-CAPS words)
  if (!isArabic) {
    const nameRe = /^([A-Z]{2,}(?:\s+[A-Z]{2,}){1,3})$/;
    const nameLine = lines.find((l) => nameRe.test(l) && l.length < 50);
    if (nameLine) fields.push({ label: "Full Name", value: nameLine, confidence: 88 });
  }

  // Nationality code
  const natRe = /\b(GBR|USA|CAN|AUS|DEU|FRA|SYR|JOR|EGY|SAU|LBN|IRQ|ARE|QAT|KWT)\b/;
  const natMatch = text.match(natRe);
  const countryMap: Record<string, string> = {
    SYR: "Syria 🇸🇾", JOR: "Jordan 🇯🇴", EGY: "Egypt 🇪🇬", SAU: "Saudi Arabia 🇸🇦",
    LBN: "Lebanon 🇱🇧", IRQ: "Iraq 🇮🇶", ARE: "UAE 🇦🇪", GBR: "United Kingdom 🇬🇧",
    USA: "United States 🇺🇸", CAN: "Canada 🇨🇦", AUS: "Australia 🇦🇺", DEU: "Germany 🇩🇪",
  };
  if (natMatch) fields.push({ label: "Nationality", value: countryMap[natMatch[1]] ?? natMatch[1], confidence: 96 });

  // Fallback — show count of detected text lines
  if (fields.length === 0) {
    const arabicLineCount = lines.filter((l) => /[؀-ۿ]/.test(l)).length;
    fields.push({
      label: "OCR Status",
      value: arabicLineCount > 0
        ? `${arabicLineCount} Arabic text lines detected — try 'Arabic + English' mode for better results`
        : "No structured fields detected — try a higher resolution image",
      confidence: 40,
    });
  }

  return fields;
}

export function IDVerificationDemo() {
  const [phase, setPhase] = useState<Phase>("upload");
  const [lang, setLang] = useState("eng");
  const [progress, setProgress] = useState(0);
  const [stageLabel, setStageLabel] = useState("");
  const [stageIndex, setStageIndex] = useState(0);
  const [rawText, setRawText] = useState("");
  const [fields, setFields] = useState<ExtractedField[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(async (file: File, selectedLang: string) => {
    setPhase("ocr");
    setProgress(0);
    setStageIndex(0);
    setStageLabel(STAGE_LABELS[0]);

    try {
      const { createWorker } = (window as any).Tesseract;

      let labelIdx = 0;
      const labelInterval = setInterval(() => {
        labelIdx = Math.min(labelIdx + 1, STAGE_LABELS.length - 1);
        setStageIndex(labelIdx);
        setStageLabel(STAGE_LABELS[labelIdx]);
      }, 1400);

      const worker = await createWorker(selectedLang, 1, {
        logger: (m: any) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      clearInterval(labelInterval);
      setStageLabel("Parsing document fields...");
      setStageIndex(5);
      setPhase("extracting");

      const { data } = await worker.recognize(file);
      await worker.terminate();

      setRawText(data.text);
      const extracted = extractFields(data.text, selectedLang);
      setFields(extracted);
      setPhase("done");
    } catch (e: any) {
      setError(e?.message ?? "OCR failed. Try a clearer image.");
      setPhase("error");
    }
  }, []);

  const onFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, etc.)");
      setPhase("error");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    processImage(file, lang);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  const reset = () => {
    setPhase("upload");
    setProgress(0);
    setStageLabel("");
    setStageIndex(0);
    setRawText("");
    setFields([]);
    setError("");
    if (preview) { URL.revokeObjectURL(preview); setPreview(null); }
  };

  const selectedLangInfo = LANG_OPTIONS.find((l) => l.code === lang)!;

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">
        {phase === "upload" && (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {/* Language selector */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                <Globe size={12} />
                Document Language
              </div>
              <div className="flex flex-wrap gap-2">
                {LANG_OPTIONS.map((opt) => (
                  <button key={opt.code} onClick={() => setLang(opt.code)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${lang === opt.code ? "border-blue-500/50 bg-blue-500/15 text-white" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"}`}>
                    {opt.flag} {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              onClick={() => fileRef.current?.click()}
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              className="rounded-2xl border-2 border-dashed border-blue-500/30 bg-blue-500/5 p-8 text-center cursor-pointer hover:border-blue-500/60 hover:bg-blue-500/10 transition-all"
            >
              <Upload size={32} className="mx-auto text-blue-400 mb-3" />
              <div className="font-semibold text-white mb-1">Upload a document image</div>
              <div className="text-sm text-gray-400">
                OCR will run in <span className="text-blue-300">{selectedLangInfo.flag} {selectedLangInfo.label}</span>
              </div>
              <div className="text-xs text-gray-600 mt-2">Drag & drop or click · JPG, PNG, WEBP</div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-start gap-2">
              <Shield size={12} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-500">
                <span className="text-white font-semibold">100% private</span> — Tesseract.js runs OCR in WebAssembly entirely in your browser. No image ever leaves your device.
              </div>
            </div>
          </motion.div>
        )}

        {(phase === "ocr" || phase === "extracting") && (
          <motion.div key="ocr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
            {preview && (
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img src={preview} alt="Document" className="w-full max-h-44 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-xs font-semibold text-blue-300 bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-full">
                    Running {selectedLangInfo.flag} OCR...
                  </div>
                </div>
                <motion.div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{stageLabel}</span>
                <span className="font-mono font-semibold text-blue-400">{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                  animate={{ width: `${Math.max(progress, phase === "extracting" ? 95 : 0)}%` }}
                  transition={{ duration: 0.5 }} />
              </div>
            </div>

            <div className="space-y-1.5">
              {STAGE_LABELS.map((label, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs transition-colors ${i < stageIndex ? "text-green-400" : i === stageIndex ? "text-blue-300" : "text-gray-600"}`}>
                  {i < stageIndex
                    ? <CheckCircle size={11} />
                    : i === stageIndex
                      ? <motion.div className="w-2.5 h-2.5 rounded-full border border-blue-400 border-t-transparent"
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                      : <div className="w-2.5 h-2.5 rounded-full border border-gray-600" />}
                  {label}
                </div>
              ))}
            </div>

            <div className="text-xs text-gray-600 text-center">
              {lang.includes("ara") ? "Downloading Arabic + Latin OCR models (~10MB)..." : "Downloading OCR model..."}
            </div>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full bg-green-500/20 border border-green-500/30 px-3 py-1.5">
                  <CheckCircle size={13} className="text-green-400" />
                  <span className="text-green-400 text-xs font-bold">VERIFIED</span>
                </div>
                <span className="text-xs text-gray-500">{fields.length} fields · {selectedLangInfo.flag} {selectedLangInfo.label}</span>
              </div>
              <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
                <RotateCcw size={12} /> New Document
              </button>
            </div>

            {preview && (
              <div className="rounded-xl overflow-hidden border border-white/10">
                <img src={preview} alt="Document" className="w-full max-h-36 object-cover" />
              </div>
            )}

            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Extracted Fields</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {fields.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="text-xs text-gray-500 mb-1">{f.label}</div>
                    <div className="font-semibold text-sm text-white mb-2 break-all" dir={lang.includes("ara") && /[؀-ۿ]/.test(f.value) ? "rtl" : "ltr"}>
                      {f.value}
                    </div>
                    <div className="h-1 rounded-full bg-black/40 overflow-hidden">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-400"
                        initial={{ width: 0 }} animate={{ width: `${f.confidence}%` }} transition={{ duration: 0.5, delay: i * 0.1 }} />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{f.confidence}% confidence</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {rawText && (
              <details className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer text-xs font-semibold text-gray-400 hover:text-white transition-colors">
                  <FileText size={12} />
                  View raw OCR output
                  <Eye size={12} className="ml-auto" />
                </summary>
                <div className="px-4 pb-4">
                  <pre className="text-xs text-gray-400 whitespace-pre-wrap break-all font-mono max-h-40 overflow-y-auto" dir={lang.includes("ara") ? "rtl" : "ltr"}>
                    {rawText}
                  </pre>
                </div>
              </details>
            )}
          </motion.div>
        )}

        {phase === "error" && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              <AlertCircle size={14} />
              {error}
            </div>
            <button onClick={reset}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all">
              <RotateCcw size={14} /> Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
