import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Maël Barbe - Développeur Web",
  description: "Portfolio de Maël Barbe — développeur web Full Stack (React, Next.js, TypeScript). Découvrez mes projets, compétences et prestations : sites web, applications et UI modernes.",
  keywords: ["Maël Barbe", "Développeur Web", "Portfolio", "React", "Next.js", "TypeScript", "JavaScript"],
  authors: [{ name: "Maël Barbe" }],
  creator: "Maël Barbe",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://maelbarbe.vercel.app",
    title: "Maël Barbe - Développeur Web",
  description: "Portfolio de Maël Barbe — développeur web Full Stack (React, Next.js, TypeScript). Découvrez mes projets, compétences et prestations : sites web, applications et UI modernes.",
    siteName: "Maël Barbe Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maël Barbe - Développeur Web",
  description: "Portfolio de Maël Barbe — développeur web Full Stack (React, Next.js, TypeScript). Découvrez mes projets, compétences et prestations : sites web, applications et UI modernes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Meta description explicite pour le référencement - utilise la valeur définie dans `metadata` */}
  <meta name="description" content={metadata.description ?? ""} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
