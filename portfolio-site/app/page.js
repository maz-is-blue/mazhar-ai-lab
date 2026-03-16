import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';

const projects = [
  {
    title: 'AI Identity Verification',
    description: 'Computer vision pipeline that extracts structured fields from ID documents using preprocessing, OCR, and JSON validation.',
    diagram: '/diagrams/id-verification.svg',
    github: 'https://github.com/mazharjahjah/ai-id-verification',
    demo: '/contact',
    tags: ['CV', 'OCR', 'FastAPI']
  },
  {
    title: 'AI Data Pipeline',
    description: 'Streaming ingestion, sentiment inference, and warehouse delivery with Beam and BigQuery for real-time analytics.',
    diagram: '/diagrams/data-pipeline.svg',
    github: 'https://github.com/mazharjahjah/ai-data-pipeline',
    demo: '/contact',
    tags: ['Beam', 'Dataflow', 'BigQuery']
  },
  {
    title: 'RAG Document Assistant',
    description: 'Retrieval-augmented QA system for PDFs with chunking, embeddings, and vector search to power LLM answers.',
    diagram: '/diagrams/rag-assistant.svg',
    github: 'https://github.com/mazharjahjah/rag-document-assistant',
    demo: '/contact',
    tags: ['LLM', 'FAISS', 'LangChain']
  },
  {
    title: 'Travel Recommendation System',
    description: 'Personalized travel ranking engine built with Django, scikit-learn, and a REST API for client integration.',
    diagram: '/diagrams/travel-recommender.svg',
    github: 'https://github.com/mazharjahjah/travel-ai-recommender',
    demo: '/contact',
    tags: ['Django', 'ML', 'Postgres']
  }
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-20 grid-bg">
        <div className="orbit">
          <div className="glow-orb one" />
          <div className="glow-orb two" />
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="tag">AI & Data Engineer</span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              Mazhar Jahjah
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Specializing in computer vision systems, scalable data pipelines, and LLM-powered applications.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/projects" className="rounded-full bg-aurora px-6 py-3 text-sm font-semibold text-night">
                View Projects
              </Link>
              <Link href="/contact" className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200">
                Contact
              </Link>
            </div>
          </div>
          <div className="card p-6 animate-float">
            <h2 className="text-xl font-semibold">AI Lab Focus</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Computer vision & OCR pipelines for identity verification.</li>
              <li>Streaming data platforms with ML inference and warehouse delivery.</li>
              <li>LLM retrieval systems optimized for precision and traceability.</li>
              <li>Production-ready APIs with monitoring and deployment guides.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="marquee text-sm text-slate-300">
        <span>
          Computer Vision • Data Pipelines • LLM Systems • RAG • FastAPI • Beam • BigQuery • MLOps •
          Computer Vision • Data Pipelines • LLM Systems • RAG • FastAPI • Beam • BigQuery • MLOps •
        </span>
      </section>

      <section className="py-12">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Featured Projects</h2>
          <Link href="/projects" className="link text-sm">Explore all</Link>
        </div>
        <div className="project-grid mt-8">
          {projects.slice(0, 2).map((project, index) => (
            <ProjectCard key={project.title} {...project} delay={index * 80} />
          ))}
        </div>
      </section>

      <section className="py-12">
        <h2 className="section-title">Engineering Approach</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <h3 className="text-lg font-semibold">AI System Architecture</h3>
            <p className="mt-3 text-sm text-slate-300">
              Layered services separating ingestion, inference, and delivery with secure model routing and observability.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold">Data Pipeline Design</h3>
            <p className="mt-3 text-sm text-slate-300">
              Streaming-first pipelines with robust backfills, schema validation, and automated lineage tracking.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold">ML Workflows</h3>
            <p className="mt-3 text-sm text-slate-300">
              Reproducible training, evaluation, and deployment workflows built with versioned datasets and CI tests.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="card p-8">
          <h2 className="section-title">Let’s Collaborate</h2>
          <p className="mt-3 text-sm text-slate-300">
            Open to consulting and product partnerships for AI systems, data platforms, and LLM applications.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="https://github.com/mazharjahjah" className="link" target="_blank">GitHub</Link>
            <Link href="/contact" className="link">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}


