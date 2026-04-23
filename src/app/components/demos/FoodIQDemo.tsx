import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw } from "lucide-react";

type Food = {
  name: string;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  health: number;
};

const FOODS: Food[] = [
  { name: "Pizza Margherita", emoji: "🍕", calories: 285, protein: 12, carbs: 36, fat: 10, fiber: 2.3, sugar: 3.6, sodium: 586, health: 62 },
  { name: "Grilled Chicken", emoji: "🍗", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74, health: 91 },
  { name: "Caesar Salad", emoji: "🥗", calories: 220, protein: 8, carbs: 14, fat: 16, fiber: 2.1, sugar: 2, sodium: 420, health: 73 },
  { name: "Avocado", emoji: "🥑", calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 6.7, sugar: 0.7, sodium: 7, health: 88 },
  { name: "Banana", emoji: "🍌", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, sugar: 14, sodium: 1, health: 82 },
  { name: "Salmon Fillet", emoji: "🐟", calories: 208, protein: 29, carbs: 0, fat: 9, fiber: 0, sugar: 0, sodium: 59, health: 95 },
];

const NUTRIENTS = [
  { key: "protein" as const, label: "Protein", unit: "g", max: 40, color: "from-blue-500 to-cyan-400" },
  { key: "carbs" as const, label: "Carbohydrates", unit: "g", max: 60, color: "from-violet-500 to-purple-400" },
  { key: "fat" as const, label: "Fat", unit: "g", max: 30, color: "from-amber-500 to-yellow-400" },
  { key: "fiber" as const, label: "Fiber", unit: "g", max: 10, color: "from-green-500 to-emerald-400" },
  { key: "sugar" as const, label: "Sugar", unit: "g", max: 30, color: "from-pink-500 to-rose-400" },
  { key: "sodium" as const, label: "Sodium", unit: "mg", max: 800, color: "from-red-500 to-orange-400" },
];

function healthColor(score: number) {
  if (score >= 85) return "from-green-500 to-emerald-400";
  if (score >= 70) return "from-amber-500 to-yellow-400";
  return "from-orange-500 to-red-400";
}

function healthLabel(score: number) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  return "Moderate";
}

type Phase = "select" | "loading" | "results";

export function FoodIQDemo() {
  const [selected, setSelected] = useState<Food | null>(null);
  const [phase, setPhase] = useState<Phase>("select");

  const analyze = (food: Food) => {
    setSelected(food);
    setPhase("loading");
    setTimeout(() => setPhase("results"), 1800);
  };

  const reset = () => {
    setSelected(null);
    setPhase("select");
  };

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">
        {phase === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Select a Food Item
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FOODS.map((food, i) => (
                <motion.button
                  key={i}
                  onClick={() => analyze(food)}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:border-orange-500/30 hover:bg-orange-500/5 transition-all group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-3xl mb-2">{food.emoji}</div>
                  <div className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                    {food.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{food.calories} kcal</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "loading" && selected && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-14 gap-4"
          >
            <div className="text-4xl mb-2">{selected.emoji}</div>
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <div className="text-center">
              <div className="font-semibold text-white mb-1">
                Analyzing {selected.name}...
              </div>
              <div className="text-sm text-gray-400">
                AI nutritional intelligence processing
              </div>
            </div>
            <div className="flex gap-1.5">
              {["Parsing...", "Matching DB...", "Calculating..."].map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.4 }}
                  className="text-xs text-orange-400 font-mono bg-orange-500/10 px-2 py-1 rounded-full"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "results" && selected && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selected.emoji}</span>
                <div>
                  <div className="font-bold text-white">{selected.name}</div>
                  <div className="text-xs text-gray-500">Per serving (100g)</div>
                </div>
              </div>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
              >
                <RotateCcw size={12} />
                Analyze Another
              </button>
            </div>

            {/* Calorie + Health Score */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="text-3xl font-bold text-orange-400">
                  {selected.calories}
                </div>
                <div className="text-xs text-gray-500 mt-1">Calories (kcal)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${healthColor(selected.health)} bg-clip-text text-transparent`}
                >
                  {selected.health}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Health Score · {healthLabel(selected.health)}
                </div>
              </div>
            </div>

            {/* Health bar */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Overall Health Score</span>
                <span
                  className={`font-semibold bg-gradient-to-r ${healthColor(selected.health)} bg-clip-text text-transparent`}
                >
                  {healthLabel(selected.health)}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-black/40 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${healthColor(selected.health)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${selected.health}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Nutrient breakdown */}
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Nutritional Breakdown
              </div>
              <div className="space-y-3">
                {NUTRIENTS.map((n, i) => {
                  const val = selected[n.key];
                  const pct = Math.min((val / n.max) * 100, 100);
                  return (
                    <div key={n.key}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-400">{n.label}</span>
                        <span className="font-semibold text-white">
                          {val}
                          <span className="text-gray-500 font-normal">{n.unit}</span>
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${n.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.08 }}
                        />
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
