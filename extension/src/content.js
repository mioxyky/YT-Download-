(() => {
  const BUTTON_ID = "ytdlp-download-button";
  const CONTAINER_CLASS = "ytdlp-container";
  const QUALITY_OPTIONS = ["Meilleure qualité", "1080p", "720p", "480p", "360p"];
  const CONFIG = window.YTDLP_CONFIG || { backendBaseUrl: "", legalNotice: "Téléchargez uniquement les vidéos autorisées." };

  let lastUrl = location.href;
  let observer;

  function createIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "ytdlp-icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = '<path fill="currentColor" d="M5 20h14v-2H5v2Zm7-18v10.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V2h1Z"/>';
    return svg;
  }

  function findActionBar() {
    // Ciblage du conteneur des boutons J'aime, Partager, etc.
    return (
      document.querySelector("ytd-watch-metadata #top-level-buttons-computed") ||
      document.querySelector("ytd-menu-renderer.ytd-watch-metadata #top-level-buttons-computed") ||
      document.querySelector("#actions-inner #menu") ||
      document.querySelector("#top-level-buttons-computed") ||
      document.querySelector("#actions-inner")
    );
  }

  function getVideoUrl() {
    const url = new URL(location.href);
    return url.searchParams.get("v") ? url.toString() : location.href;
  }

  function closeOtherPopovers(currentPopover) {
    document.querySelectorAll(".ytdlp-popover[data-open='true']").forEach((popover) => {
      if (popover !== currentPopover) {
        popover.setAttribute("data-open", "false");
      }
    });
  }

  function createOptionButton(label, isActive, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.setAttribute("data-active", String(isActive));
    button.addEventListener("click", onClick);
    return button;
  }

  function createPopover() {
    const state = {
      type: "Vidéo",
      quality: "Meilleure qualité",
      format: "MP4"
    };

    const popover = document.createElement("div");
    popover.className = "ytdlp-popover";
    popover.setAttribute("data-open", "false");
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-label", "Options YT Download+");

    const title = document.createElement("div");
    title.className = "ytdlp-title";
    title.innerHTML = '<span>YT Download<span class="ytdlp-plus">+</span></span><span>⬇</span>';
    popover.append(title);

    const typeGroup = document.createElement("div");
    typeGroup.className = "ytdlp-group";
    typeGroup.innerHTML = '<span class="ytdlp-label">Choix</span>';
    const segmented = document.createElement("div");
    segmented.className = "ytdlp-segmented";
    typeGroup.append(segmented);
    popover.append(typeGroup);

    const qualityGroup = document.createElement("label");
    qualityGroup.className = "ytdlp-group";
    qualityGroup.innerHTML = '<span class="ytdlp-label">Qualité</span>';
    const qualitySelect = document.createElement("select");
    qualitySelect.className = "ytdlp-select";
    QUALITY_OPTIONS.forEach((quality) => {
      const option = document.createElement("option");
      option.value = quality;
      option.textContent = quality;
      qualitySelect.append(option);
    });
    qualitySelect.addEventListener("change", () => {
      state.quality = qualitySelect.value;
    });
    qualityGroup.append(qualitySelect);
    popover.append(qualityGroup);

    const formatGroup = document.createElement("div");
    formatGroup.className = "ytdlp-group";
    formatGroup.innerHTML = '<span class="ytdlp-label">Format</span>';
    const formatGrid = document.createElement("div");
    formatGrid.className = "ytdlp-format-grid";
    formatGroup.append(formatGrid);
    popover.append(formatGroup);

    function renderTypes() {
      segmented.replaceChildren(
        createOptionButton("Vidéo", state.type === "Vidéo", () => {
          state.type = "Vidéo";
          state.format = state.format === "MP3" ? "MP4" : state.format;
          renderTypes();
          renderFormats();
        }),
        createOptionButton("Audio", state.type === "Audio", () => {
          state.type = "Audio";
          state.format = "MP3";
          renderTypes();
          renderFormats();
        })
      );
    }

    function renderFormats() {
      const formats = state.type === "Audio" ? ["MP3", "WEBM"] : ["MP4", "WEBM"];
      formatGrid.replaceChildren(
        ...formats.map((format) => {
          const button = createOptionButton(format, state.format === format, () => {
            state.format = format;
            renderFormats();
          });
          button.className = "ytdlp-format-button";
          return button;
        })
      );
    }

    const downloadButton = document.createElement("button");
    downloadButton.className = "ytdlp-download";
    downloadButton.type = "button";
    downloadButton.textContent = "Télécharger";
    downloadButton.addEventListener("click", () => {
      downloadButton.textContent = "Préparation...";
      downloadButton.disabled = true;
      
      chrome.runtime.sendMessage({
        action: "downloadVideo",
        payload: {
          url: getVideoUrl(),
          type: state.type.toLowerCase(),
          quality: state.quality,
          format: state.format.toLowerCase(),
          backendUrl: CONFIG.backendBaseUrl || "http://localhost:3000"
        }
      }, (response) => {
        downloadButton.disabled = false;
        if (response && response.success) {
          downloadButton.textContent = "Téléchargé !";
          setTimeout(() => downloadButton.textContent = "Télécharger", 3000);
        } else {
          downloadButton.textContent = "Erreur";
          setTimeout(() => downloadButton.textContent = "Télécharger", 3000);
          console.error("YT Download+ Error:", response?.error);
        }
      });
    });
    popover.append(downloadButton);

    const legal = document.createElement("p");
    legal.className = "ytdlp-legal";
    legal.textContent = CONFIG.legalNotice;
    popover.append(legal);

    renderTypes();
    renderFormats();
    return popover;
  }

  function createButton() {
    const wrapper = document.createElement("div");
    wrapper.className = CONTAINER_CLASS;
    wrapper.id = BUTTON_ID;

    const button = document.createElement("button");
    button.className = "ytdlp-button";
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-expanded", "false");
    button.append(createIcon(), document.createTextNode("Télécharger"));

    const popover = createPopover();
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = popover.getAttribute("data-open") === "true";
      closeOtherPopovers(popover);
      popover.setAttribute("data-open", String(!isOpen));
      button.setAttribute("aria-expanded", String(!isOpen));
    });

    wrapper.append(button, popover);
    return wrapper;
  }

  function injectButton() {
    if (!location.pathname.includes("/watch")) {
      document.getElementById(BUTTON_ID)?.remove();
      return;
    }

    const actionBar = findActionBar();
    if (!actionBar || document.getElementById(BUTTON_ID)) {
      return;
    }

    actionBar.append(createButton());
  }

  function scheduleInject() {
    window.setTimeout(injectButton, 250);
    window.setTimeout(injectButton, 900);
    window.setTimeout(injectButton, 1800);
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Node && !document.getElementById(BUTTON_ID)?.contains(target)) {
      document.querySelectorAll(".ytdlp-popover").forEach((popover) => popover.setAttribute("data-open", "false"));
    }
  });

  function tryInject() {
    if (!location.pathname.includes("/watch")) {
      document.getElementById(BUTTON_ID)?.remove();
      return;
    }

    const actionBar = findActionBar();
    if (!actionBar) return;

    if (!document.getElementById(BUTTON_ID)) {
      actionBar.append(createButton());
    }
  }

  // Événements YouTube spécifiques
  document.addEventListener("yt-navigate-finish", tryInject);
  document.addEventListener("yt-page-data-updated", tryInject);

  // Fallback avec setInterval (léger)
  setInterval(tryInject, 1500);
  tryInject();
})();
