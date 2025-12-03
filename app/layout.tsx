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
  keywords: [
    "Maël Barbe",
    "Développeur Web",
    "Développeur Full Stack",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "YourWeb",
    "développeur freelance",
    "création site web",
    "développement application",
    "Node.js",
    "Tailwind CSS",
    "UI/UX",
    "SEO",
    "Stripe",
    "e-commerce",
    "site vitrine",
    "Sanity CMS",
    "EFREI",
    "développeur Paris"
  ],
  authors: [{ name: "Maël Barbe" }],
  creator: "Maël Barbe",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://maelbarbe.vercel.app",
    title: "Maël Barbe - Développeur Web Full Stack | React, Next.js, TypeScript",
    description: "Portfolio de Maël Barbe — développeur web Full Stack (React, Next.js, TypeScript). Découvrez mes projets, compétences et prestations : sites web, applications et UI modernes.",
    siteName: "Maël Barbe Portfolio",
    images: [
      {
        url: "https://maelbarbe.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maël Barbe - Développeur Web Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maël Barbe - Développeur Web Full Stack | React, Next.js, TypeScript",
    description: "Portfolio de Maël Barbe — développeur web Full Stack (React, Next.js, TypeScript). Découvrez mes projets, compétences et prestations : sites web, applications et UI modernes.",
    creator: "@maelbarbe",
    images: ["https://maelbarbe.vercel.app/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://maelbarbe.vercel.app",
  },
  verification: {
    google: "googleb3de645cb3fb0569",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Meta description explicite pour le référencement */}
        <meta name="description" content={metadata.description ?? ""} />
        
        {/* Schema.org JSON-LD pour données structurées */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Maël Barbe",
              "url": "https://maelbarbe.vercel.app",
              "jobTitle": "Développeur Web Full Stack",
              "description": "Développeur web Full Stack spécialisé en React, Next.js et TypeScript",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "EFREI Paris"
              },
              "knowsAbout": [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Python",
                "Java",
                "PHP",
                "SQL",
                "MongoDB",
                "Docker",
                "Azure",
                "Salesforce"
              ],
              "sameAs": [
                "https://github.com/Traxxouu",
                "https://www.linkedin.com/in/maelbarbe/",
                "https://www.instagram.com/maelsanst/",
                "https://www.twitch.tv/traxxouu"
              ],
              "founder": {
                "@type": "Organization",
                "name": "YourWeb",
                "url": "https://yourweb.fr"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
