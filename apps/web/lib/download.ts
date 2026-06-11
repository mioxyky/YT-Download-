export type DownloadType = "video" | "audio";
export type DownloadFormat = "mp4" | "webm" | "mp3";
export type DownloadQuality = "best" | "1080p" | "720p" | "480p" | "360p";

export interface AnalyzeRequest {
  url: string;
}

export interface DownloadRequest extends AnalyzeRequest {
  type: DownloadType;
  format: DownloadFormat;
  quality: DownloadQuality;
}

export async function analyzeYoutubeUrl(_request: AnalyzeRequest) {
  // Placeholder backend hook: call your API here to validate the URL and list streams.
  return {
    title: "Vidéo YouTube détectée",
    duration: "--:--",
    thumbnail: null
  };
}

export async function requestDownload(_request: DownloadRequest) {
  // Placeholder backend hook: call your downloader service here.
  return {
    status: "pending",
    message: "Le téléchargement réel sera connecté à votre backend."
  };
}
