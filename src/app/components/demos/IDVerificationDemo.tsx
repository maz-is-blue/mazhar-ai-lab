import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileSearch, Cpu, CheckCircle, Shield, RotateCcw } from "lucide-react";

const STAGES = [
  { label: "Document Upload", icon: Upload, detail: "Reading image data..." },
  { label: "Preprocessing", icon: FileSearch, detail: "Normalizing & denoising..." },
  { label: "SegFormer Segmentation", icon: Cpu, detail: "Segmenting document regions..." },
  { label: "OCR Extraction", icon: FileSearch, detail: "Reading text fields..." },
  { label: "Field Detection", icon: Shield, detail: "Mapping to schema..." },
  { label: "Verification", icon: CheckCircle, detail: "Validating integrity..." },
];

const FIELDS = [
  { label: "Full Name", value: "Jordan R. Mitchell", confidence: 99 },
  { label: "Date of Birth", value: "14 / 03 / 1989", confidence: 98 },
  { label: "ID Number", value: "XJ-7842-2031", confidence: 97 },
  { label: "Nationality", value: "United Kingdom", confidence: 99 },
  { label: "Expiry Date", value: "14 / 03 / 2029", confidence: 96 },
  { label: "Gender", value: "Male", confidence: 100 },
];

export function IDVerificationDemo() {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [step, setStep] = useState(-1);
  const [fieldsShown, setFieldsShown] = useState(0);

  useEffect(() => {
    if (phase !== "running") return;
    if (step < STAGES.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), 750);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setPhase("done");
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setFieldsShown(i);
          if (i >= FIELDS.length) clearInterval(interval);
        }, 250);
      }, 750);
      return () => clearTimeout(t);
    }
  }, [phase, step]);

  const start = () => {
    setPhase("running");
    setStep(0);
  };

  const reset = () => {
    setPhase("idle");
    setStep(-1);
    setFieldsShown(0);
  };

  return (
    <div className="space-y-6">
      {/* Mock ID Card */}
      <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-violet-900/10 p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-3 flex-shrink-0">
            <span className="text-2xl">🪪</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">
              National ID Document
            </div>
            {phase === "idle" ? (
              <div className="space-y-2">
                <div className="h-3.5 w-36 rounded bg-white/5 border border-white/5" />
                <div className="h-3 w-28 rounded bg-white/5 border border-white/5" />
                <div className="h-3 w-24 rounded bg-white/5 border border-white/5" />
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="font-bold text-white">Jordan R. Mitchell</div>
                <div className="text-sm text-gray-400">DOB: 14/03/1989 · ID: XJ-7842-2031</div>
                <div className="text-sm text-gray-400">Expires: 14/03/2029</div>
              </motion.div>
            )}
          </div>
          {phase === "done" && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-shrink-0">
              <div className="flex items-center gap-1.5 rounded-full bg-green-500/20 border border-green-500/30 px-3 py-1.5">
                <CheckCircle size={13} className="text-green-400" />
                <span className="text-green-400 text-xs font-bold">VERIFIED</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Pipeline */}
      <div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
          Processing Pipeline
        </div>
        <div className="space-y-2">
          {STAGES.map((s, i) => {
            const active = i === step && phase === "running";
            const done = (i < step && phase === "running") || phase === "done";
            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 border transition-all duration-300 ${
                  done
                    ? "border-green-500/30 bg-green-500/5"
                    : active
                    ? "border-blue-500/40 bg-blue-500/10"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    done ? "bg-green-500/20" : active ? "bg-blue-500/20" : "bg-white/5"
                  }`}
                >
                  {done ? (
                    <CheckCircle size={14} className="text-green-400" />
                  ) : (
                    <s.icon
                      size={14}
                      className={active ? "text-blue-400" : "text-gray-600"}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-sm font-medium ${
                      done ? "text-green-400" : active ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {s.label}
                  </span>
                  {active && (
                    <div className="text-xs text-blue-400">{s.detail}</div>
                  )}
                </div>
                {active && (
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Extracted Fields */}
      <AnimatePresence>
        {phase === "done" && fieldsShown > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Extracted Fields
            </div>
            <div className="grid grid-cols-2 gap-2">
              {FIELDS.slice(0, fieldsShown).map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-white/5 border border-white/10 p-3"
                >
                  <div className="text-xs text-gray-500 mb-1">{f.label}</div>
                  <div className="font-semibold text-sm text-white mb-2">{f.value}</div>
                  <div className="h-1 rounded-full bg-black/40 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${f.confidence}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {f.confidence}% confidence
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="flex gap-3 pt-2">
        {phase === "idle" && (
          <motion.button
            onClick={start}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 font-semibold text-white text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Upload size={16} />
            Analyze Document
          </motion.button>
        )}
        {phase === "running" && (
          <div className="flex items-center gap-3 text-blue-400 text-sm font-semibold py-3">
            <motion.div
              className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            />
            Analyzing...
          </div>
        )}
        {phase === "done" && (
          <motion.button
            onClick={reset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw size={16} />
            Run Again
          </motion.button>
        )}
      </div>
    </div>
  );
}
