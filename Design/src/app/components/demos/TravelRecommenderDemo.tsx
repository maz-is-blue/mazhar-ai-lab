import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, RotateCcw, Sparkles } from "lucide-react";

type Rec = {
  city: string;
  country: string;
  description: string;
  match: number;
  tags: string[];
  emoji: string;
};

const RECS: Record<string, Rec[]> = {
  "beach-luxury": [
    { city: "Maldives", country: "Maldives", description: "Overwater villas with direct access to crystal-clear turquoise lagoons.", match: 99, tags: ["Overwater Bungalows", "Snorkeling", "5-star"], emoji: "🏝️" },
    { city: "Bali", country: "Indonesia", description: "Lush tropical paradise with world-class resorts and rich spiritual culture.", match: 95, tags: ["Wellness", "Culture", "Luxury Resorts"], emoji: "🌺" },
    { city: "Santorini", country: "Greece", description: "Iconic blue-domed churches, sunset caldera views and premium fine dining.", match: 91, tags: ["Romance", "Views", "Fine Dining"], emoji: "🌅" },
  ],
  "beach-other": [
    { city: "Algarve", country: "Portugal", description: "Stunning sea caves, golden cliffs and affordable fresh seafood restaurants.", match: 97, tags: ["Beaches", "Seafood", "Cliffs"], emoji: "🏖️" },
    { city: "Kotor", country: "Montenegro", description: "Hidden gem with medieval old town and crystal-clear Adriatic coastline.", match: 92, tags: ["History", "Swimming", "Budget-friendly"], emoji: "🏰" },
    { city: "Crete", country: "Greece", description: "Mythical island with spectacular beaches and authentic Greek village life.", match: 88, tags: ["Culture", "Beaches", "Food"], emoji: "🌊" },
  ],
  "mountain": [
    { city: "Zermatt", country: "Switzerland", description: "Car-free alpine village beneath the iconic Matterhorn. World-class skiing.", match: 98, tags: ["Skiing", "Hiking", "Alpine"], emoji: "⛰️" },
    { city: "Banff", country: "Canada", description: "Turquoise lakes and towering Rockies inside one of Canada's finest parks.", match: 94, tags: ["Wildlife", "Lakes", "Trails"], emoji: "🦌" },
    { city: "Dolomites", country: "Italy", description: "UNESCO World Heritage dramatic peaks paired with incredible Italian cuisine.", match: 90, tags: ["Climbing", "Scenery", "Cuisine"], emoji: "🏔️" },
  ],
  "city": [
    { city: "Tokyo", country: "Japan", description: "Hyper-modern metropolis with ancient temples, world-class food and innovation.", match: 97, tags: ["Tech", "Food", "Culture"], emoji: "🗼" },
    { city: "Prague", country: "Czech Republic", description: "Fairy-tale old town, rich medieval history and excellent craft beer culture.", match: 93, tags: ["History", "Architecture", "Nightlife"], emoji: "🏯" },
    { city: "Lisbon", country: "Portugal", description: "Hilly city with vintage trams, fado music and an incredible food scene.", match: 89, tags: ["Food", "Music", "Views"], emoji: "🚋" },
  ],
  "cultural": [
    { city: "Kyoto", country: "Japan", description: "Ancient capital with over 1,600 Buddhist temples and living traditional arts.", match: 98, tags: ["Temples", "Tea Ceremony", "Gardens"], emoji: "⛩️" },
    { city: "Marrakech", country: "Morocco", description: "Vibrant souks, stunning riads and the sensory explosion of Jemaa el-Fna.", match: 95, tags: ["Markets", "Architecture", "Cuisine"], emoji: "🕌" },
    { city: "Istanbul", country: "Turkey", description: "Where East meets West — Byzantine history, grand bazaars and the Bosphorus.", match: 91, tags: ["History", "Food", "Shopping"], emoji: "🌙" },
  ],
};

function getRecs(type: string, budget: string): Rec[] {
  if (type === "beach" && budget === "luxury") return RECS["beach-luxury"];
  if (type === "beach") return RECS["beach-other"];
  if (type === "mountain") return RECS["mountain"];
  if (type === "city") return RECS["city"];
  return RECS["cultural"];
}

