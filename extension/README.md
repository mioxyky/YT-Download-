# YT Download+ Extension

Extension Manifest V3 compatible Chromium. Un bloc `browser_specific_settings` est inclus pour faciliter les tests Firefox en chargement temporaire.

## Installation Chromium

1. Décompressez `yt-download-plus-extension.zip`.
2. Ouvrez `chrome://extensions`, `edge://extensions` ou `brave://extensions`.
3. Activez le mode développeur.
4. Cliquez sur **Charger l’extension non empaquetée**.
5. Sélectionnez le dossier `extension` qui contient `manifest.json`.

## Installation Firefox temporaire

1. Ouvrez `about:debugging#/runtime/this-firefox`.
2. Cliquez sur **Charger un module complémentaire temporaire**.
3. Sélectionnez `extension/manifest.json`.

## Configuration backend

Modifiez `src/config.js` pour remplacer `backendBaseUrl` par l’URL de votre API.

## Note légale

Téléchargez uniquement les vidéos que vous possédez ou que vous avez le droit de télécharger.
