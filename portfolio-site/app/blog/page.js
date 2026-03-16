export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="section-title">Technical Blog</h1>
      <p className="mt-4 text-slate-300">
        Engineering notes on computer vision, data systems, and LLM productionization.
      </p>
      <div className="mt-10 grid gap-6">
        <article className="card p-6">
          <h3 className="text-xl font-semibold">Designing Robust OCR Pipelines</h3>
          <p className="mt-3 text-sm text-slate-300">Preprocessing, segmentation, and validation strategies for OCR accuracy.</p>
        </article>
        <article className="card p-6">
          <h3 className="text-xl font-semibold">Streaming ML Inference at Scale</h3>
          <p className="mt-3 text-sm text-slate-300">Patterns for Beam + Dataflow pipelines with real-time inference.</p>
        </article>
        <article className="card p-6">
          <h3 className="text-xl font-semibold">RAG Architectures that Work</h3>
          <p className="mt-3 text-sm text-slate-300">Embedding strategies, evaluation, and observability for retrieval systems.</p>
        </article>
      </div>
    </div>
  );
}
