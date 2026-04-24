import { createPortal } from "react-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { IDVerificationDemo } from "./IDVerificationDemo";
import { DataPipelineDemo } from "./DataPipelineDemo";
import { TravelRecommenderDemo } from "./TravelRecommenderDemo";
import { FoodIQDemo } from "./FoodIQDemo";

export type DemoType =
  | "id-verification"
  | "data-pipeline"
  | "travel-recommender"
  | "foodiq"
  | null;

const META: Record<
  NonNullable<DemoType>,
  { title: string; subtitle: string; gradient: string }
> = {
  "id-verification": {
    title: "AI Identity Verification",
    subtitle: "SegFormer segmentation + OCR pipeline",
    gradient: "from-blue-500 to-cyan-500",
  },
  "data-pipeline": {
    title: "AI Data Pipeline",
    subtitle: "Real-time ETL pipeline simulation",
    gradient: "from-violet-500 to-purple-600",
  },
  "travel-recommender": {
    title: "Travel Recommendation Engine",
    subtitle: "ML-powered destination matching",
    gradient: "from-pink-500 to-rose-600",
  },
  foodiq: {
    title: "FoodIQ — Nutritional Analysis",
    subtitle: "AI-driven nutrition intelligence",
    gradient: "from-orange-500 to-amber-600",
  },
};

interface Props {
  demo: DemoType;
  onClose: () => void;
}

export function DemoModal({ demo, onClose }: Props) {
  useEffect(() => {
    if (!demo) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [demo, onClose]);

  if (!demo) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(6px)",
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        style={{ position: "relative", zIndex: 10000, width: "100%" }}
        className="max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-white/10 bg-[#0a0a0f] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10 flex-shrink-0">
          <div>
            <div
              className={`inline-flex items-center mb-2 rounded-full bg-gradient-to-r ${META[demo].gradient} px-3 py-0.5`}
            >
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                Interactive Demo
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">{META[demo].title}</h2>
            <p className="text-sm text-gray-400">{META[demo].subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-4"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6">
          {demo === "id-verification" && <IDVerificationDemo />}
          {demo === "data-pipeline" && <DataPipelineDemo />}
          {demo === "travel-recommender" && <TravelRecommenderDemo />}
          {demo === "foodiq" && <FoodIQDemo />}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
