"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import Link from "next/link";
import {
  Eye,
  Database,
  MessageSquare,
  Plane,
  Code2,
  ExternalLink,
  GitBranch,
  CheckCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      icon: Eye,
      title: "AI Identity Verification System",
      problem:
        "Organizations needed automated identity verification workflows with reliable ID card extraction and field detection across diverse layouts and lighting conditions.",
      solution:
        "Developed AI-driven document analysis pipeline with advanced computer vision models including SegFormer segmentation, OCR enhancements, and intelligent preprocessing modules.",
      architecture: [
        "Document Upload",
        "Preprocessing",
        "SegFormer Segmentation",
        "OCR Extraction",
        "Field Detection",
        "Verification",
      ],
      tech: [
        "SegFormer",
        "OCR",
        "Computer Vision",
        "Python",
        "Deep Learning",
      ],
      results: [
        "Automated identity verification workflows",
        "Improved accuracy and reduced manual review time",
        "Robust performance on diverse ID layouts",
        "Optimized data annotation workflows",
      ],
      impact: "Transformed identity verification with AI-powered automation",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      color: "blue",
    },
    {
      icon: Database,
      title: "AI Data Pipeline Platform",
      problem:
        "Enterprise needed automated data pipeline to process large-scale data with real-time quality monitoring and efficient transformation.",
      solution:
        "Designed scalable ETL platform using Google Cloud Dataflow with optimized BigQuery integration and intelligent data partitioning for cost-efficiency.",
      architecture: [
        "Data Sources",
        "Cloud Dataflow",
        "Transformation",
        "Quality Checks",
        "BigQuery",
        "Analytics",
      ],
      tech: [
        "Google Cloud Dataflow",
        "BigQuery",
        "Python",
        "GCP",
        "Cloud Storage",
      ],
      results: [
        "Improved efficiency of large-scale data processing",
        "Enhanced analytical performance",
        "Reduced query execution times",
        "Implemented data security controls",
      ],
      impact: "Enabled scalable data processing and transformation at enterprise scale",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      color: "violet",
    },
    {
      icon: Plane,
      title: "Travel Recommendation Engine",
      problem:
        "Travel platform needed personalized recommendations based on user preferences and behavior patterns to improve engagement.",
      solution:
        "Built robust backend architecture with Django implementing personalized user signup journey and custom recommendation model powered by processed data.",
      architecture: [
        "User Signup",
        "Data Collection",
        "Excel Processing",
        "Recommendation Model",
        "Django Backend",
        "API Layer",
      ],
      tech: [
        "Python",
        "Django",
        "Machine Learning",
        "Excel Processing",
        "RESTful API",
      ],
      results: [
        "Personalized travel recommendations",
        "Scalable backend architecture",
        "Accurate data processing from Excel sheets",
        "Enhanced user engagement",
      ],
      impact: "Delivered personalized travel experiences through intelligent recommendations",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      color: "pink",
    },
    {
      icon: Database,
      title: "FoodIQ - AI Nutritional Analysis",
      problem:
        "Users needed real-time nutritional analysis and personalized meal planning with secure, high-performance backend infrastructure.",
      solution:
        "Architected complete backend system with PHP Laravel including API development, middleware, and integrated AI algorithms for nutritional intelligence.",
      architecture: [
        "Laravel Backend",
        "API Layer",
        "MySQL Database",
        "AI Analysis Engine",
        "Meal Planning",
        "User Interface",
      ],
      tech: [
        "PHP",
        "Laravel",
        "MySQL",
        "AI Algorithms",
        "RESTful API",
      ],
      results: [
        "Real-time nutritional analysis",
        "Personalized meal planning",
        "Optimized database performance",
        "Robust security measures",
      ],
      impact: "Empowered users with AI-driven nutrition insights and meal planning",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      color: "orange",
    },
  ];

  return (
    <div className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 rounded-full border border-violet-500/20 bg-violet-500/10 px-6 py-3 backdrop-blur-xl"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="text-violet-400" size={20} />
            <span className="text-violet-400 font-semibold">Portfolio</span>
          </motion.div>
          
          <motion.h1
            className="mb-6 text-6xl md:text-7xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-violet-200 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h1>
          
          <motion.p
            className="text-2xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Production AI systems designed for{" "}
            <span className="text-blue-400">scale</span>,{" "}
            <span className="text-violet-400">reliability</span>, and{" "}
            <span className="text-pink-400">real-world impact</span>
          </motion.p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className="relative rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent p-12 md:p-16 backdrop-blur-2xl overflow-hidden">
                {/* Animated Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0`}
                  animate={{
                    opacity: hoveredIndex === index  0.05 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-[3rem]"
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.1), transparent)`,
                  }}
                  animate={{
                    rotate: hoveredIndex === index  360 : 0,
                  }}
                  transition={{ duration: 3, ease: "linear" }}
                />

                {/* Project Number */}
                <motion.div
                  className="absolute top-8 right-8 text-9xl font-bold text-white/[0.02]"
                  whileHover={{ scale: 1.1, opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                >
                  0{index + 1}
                </motion.div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-8 mb-10">
                    <motion.div
                      className={`h-20 w-20 rounded-3xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-2xl flex-shrink-0`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <project.icon size={40} className="text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.title}
                      </motion.h2>
                      <motion.p
                        className={`text-xl font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        {project.impact}
                      </motion.p>
                    </div>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div
                      className="relative rounded-2xl bg-red-500/5 border border-red-500/20 p-8 backdrop-blur-xl overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.5 }}
                      />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            className="h-8 w-8 rounded-lg bg-red-500/20 flex items-center justify-center"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Zap size={16} className="text-red-400" />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-red-400">Problem</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg">{project.problem}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="relative rounded-2xl bg-green-500/5 border border-green-500/20 p-8 backdrop-blur-xl overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.5 }}
                      />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <CheckCircle size={16} className="text-green-400" />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-green-400">Solution</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg">{project.solution}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Architecture Diagram */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <GitBranch size={24} className="text-violet-400" />
                      <h3 className="text-2xl font-bold">System Architecture</h3>
                    </div>
                    <div className="rounded-2xl bg-black/40 p-8 border border-white/10 backdrop-blur-xl">
                      <div className="flex flex-wrap items-center gap-4">
                        {project.architecture.map((step, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <motion.div
                              className={`group/step relative rounded-xl bg-gradient-to-br ${project.gradient} bg-opacity-20 px-6 py-3 border border-white/20`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.6 + i * 0.1 }}
                              whileHover={{
                                scale: 1.1,
                                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                              }}
                            >
                              <span className="text-sm font-semibold text-white">
                                {step}
                              </span>
                            </motion.div>
                            {i < project.architecture.length - 1 && (
                              <motion.div
                                className="text-gray-600 hidden md:block"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                →
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <Code2 size={24} className="text-blue-400" />
                      <h3 className="text-2xl font-bold">Tech Stack</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          className={`rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-10 px-6 py-3 text-sm font-semibold border border-white/20 backdrop-blur-xl`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1 + i * 0.1 }}
                          whileHover={{
                            scale: 1.15,
                            boxShadow: "0 0 25px rgba(59, 130, 246, 0.4)",
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle size={24} className="text-green-400" />
                      <h3 className="text-2xl font-bold">Results & Impact</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.results.map((result, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-4 rounded-xl bg-white/5 p-6 border border-white/10 backdrop-blur-xl"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        >
                          <motion.div
                            className="mt-1 h-2.5 w-2.5 rounded-full bg-green-500 flex-shrink-0"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          />
                          <span className="text-gray-300 leading-relaxed">{result}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <motion.button
                      className={`group/btn relative flex items-center gap-3 rounded-xl bg-gradient-to-r ${project.gradient} px-8 py-4 font-semibold text-white overflow-hidden shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <Code2 size={20} className="relative z-10" />
                      <span className="relative z-10">View Code</span>
                    </motion.button>

                    <motion.button
                      className="flex items-center gap-3 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl"
                      whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </motion.button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br ${project.gradient} blur-3xl opacity-0`}
                  animate={{
                    opacity: hoveredIndex === index  0.2 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <motion.div
            className="inline-flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-12 backdrop-blur-xl"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-violet-400" size={48} />
            </motion.div>
            <h3 className="text-3xl font-bold">Interested in collaboration</h3>
            <p className="text-xl text-gray-400 max-w-2xl">
              Let's build something amazing together
            </p>
            <Link href="/contact">
              <motion.button
                className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-10 py-5 font-semibold text-white text-lg shadow-lg"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
