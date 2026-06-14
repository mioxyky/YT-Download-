chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadVideo") {
    const { url, type, quality, format, backendUrl } = request.payload;
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, type, quality, format })
    };

    // Helper to attempt fetch
    const attemptFetch = (targetUrl) => {
      return fetch(`${targetUrl}/api/download`, requestOptions)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.downloadUrl) {
            let filename = data.title ? `${data.title.replace(/[\/\\?%*:|"<>]/g, '')}.${format === 'mp3' ? 'mp3' : 'mp4'}` : undefined;
            chrome.downloads.download({ url: data.downloadUrl, filename: filename }, (downloadId) => {
              if (chrome.runtime.lastError) {
                sendResponse({ success: false, error: chrome.runtime.lastError.message });
              } else {
                sendResponse({ success: true, downloadId });
              }
            });
          } else {
            sendResponse({ success: false, error: data.error || "Unknown error from API" });
          }
        });
    };

    // Try primary URL, then fallback to localhost if it's 127.0.0.1
    attemptFetch(backendUrl).catch(error => {
      console.warn("First fetch failed, trying fallback...", error);
      if (backendUrl.includes("127.0.0.1")) {
        const fallbackUrl = backendUrl.replace("127.0.0.1", "localhost");
        attemptFetch(fallbackUrl).catch(fallbackError => {
          console.error("Fetch error in background script:", fallbackError);
          sendResponse({ success: false, error: "Serveur local injoignable. Assurez-vous que 'npm run dev' est bien lancé !" });
        });
      } else {
        console.error("Fetch error in background script:", error);
        sendResponse({ success: false, error: "Serveur local injoignable. Assurez-vous que 'npm run dev' est bien lancé !" });
      }
    });

    return true;
  }
});
