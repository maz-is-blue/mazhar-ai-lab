export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="section-title">Contact</h1>
      <p className="mt-4 text-slate-300">
        Let’s build intelligent systems together. Reach out below.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-xl font-semibold">Direct</h3>
          <p className="mt-3 text-sm text-slate-300">Email: your.email@example.com</p>
          <p className="mt-2 text-sm text-slate-300">Location: Damascus, Syria</p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold">Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a className="link" href="https://github.com/mazharjahjah" target="_blank">GitHub</a>
            <a className="link" href="https://www.linkedin.com/in/your-profile" target="_blank">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}
