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
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-ytblue">Téléchargement par lien</p>
        <h1 className="mt-3 text-4xl font-extrabold text-ink">Analyser une URL YouTube</h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Cette page contient l’interface complète et des fonctions backend placeholders. Aucun vrai téléchargement n’est exécuté pour le moment.
        </p>
      </div>

      <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-youtube sm:p-8">
        <form onSubmit={handleAnalyze} className="flex flex-col gap-3 lg:flex-row">
          <input
            className="min-h-14 flex-1 rounded-full border border-zinc-300 bg-zinc-50 px-5 text-base outline-none transition focus:border-ytblue focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="https://www.youtube.com/watch?v=..."
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <button className="min-h-14 rounded-full bg-zinc-900 px-7 font-bold text-white transition hover:bg-zinc-700" type="submit">
            Analyser
          </button>
        </form>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <fieldset className="rounded-3xl bg-zinc-50 p-5">
            <legend className="mb-3 font-bold text-ink">Type</legend>
            {(["video", "audio"] as DownloadType[]).map((option) => (
              <label key={option} className="mb-3 flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-3 font-medium capitalize">
                <input checked={type === option} name="type" type="radio" onChange={() => {
                  setType(option);
                  setFormat(option === "audio" ? "mp3" : "mp4");
                }} />
                {option === "video" ? "Vidéo" : "Audio"}
              </label>
            ))}
          </fieldset>

          <label className="rounded-3xl bg-zinc-50 p-5 font-bold text-ink">
            Format
            <select
              className="mt-3 min-h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 font-medium"
              value={format}
              onChange={(event) => setFormat(event.target.value as DownloadFormat)}
            >
              {formats.map((option) => (
                <option key={option} value={option}>{option.toUpperCase()}</option>
              ))}
            </select>
          </label>

          <label className="rounded-3xl bg-zinc-50 p-5 font-bold text-ink">
            Qualité
            <select
              className="mt-3 min-h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 font-medium"
              value={quality}
              onChange={(event) => setQuality(event.target.value as DownloadQuality)}
            >
              {qualities.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-zinc-600" role="status">{status}</p>
          <button
            className="rounded-full bg-youtube px-8 py-4 font-bold text-white shadow-youtube transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
            disabled={!url.trim()}
            onClick={handleDownload}
            type="button"
          >
            Télécharger
          </button>
        </div>
      </section>

      <div className="mt-6">
        <LegalNotice />
      </div>
    </main>
  );
}
