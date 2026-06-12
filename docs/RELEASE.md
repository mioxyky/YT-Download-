# Tester et exporter une release YT Download+

Ce projet ne commite pas les fichiers binaires générés (`.zip`, `.png`). Ils sont recréés localement au moment du test ou de la release pour éviter l’erreur GitHub “Les fichiers binaires ne sont pas pris en charge”.

## Où se trouve le ZIP de l'extension ?

Après cette commande :

```bash
npm run extension:zip
```

le ZIP à installer dans Chrome est ici :

```text
extension/dist/yt-download-plus-extension.zip
```

Important : Chrome ne charge pas directement le fichier ZIP en extension non empaquetée. Il faut le décompresser, puis sélectionner le dossier décompressé qui contient `manifest.json`.

## 1. Installation

```bash
npm install
```

## 2. Vérifications rapides

```bash
node --check extension/src/config.js
node --check extension/src/content.js
node --check scripts/build-extension-zip.mjs
node --check scripts/prepare-release.mjs
```

## 3. Générer le ZIP de l’extension

```bash
npm run extension:zip
```

Cette commande génère :

- `extension/icons/icon-16.png`
- `extension/icons/icon-48.png`
- `extension/icons/icon-128.png`
- `extension/dist/yt-download-plus-extension.zip`
- `apps/web/public/extension/yt-download-plus-extension.zip`

Ces fichiers sont ignorés par Git, car ce sont des binaires générés.

## 4. Vérifier le ZIP

```bash
unzip -t extension/dist/yt-download-plus-extension.zip
```

## 5. Installer l’extension dans Chrome, Edge ou Brave

```bash
npm run extension:zip
```

Puis :

1. Décompresser `extension/dist/yt-download-plus-extension.zip`.
2. Ouvrir `chrome://extensions`, `edge://extensions` ou `brave://extensions`.
3. Activer le mode développeur.
4. Cliquer sur **Charger l’extension non empaquetée**.
5. Sélectionner le dossier décompressé qui contient `manifest.json`.
6. Ouvrir une page `https://www.youtube.com/watch?v=...` et vérifier le bouton **Télécharger**.

## 6. Tester le site web

```bash
npm run dev
```

Ouvrir `http://localhost:3000`, puis vérifier :

- `/` pour la page d’accueil.
- `/download` pour l’interface de téléchargement par lien.
- `/docs` pour la documentation.
- Le bouton soleil/lune dans la navbar.

## 7. Build complet avant release

```bash
npm run build
```

La commande build Next.js puis recrée le ZIP d’extension.

## 8. Préparer une archive de release

Si `rm -rf release` ou `cp extension/dist/yt-download-plus-extension.zip release/` ne fonctionne pas sur votre machine, utilisez la commande npm portable :

```bash
npm run release:prepare
```

Elle recrée le dossier `release/`, génère le ZIP de l’extension, copie le ZIP et exporte le code source.

À joindre dans GitHub Releases :

- `release/yt-download-plus-extension.zip`
- `release/yt-download-plus-source.zip`

## 9. Publier un tag Git

```bash
git tag v0.1.0
git push origin v0.1.0
```

Ensuite, créez une release GitHub depuis ce tag et téléversez les fichiers du dossier `release/`.
