import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Database, Cloud, Zap, CheckCircle, BarChart3, PlayCircle, RotateCcw, AlertCircle, Thermometer, Wind, Droplets } from "lucide-react";

type RawRecord = { time: string; temp: number | null; precip: number | null; wind: number | null };
type DayStats = { date: string; minTemp: number; maxTemp: number; avgTemp: number; avgPrecip: number; avgWind: number; records: number };

type PipelineState = {
  status: "idle" | "fetching" | "validating" | "transforming" | "aggregating" | "done" | "error";
  rawCount: number;
  validCount: number;
  rawSample: RawRecord[];
  dayStats: DayStats[];
  error: string;
  city: string;
  lat: number;
  lon: number;
};

const CITIES = [
  { name: "New York", lat: 40.71, lon: -74.01, tz: "America/New_York" },
  { name: "London", lat: 51.51, lon: -0.13, tz: "Europe/London" },
  { name: "Tokyo", lat: 35.68, lon: 139.69, tz: "Asia/Tokyo" },
  { name: "Sydney", lat: -33.87, lon: 151.21, tz: "Australia/Sydney" },
  { name: "Dubai", lat: 25.2, lon: 55.27, tz: "Asia/Dubai" },
];

const STAGES = [
  { label: "Ingest", icon: Database, key: "fetching", color: "from-slate-500 to-slate-600" },
  { label: "Validate", icon: CheckCircle, key: "validating", color: "from-amber-500 to-amber-600" },
  { label: "Transform", icon: Zap, key: "transforming", color: "from-blue-500 to-blue-600" },
  { label: "Aggregate", icon: Cloud, key: "aggregating", color: "from-violet-500 to-violet-600" },
  { label: "Output", icon: BarChart3, key: "done", color: "from-green-500 to-green-600" },
];

async function runPipeline(city: { name: string; lat: number; lon: number; tz: string }): Promise<{
  rawSample: RawRecord[]; rawCount: number; validCount: number; dayStats: DayStats[];
}> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&hourly=temperature_2m,precipitation_probability,windspeed_10m&past_days=5&forecast_days=0&timezone=${encodeURIComponent(city.tz)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather data");
  const json = await res.json();
  const times: string[] = json.hourly.time;
  const temps: (number | null)[] = json.hourly.temperature_2m;
  const precips: (number | null)[] = json.hourly.precipitation_probability;
  const winds: (number | null)[] = json.hourly.windspeed_10m;

  const rawRecords: RawRecord[] = times.map((t, i) => ({
    time: t, temp: temps[i], precip: precips[i], wind: winds[i],
  }));

  const rawSample = rawRecords.slice(0, 6);
  const rawCount = rawRecords.length;

  // Validate: drop nulls
  const valid = rawRecords.filter((r) => r.temp != null && r.precip != null && r.wind != null) as Required<RawRecord>[];
  const validCount = valid.length;

  // Transform: group by day
  const byDay: Record<string, Required<RawRecord>[]> = {};
  for (const r of valid) {
    const day = r.time.slice(0, 10);
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(r);
  }

  // Aggregate: compute daily stats
  const dayStats: DayStats[] = Object.entries(byDay).map(([date, recs]) => {
    const temps = recs.map((r) => r.temp);
    const precips = recs.map((r) => r.precip);
    const winds = recs.map((r) => r.wind);
    const avg = (arr: number[]) => Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;
    return {
      date,
      minTemp: Math.round(Math.min(...temps) * 10) / 10,
      maxTemp: Math.round(Math.max(...temps) * 10) / 10,
      avgTemp: avg(temps),
      avgPrecip: Math.round(avg(precips)),
      avgWind: avg(winds),
      records: recs.length,
    };
  });

  return { rawSample, rawCount, validCount, dayStats };
}

const INITIAL: PipelineState = { status: "idle", rawCount: 0, validCount: 0, rawSample: [], dayStats: [], error: "", city: "", lat: 0, lon: 0 };

