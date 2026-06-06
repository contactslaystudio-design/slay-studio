import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slay Studio — Nail Artist à domicile à Annœullin, Provin & Nord (59)",
  description: "Slay Studio, nail artist indépendante à domicile dans le Nord (59). Pose gel, semi-permanent, nail art personnalisé.",
  metadataBase: new URL("https://slaystudio.fr"),
  openGraph: {
    title: "Slay Studio — Nail Artist à domicile Nord (59)",
    description: "Pose gel, semi-permanent, nail art sur mesure.",
    url: "https://slaystudio.fr", siteName: "Slay Studio", locale: "fr_FR", type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
