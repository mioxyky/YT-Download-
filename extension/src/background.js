chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadVideo") {
    const { url, type, quality, format, backendUrl } = request.payload;
    
    // Perform fetch to backend API
    fetch(`${backendUrl}/api/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url, type, quality, format })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.downloadUrl) {
        // Trigger chrome download
        let filename = data.title ? `${data.title.replace(/[\/\\?%*:|"<>]/g, '')}.${format === 'mp3' ? 'mp3' : 'mp4'}` : undefined;
        chrome.downloads.download({
          url: data.downloadUrl,
          filename: filename
        }, (downloadId) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            sendResponse({ success: false, error: chrome.runtime.lastError.message });
          } else {
            sendResponse({ success: true, downloadId });
          }
        });
      } else {
        sendResponse({ success: false, error: data.error || "Unknown error from API" });
      }
    })
    .catch(error => {
      console.error("Fetch error in background script:", error);
      sendResponse({ success: false, error: error.toString() });
    });

    // Return true to indicate we wish to send a response asynchronously
    return true;
  }
});
