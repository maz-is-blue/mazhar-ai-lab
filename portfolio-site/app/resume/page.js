"use client";

import { motion } from "motion/react";
import {
  Briefcase,
  GraduationCap,
  Award,
  Download,
  MapPin,
  Calendar,
} from "lucide-react";

export default function Resume() {
  const experience = [
    {
      title: "AI & Data Engineer",
      company: "Digital Future",
      location: "Dubai, UAE",
      period: "Feb 2024 - Jan 2026",
      description:
        "Designed and deployed scalable data infrastructure and ETL pipelines on Google Cloud Platform",
      achievements: [
        "Designed and deployed scalable ETL pipelines using Google Cloud Dataflow, improving the efficiency of large-scale data processing and transformation",
        "Optimized complex queries and managed data warehousing with BigQuery, enhancing analytical performance and reducing query execution times",
        "Engineered and managed Google Cloud Storage solutions, implementing data partitioning and access controls to improve cost-efficiency and data security",
      ],
    },
    {
      title: "AI Engineer",
      company: "Assentify",
      location: "Beirut, Lebanon",
      period: "Jun 2025 - Sept 2025",
      description:
        "Developed AI-driven identity verification systems with computer vision models",
      achievements: [
        "Developed and deployed AI-driven document analysis pipelines to automate identity verification workflows, improving accuracy and reducing manual review time",
        "Built advanced computer vision models (SegFormer segmentation, OCR enhancements, and preprocessing modules) to enable reliable ID card extraction and field detection",
        "Designed and optimized data annotation workflows, improving dataset quality and boosting model performance on diverse ID card layouts and lighting conditions",
      ],
    },
    {
      title: "Back-End AI Developer (Python)",
      company: "Tsamaye",
      location: "London, UK",
      period: "Sep 2023 - Mar 2024",
      description:
        "Developed robust backend architecture and AI recommendation systems for travel platform",
      achievements: [
        "Developed a robust and scalable backend architecture for a travel website using Python and Django",
        "Implemented a personalized user signup journey to power a custom travel recommendation model",
        "Managed and processed data from Excel sheets to ensure accuracy for the recommendation engine",
      ],
    },
    {
      title: "Back-End AI Developer (PHP Laravel & Python)",
      company: "FoodIQ",
      location: "Damascus, Syria",
      period: "Jan 2023 - Sep 2023",
      description:
        "Architected complete backend system with AI-powered nutritional analysis",
      achievements: [
        "Architected a complete backend system, including API development and middleware, using PHP and Laravel",
        "Optimized a MySQL database to ensure data integrity and implemented robust security measures",
        "Integrated advanced AI algorithms for real-time nutritional analysis and personalized meal planning",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Information Technology Engineering",
      school: "Damascus University",
      location: "Damascus, Syria",
      period: "2018 - 2024",
      focus: "Specialized in Artificial Intelligence Engineering and Programming • GPA: 3.1/4.0",
    },
  ];

  const skills = {
    "Programming Languages": [
      "Python",
      "PHP",
      "SQL",
      "JavaScript",
    ],
    "Frameworks & Backend": [
      "Django",
      "Laravel",
      "FastAPI",
      "Flask",
    ],
    "AI & Machine Learning": [
      "Neural Networks",
      "Computer Vision",
      "Knowledge-Based Systems",
      "Data Clustering",
      "OCR",
      "SegFormer",
    ],
    "Cloud & Data Engineering": [
      "Google Cloud Platform (GCP)",
      "BigQuery",
      "Dataflow",
      "Cloud Storage",
      "ETL Pipelines",
    ],
    "Databases": [
      "MySQL",
      "PostgreSQL",
      "Cloud Storage",
    ],
    "Tools & DevOps": [
      "API Development",
      "CI/CD",
      "Git",
      "Docker",
      "Microsoft Office Suite",
    ],
  };

  const certifications = [
    {
      title: "Full Stack Developer Course",
      issuer: "The Syrian Computer Society",
      year: "2021",
    },
  ];

  const extracurricular = [
    {
      title: "Social Media Content Creator",
      organization: "Instagram",
      description: "Cultivated an online community, growing an audience to over 20,000 followers from zero",
    },
    {
      title: "British Delegate",
      organization: "Chitwan Model United Nations (CMUN) Conference",
      description: "Jul 2020",
    },
    {
      title: "International Ambassador",
      organization: "Aflateen Clubs",
      description: "Jun 2016 - Jun 2020",
    },
  ];

  return (
    <div className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-5xl font-bold mb-4">Resume</h1>
              <p className="text-xl text-gray-400">
                AI & Data Engineer with 3+ years of experience
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/50">
              <Download size={20} />
              Download PDF
            </button>
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Briefcase size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-blue-500/30"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-gradient-to-br from-blue-500 to-violet-600" />

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{job.title}</h3>
                      <p className="text-lg text-blue-400 font-medium">
                        {job.company}
                      </p>
                    </div>
                    <div className="text-gray-400">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{job.period}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{job.description}</p>

                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold">Education</h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                    <p className="text-lg text-violet-400 font-medium mb-2">
                      {edu.school}
                    </p>
                    <p className="text-gray-400">{edu.focus}</p>
                  </div>
                  <div className="text-gray-400">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={16} />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold mb-4 text-blue-400">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-white/5 px-3 py-1.5 text-sm border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Award size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center"
              >
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-semibold mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-400 mb-1">{cert.issuer}</p>
                <p className="text-sm text-blue-400">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Extracurricular Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8">Extracurricular Activities</h2>

          <div className="space-y-6">
            {extracurricular.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-1">{activity.title}</h3>
                <p className="text-lg text-blue-400 font-medium mb-2">
                  {activity.organization}
                </p>
                <p className="text-gray-400">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
