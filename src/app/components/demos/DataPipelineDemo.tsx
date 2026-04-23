import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Database, Cloud, Zap, CheckCircle, BarChart3, PlayCircle, StopCircle, RotateCcw } from "lucide-react";

const STAGES = [
  { label: "Data Sources", icon: Database, color: "from-slate-500 to-slate-600" },
  { label: "Dataflow", icon: Cloud, color: "from-violet-500 to-violet-600" },
  { label: "Transform", icon: Zap, color: "from-blue-500 to-blue-600" },
  { label: "Quality Check", icon: CheckCircle, color: "from-amber-500 to-amber-600" },
  { label: "BigQuery", icon: Database, color: "from-green-500 to-green-600" },
  { label: "Analytics", icon: BarChart3, color: "from-cyan-500 to-cyan-600" },
];

interface Metrics {
  rows: number;
  throughput: number;
  elapsed: number;
}

export function DataPipelineDemo() {
  const [running, setRunning] = useState(false);
  const [metrics, setMetrics] = useState<Metrics>({ rows: 0, throughput: 0, elapsed: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setMetrics((m) => ({
          rows: m.rows + Math.floor(Math.random() * 4000 + 1500),
          throughput: Math.floor(Math.random() * 200 + 120),
          elapsed: m.elapsed + 1,
        }));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const stop = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setMetrics({ rows: 0, throughput: 0, elapsed: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Flow */}
      <div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
          ETL Pipeline Flow
        </div>
        <div className="relative pb-4">
          {/* Connector line */}
          <div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-slate-700 via-violet-600/40 to-cyan-700/40" />

          {/* Animated data packets */}
          {running &&
            [0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-[30px] w-2.5 h-2.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/60 -translate-y-1/2 z-10"
                initial={{ left: "2rem" }}
                animate={{ left: "calc(100% - 2rem)" }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "linear",
                }}
              />
            ))}

          <div className="relative grid grid-cols-6 gap-1">
            {STAGES.map((stage, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <motion.div
                  className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-lg`}
                  animate={
                    running
                      ? {
                          boxShadow: [
                            "0 0 0px rgba(139,92,246,0)",
                            "0 0 18px rgba(139,92,246,0.35)",
                            "0 0 0px rgba(139,92,246,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
                >
                  <stage.icon size={22} className="text-white" />
                </motion.div>
                <div className="text-center">
                  <div className="text-[10px] font-semibold text-gray-400 leading-tight text-center">
                    {stage.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Metrics */}
      <div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
          Live Metrics
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Rows Processed",
              value: metrics.rows.toLocaleString(),
              suffix: "",
              color: "text-blue-400",
            },
            {
              label: "Throughput",
              value: running ? metrics.throughput.toString() : "0",
              suffix: "/s",
              color: "text-violet-400",
            },
            {
              label: "Success Rate",
              value: "99.9",
              suffix: "%",
              color: "text-green-400",
            },
            {
              label: "Elapsed",
              value: metrics.elapsed.toString(),
              suffix: "s",
              color: "text-amber-400",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/5 border border-white/10 p-4 text-center"
            >
              <div className={`text-2xl font-bold font-mono ${m.color}`}>
                {m.value}
                <span className="text-sm text-gray-500">{m.suffix}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Activity Bars */}
      <AnimatePresence>
        {running && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Stage Activity
            </div>
            <div className="space-y-2.5">
              {STAGES.map((stage, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-gray-400 flex-shrink-0 truncate">
                    {stage.label}
                  </div>
                  <div className="flex-1 h-1.5 rounded-full bg-black/40 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${stage.color}`}
                      animate={{ width: ["10%", "95%", "10%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex gap-3 pt-2">
        {!running ? (
          <motion.button
            onClick={() => setRunning(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 font-semibold text-white text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <PlayCircle size={16} />
            Start Pipeline
          </motion.button>
        ) : (
          <motion.button
            onClick={stop}
            className="flex items-center gap-2 rounded-xl bg-red-500/20 border border-red-500/30 px-6 py-3 font-semibold text-red-400 text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <StopCircle size={16} />
            Stop
          </motion.button>
        )}
        {metrics.rows > 0 && !running && (
          <motion.button
            onClick={reset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw size={16} />
            Reset
          </motion.button>
        )}
      </div>
    </div>
  );
}
