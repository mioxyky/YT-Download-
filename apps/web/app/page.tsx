import Link from "next/link";
import { LegalNotice } from "../components/LegalNotice";

const installSteps = [
  "Télécharger le fichier ZIP de l’extension",
  "Décompresser le fichier",
  "Ouvrir chrome://extensions ou edge://extensions",
  "Activer le mode développeur",
  "Cliquer sur “Charger l’extension non empaquetée”",
  "Sélectionner le dossier de l’extension"
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700">
            <span className="h-2 w-2 rounded-full bg-ytblue" /> Extension MV3 + site Next.js
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Téléchargez vos vidéos YouTube facilement
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            YT Download+ prépare une expérience simple, moderne et intégrée à YouTube pour choisir un format, une qualité et lancer vos téléchargements depuis le web ou l’extension.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-full bg-youtube px-7 py-4 text-base font-bold text-white shadow-youtube transition hover:bg-red-700"
              href="/extension/yt-download-plus-extension.zip"
            >
              Télécharger l’extension
            </a>
            <Link
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-7 py-4 text-base font-bold text-white transition hover:bg-zinc-700"
              href="/download"
            >
              Télécharger une vidéo avec un lien
            </Link>
          </div>
          <div className="mt-6">
            <LegalNotice />
          </div>
        </div>

        <div className="rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-youtube">
          <div className="overflow-hidden rounded-[1.5rem] border border-zinc-100 bg-zinc-50">
            <div className="aspect-video bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-6 text-white">
              <div className="flex h-full items-center justify-center rounded-2xl bg-black/25">
                <div className="flex h-20 w-28 items-center justify-center rounded-3xl bg-youtube">
                  <span className="ml-1 h-0 w-0 border-y-[14px] border-l-[24px] border-y-transparent border-l-white" />
                </div>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div className="h-5 w-3/4 rounded-full bg-zinc-200" />
              <div className="flex flex-wrap gap-2">
                {['J’aime', 'Partager', 'Enregistrer', 'Télécharger'].map((label) => (
                  <span key={label} className={`rounded-full px-4 py-2 text-sm font-semibold ${label === 'Télécharger' ? 'bg-blue-100 text-ytblue' : 'bg-zinc-200 text-zinc-800'}`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8" id="installation">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-youtube sm:p-8">
          <h2 className="text-3xl font-extrabold text-ink">Comment installer l’extension ?</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {installSteps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-2xl bg-zinc-50 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ytblue font-bold text-white">{index + 1}</span>
                <span className="pt-1 font-medium text-zinc-800">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
