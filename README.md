<div align="center">
  <img src="https://raw.githubusercontent.com/mioxyky/YT-Download-/main/extension/icons/icon-128.png" alt="YT Download+ Logo" width="128" height="128" />
  <h1>YT Download+</h1>
  <p><strong>L'extension ultime pour télécharger vos vidéos YouTube en un clic, avec style et sans publicité.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Version-1.0.0-ff0033.svg?style=flat-square&logo=youtube" alt="Version" />
    <img src="https://img.shields.io/badge/Licence-GPLv3-blue.svg?style=flat-square" alt="Licence" />
    <img src="https://img.shields.io/badge/Manifest-V3-brightgreen.svg?style=flat-square&logo=google-chrome" alt="Manifest V3" />
    <img src="https://img.shields.io/badge/Framework-Next.js-black.svg?style=flat-square&logo=next.js" alt="Next.js" />
  </p>
</div>

---

## ✨ Présentation

**YT Download+** ajoute un bouton rouge natif de téléchargement directement dans l'interface de YouTube (juste à côté des boutons J'aime et Partager). Finis les sites tiers remplis de pop-ups ! Vous choisissez votre qualité (1080p, 720p, Audio) directement depuis YouTube et le téléchargement se lance instantanément.

Le projet est composé de deux parties :
1. **L'Extension Navigateur (Manifest V3)** : Injection propre dans l'interface YouTube.
2. **La Landing Page & l'API Backend (Next.js)** : Un site vitrine magnifique en Dark Mode, qui gère également les requêtes de téléchargement de façon transparente.

---

## 🚀 Installation de l'Extension

L'extension n'est pas publiée sur le Chrome Web Store. Voici comment l'installer manuellement en moins d'une minute :

1. **Téléchargez** l'archive `YT-Download-Extension.zip` depuis les Releases ou depuis le dossier `public` de ce dépôt.
2. **Décompressez** le fichier `.zip` dans un dossier sur votre ordinateur.
3. Ouvrez votre navigateur (Chrome, Navigateur Explore, Edge, Brave) et accédez à l'URL `chrome://extensions`.
4. Activez le **Mode Développeur** (en haut à droite).
5. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier que vous venez de décompresser.

> 🎉 **Et voilà !** Allez sur une vidéo YouTube et admirez votre nouveau bouton magique.

---

## 💻 Développement (Site Vitrine & API)

Le site vitrine a été conçu avec **Next.js** et **Tailwind CSS** (thème Glassmorphism / Dark Mode). L'API utilise `ytdl-core` avec une sécurité de repli (fallback) sur l'API publique Cobalt.

### Pour lancer le projet en local :

```bash
# Se rendre dans le dossier de l'application Web
cd apps/web

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

🌐 Le site sera ensuite accessible sur : **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Stack Technique

| Technologie | Rôle |
| :--- | :--- |
| **Vanilla JS & CSS** | Code de l'extension navigateur (content script & background) |
| **Next.js 14** | Landing page et backend API de téléchargement |
| **Tailwind CSS 3** | Design ultra-moderne et responsive du site web |
| **ytdl-core** | Moteur interne d'extraction de la vidéo (via l'API Next.js) |

---

## 📄 Licence

Ce projet est publié sous licence **GPLv3**. Vous êtes libre de l'étudier, de le modifier et de le redistribuer sous les mêmes conditions. Consultez le fichier `LICENSE` pour plus de détails.

<div align="center">
  <sub>Fait avec ❤️ pour simplifier l'expérience YouTube.</sub>
</div>
