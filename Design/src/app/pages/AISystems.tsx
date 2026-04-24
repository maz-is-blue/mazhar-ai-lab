import { motion } from "motion/react";
import {
  ArrowRight,
  Upload,
  FileSearch,
  Cpu,
  Database,
  CheckCircle,
  Activity,
  Zap,
  GitBranch,
} from "lucide-react";

export function AISystems() {
  const systems = [
    {
      title: "Computer Vision Pipeline",
      description:
        "Real-time image processing and analysis system for object detection and classification",
      color: "from-blue-500 to-cyan-500",
      stages: [
        {
          name: "Image Acquisition",
          icon: Upload,
          details: "Camera input, file upload, streaming video",
        },
        {
          name: "Preprocessing",
          icon: FileSearch,
          details: "Resize, normalize, augmentation",
        },
        {
          name: "Model Inference",
          icon: Cpu,
          details: "CNN-based detection & classification",
        },
        {
          name: "Post-processing",
          icon: Activity,
          details: "NMS, confidence filtering, tracking",
        },
        {
          name: "Output",
          icon: CheckCircle,
          details: "Bounding boxes, labels, metadata",
        },
      ],
      metrics: [
        { label: "Throughput", value: "120 FPS" },
        { label: "Latency", value: "< 8ms" },
        { label: "Accuracy", value: "98.5%" },
      ],
    },
    {
      title: "Data Engineering Workflow",
      description:
        "Scalable ETL pipeline for processing and transforming large-scale datasets",
      color: "from-violet-500 to-purple-500",
      stages: [
        {
          name: "Data Ingestion",
          icon: Database,
          details: "APIs, databases, file systems",
        },
        {
          name: "Validation",
          icon: CheckCircle,
          details: "Schema checks, quality rules",
        },
        {
          name: "Transformation",
          icon: Zap,
          details: "Clean, normalize, enrich",
        },
        {
          name: "Loading",
          icon: Database,
          details: "BigQuery, data warehouse",
        },
        {
          name: "Monitoring",
          icon: Activity,
          details: "Alerts, metrics, lineage",
        },
      ],
      metrics: [
        { label: "Daily Volume", value: "10M+ rows" },
        { label: "Reliability", value: "99.9%" },
        { label: "Processing Time", value: "< 5 min" },
      ],
    },
    {
      title: "RAG System Architecture",
      description:
        "Retrieval-augmented generation for intelligent document Q&A and search",
      color: "from-pink-500 to-rose-500",
      stages: [
        {
          name: "Document Upload",
          icon: Upload,
          details: "PDF, DOCX, TXT ingestion",
        },
        {
          name: "Chunking",
          icon: FileSearch,
          details: "Semantic segmentation",
        },
        {
          name: "Embedding",
          icon: Cpu,
          details: "Vector generation (OpenAI)",
        },
        {
          name: "Indexing",
          icon: Database,
          details: "Pinecone vector storage",
        },
        {
          name: "Query & Response",
          icon: Activity,
          details: "Semantic search + LLM",
        },
      ],
      metrics: [
        { label: "Documents", value: "100K+" },
        { label: "Query Speed", value: "< 500ms" },
        { label: "Relevance", value: "95%" },
      ],
    },
    {
      title: "ML Model Lifecycle",
      description:
        "End-to-end machine learning operations from training to production deployment",
      color: "from-orange-500 to-amber-500",
      stages: [
        {
          name: "Data Preparation",
          icon: Database,
          details: "Feature engineering, splits",
        },
        {
          name: "Model Training",
          icon: Cpu,
          details: "Hyperparameter tuning, validation",
        },
        {
          name: "Evaluation",
          icon: CheckCircle,
          details: "Metrics, cross-validation",
        },
        {
          name: "Deployment",
          icon: Zap,
          details: "Containerization, CI/CD",
        },
        {
          name: "Monitoring",
          icon: Activity,
          details: "Drift detection, retraining",
        },
      ],
      metrics: [
        { label: "Training Time", value: "2-4 hours" },
        { label: "Deploy Speed", value: "< 10 min" },
        { label: "Uptime", value: "99.95%" },
      ],
    },
  ];

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-5xl font-bold">AI Systems</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            End-to-end system architectures and production pipelines
          </p>
        </motion.div>

        <div className="space-y-16">
          {systems.map((system, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-sm"
            >
              {/* Header */}
              <div className="mb-8">
                <div
                  className={`inline-block mb-4 rounded-full bg-gradient-to-r ${system.color} px-4 py-2`}
                >
                  <span className="text-sm font-semibold text-white">
                    System Architecture
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-3">{system.title}</h2>
                <p className="text-lg text-gray-300">{system.description}</p>
              </div>

              {/* Pipeline Stages */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <GitBranch size={20} className="text-blue-400" />
                  Pipeline Flow
                </h3>

                {/* Desktop View */}
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-y-1/2" />
                    <div className="relative flex items-center justify-between gap-4">
                      {system.stages.map((stage, i) => (
                        <div key={i} className="flex-1">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative"
                          >
                            <div className="flex flex-col items-center">
                              <div
                                className={`mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br ${system.color} flex items-center justify-center shadow-lg`}
                              >
                                <stage.icon size={28} className="text-white" />
                              </div>
                              <div className="rounded-xl bg-black/30 p-4 border border-white/10 text-center min-h-[120px] w-full">
                                <h4 className="text-sm font-semibold mb-2">
                                  {stage.name}
                                </h4>
                                <p className="text-xs text-gray-400">
                                  {stage.details}
                                </p>
                              </div>
                            </div>
                            {i < system.stages.length - 1 && (
                              <div className="absolute top-8 -right-2 text-blue-400">
                                <ArrowRight size={20} />
                              </div>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden space-y-4">
                  {system.stages.map((stage, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${system.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <stage.icon size={20} className="text-white" />
                      </div>
                      <div className="flex-1 rounded-xl bg-black/30 p-4 border border-white/10">
                        <h4 className="font-semibold mb-1">{stage.name}</h4>
                        <p className="text-sm text-gray-400">{stage.details}</p>
                      </div>
                      {i < system.stages.length - 1 && (
                        <div className="flex items-center justify-center w-full -my-2">
                          <ArrowRight
                            size={20}
                            className="text-blue-400 rotate-90"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {system.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-6 border border-white/10 text-center"
                  >
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-violet-600/10 p-12 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            System Integration
          </h2>
          <p className="text-lg text-gray-300 text-center mb-8 max-w-3xl mx-auto">
            All systems are designed to work together seamlessly, enabling
            comprehensive AI solutions from data ingestion to model deployment
            and monitoring.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Scalability",
                desc: "Horizontal scaling for high throughput",
              },
              {
                title: "Reliability",
                desc: "Fault-tolerant with automatic recovery",
              },
              {
                title: "Monitoring",
                desc: "Real-time metrics and alerting",
              },
              {
                title: "Security",
                desc: "End-to-end encryption and access control",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
