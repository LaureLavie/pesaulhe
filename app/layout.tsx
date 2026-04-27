import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maison Pésaulhé · Chambres d'hôtes de charme en Béarn",
    template: "%s · Maison Pésaulhé",
  },
  description:
    "Chambres d'hôtes et gîte de charme dans une maison béarnaise de 1702, sur les coteaux de Monein, entre vignes du Jurançon et Pyrénées.",
  openGraph: {
    siteName: "Maison Pesaulhe",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
    <html lang="fr" className={`${cormorant.variable} ${raleway.variable}`}>
      <body className="min-h-screen flex flex-col">   
        <Navbar />     
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}