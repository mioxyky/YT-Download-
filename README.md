# YT Download+

![License](https://img.shields.io/badge/license-GPLv3-blue.svg)

YT Download+ est une extension navigateur simple et élégante (Manifest V3) accompagnée d'une landing page moderne. Elle ajoute un bouton "Télécharger" rouge directement sous les vidéos YouTube, vous permettant de choisir la qualité souhaitée et de télécharger instantanément la vidéo ou l'audio.

## Installation de l'extension

L'extension n'est pas encore publiée sur les stores officiels. Pour l'installer manuellement :

1. Téléchargez ou récupérez l'archive `.zip` de l'extension.
2. Décompressez l'archive dans un dossier sur votre ordinateur.
3. Ouvrez votre navigateur (Chrome, Edge, Brave ou Navigateur Explore) et allez sur `chrome://extensions` (ou l'équivalent de votre navigateur).
4. Activez le **Mode Développeur** en haut à droite.
5. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier décompressé.

C'est tout ! Allez sur YouTube et profitez du bouton de téléchargement.

## Le projet Next.js (Landing Page)

Le projet inclut une landing page "One-Page" premium (Dark mode, glassmorphism) et une API hybride pour traiter les téléchargements de vidéos de manière fluide en tâche de fond.

### Démarrage rapide du site

\`\`\`bash
cd apps/web
npm install
npm run dev
\`\`\`

Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

## Licence

Ce projet est sous licence **GPLv3**. Consultez le fichier \`LICENSE\` pour plus de détails.
