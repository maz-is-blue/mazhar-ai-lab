import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-night/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          Mazhar AI Lab
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/projects" className="hover:text-aurora">Projects</Link>
          <Link href="/demos" className="hover:text-aurora">AI Demos</Link>
          <Link href="/blog" className="hover:text-aurora">Blog</Link>
          <Link href="/resume" className="hover:text-aurora">Resume</Link>
          <Link href="/contact" className="hover:text-aurora">Contact</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
