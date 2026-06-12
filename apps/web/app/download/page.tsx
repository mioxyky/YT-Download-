"use client";

import { FormEvent, useMemo, useState } from "react";
import { LegalNotice } from "../../components/LegalNotice";
import { DownloadFormat, DownloadQuality, DownloadType, analyzeYoutubeUrl, requestDownload } from "../../lib/download";

const qualities: { label: string; value: DownloadQuality }[] = [
  { label: "Meilleure qualité disponible", value: "best" },
  { label: "1080p", value: "1080p" },
  { label: "720p", value: "720p" },
  { label: "480p", value: "480p" },
  { label: "360p", value: "360p" }
];

export default function DownloadPage() {
  const [url, setUrl] = useState("");
  const [type, setType] = useState<DownloadType>("video");
  const [format, setFormat] = useState<DownloadFormat>("mp4");
  const [quality, setQuality] = useState<DownloadQuality>("best");
  const [status, setStatus] = useState("Collez une URL YouTube pour commencer.");

  const formats = useMemo(() => (type === "audio" ? ["mp3", "webm"] : ["mp4", "webm"]), [type]);

  async function handleAnalyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url.trim()) {
      setStatus("Veuillez renseigner une URL YouTube.");
      return;
    }

    const result = await analyzeYoutubeUrl({ url });
    setStatus(`${result.title} — choisissez vos options puis cliquez sur Télécharger.`);
  }

  async function handleDownload() {
    const result = await requestDownload({ url, type, format, quality });
    setStatus(result.message);
  }

  return (
    <main className="ytdp-page-shell">
      <section className="ytdp-container py-10 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 border-b border-line pb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ytblue">Téléchargement par URL</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">Télécharger depuis un lien YouTube</h1>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              Collez une URL, analysez-la, puis choisissez les options de sortie. Le vrai téléchargement sera branché sur votre backend.
            </p>
          </div>

          <section className="ytdp-card p-5 sm:p-6">
            <form onSubmit={handleAnalyze} className="flex flex-col gap-3 lg:flex-row">
              <label className="sr-only" htmlFor="youtube-url">URL YouTube</label>
              <input
                className="min-h-12 flex-1 rounded-full border border-line bg-panel px-5 text-base text-ink outline-none transition placeholder:text-muted focus:border-ytblue focus:ring-4 focus:ring-blue-500/15"
                id="youtube-url"
                placeholder="https://www.youtube.com/watch?v=..."
                type="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
              <button className="ytdp-secondary-button" type="submit">
                Analyser
              </button>
            </form>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <fieldset className="rounded-2xl bg-panel p-4 ring-1 ring-line">
                <legend className="mb-3 font-bold text-ink">Type</legend>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                  {(["video", "audio"] as DownloadType[]).map((option) => (
                    <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl bg-surface px-3 py-3 text-sm font-semibold text-ink ring-1 ring-line transition hover:bg-line/40">
                      <input checked={type === option} name="type" type="radio" onChange={() => {
                        setType(option);
                        setFormat(option === "audio" ? "mp3" : "mp4");
                      }} />
                      {option === "video" ? "Vidéo" : "Audio"}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="rounded-2xl bg-panel p-4 font-bold text-ink ring-1 ring-line">
                Format
                <select
                  className="mt-3 min-h-12 w-full rounded-xl border border-line bg-surface px-4 font-medium text-ink outline-none focus:border-ytblue focus:ring-4 focus:ring-blue-500/15"
                  value={format}
                  onChange={(event) => setFormat(event.target.value as DownloadFormat)}
                >
                  {formats.map((option) => (
                    <option key={option} value={option}>{option.toUpperCase()}</option>
                  ))}
                </select>
              </label>

              <label className="rounded-2xl bg-panel p-4 font-bold text-ink ring-1 ring-line">
                Qualité
                <select
                  className="mt-3 min-h-12 w-full rounded-xl border border-line bg-surface px-4 font-medium text-ink outline-none focus:border-ytblue focus:ring-4 focus:ring-blue-500/15"
                  value={quality}
                  onChange={(event) => setQuality(event.target.value as DownloadQuality)}
                >
                  {qualities.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium leading-6 text-muted" role="status">{status}</p>
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-youtube px-7 py-3 text-sm font-bold text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
                disabled={!url.trim()}
                onClick={handleDownload}
                type="button"
              >
                Télécharger
              </button>
            </div>
          </section>

          <div className="mt-5">
            <LegalNotice />
          </div>
        </div>
      </section>
    </main>
  );
}
