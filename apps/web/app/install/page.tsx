import { LegalNotice } from "../../components/LegalNotice";

const browsers = ["Chrome", "Edge", "Brave", "Opera", "Firefox (adaptation fournie, avec chargement temporaire)"];
const steps = [
  "Téléchargez l’archive yt-download-plus-extension.zip depuis la page d’accueil ou le dossier extension/dist.",
  "Décompressez l’archive dans un dossier permanent de votre ordinateur.",
  "Ouvrez chrome://extensions, edge://extensions ou la page équivalente de votre navigateur Chromium.",
  "Activez le mode développeur en haut à droite.",
  "Cliquez sur Charger l’extension non empaquetée.",
  "Sélectionnez le dossier extension qui contient le fichier manifest.json."
];

export default function InstallPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-ytblue">Guide manuel</p>
      <h1 className="mt-3 text-4xl font-extrabold text-ink">Installer YT Download+ en mode développeur</h1>
      <p className="mt-4 text-lg text-zinc-600">
        L’extension n’est pas publiée sur les stores. Elle s’installe manuellement depuis le dossier local de l’extension.
      </p>

      <section className="mt-8 rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-youtube sm:p-8">
        <h2 className="text-2xl font-extrabold">Navigateurs ciblés</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {browsers.map((browser) => (
            <span key={browser} className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700">{browser}</span>
          ))}
        </div>

        <h2 className="mt-8 text-2xl font-extrabold">Étapes</h2>
        <ol className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-2xl bg-zinc-50 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-youtube font-bold text-white">{index + 1}</span>
              <span className="font-medium text-zinc-800">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6">
        <LegalNotice />
      </div>
    </main>
  );
}
