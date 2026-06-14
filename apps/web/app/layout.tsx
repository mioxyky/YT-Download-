import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YT Download+",
  description: "Téléchargez des vidéos YouTube en 1 clic."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-[rgb(var(--background))] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
