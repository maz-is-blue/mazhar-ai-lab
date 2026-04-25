import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Leaf, AlertCircle } from "lucide-react";

type NutritionData = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  grade: string;
  health: number;
};

const GRADE_SCORE: Record<string, number> = { a: 95, b: 82, c: 67, d: 48, e: 28, unknown: 55 };
const GRADE_LABEL: Record<string, string> = { a: "Excellent", b: "Good", c: "Fair", d: "Poor", e: "Very Poor", unknown: "Unrated" };

function gradeColor(g: string) {
  if (g === "a") return "from-green-500 to-emerald-400";
  if (g === "b") return "from-lime-500 to-green-400";
  if (g === "c") return "from-amber-500 to-yellow-400";
  if (g === "d") return "from-orange-500 to-red-400";
  return "from-red-600 to-red-400";
}

async function fetchNutrition(query: string): Promise<NutritionData | null> {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&action=process&json=true&fields=product_name,nutriments,nutriscore_grade,nutrition_grades&page_size=8&search_simple=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  const products: any[] = data.products ?? [];
  const product = products.find(
    (p) => p.nutriments && (p.nutriments["energy-kcal_100g"] != null || p.nutriments["energy_100g"] != null)
  );
  if (!product) return null;
  const n = product.nutriments;
  const rawGrade = (product.nutriscore_grade || product.nutrition_grades || "").toLowerCase().trim().charAt(0);
  const grade = ["a", "b", "c", "d", "e"].includes(rawGrade) ? rawGrade : "unknown";
  const kcal = n["energy-kcal_100g"] ?? Math.round((n["energy_100g"] ?? 0) / 4.184);
  return {
    name: product.product_name || query,
    calories: Math.round(kcal),
    protein: Math.round((n["proteins_100g"] ?? 0) * 10) / 10,
    carbs: Math.round((n["carbohydrates_100g"] ?? 0) * 10) / 10,
    fat: Math.round((n["fat_100g"] ?? 0) * 10) / 10,
    fiber: Math.round((n["fiber_100g"] ?? 0) * 10) / 10,
    sugar: Math.round((n["sugars_100g"] ?? 0) * 10) / 10,
    sodium: Math.round((n["sodium_100g"] ?? 0) * 1000),
    grade,
    health: GRADE_SCORE[grade],
  };
}

const NUTRIENTS = [
  { key: "protein", label: "Protein", unit: "g", max: 40, color: "from-blue-500 to-cyan-400" },
  { key: "carbs", label: "Carbohydrates", unit: "g", max: 60, color: "from-violet-500 to-purple-400" },
  { key: "fat", label: "Fat", unit: "g", max: 30, color: "from-amber-500 to-yellow-400" },
  { key: "fiber", label: "Fiber", unit: "g", max: 10, color: "from-green-500 to-emerald-400" },
  { key: "sugar", label: "Sugar", unit: "g", max: 30, color: "from-pink-500 to-rose-400" },
  { key: "sodium", label: "Sodium", unit: "mg", max: 800, color: "from-red-500 to-orange-400" },
] as const;

const SUGGESTIONS = ["Banana", "Salmon fillet", "Avocado", "Greek yogurt", "Almonds", "Coca Cola"];
type Phase = "search" | "loading" | "results" | "error";

export function FoodIQDemo() {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<Phase>("search");
  const [result, setResult] = useState<NutritionData | null>(null);
  const [error, setError] = useState("");

  const analyze = async (food: string) => {
    if (!food.trim()) return;
    setPhase("loading");
    try {
      const data = await fetchNutrition(food.trim());
      if (!data) {
        setError(`No data found for "${food}". Try a simpler or English term.`);
        setPhase("error");
      } else {
        setResult(data);
        setPhase("results");
      }
    } catch {
      setError("Network error. Check your connection and try again.");
      setPhase("error");
    }
  };

  const reset = () => { setQuery(""); setPhase("search"); setResult(null); setError(""); };

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">
        {(phase === "search" || phase === "error") && (
          <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && analyze(query)}
                placeholder="Search any food — banana, salmon, pizza..."
                className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all"
              />
            </div>

            {phase === "error" && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <div>
              <div className="text-xs text-gray-500 mb-2">Quick picks:</div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => { setQuery(s); analyze(s); }}
                    className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-gray-400 hover:border-orange-500/30 hover:text-orange-300 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => analyze(query)}
              disabled={!query.trim()}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-all ${query.trim() ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white" : "bg-white/5 text-gray-600 cursor-not-allowed"}`}
              whileHover={query.trim() ? { scale: 1.02 } : {}}
              whileTap={query.trim() ? { scale: 0.98 } : {}}
            >
              <Leaf size={16} />
              Analyze Nutrition
            </motion.button>
            <p className="text-xs text-gray-600 text-center">Powered by Open Food Facts · 3M+ real products</p>
          </motion.div>
        )}

        {phase === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-14 gap-4">
            <motion.div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent"
              animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
            <div className="text-center">
              <div className="font-semibold text-white mb-1">Analyzing "{query}"...</div>
              <div className="text-sm text-gray-400">Querying Open Food Facts database</div>
            </div>
            <div className="flex gap-1.5">
              {["Searching DB...", "Parsing data...", "Scoring..."].map((s, i) => (
                <motion.span key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.5 }}
                  className="text-xs text-orange-400 font-mono bg-orange-500/10 px-2 py-1 rounded-full">{s}</motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "results" && result && (
          <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-white truncate max-w-[240px] text-sm">{result.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">Per 100g · Live data from Open Food Facts</div>
              </div>
              <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors flex-shrink-0 ml-4">
                <RotateCcw size={12} /> Search again
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className={`text-2xl font-black uppercase px-4 py-2 rounded-xl bg-gradient-to-r ${gradeColor(result.grade)} text-white flex-shrink-0`}>
                {result.grade === "unknown" ? "?" : result.grade.toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-white">{GRADE_LABEL[result.grade]}</div>
                <div className="text-xs text-gray-400">Nutri-Score · European nutritional quality rating</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="text-3xl font-bold text-orange-400">{result.calories}</div>
                <div className="text-xs text-gray-500 mt-1">Calories (kcal / 100g)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className={`text-3xl font-bold bg-gradient-to-r ${gradeColor(result.grade)} bg-clip-text text-transparent`}>{result.health}</div>
                <div className="text-xs text-gray-500 mt-1">Health Score · {GRADE_LABEL[result.grade]}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Overall Health Score</span>
                <span className={`font-semibold bg-gradient-to-r ${gradeColor(result.grade)} bg-clip-text text-transparent`}>{result.health}/100</span>
              </div>
              <div className="h-2.5 rounded-full bg-black/40 overflow-hidden">
                <motion.div className={`h-full rounded-full bg-gradient-to-r ${gradeColor(result.grade)}`}
                  initial={{ width: 0 }} animate={{ width: `${result.health}%` }} transition={{ duration: 1, ease: "easeOut" }} />
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Nutritional Breakdown</div>
              <div className="space-y-3">
                {NUTRIENTS.map((n, i) => {
                  const val = result[n.key as keyof NutritionData] as number;
                  const pct = Math.min((val / n.max) * 100, 100);
                  return (
                    <div key={n.key}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-400">{n.label}</span>
                        <span className="font-semibold text-white">{val}<span className="text-gray-500 font-normal">{n.unit}</span></span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                        <motion.div className={`h-full rounded-full bg-gradient-to-r ${n.color}`}
                          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.08 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