type Phase = "form" | "loading" | "results";

export function TravelRecommenderDemo() {
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [activities, setActivities] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("form");
  const [recs, setRecs] = useState<Rec[]>([]);

  const toggleActivity = (a: string) =>
    setActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const canSubmit = type && budget && duration;

  const submit = () => {
    setPhase("loading");
    setTimeout(() => {
      setRecs(getRecs(type, budget));
      setPhase("results");
    }, 2000);
  };

  const reset = () => {
    setType("");
    setBudget("");
    setDuration("");
    setActivities([]);
    setPhase("form");
    setRecs([]);
  };

  const DEST_OPTIONS = [
    { value: "beach", label: "Beach", emoji: "🏖️" },
    { value: "mountain", label: "Mountain", emoji: "⛰️" },
    { value: "city", label: "City Break", emoji: "🏙️" },
    { value: "cultural", label: "Cultural", emoji: "🏛️" },
  ];

  const BUDGET_OPTIONS = [
    { value: "budget", label: "Budget", sub: "< $1,000" },
    { value: "mid", label: "Mid-Range", sub: "$1K–3K" },
    { value: "luxury", label: "Luxury", sub: "$3,000+" },
  ];

  const ACTIVITY_OPTIONS = ["Adventure", "Relaxation", "Food & Dining", "History", "Nightlife", "Nature"];

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">
        {phase === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Destination type */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Destination Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {DEST_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setType(opt.value)}
                    className={`rounded-xl border p-3 text-sm font-semibold transition-all ${
                      type === opt.value
                        ? "border-pink-500/50 bg-pink-500/15 text-white"
                        : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    <div className="text-xl mb-1">{opt.emoji}</div>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Budget
              </label>
              <div className="grid grid-cols-3 gap-2">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setBudget(opt.value)}
                    className={`rounded-xl border p-3 text-sm font-semibold transition-all ${
                      budget === opt.value
                        ? "border-pink-500/50 bg-pink-500/15 text-white"
                        : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {opt.label}
                    <div className="text-xs font-normal text-gray-500">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Weekend", "1 Week", "2 Weeks"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`rounded-xl border p-3 text-sm font-semibold transition-all ${
                      duration === d
                        ? "border-pink-500/50 bg-pink-500/15 text-white"
                        : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Interests{" "}
                <span className="text-gray-600 normal-case font-normal">
                  (optional)
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {ACTIVITY_OPTIONS.map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleActivity(a)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                      activities.includes(a)
                        ? "border-pink-500/50 bg-pink-500/15 text-pink-300"
                        : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={submit}
              disabled={!canSubmit}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-all ${
                canSubmit
                  ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white"
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
              }`}
              whileHover={canSubmit ? { scale: 1.02 } : {}}
              whileTap={canSubmit ? { scale: 0.98 } : {}}
            >
              <Sparkles size={16} />
              Get Recommendations
            </motion.button>
          </motion.div>
        )}

        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 gap-4"
          >
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-pink-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="text-center">
              <div className="font-semibold text-white mb-1">
                Finding your perfect trip...
              </div>
              <div className="text-sm text-gray-400">
                ML model scoring 10,000+ destinations
              </div>
            </div>
            <div className="flex gap-1.5">
              {["Filtering...", "Scoring...", "Personalizing..."].map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.5 }}
                  className="text-xs text-pink-400 font-mono bg-pink-500/10 px-2 py-1 rounded-full"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Top Recommendations
              </div>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
              >
                <RotateCcw size={12} />
                New Search
              </button>
            </div>

            {recs.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-pink-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{rec.emoji}</span>
                    <div>
                      <div className="font-bold text-white">{rec.city}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <MapPin size={12} />
                        {rec.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-lg font-bold text-pink-400">{rec.match}%</div>
                    <div className="text-xs text-gray-500">match</div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-3">{rec.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {rec.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 text-xs text-pink-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="h-1 rounded-full bg-black/40 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${rec.match}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
