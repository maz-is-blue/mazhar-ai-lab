export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="section-title">Resume</h1>
      <p className="mt-4 text-slate-300">
        Download the resume or view highlights below.
      </p>
      <div className="mt-8 card p-6">
        <h2 className="text-xl font-semibold">Mazhar Jahjah</h2>
        <p className="mt-2 text-sm text-slate-300">AI & Data Engineer</p>
        <ul className="mt-6 space-y-3 text-sm text-slate-300">
          <li>Computer vision systems with OCR, detection, and structured extraction pipelines.</li>
          <li>Streaming data platforms with Beam, BigQuery, and real-time inference.</li>
          <li>LLM systems with RAG, evaluation, and deployment tooling.</li>
        </ul>
        <a className="link mt-6 inline-block" href="#">Download PDF</a>
      </div>
    </div>
  );
}
