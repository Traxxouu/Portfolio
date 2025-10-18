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
  description: "Portfolio de Maël Barbe, développeur web passionné. Découvrez mes projets, compétences et expériences en développement web moderne.",
  keywords: ["Maël Barbe", "Développeur Web", "Portfolio", "React", "Next.js", "TypeScript", "JavaScript"],
  authors: [{ name: "Maël Barbe" }],
  creator: "Maël Barbe",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://maelbarbe.vercel.app",
    title: "Maël Barbe - Développeur Web",
    description: "Portfolio de Maël Barbe, développeur web passionné",
    siteName: "Maël Barbe Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maël Barbe - Développeur Web",
    description: "Portfolio de Maël Barbe, développeur web passionné",
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
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
