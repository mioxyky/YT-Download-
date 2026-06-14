import React from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[rgb(var(--background))]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--primary))] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      
      <section className="relative z-10 container max-w-5xl mx-auto px-6 py-24 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel mb-8 text-sm font-medium text-[rgb(var(--primary))]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--primary))] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[rgb(var(--primary))]"></span>
          </span>
          Prêt pour Navigateur Explore & Chrome
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gradient">
          YT Download<span className="text-[rgb(var(--primary))]">+</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-[rgb(var(--muted-foreground))] mb-12">
          La seule extension dont vous avez besoin pour télécharger vos vidéos YouTube en un clic, avec la qualité de votre choix.
        </p>

        {/* Action Button */}
        <div className="mb-24">
          <a href="/YT-Download-Extension.zip" download
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-[rgb(var(--primary))] font-pj rounded-xl neon-glow hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--primary))]">
            Télécharger l'Extension (.zip)
            <svg className="w-5 h-5 ml-3 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </a>
        </div>

        {/* Installation Steps */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 text-left max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Comment l'installer ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-bold text-[rgb(var(--primary))] mb-4">1</div>
              <h3 className="font-semibold text-lg mb-2">Décompresser</h3>
              <p className="text-[rgb(var(--muted-foreground))]">Extrayez le fichier <code className="text-white bg-white/10 px-1 rounded">.zip</code> que vous venez de télécharger sur votre ordinateur.</p>
            </div>
            <div className="flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-bold text-[rgb(var(--primary))] mb-4">2</div>
              <h3 className="font-semibold text-lg mb-2">Ouvrir les Extensions</h3>
              <p className="text-[rgb(var(--muted-foreground))]">Allez à <code className="text-white bg-white/10 px-1 rounded">chrome://extensions</code> et activez le <strong>Mode Développeur</strong> en haut à droite.</p>
            </div>
            <div className="flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-bold text-[rgb(var(--primary))] mb-4">3</div>
              <h3 className="font-semibold text-lg mb-2">Charger</h3>
              <p className="text-[rgb(var(--muted-foreground))]">Cliquez sur <strong>Charger l'extension non empaquetée</strong> et sélectionnez le dossier décompressé.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-sm text-[rgb(var(--muted-foreground))] border-t border-white/5 relative z-10">
        <p>YT Download+ n'est pas affilié à YouTube. Utilisez-le uniquement pour des vidéos libres de droits ou dont vous possédez l'autorisation.</p>
      </footer>
    </main>
  );
}
