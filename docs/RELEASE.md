# Tester et exporter une release YT Download+

Ce projet ne commite pas les fichiers binaires générés (`.zip`, `.png`). Ils sont recréés localement au moment du test ou de la release pour éviter l’erreur GitHub “Les fichiers binaires ne sont pas pris en charge”.

## 1. Installation

```bash
npm install
```

## 2. Vérifications rapides

```bash
node --check extension/src/config.js
node --check extension/src/content.js
node --check scripts/build-extension-zip.mjs
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

## 4. Vérifier le ZIP

```bash
unzip -t extension/dist/yt-download-plus-extension.zip
```

## 5. Tester l’extension dans Chrome, Edge ou Brave

```bash
npm run extension:zip
```

Puis :

1. Décompresser `extension/dist/yt-download-plus-extension.zip` dans un dossier local.
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
- `/install` pour le guide manuel.

## 7. Build complet avant release

```bash
npm run build
```

La commande build Next.js puis recrée le ZIP d’extension.

## 8. Préparer une archive de release sans fichier binaire commité

```bash
rm -rf release
mkdir -p release
npm run extension:zip
cp extension/dist/yt-download-plus-extension.zip release/
git archive --format=zip --output=release/yt-download-plus-source.zip HEAD
```

À joindre dans GitHub Releases :

- `release/yt-download-plus-extension.zip`
- `release/yt-download-plus-source.zip`

## 9. Publier un tag Git

```bash
git tag v0.1.0
git push origin v0.1.0
```

Ensuite, créez une release GitHub depuis ce tag et téléversez les fichiers du dossier `release/`.
