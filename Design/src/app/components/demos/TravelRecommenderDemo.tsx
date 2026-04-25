import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, RotateCcw, Sparkles, DollarSign, Thermometer, Clock } from "lucide-react";

type Dest = {
  name: string; country: string; emoji: string; flag: string;
  types: string[]; budgetLevel: number; activities: string[];
  durationMin: number; durationMax: number;
  description: string; highlights: string[];
  avgTempC: number; continent: string; currency: string;
  costPerDay: string;
};

const DESTINATIONS: Dest[] = [
  { name: "Maldives", country: "Maldives", emoji: "🏝️", flag: "🇲🇻", types: ["beach"], budgetLevel: 1.0, activities: ["relaxation", "snorkeling", "romance", "wellness", "diving"], durationMin: 5, durationMax: 14, description: "Overwater villas above crystal-clear turquoise lagoons with the world's best marine visibility.", highlights: ["Overwater Bungalows", "Coral Reefs", "Spa Retreats"], avgTempC: 29, continent: "Asia", currency: "MVR", costPerDay: "$400–800" },
  { name: "Bali", country: "Indonesia", emoji: "🌺", flag: "🇮🇩", types: ["beach", "cultural"], budgetLevel: 0.4, activities: ["culture", "wellness", "food", "relaxation", "adventure", "yoga"], durationMin: 7, durationMax: 21, description: "Lush tropical island with ancient temples, world-class surfing and vibrant nightlife.", highlights: ["Ubud Rice Terraces", "Tanah Lot Temple", "Seminyak Beach"], avgTempC: 27, continent: "Asia", currency: "IDR", costPerDay: "$60–150" },
  { name: "Santorini", country: "Greece", emoji: "🌅", flag: "🇬🇷", types: ["beach"], budgetLevel: 0.85, activities: ["romance", "food", "relaxation", "history"], durationMin: 5, durationMax: 10, description: "Iconic blue-domed churches, sunset caldera views and premium fresh seafood on cliff edges.", highlights: ["Oia Sunset", "Black Sand Beaches", "Wine Tasting"], avgTempC: 25, continent: "Europe", currency: "EUR", costPerDay: "$200–450" },
  { name: "Algarve", country: "Portugal", emoji: "🏖️", flag: "🇵🇹", types: ["beach"], budgetLevel: 0.35, activities: ["relaxation", "food", "adventure", "golf"], durationMin: 5, durationMax: 14, description: "Dramatic sea caves, golden limestone cliffs and fresh seafood on the Atlantic coast.", highlights: ["Ponta da Piedade", "Praia da Marinha", "Benagil Cave"], avgTempC: 22, continent: "Europe", currency: "EUR", costPerDay: "$80–160" },
  { name: "Phuket", country: "Thailand", emoji: "🌴", flag: "🇹🇭", types: ["beach"], budgetLevel: 0.3, activities: ["nightlife", "food", "adventure", "relaxation", "diving"], durationMin: 7, durationMax: 21, description: "Thailand's largest island blends vibrant nightlife, emerald bays and world-class cuisine.", highlights: ["Phi Phi Islands", "Patong Beach", "Street Food"], avgTempC: 29, continent: "Asia", currency: "THB", costPerDay: "$50–120" },
  { name: "Tulum", country: "Mexico", emoji: "🌊", flag: "🇲🇽", types: ["beach", "cultural"], budgetLevel: 0.6, activities: ["wellness", "history", "relaxation", "diving", "adventure"], durationMin: 5, durationMax: 14, description: "Ancient Mayan ruins perched above Caribbean turquoise cenotes and white-sand beaches.", highlights: ["Mayan Ruins", "Cenotes", "Eco Hotels"], avgTempC: 27, continent: "Americas", currency: "MXN", costPerDay: "$120–280" },
  { name: "Zermatt", country: "Switzerland", emoji: "⛰️", flag: "🇨🇭", types: ["mountain"], budgetLevel: 1.0, activities: ["skiing", "hiking", "adventure", "relaxation"], durationMin: 5, durationMax: 10, description: "Car-free alpine village beneath the iconic Matterhorn with world-class skiing year-round.", highlights: ["Matterhorn", "Klein Matterhorn", "Glacier Paradise"], avgTempC: -2, continent: "Europe", currency: "CHF", costPerDay: "$350–700" },
  { name: "Banff", country: "Canada", emoji: "🦌", flag: "🇨🇦", types: ["mountain"], budgetLevel: 0.55, activities: ["hiking", "wildlife", "adventure", "skiing", "relaxation"], durationMin: 5, durationMax: 14, description: "Turquoise glacial lakes and towering Rockies inside Canada's oldest national park.", highlights: ["Lake Louise", "Moraine Lake", "Icefields Parkway"], avgTempC: 5, continent: "Americas", currency: "CAD", costPerDay: "$130–280" },
  { name: "Dolomites", country: "Italy", emoji: "🏔️", flag: "🇮🇹", types: ["mountain"], budgetLevel: 0.6, activities: ["hiking", "climbing", "skiing", "food", "adventure"], durationMin: 5, durationMax: 14, description: "UNESCO World Heritage dramatic pink-hued peaks paired with authentic northern Italian cuisine.", highlights: ["Tre Cime di Lavaredo", "Via Ferrata", "Cortina d'Ampezzo"], avgTempC: 8, continent: "Europe", currency: "EUR", costPerDay: "$140–300" },
  { name: "Patagonia", country: "Argentina/Chile", emoji: "🌋", flag: "🇦🇷", types: ["mountain"], budgetLevel: 0.55, activities: ["hiking", "adventure", "wildlife", "nature"], durationMin: 10, durationMax: 21, description: "End-of-the-world landscapes — glaciers, condors and the jagged Torres del Paine peaks.", highlights: ["Torres del Paine", "Perito Moreno Glacier", "Los Glaciares"], avgTempC: 6, continent: "Americas", currency: "ARS", costPerDay: "$100–220" },
  { name: "Queenstown", country: "New Zealand", emoji: "🪂", flag: "🇳🇿", types: ["mountain", "city"], budgetLevel: 0.65, activities: ["adventure", "skiing", "hiking", "bungee jumping", "nightlife"], durationMin: 5, durationMax: 14, description: "Adventure capital of the world — bungee jumping, skydiving and skiing in the Southern Alps.", highlights: ["Bungee Jumping", "Remarkables Ski Field", "Milford Sound"], avgTempC: 10, continent: "Oceania", currency: "NZD", costPerDay: "$150–300" },
  { name: "Tokyo", country: "Japan", emoji: "🗼", flag: "🇯🇵", types: ["city"], budgetLevel: 0.6, activities: ["food", "culture", "nightlife", "history", "technology"], durationMin: 7, durationMax: 14, description: "Hyper-modern metropolis where ancient temples coexist with cutting-edge technology and food culture.", highlights: ["Shibuya Crossing", "Tsukiji Market", "Akihabara"], avgTempC: 15, continent: "Asia", currency: "JPY", costPerDay: "$100–200" },
  { name: "Lisbon", country: "Portugal", emoji: "🚋", flag: "🇵🇹", types: ["city"], budgetLevel: 0.35, activities: ["food", "history", "nightlife", "culture", "music"], durationMin: 4, durationMax: 10, description: "Europe's sunniest capital — vintage trams climbing hills, fado music and world-class pastries.", highlights: ["Alfama District", "Belém Tower", "LX Factory"], avgTempC: 17, continent: "Europe", currency: "EUR", costPerDay: "$70–140" },
  { name: "New York City", country: "USA", emoji: "🗽", flag: "🇺🇸", types: ["city"], budgetLevel: 0.85, activities: ["culture", "food", "nightlife", "art", "shopping"], durationMin: 4, durationMax: 10, description: "The city that never sleeps — world-class museums, Broadway, Central Park and every cuisine imaginable.", highlights: ["Central Park", "Brooklyn Bridge", "MoMA"], avgTempC: 12, continent: "Americas", currency: "USD", costPerDay: "$200–500" },
  { name: "Singapore", country: "Singapore", emoji: "🌆", flag: "🇸🇬", types: ["city"], budgetLevel: 0.75, activities: ["food", "culture", "shopping", "technology", "nightlife"], durationMin: 4, durationMax: 8, description: "Futuristic city-state with Michelin-starred hawker stalls, Gardens by the Bay and spotless MRT.", highlights: ["Marina Bay Sands", "Gardens by the Bay", "Hawker Centres"], avgTempC: 27, continent: "Asia", currency: "SGD", costPerDay: "$150–320" },
  { name: "Prague", country: "Czech Republic", emoji: "🏯", flag: "🇨🇿", types: ["city", "cultural"], budgetLevel: 0.25, activities: ["history", "nightlife", "culture", "food", "architecture"], durationMin: 3, durationMax: 7, description: "Fairy-tale medieval old town, gothic cathedrals and a craft beer scene unlike anywhere else.", highlights: ["Old Town Square", "Charles Bridge", "Prague Castle"], avgTempC: 10, continent: "Europe", currency: "CZK", costPerDay: "$60–120" },
  { name: "Kyoto", country: "Japan", emoji: "⛩️", flag: "🇯🇵", types: ["cultural", "city"], budgetLevel: 0.55, activities: ["history", "culture", "food", "temples", "nature"], durationMin: 4, durationMax: 10, description: "Japan's ancient capital with 1,600+ Buddhist temples, geisha districts and serene bamboo groves.", highlights: ["Fushimi Inari", "Arashiyama Bamboo", "Gion District"], avgTempC: 14, continent: "Asia", currency: "JPY", costPerDay: "$90–180" },
  { name: "Marrakech", country: "Morocco", emoji: "🕌", flag: "🇲🇦", types: ["cultural"], budgetLevel: 0.25, activities: ["history", "food", "culture", "shopping", "adventure"], durationMin: 4, durationMax: 10, description: "Vibrant medina with labyrinthine souks, stunning riads and the sensory explosion of Jemaa el-Fna.", highlights: ["Jemaa el-Fna", "Majorelle Garden", "Bahia Palace"], avgTempC: 20, continent: "Africa", currency: "MAD", costPerDay: "$50–120" },
  { name: "Istanbul", country: "Turkey", emoji: "🌙", flag: "🇹🇷", types: ["cultural", "city"], budgetLevel: 0.3, activities: ["history", "food", "culture", "shopping", "architecture"], durationMin: 4, durationMax: 10, description: "Where East meets West — Byzantine Hagia Sophia, Grand Bazaar and the shimmering Bosphorus.", highlights: ["Hagia Sophia", "Grand Bazaar", "Bosphorus Cruise"], avgTempC: 14, continent: "Europe/Asia", currency: "TRY", costPerDay: "$60–130" },
  { name: "Rome", country: "Italy", emoji: "🏛️", flag: "🇮🇹", types: ["cultural", "city"], budgetLevel: 0.55, activities: ["history", "food", "culture", "architecture", "art"], durationMin: 4, durationMax: 10, description: "The Eternal City — millennia of history in the Colosseum, Vatican and hand-tossed carbonara.", highlights: ["Colosseum", "Vatican Museums", "Trastevere"], avgTempC: 16, continent: "Europe", currency: "EUR", costPerDay: "$110–240" },
  { name: "Cairo", country: "Egypt", emoji: "🪆", flag: "🇪🇬", types: ["cultural"], budgetLevel: 0.2, activities: ["history", "culture", "adventure", "archaeology"], durationMin: 5, durationMax: 12, description: "Ancient wonders on the Nile — the Great Pyramids, Sphinx and world's greatest museum of antiquity.", highlights: ["Great Pyramids", "Egyptian Museum", "Nile Cruise"], avgTempC: 22, continent: "Africa", currency: "EGP", costPerDay: "$40–90" },
  { name: "Amsterdam", country: "Netherlands", emoji: "🚲", flag: "🇳🇱", types: ["city", "cultural"], budgetLevel: 0.7, activities: ["culture", "history", "nightlife", "art", "cycling"], durationMin: 3, durationMax: 7, description: "Cycling along 17th-century canals, world-class Rijksmuseum and the most liberal city in Europe.", highlights: ["Rijksmuseum", "Anne Frank House", "Canal Belt"], avgTempC: 10, continent: "Europe", currency: "EUR", costPerDay: "$140–280" },
  { name: "Reykjavik", country: "Iceland", emoji: "🌌", flag: "🇮🇸", types: ["city", "mountain"], budgetLevel: 0.9, activities: ["nature", "adventure", "wildlife", "hiking"], durationMin: 5, durationMax: 14, description: "Gateway to the Northern Lights, geysers, waterfalls and midnight sun in the land of fire and ice.", highlights: ["Northern Lights", "Golden Circle", "Blue Lagoon"], avgTempC: 2, continent: "Europe", currency: "ISK", costPerDay: "$200–400" },
  { name: "Cape Town", country: "South Africa", emoji: "🦁", flag: "🇿🇦", types: ["city", "beach", "mountain"], budgetLevel: 0.35, activities: ["adventure", "food", "nature", "wildlife", "hiking"], durationMin: 7, durationMax: 21, description: "Table Mountain, penguin colonies, Winelands and safari all within one stunning coastal city.", highlights: ["Table Mountain", "Boulders Beach Penguins", "Cape Winelands"], avgTempC: 17, continent: "Africa", currency: "ZAR", costPerDay: "$80–180" },
  { name: "Barcelona", country: "Spain", emoji: "🎨", flag: "🇪🇸", types: ["city", "beach", "cultural"], budgetLevel: 0.55, activities: ["culture", "food", "nightlife", "art", "beach", "architecture"], durationMin: 4, durationMax: 10, description: "Gaudí's surreal masterpieces, tapas culture, flamenco and beaches on the Mediterranean.", highlights: ["Sagrada Família", "Park Güell", "La Boqueria"], avgTempC: 18, continent: "Europe", currency: "EUR", costPerDay: "$100–220" },
  { name: "Dubrovnik", country: "Croatia", emoji: "🏰", flag: "🇭🇷", types: ["city", "beach", "cultural"], budgetLevel: 0.65, activities: ["history", "relaxation", "food", "culture", "swimming"], durationMin: 4, durationMax: 10, description: "Pearl of the Adriatic — ancient walled city with Game of Thrones filming locations and crystal waters.", highlights: ["Old City Walls", "Lokrum Island", "Adriatic Sea Kayaking"], avgTempC: 20, continent: "Europe", currency: "EUR", costPerDay: "$120–260" },
  { name: "Machu Picchu", country: "Peru", emoji: "🦙", flag: "🇵🇪", types: ["cultural", "mountain"], budgetLevel: 0.4, activities: ["history", "hiking", "adventure", "archaeology", "nature"], durationMin: 7, durationMax: 14, description: "Lost Incan citadel above the Sacred Valley clouds — one of the seven modern wonders of the world.", highlights: ["Inca Trail", "Sun Gate", "Huayna Picchu"], avgTempC: 13, continent: "Americas", currency: "PEN", costPerDay: "$80–160" },
  { name: "Serengeti", country: "Tanzania", emoji: "🦒", flag: "🇹🇿", types: ["mountain"], budgetLevel: 0.9, activities: ["wildlife", "adventure", "nature", "photography"], durationMin: 7, durationMax: 21, description: "Witness the world's greatest wildlife migration — millions of wildebeest across the golden savanna.", highlights: ["Great Migration", "Big Five Safari", "Hot Air Balloon"], avgTempC: 25, continent: "Africa", currency: "TZS", costPerDay: "$300–600" },
  { name: "Amalfi Coast", country: "Italy", emoji: "🍋", flag: "🇮🇹", types: ["beach", "cultural"], budgetLevel: 0.8, activities: ["relaxation", "food", "romance", "hiking", "history"], durationMin: 5, durationMax: 12, description: "Cliffside lemon groves, colourful villages and azure Mediterranean waters on Italy's most dramatic coast.", highlights: ["Positano", "Path of the Gods", "Limoncello Tours"], avgTempC: 22, continent: "Europe", currency: "EUR", costPerDay: "$200–450" },
  { name: "Bhutan", country: "Bhutan", emoji: "🏯", flag: "🇧🇹", types: ["cultural", "mountain"], budgetLevel: 0.8, activities: ["culture", "history", "hiking", "wellness", "nature"], durationMin: 7, durationMax: 21, description: "The last Shangri-La — carbon-negative kingdom where Gross National Happiness is government policy.", highlights: ["Tiger's Nest Monastery", "Phobjikha Valley", "Punakha Dzong"], avgTempC: 15, continent: "Asia", currency: "BTN", costPerDay: "$250–300" },
  { name: "Ha Long Bay", country: "Vietnam", emoji: "⛵", flag: "🇻🇳", types: ["beach", "cultural"], budgetLevel: 0.2, activities: ["nature", "adventure", "relaxation", "kayaking", "food"], durationMin: 5, durationMax: 14, description: "UNESCO limestone karsts rising from emerald waters, explored by traditional junk boats at dawn.", highlights: ["Kayaking Karsts", "Cruise Overnight", "Bai Tu Long Bay"], avgTempC: 25, continent: "Asia", currency: "VND", costPerDay: "$50–110" },
];

