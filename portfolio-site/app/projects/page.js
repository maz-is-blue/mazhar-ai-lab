import ProjectCard from '../../components/ProjectCard';

const projects = [
  {
    title: 'AI Identity Verification',
    description: 'Computer vision pipeline that extracts structured fields from ID documents using preprocessing, OCR, and JSON validation.',
    diagram: '/diagrams/id-verification.svg',
    github: 'https://github.com/mazharjahjah/ai-id-verification',
    demo: 'https://huggingface.co/spaces/mazharjahjah/ai-id-verification',
    tags: ['CV', 'OCR', 'FastAPI']
  },
  {
    title: 'AI Data Pipeline',
    description: 'Streaming ingestion, sentiment inference, and warehouse delivery with Beam and BigQuery for real-time analytics.',
    diagram: '/diagrams/data-pipeline.svg',
    github: 'https://github.com/mazharjahjah/ai-data-pipeline',
    demo: 'https://render.com/',
    tags: ['Beam', 'Dataflow', 'BigQuery']
  },
  {
    title: 'RAG Document Assistant',
    description: 'Retrieval-augmented QA system for PDFs with chunking, embeddings, and vector search to power LLM answers.',
    diagram: '/diagrams/rag-assistant.svg',
    github: 'https://github.com/mazharjahjah/rag-document-assistant',
    demo: 'https://huggingface.co/spaces/mazharjahjah/rag-document-assistant',
    tags: ['LLM', 'FAISS', 'LangChain']
  },
  {
    title: 'Travel Recommendation System',
    description: 'Personalized travel ranking engine built with Django, scikit-learn, and a REST API for client integration.',
    diagram: '/diagrams/travel-recommender.svg',
    github: 'https://github.com/mazharjahjah/travel-ai-recommender',
    demo: 'https://render.com/',
    tags: ['Django', 'ML', 'Postgres']
  }
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="section-title">Projects</h1>
      <p className="mt-4 text-slate-300">
        Production-grade AI systems with clear architecture, deployment guides, and live demos.
      </p>
      <div className="project-grid mt-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} delay={index * 80} />
        ))}
      </div>
    </div>
  );
}
