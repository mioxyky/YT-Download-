import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-2 sm:flex" aria-label="Navigation principale">
          <Link className="youtube-chip" href="/install">
            Installation
          </Link>
          <Link className="youtube-chip" href="/download">
            Télécharger par lien
          </Link>
        </nav>
      </div>
    </header>
  );
}