export function DataPipelineDemo() {
  const [state, setState] = useState<PipelineState>(INITIAL);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const cancelRef = useRef(false);

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const runPipelineAnimated = async () => {
    cancelRef.current = false;
    setState({ ...INITIAL, status: "fetching", city: selectedCity.name, lat: selectedCity.lat, lon: selectedCity.lon });

    try {
      const result = await runPipeline(selectedCity);
      if (cancelRef.current) return;

      setState((s) => ({ ...s, status: "validating", rawCount: result.rawCount, rawSample: result.rawSample }));
      await delay(900);
      if (cancelRef.current) return;

      setState((s) => ({ ...s, status: "transforming", validCount: result.validCount }));
      await delay(900);
      if (cancelRef.current) return;

      setState((s) => ({ ...s, status: "aggregating" }));
      await delay(900);
      if (cancelRef.current) return;

      setState((s) => ({ ...s, status: "done", dayStats: result.dayStats }));
    } catch (e: any) {
      setState((s) => ({ ...s, status: "error", error: e.message ?? "Unknown error" }));
    }
  };

  const reset = () => { cancelRef.current = true; setState(INITIAL); };

  const activeStageIndex = STAGES.findIndex((s) => s.key === state.status);
  const doneStages = STAGES.filter((s, i) => {
    if (state.status === "done") return true;
    return i < activeStageIndex;
  });

  return (
    <div className="space-y-6">
      {/* City selector */}
      {state.status === "idle" && (
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Select City</div>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <button key={c.name} onClick={() => setSelectedCity(c)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${selectedCity.name === c.name ? "border-violet-500/50 bg-violet-500/15 text-white" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"}`}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pipeline stages */}
      <div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
          ETL Pipeline {state.city ? `— ${state.city} Weather Data` : ""}
        </div>
        <div className="relative pb-2">
          <div className="absolute top-7 left-7 right-7 h-px bg-gradient-to-r from-slate-700 via-violet-600/40 to-green-700/40" />
          {state.status !== "idle" && state.status !== "error" &&
            [0, 1, 2].map((i) => (
              <motion.div key={i}
                className="absolute top-[27px] w-2.5 h-2.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/60 -translate-y-1/2 z-10"
                initial={{ left: "1.75rem" }}
                animate={{ left: "calc(100% - 1.75rem)" }}
                transition={{ duration: 2.2, repeat: state.status === "done" ? 0 : Infinity, delay: i * 0.75, ease: "linear" }} />
            ))}
          <div className="relative grid grid-cols-5 gap-1">
            {STAGES.map((stage, i) => {
              const isDone = doneStages.includes(stage) || state.status === "done";
              const isActive = stage.key === state.status;
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <motion.div
                    className={`h-14 w-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg ${isDone ? "from-green-600 to-emerald-500" : isActive ? stage.color : "from-gray-700 to-gray-800"}`}
                    animate={isActive ? { boxShadow: ["0 0 0px rgba(139,92,246,0)", "0 0 20px rgba(139,92,246,0.4)", "0 0 0px rgba(139,92,246,0)"] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}>
                    <stage.icon size={20} className="text-white" />
                  </motion.div>
                  <div className="text-[10px] font-semibold text-center leading-tight"
                    style={{ color: isDone ? "#34d399" : isActive ? "#a78bfa" : "#4b5563" }}>
                    {stage.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live stage detail */}
      <AnimatePresence mode="wait">
        {state.status === "fetching" && (
          <motion.div key="fetching" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
            <div className="flex items-center gap-2 text-sm text-violet-300 mb-2">
              <motion.div className="w-3 h-3 rounded-full border border-violet-400 border-t-transparent"
                animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
              Fetching 5-day hourly weather data from Open-Meteo API...
            </div>
            <code className="text-xs text-gray-500 break-all">GET api.open-meteo.com · lat={selectedCity.lat} lon={selectedCity.lon}</code>
          </motion.div>
        )}

        {state.status === "validating" && (
          <motion.div key="validating" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">Raw Data Sample ({state.rawCount} records ingested)</div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead><tr className="text-gray-500 border-b border-white/5">
                  <td className="pb-1 pr-3">Timestamp</td><td className="pb-1 pr-3">Temp (°C)</td><td className="pb-1 pr-3">Precip %</td><td className="pb-1">Wind km/h</td>
                </tr></thead>
                <tbody>
                  {state.rawSample.map((r, i) => (
                    <tr key={i} className="border-b border-white/5 text-gray-300">
                      <td className="py-1 pr-3">{r.time.replace("T", " ")}</td>
                      <td className="py-1 pr-3">{r.temp ?? <span className="text-red-400">null</span>}</td>
                      <td className="py-1 pr-3">{r.precip ?? <span className="text-red-400">null</span>}</td>
                      <td className="py-1">{r.wind ?? <span className="text-red-400">null</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {state.status === "transforming" && (
          <motion.div key="transforming" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-2">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">Validation Complete</div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div><div className="text-xl font-bold text-white">{state.rawCount}</div><div className="text-xs text-gray-500">Records ingested</div></div>
              <div><div className="text-xl font-bold text-green-400">{state.validCount}</div><div className="text-xs text-gray-500">Records valid</div></div>
              <div><div className="text-xl font-bold text-red-400">{state.rawCount - state.validCount}</div><div className="text-xs text-gray-500">Nulls dropped</div></div>
            </div>
            <div className="text-xs text-blue-300 mt-2">Transforming: grouping by date, computing hourly stats...</div>
          </motion.div>
        )}

        {state.status === "aggregating" && (
          <motion.div key="aggregating" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
            <div className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">Aggregating daily statistics...</div>
            <div className="space-y-1.5">
              {["min/max/avg temperature", "precipitation probability", "wind speed"].map((op) => (
                <motion.div key={op} className="flex items-center gap-2 text-xs text-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                  Aggregating {op} per day
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {state.status === "done" && state.dayStats.length > 0 && (
          <motion.div key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Pipeline Output — {state.city} · {state.dayStats.length} days processed
            </div>
            <div className="space-y-2">
              {state.dayStats.map((day, i) => (
                <motion.div key={day.date} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-white">{new Date(day.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div>
                    <div className="text-xs text-gray-500">{day.records} hourly records</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-1.5">
                      <Thermometer size={12} className="text-orange-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white">{day.minTemp}° – {day.maxTemp}°C</div>
                        <div className="text-[10px] text-gray-500">avg {day.avgTemp}°C</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Droplets size={12} className="text-blue-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white">{day.avgPrecip}%</div>
                        <div className="text-[10px] text-gray-500">precipitation</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wind size={12} className="text-cyan-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white">{day.avgWind} km/h</div>
                        <div className="text-[10px] text-gray-500">wind speed</div>
                      </div>
                    </div>
                  </div>
                  {/* Temp bar */}
                  <div className="mt-2 h-1 rounded-full bg-black/40 overflow-hidden">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-orange-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(10, ((day.avgTemp + 20) / 60) * 100))}%` }}
                      transition={{ duration: 0.6, delay: i * 0.08 }} />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-xs text-gray-600 text-center">Live data · Open-Meteo API · No API key required</div>
          </motion.div>
        )}

        {state.status === "error" && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            <AlertCircle size={14} />
            {state.error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex gap-3 pt-1">
        {state.status === "idle" && (
          <motion.button onClick={runPipelineAnimated}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 font-semibold text-white text-sm"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <PlayCircle size={16} />
            Run Pipeline — {selectedCity.name}
          </motion.button>
        )}
        {(state.status !== "idle") && (
          <motion.button onClick={reset} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white text-sm"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <RotateCcw size={16} />
            Reset
          </motion.button>
        )}
      </div>
    </div>
  );
}
