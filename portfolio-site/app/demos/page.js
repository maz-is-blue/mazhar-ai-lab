export default function DemosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="section-title">AI Demos</h1>
      <p className="mt-4 text-slate-300">
        Live experiences are being deployed. Contact me for private demo access.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-xl font-semibold">AI Identity Verification</h3>
          <p className="mt-3 text-sm text-slate-300">Gradio demo for ID extraction and structured JSON output.</p>
          <span className="mt-4 inline-block text-xs uppercase tracking-widest text-slate-400">Coming soon</span>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold">RAG Document Assistant</h3>
          <p className="mt-3 text-sm text-slate-300">Streamlit demo for question answering over uploaded PDFs.</p>
          <span className="mt-4 inline-block text-xs uppercase tracking-widest text-slate-400">Coming soon</span>
        </div>
      </div>
    </div>
  );
}


