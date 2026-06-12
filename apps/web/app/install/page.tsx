import Link from "next/link";

export default function InstallPage() {
  return (
    <main className="ytdp-page-shell grid place-items-center px-4 py-16">
      <section className="ytdp-card max-w-2xl p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ytblue">Installation</p>
        <h1 className="mt-4 text-3xl font-extrabold text-ink">La documentation a été déplacée</h1>
        <p className="mt-4 leading-7 text-muted">
          Le guide complet d'installation est maintenant disponible sur la page Docs avec les étapes et les emplacements prévus pour les captures d'écran.
        </p>
        <Link className="ytdp-primary-button mt-7" href="/docs#installation">
          Ouvrir les docs
        </Link>
      </section>
    </main>
  );
}