type Prefs = { type: string; budget: string; duration: string; activities: string[] };
type Phase = "form" | "loading" | "results";

function scoreDest(dest: Dest, prefs: Prefs): number {
  const budgetMap: Record<string, number> = { budget: 0.15, mid: 0.5, luxury: 0.9 };
  const durationMap: Record<string, number> = { Weekend: 3, "1 Week": 7, "2 Weeks": 14, "3+ Weeks": 21 };
  const typeScore = dest.types.includes(prefs.type) ? 1.0 : dest.types.some(t => ["beach", "cultural"].includes(t) && prefs.type === "mixed") ? 0.7 : 0.1;
  const budgetDiff = Math.abs(dest.budgetLevel - (budgetMap[prefs.budget] ?? 0.5));
  const budgetScore = Math.max(0, 1 - budgetDiff * 1.8);
  const days = durationMap[prefs.duration] ?? 7;
  const durScore = days >= dest.durationMin ? 1.0 : Math.max(0.3, days / dest.durationMin);
  let actScore = 0.6;
  if (prefs.activities.length > 0) {
    const overlap = prefs.activities.filter((a) => dest.activities.includes(a)).length;
    actScore = Math.min(1, 0.2 + (overlap / prefs.activities.length) * 0.8);
  }
  const raw = typeScore * 0.40 + budgetScore * 0.28 + actScore * 0.22 + durScore * 0.10;
  return Math.round(raw * 100);
}

