import { LegalNotice } from "../../components/LegalNotice";

const installSteps = [
  {
    title: "Télécharger l'archive ZIP",
    text: "Générez l'archive avec npm run extension:zip, puis récupérez le fichier dans extension/dist/."
  },
  {
    title: "Décompresser l'archive",
    text: "Décompressez le ZIP dans un dossier permanent, par exemple Documents/YT-Download-Plus."
  },
  {
    title: "Ouvrir chrome://extensions",
    text: "Ouvrez la page des extensions de Chrome, Edge, Brave ou un autre navigateur Chromium."
  },
  {
    title: "Activer le mode développeur",
    text: "Activez l'interrupteur Mode développeur en haut à droite de la page."
  },
  {
    title: "Cliquer sur Charger l'extension non empaquetée",
    text: "Utilisez ce bouton pour sélectionner un dossier local plutôt qu'un fichier ZIP."
  },
  {
    title: "Sélectionner le dossier de l'extension",
    text: "Choisissez le dossier décompressé qui contient manifest.json, puis ouvrez une vidéo YouTube."
  }
];

const toc = [
  { href: "#presentation", label: "Présentation" },
  { href: "#installation", label: "Installation" },
  { href: "#utilisation", label: "Utilisation" },
  { href: "#faq", label: "FAQ" }
];

function ScreenshotPlaceholder({ step }: Readonly<{ step: number }>) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-line bg-panel">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-youtube" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <span className="ml-2 h-3 w-32 rounded-full bg-line" />
      </div>
      <div className="grid min-h-44 place-items-center px-6 py-8 text-center">
        <div>
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-sm font-bold text-ytblue ring-1 ring-line">
            {step}
          </div>
          <p className="text-sm font-semibold text-muted">Placeholder capture d'écran</p>
          <p className="mt-1 text-xs text-muted">Remplacez ce bloc par l'image de l'étape {step}.</p>
        </div>
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <main className="ytdp-page-shell">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)_220px] lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-line bg-surface p-3">
            <p className="px-3 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">Général</p>
            {toc.map((item) => (
              <a className="block rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-panel hover:text-ink" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </aside>

        <article className="min-w-0">
          <section id="presentation" className="border-b border-line pb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ytblue">Documentation</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">YT Download+</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              YT Download+ fournit un site web et une extension Manifest V3 installable manuellement pour préparer des téléchargements vidéo ou audio depuis une interface claire, proche de YouTube.
            </p>
            <div className="mt-6">
              <LegalNotice />
            </div>
          </section>

          <section id="installation" className="border-b border-line py-10">
            <h2 className="text-3xl font-bold tracking-tight text-ink">Installation</h2>
            <p className="mt-3 leading-7 text-muted">
              L'extension n'est pas publiée sur les stores. Elle se charge localement en mode développeur après génération du ZIP.
            </p>
            <div className="mt-8 space-y-6">
              {installSteps.map((step, index) => (
                <section className="ytdp-card p-5" key={step.title}>
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-panel text-sm font-bold text-ytblue ring-1 ring-line">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-ink">Étape {index + 1} : {step.title}</h3>
                      <p className="mt-2 leading-7 text-muted">{step.text}</p>
                    </div>
                  </div>
                  <ScreenshotPlaceholder step={index + 1} />
                </section>
              ))}
            </div>
          </section>

          <section id="utilisation" className="border-b border-line py-10">
            <h2 className="text-3xl font-bold tracking-tight text-ink">Utilisation</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="ytdp-card p-5">
                <h3 className="font-bold text-ink">Depuis le site</h3>
                <p className="mt-2 leading-7 text-muted">Ouvrez la page Télécharger, collez une URL YouTube, choisissez vidéo ou audio, le format, la qualité, puis lancez le placeholder de téléchargement.</p>
              </div>
              <div className="ytdp-card p-5">
                <h3 className="font-bold text-ink">Depuis YouTube</h3>
                <p className="mt-2 leading-7 text-muted">Sur une page vidéo, le bouton Télécharger s'ajoute aux actions natives. Le popup permet de choisir le type, le format et la qualité.</p>
              </div>
            </div>
          </section>

          <section id="faq" className="py-10">
            <h2 className="text-3xl font-bold tracking-tight text-ink">FAQ</h2>
            <div className="mt-5 space-y-4">
              <details className="ytdp-card p-5" open>
                <summary className="cursor-pointer font-bold text-ink">Où se trouve le ZIP de l'extension ?</summary>
                <p className="mt-3 leading-7 text-muted">Après `npm run extension:zip`, le fichier est créé dans `extension/dist/yt-download-plus-extension.zip`.</p>
              </details>
              <details className="ytdp-card p-5">
                <summary className="cursor-pointer font-bold text-ink">Pourquoi le vrai téléchargement ne démarre pas encore ?</summary>
                <p className="mt-3 leading-7 text-muted">Le projet contient des hooks backend placeholders. Il faut connecter votre API de téléchargement dans `apps/web/lib/download.ts` et `extension/src/config.js`.</p>
              </details>
            </div>
          </section>
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-24 border-l border-line pl-5">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">Sur cette page</p>
            {toc.map((item) => (
              <a className="block py-1.5 text-sm text-muted transition hover:text-ink" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
