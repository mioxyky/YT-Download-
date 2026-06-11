import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/docs#installation", label: "Extension" },
  { href: "/docs", label: "Docs" },
  { href: "/download", label: "Télécharger" },
  { href: "https://github.com/", label: "GitHub", external: true }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="flex items-center gap-1" aria-label="Navigation principale">
          {links.map((link) => (
            <Link
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-panel hover:text-ink md:inline-flex"
              href={link.href}
              key={link.label}
              rel={link.external ? "noreferrer" : undefined}
              target={link.external ? "_blank" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link className="rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-panel hover:text-ink md:hidden" href="/download">
            Télécharger
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