const DEST_OPTIONS = [
  { value: "beach", label: "Beach", emoji: "🏖️" },
  { value: "mountain", label: "Mountain", emoji: "⛰️" },
  { value: "city", label: "City Break", emoji: "🏙️" },
  { value: "cultural", label: "Cultural", emoji: "🏛️" },
];
const BUDGET_OPTIONS = [
  { value: "budget", label: "Budget", sub: "< $80/day" },
  { value: "mid", label: "Mid-Range", sub: "$80–200/day" },
  { value: "luxury", label: "Luxury", sub: "$200+/day" },
];
const DURATION_OPTIONS = ["Weekend", "1 Week", "2 Weeks", "3+ Weeks"];
const ACTIVITY_OPTIONS = [
  { value: "adventure", label: "🧗 Adventure" },
  { value: "relaxation", label: "🧘 Relaxation" },
  { value: "food", label: "🍽️ Food & Dining" },
  { value: "history", label: "🏛️ History" },
  { value: "nightlife", label: "🎵 Nightlife" },
  { value: "nature", label: "🌿 Nature" },
  { value: "wildlife", label: "🦁 Wildlife" },
  { value: "romance", label: "💑 Romance" },
];

export function TravelRecommenderDemo() {
  const [prefs, setPrefs] = useState<Prefs>({ type: "", budget: "", duration: "", activities: [] });
  const [phase, setPhase] = useState<Phase>("form");
  const [results, setResults] = useState<(Dest & { score: number })[]>([]);

  const toggle = (a: string) =>
    setPrefs((p) => ({ ...p, activities: p.activities.includes(a) ? p.activities.filter((x) => x !== a) : [...p.activities, a] }));

  const canSubmit = prefs.type && prefs.budget && prefs.duration;

  const submit = () => {
    setPhase("loading");
    setTimeout(() => {
      const scored = DESTINATIONS.map((d) => ({ ...d, score: scoreDest(d, prefs) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      setResults(scored);
      setPhase("results");
    }, 2200);
  };

  const reset = () => { setPrefs({ type: "", budget: "", duration: "", activities: [] }); setPhase("form"); setResults([]); };

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">
        {phase === "form" && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Destination Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {DEST_OPTIONS.map((opt) => (
                  <button key={opt.value} onClick={() => setPrefs((p) => ({ ...p, type: opt.value }))}
                    className={`rounded-xl border p-3 text-sm font-semibold transition-all ${prefs.type === opt.value ? "border-pink-500/50 bg-pink-500/15 text-white" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"}`}>
                    <div className="text-xl mb-1">{opt.emoji}</div>{opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Daily Budget</label>
              <div className="grid grid-cols-3 gap-2">
                {BUDGET_OPTIONS.map((opt) => (
                  <button key={opt.value} onClick={() => setPrefs((p) => ({ ...p, budget: opt.value }))}
                    className={`rounded-xl border p-3 text-sm font-semibold transition-all ${prefs.budget === opt.value ? "border-pink-500/50 bg-pink-500/15 text-white" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"}`}>
                    {opt.label}
                    <div className="text-xs font-normal text-gray-500">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Duration</label>
              <div className="grid grid-cols-4 gap-2">
                {DURATION_OPTIONS.map((d) => (
                  <button key={d} onClick={() => setPrefs((p) => ({ ...p, duration: d }))}
                    className={`rounded-xl border p-3 text-sm font-semibold transition-all ${prefs.duration === d ? "border-pink-500/50 bg-pink-500/15 text-white" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Interests <span className="text-gray-600 normal-case font-normal">(optional — improves matching)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {ACTIVITY_OPTIONS.map((a) => (
                  <button key={a.value} onClick={() => toggle(a.value)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-all ${prefs.activities.includes(a.value) ? "border-pink-500/50 bg-pink-500/15 text-pink-300" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"}`}>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <motion.button onClick={submit} disabled={!canSubmit}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-all ${canSubmit ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white" : "bg-white/5 text-gray-600 cursor-not-allowed"}`}
              whileHover={canSubmit ? { scale: 1.02 } : {}} whileTap={canSubmit ? { scale: 0.98 } : {}}>
              <Sparkles size={16} />
              Find My Perfect Destination
            </motion.button>
            <p className="text-xs text-gray-600 text-center">Weighted cosine similarity across {DESTINATIONS.length} curated destinations</p>
          </motion.div>
        )}

        {phase === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16 gap-4">
            <motion.div className="w-12 h-12 rounded-full border-2 border-pink-500 border-t-transparent"
              animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
            <div className="text-center">
              <div className="font-semibold text-white mb-1">Running recommendation engine...</div>
              <div className="text-sm text-gray-400">Scoring {DESTINATIONS.length} destinations by weighted similarity</div>
            </div>
            <div className="w-full max-w-xs space-y-1.5">
              {["Building feature vectors...", "Computing similarity scores...", "Ranking by match %..."].map((s, i) => (
                <motion.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.6 }}
                  className="flex items-center gap-2 text-xs text-pink-400 font-mono bg-pink-500/10 px-3 py-1.5 rounded-lg">
                  <div className="w-1 h-1 rounded-full bg-pink-400 flex-shrink-0" />
                  {s}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Top Matches</div>
                <div className="text-xs text-gray-600 mt-0.5">Sorted by cosine similarity score</div>
              </div>
              <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
                <RotateCcw size={12} /> New Search
              </button>
            </div>

            {results.map((rec, i) => (
              <motion.div key={rec.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-pink-500/30 transition-all">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-3xl flex-shrink-0">{rec.emoji}</span>
                    <div className="min-w-0">
                      <div className="font-bold text-white flex items-center gap-2">
                        {rec.name}
                        {i === 0 && <span className="text-[10px] font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-0.5 rounded-full">BEST MATCH</span>}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                        <span className="flex items-center gap-1"><MapPin size={10} />{rec.country}</span>
                        <span className="flex items-center gap-1"><DollarSign size={10} />{rec.costPerDay}</span>
                        <span className="flex items-center gap-1"><Thermometer size={10} />{rec.avgTempC}°C</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xl font-bold text-pink-400">{rec.score}%</div>
                    <div className="text-xs text-gray-500">match</div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3">{rec.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {rec.highlights.map((h) => (
                    <span key={h} className="rounded-full bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 text-xs text-pink-300">{h}</span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-black/40 overflow-hidden">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400"
                      initial={{ width: 0 }} animate={{ width: `${rec.score}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                    <Clock size={10} />
                    {rec.durationMin}–{rec.durationMax} days
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
