import Link from "next/link";
import { LegalNotice } from "../components/LegalNotice";

export default function HomePage() {
  return (
    <main className="ytdp-page-shell flex items-center">
      <section className="ytdp-container py-16 text-center sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-panel text-ytblue ring-1 ring-line">
            <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5 20h14v-2H5v2Zm7-18v10.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V2h1Z" />
            </svg>
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-ytblue">Extension navigateur non publiée</p>
          <h1 className="text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">YT Download+</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">
            Télécharge rapidement et facilement des vidéos YouTube.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link className="ytdp-primary-button w-full sm:w-auto" href="/docs#installation">
              Installer
            </Link>
            <Link className="ytdp-secondary-button w-full sm:w-auto" href="/download">
              Rester sur le site
            </Link>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <LegalNotice />
          </div>
        </div>
      </section>
    </main>
  );
}
