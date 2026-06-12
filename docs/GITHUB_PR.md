# Résoudre les conflits d'une pull request GitHub

Oui, c'est normal qu'une pull request affiche parfois **“This branch has conflicts that must be resolved”**. Cela veut dire que GitHub ne sait pas fusionner automatiquement ta branche avec la branche cible, souvent `main` ou `master`.

## Pourquoi ça arrive ?

Un conflit arrive quand :

- le même fichier a été modifié dans ta branche et dans la branche cible ;
- une ancienne version de la branche est utilisée pour créer la PR ;
- un fichier a été supprimé d'un côté mais modifié de l'autre ;
- des fichiers générés ont été commités puis supprimés, comme des ZIP ou des images.

Dans ce projet, les fichiers générés doivent rester hors Git :

- `extension/dist/`
- `extension/icons/*.png`
- `apps/web/public/extension/*.zip`
- `release/`

Ces fichiers se recréent avec `npm run extension:zip` ou `npm run release:prepare`.

## Solution recommandée : résoudre en local

Remplace `main` par `master` si ton dépôt utilise `master`.

```bash
git status
git fetch origin
git checkout work
git rebase origin/main
```

Si Git affiche des conflits, ouvre les fichiers indiqués. Tu verras des marqueurs comme ceci :

```text
<<<<<<< HEAD
version de la branche cible
=======
version de ta branche
>>>>>>> work
```

Garde le bon contenu, supprime les lignes `<<<<<<<`, `=======`, `>>>>>>>`, puis marque le fichier comme résolu :

```bash
git add chemin/du/fichier
```

Quand tous les fichiers sont résolus :

```bash
git rebase --continue
```

Puis pousse la branche mise à jour :

```bash
git push --force-with-lease origin work
```

## Alternative : fusionner au lieu de rebase

Si tu préfères éviter `rebase` :

```bash
git status
git fetch origin
git checkout work
git merge origin/main
```

Résous les fichiers en conflit, puis :

```bash
git add chemin/du/fichier
git commit
git push origin work
```

## Que modifier exactement ?

GitHub liste les fichiers en conflit dans la PR. Ce sont ces fichiers-là qu'il faut ouvrir et corriger.

Pour YT Download+, en cas de conflit sur les fichiers générés, ne garde pas les binaires dans Git. Supprime-les de l'index et regénère-les localement si besoin :

```bash
git rm --cached -r extension/dist extension/icons apps/web/public/extension release 2>/dev/null || true
npm run extension:zip
```

Ensuite, vérifie que seuls les fichiers source ou docs sont suivis :

```bash
git status --short
```

## Après résolution

Teste au minimum :

```bash
node --check extension/src/config.js
node --check extension/src/content.js
node --check scripts/build-extension-zip.mjs
node --check scripts/prepare-release.mjs
npm run extension:zip
unzip -t extension/dist/yt-download-plus-extension.zip
```
