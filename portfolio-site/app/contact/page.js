"use client";

import { motion } from "motion/react";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Message sent! (This is a demo)");
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "mazharjahjah1@gmail.com",
      link: "mailto:mazharjahjah1@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/mazharjahjah",
      link: "https://linkedin.com/in/mazharjahjah",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/mazharjahjah",
      link: "https://github.com/mazharjahjah",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Beirut, Lebanon",
      link: null,
      color: "from-orange-500 to-amber-500",
    },
  ];

  const availability = [
    {
      icon: MessageSquare,
      title: "Open to Opportunities",
      description:
        "AI/ML Engineering roles, technical consulting, and freelance projects",
    },
    {
      icon: Calendar,
      title: "Response Time",
      description: "Typically respond within 24 hours on business days",
    },
  ];

  return (
    <div className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-5xl font-bold">Get In Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let's discuss AI engineering opportunities, technical consulting, or
            collaboration on innovative projects
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {method.link ? (
                <a
                  href={method.link}
                  target={method.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-blue-500/50"
                >
                  <div
                    className={`mb-4 h-12 w-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}
                  >
                    <method.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-400 break-all">
                    {method.value}
                  </p>
                </a>
              ) : (
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div
                    className={`mb-4 h-12 w-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}
                  >
                    <method.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-400">{method.value}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Project Inquiry"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-4 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/50"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Availability Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {availability.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <item.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Professional Networks */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-violet-600/10 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">
                Connect on Social Media
              </h3>
              <p className="text-gray-300 mb-6">
                Follow my work and stay updated on AI engineering projects,
                insights, and industry trends.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white/5 px-4 py-3 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white/5 px-4 py-3 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Working Hours</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-blue-400">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekend</span>
                  <span className="text-gray-500">Limited Availability</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-purple-600/10 p-12 backdrop-blur-sm text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether you're looking for AI consulting, have a project idea, or
            want to discuss opportunities, I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:mazhar.jahjah@example.com"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-8 py-4 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/50"
            >
              <Mail size={20} />
              Email Me
            </a>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-8 py-4 font-semibold text-white transition-all hover:bg-white/5"
            >
              <Calendar size={20} />
              Schedule a Call
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
