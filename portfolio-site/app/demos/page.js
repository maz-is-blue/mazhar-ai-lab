export default function DemosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="section-title">AI Demos</h1>
      <p className="mt-4 text-slate-300">
        Live experiences for computer vision, RAG, and data pipeline inference.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-xl font-semibold">AI Identity Verification</h3>
          <p className="mt-3 text-sm text-slate-300">Gradio demo for ID extraction and structured JSON output.</p>
          <a className="link mt-4 inline-block" href="https://huggingface.co/spaces/mazharjahjah/ai-id-verification" target="_blank">Launch Demo</a>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold">RAG Document Assistant</h3>
          <p className="mt-3 text-sm text-slate-300">Streamlit demo for question answering over uploaded PDFs.</p>
          <a className="link mt-4 inline-block" href="https://huggingface.co/spaces/mazharjahjah/rag-document-assistant" target="_blank">Launch Demo</a>
        </div>
      </div>
    </div>
  );
}
