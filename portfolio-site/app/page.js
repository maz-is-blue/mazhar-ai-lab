"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import {
  Eye,
  Database,
  Brain,
  Server,
  Github,
  ArrowRight,
  Code2,
  Boxes,
  Network,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const expertise = [
    {
      icon: Eye,
      title: "Computer Vision Systems",
      description:
        "Advanced image processing, object detection, and real-time video analytics pipelines.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Database,
      title: "Data Engineering Pipelines",
      description:
        "Scalable ETL workflows with BigQuery, Dataflow, and cloud-native architectures.",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: Brain,
      title: "LLM & RAG Systems",
      description:
        "Production-ready retrieval systems with vector databases and semantic search.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Server,
      title: "Backend AI Infrastructure",
      description:
        "High-performance APIs, model serving, and distributed computing systems.",
      gradient: "from-orange-500 to-amber-500",
    },
  ];

  const projects = [
    {
      title: "AI Identity Verification System",
      description:
        "AI-driven document analysis pipeline with SegFormer segmentation and OCR for automated verification.",
      tech: ["SegFormer", "OCR", "Computer Vision", "Python"],
      architecture: "Upload → Preprocess → Segment → Extract → Verify",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "AI Data Pipeline Platform",
      description:
        "Scalable ETL pipelines using Google Cloud Dataflow with BigQuery integration and data partitioning.",
      tech: ["Cloud Dataflow", "BigQuery", "Python", "GCP"],
      architecture: "Source → Dataflow → Transform → BigQuery → Analytics",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      title: "Travel Recommendation Engine",
      description:
        "Django-powered backend with personalized user journeys and custom ML recommendation model.",
      tech: ["Python", "Django", "Machine Learning", "Excel Processing"],
      architecture: "Signup → Data Collection → ML Model → Recommendations",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "FoodIQ - AI Nutritional Analysis",
      description:
        "Laravel backend with AI algorithms for real-time nutritional analysis and meal planning.",
      tech: ["PHP", "Laravel", "MySQL", "AI Algorithms"],
      architecture: "Input → AI Analysis → Database → Meal Planning → API",
      gradient: "from-orange-500 to-amber-500",
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Floating particles
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating Particles */}
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-500/30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Animated Grid Lines */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                style={{
                  top: `${i * 5}%`,
                  left: 0,
                  right: 0,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scaleX: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute w-px bg-gradient-to-b from-transparent via-violet-500/10 to-transparent"
                style={{
                  left: `${i * 5}%`,
                  top: 0,
                  bottom: 0,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Glowing Orbs */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "10%", left: "10%" }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-violet-500/20 blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            style={{ bottom: "10%", right: "10%" }}
          />
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center"
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="mb-6 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-6 py-2.5 text-sm backdrop-blur-xl"
              whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.4)" }}
            >
              <span className="flex items-center gap-2 text-blue-400">
                <Sparkles size={16} className="animate-pulse" />
                AI & Data Engineer
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 text-6xl md:text-8xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-white via-blue-100 to-violet-200 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Mazhar Jahjah
              </motion.span>
            </motion.h1>

            <motion.p
              className="mb-12 text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Designing{" "}
              <span className="text-blue-400 font-semibold">scalable AI systems</span>,{" "}
              <span className="text-violet-400 font-semibold">data pipelines</span>, and{" "}
              <span className="text-pink-400 font-semibold">intelligent applications</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link href="/projects">
                <motion.button
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-10 py-5 font-semibold text-white overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    View Projects
                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
                    }}
                  />
                </motion.button>
              </Link>

              <a href="https://github.com/mazharjahjah" target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-10 py-5 font-semibold text-white backdrop-blur-xl"
                  whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  View GitHub
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Core Expertise */}
      <section className="py-32 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <motion.div
              className="inline-block mb-4"
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Zap className="mx-auto text-blue-400" size={48} />
            </motion.div>
            <h2 className="mb-4 text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Core Expertise
            </h2>
            <p className="text-2xl text-gray-400">
              Production-level AI engineering capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="group relative"
                style={{ perspective: "1000px" }}
              >
                <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-xl overflow-hidden">
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.2), transparent)`,
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Glowing Icon */}
                  <motion.div
                    className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon size={32} className="text-white" />
                  </motion.div>

                  <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${item.gradient} blur-3xl opacity-0 group-hover:opacity-30`}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 relative">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-pink-500/5" />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <motion.div
              className="inline-block mb-4"
              whileInView={{ rotate: [0, 360] }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Code2 className="mx-auto text-violet-400" size={48} />
            </motion.div>
            <h2 className="mb-4 text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-2xl text-gray-400">
              Production AI systems and platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="group relative"
              >
                <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10 backdrop-blur-xl overflow-hidden">
                  {/* Animated Gradient Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                    animate={{
                      background: [
                        `linear-gradient(0deg, transparent, rgba(59, 130, 246, 0.1), transparent)`,
                        `linear-gradient(360deg, transparent, rgba(59, 130, 246, 0.1), transparent)`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Project Number */}
                  <motion.div
                    className="absolute top-6 right-6 text-6xl font-bold text-white/5"
                    whileHover={{ scale: 1.2, color: "rgba(255, 255, 255, 0.1)" }}
                  >
                    0{index + 1}
                  </motion.div>

                  <h3 className="mb-4 text-3xl font-bold pr-20">{project.title}</h3>
                  <p className="mb-6 text-lg text-gray-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Architecture Preview with Animation */}
                  <motion.div
                    className={`mb-6 rounded-xl bg-black/40 p-6 font-mono text-sm border border-white/10 relative overflow-hidden`}
                    whileHover={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-10`}
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <p className={`relative z-10 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent font-semibold`}>
                      {project.architecture}
                    </p>
                  </motion.div>

                  {/* Tech Stack */}
                  <div className="mb-8 flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        className={`rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-10 px-4 py-2 text-sm font-medium border border-white/10`}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      className="flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 font-medium border border-white/10 hover:bg-white/10"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Code2 size={18} />
                      View Code
                    </motion.button>
                    <motion.button
                      className="flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 font-medium border border-white/10 hover:bg-white/10"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight size={18} />
                      Live Demo
                    </motion.button>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className={`absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-br ${project.gradient} blur-3xl opacity-0 group-hover:opacity-20`}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI System Design Section */}
      <section className="py-32 bg-gradient-to-b from-blue-500/5 via-violet-500/5 to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <motion.div
              className="inline-block mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Network className="mx-auto text-violet-400" size={48} />
            </motion.div>
            <h2 className="mb-4 text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              AI System Design
            </h2>
            <p className="text-2xl text-gray-400">
              End-to-end architecture and data flow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Boxes,
                title: "AI Pipelines",
                gradient: "from-blue-500 to-violet-600",
                stages: [
                  { label: "Data Ingestion", color: "bg-blue-500" },
                  { label: "Preprocessing", color: "bg-blue-400", indent: true },
                  { label: "Feature Engineering", color: "bg-blue-400", indent: true },
                  { label: "Model Inference", color: "bg-violet-500" },
                  { label: "Output Delivery", color: "bg-green-500" },
                ],
              },
              {
                icon: Network,
                title: "Data Flow",
                gradient: "from-violet-500 to-purple-600",
                flow: [
                  { label: "Source Systems", desc: "APIs, DBs, Files" },
                  { label: "Processing Layer", desc: "Transform, Clean" },
                  { label: "Storage", desc: "Data Warehouse" },
                ],
              },
              {
                icon: Brain,
                title: "Model Lifecycle",
                gradient: "from-purple-500 to-pink-600",
                metrics: [
                  { label: "Training", value: 95 },
                  { label: "Validation", value: 88 },
                  { label: "Deployment", value: 100 },
                  { label: "Monitoring", value: 92 },
                ],
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-xl overflow-hidden">
                  {/* Animated Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10`}
                    transition={{ duration: 0.5 }}
                  />

                  <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-4">
                      <motion.div
                        className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <section.icon size={28} className="text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold">{section.title}</h3>
                    </div>

                    {section.stages && (
                      <div className="space-y-4 font-mono text-sm">
                        {section.stages.map((stage, i) => (
                          <motion.div
                            key={i}
                            className={`flex items-center gap-3 ${stage.indent  "ml-6" : ""}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                          >
                            <motion.div
                              className={`${stage.color} rounded-full ${stage.indent  "h-2 w-2" : "h-2.5 w-2.5"}`}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            />
                            <span className="text-gray-300">{stage.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {section.flow && (
                      <div className="space-y-4">
                        {section.flow.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + i * 0.2 }}
                          >
                            <motion.div
                              className="rounded-xl bg-black/40 p-4 border border-violet-500/20"
                              whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.4)" }}
                            >
                              <div className="text-violet-400 font-semibold">{item.label}</div>
                              <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
                            </motion.div>
                            {i < section.flow!.length - 1 && (
                              <div className="flex justify-center my-2">
                                <motion.div
                                  animate={{ y: [0, 5, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  <ArrowRight size={18} className="text-gray-600 rotate-90" />
                                </motion.div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {section.metrics && (
                      <div className="space-y-5">
                        {section.metrics.map((metric, i) => (
                          <div key={i}>
                            <div className="mb-2 flex justify-between text-sm">
                              <span className="text-gray-400">{metric.label}</span>
                              <motion.span
                                className="text-purple-400 font-semibold"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                              >
                                {metric.value}%
                              </motion.span>
                            </div>
                            <div className="h-2.5 rounded-full bg-black/40 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${metric.value}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.8 + i * 0.1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Snapshot */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-500/10 via-violet-600/10 to-pink-500/10 p-16 backdrop-blur-xl overflow-hidden"
          >
            {/* Animated Background Orbs */}
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
              animate={{
                x: [-50, 50, -50],
                y: [-50, 50, -50],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              style={{ top: "20%", left: "10%" }}
            />
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-violet-500/20 blur-3xl"
              animate={{
                x: [50, -50, 50],
                y: [50, -50, 50],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              style={{ bottom: "20%", right: "10%" }}
            />

            <div className="relative z-10">
              <motion.h2
                className="mb-12 text-5xl font-bold text-center bg-gradient-to-r from-white via-blue-100 to-violet-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Experience Snapshot
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="mb-6 text-2xl font-semibold text-blue-400 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={24} />
                    </motion.div>
                    AI & Data Engineer
                  </h3>
                  <ul className="space-y-4 text-lg text-gray-300">
                    {[
                      "Built scalable ETL pipelines with Google Cloud Dataflow",
                      "Developed computer vision models for identity verification",
                      "Architected backend systems with Django and Laravel",
                      "3+ years of experience in AI/ML engineering",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <motion.div
                          className="mt-2 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="mb-6 text-2xl font-semibold text-violet-400 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap size={24} />
                    </motion.div>
                    Technical Stack
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Python",
                      "Django",
                      "Laravel",
                      "PHP",
                      "BigQuery",
                      "Dataflow",
                      "GCP",
                      "MySQL",
                      "Computer Vision",
                      "Neural Networks",
                      "API Development",
                    ].map((tech, i) => (
                      <motion.span
                        key={i}
                        className="rounded-full bg-white/5 px-5 py-2.5 text-sm font-medium border border-white/10 backdrop-blur-xl"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          borderColor: "rgba(59, 130, 246, 0.3)",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
