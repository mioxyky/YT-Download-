# YT Download+

YT Download+ est un projet composé d’un site web vitrine Next.js et d’une extension navigateur Manifest V3 installable manuellement en mode développeur.

## Structure

```text
apps/web/      Site Next.js + TypeScript + Tailwind CSS
extension/     Extension navigateur MV3 pour YouTube
docs/          Guide d’installation manuel
scripts/       Script de génération du ZIP extension
```

## Fonctionnalités

- Page d’accueil au style YouTube avec une touche bleue YT Download+.
- Page `/download` avec interface de téléchargement par lien : URL, analyse, type, format et qualité.
- Page `/install` et documentation `docs/INSTALL.md` pour l’installation manuelle.
- Extension qui injecte un bouton **Télécharger** sous les vidéos YouTube.
- Dropdown intégré au style YouTube avec choix vidéo/audio, qualité, format et message légal discret.
- MutationObserver pour suivre la navigation SPA de YouTube et réinjecter le bouton au changement de vidéo.
- Fichier `extension/src/config.js` pour configurer l’URL du backend.

> Note : les fonctions backend sont volontairement des placeholders. Aucun téléchargement réel n’est effectué par le site.

## Installation du site

```bash
npm install
npm run dev
```

Ouvrez ensuite `http://localhost:3000`.

## Build

```bash
npm run build
```

Cette commande build le site Next.js puis génère le fichier `extension/dist/yt-download-plus-extension.zip`.

## Générer uniquement le ZIP extension

```bash
npm run extension:zip
```

## Tester et exporter une release

Les fichiers binaires générés ne sont pas commités. Pour éviter les erreurs GitHub du type “Les fichiers binaires ne sont pas pris en charge”, générez-les localement :

```bash
npm install
npm run extension:zip
unzip -t extension/dist/yt-download-plus-extension.zip
```

Le guide complet de test et de release est disponible dans `docs/RELEASE.md`. Si les commandes `rm -rf` ou `cp` ne fonctionnent pas sur votre machine, utilisez `npm run release:prepare`.

## Installer l’extension Chromium

Le ZIP exporté se trouve dans `extension/dist/yt-download-plus-extension.zip` après `npm run extension:zip`.

1. Décompressez `extension/dist/yt-download-plus-extension.zip`.
2. Ouvrez `chrome://extensions`, `edge://extensions` ou `brave://extensions`.
3. Activez le mode développeur.
4. Cliquez sur **Charger l’extension non empaquetée**.
5. Sélectionnez le dossier décompressé qui contient `manifest.json`.

## Tester sur Firefox

1. Ouvrez `about:debugging#/runtime/this-firefox`.
2. Cliquez sur **Charger un module complémentaire temporaire**.
3. Sélectionnez `extension/manifest.json`.

## Configuration backend

Modifiez `extension/src/config.js` :

```js
window.YTDLP_CONFIG = {
  backendBaseUrl: "https://votre-api.example.com",
  legalNotice: "Téléchargez uniquement les vidéos que vous possédez ou que vous avez le droit de télécharger."
};
```

## Sécurité / légal

YT Download+ doit être utilisé uniquement pour télécharger des vidéos que vous possédez ou pour lesquelles vous avez une autorisation explicite.
