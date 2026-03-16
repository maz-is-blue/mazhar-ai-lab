import Link from 'next/link';

export default function ProjectCard({ title, description, diagram, github, demo, tags, delay }) {
  return (
    <article className="card p-6 fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="tag">AI</span>
      </div>
      <p className="mt-3 text-sm text-slate-300">{description}</p>
      <div className="diagram mt-5">
        <img src={diagram} alt={`${title} architecture diagram`} className="w-full rounded-lg" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        <Link className="link" href={github} target="_blank">GitHub</Link>
        <Link className="link" href={demo} target="_blank">Live Demo</Link>
      </div>
    </article>
  );
}


