import type { Metadata } from "next";
import { Header } from "../components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "YT Download+",
  description: "Site vitrine et extension navigateur pour préparer le téléchargement de vidéos YouTube."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
