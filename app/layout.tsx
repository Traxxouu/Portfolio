import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const display = localFont({
  src: './fonts/anton-latin-400-normal.woff2',
  variable: '--font-display',
  weight: '400',
  display: 'swap',
});

const sans = localFont({
  src: [
    { path: './fonts/ibm-plex-sans-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/ibm-plex-sans-latin-500-normal.woff2', weight: '500' },
    { path: './fonts/ibm-plex-sans-latin-600-normal.woff2', weight: '600' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const mono = localFont({
  src: [
    { path: './fonts/space-mono-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/space-mono-latin-700-normal.woff2', weight: '700' },
  ],
  variable: '--font-mono',
  display: 'swap',
});

// Dela Gothic One réduite aux seuls caractères japonais utilisés (scripts/subset-jp.py)
const jp = localFont({
  src: './fonts/dela-gothic-jp-subset.woff2',
  variable: '--font-jp',
  weight: '400',
  display: 'swap',
  preload: false,
});

const SITE = 'https://maelbarbe.vercel.app';
const DESC =
  "Portfolio de Maël Barbe, développeur full stack à Paris : sites et applications web en Next.js, TypeScript et Python. Fondateur de YourWeb, étudiant à l'EFREI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Maël Barbe — Développeur full stack', template: '%s — Maël Barbe' },
  description: DESC,
  keywords: ['Maël Barbe', 'Développeur full stack', 'Développeur web Paris', 'Next.js', 'TypeScript', 'React', 'Python', 'YourWeb', 'EFREI', 'Portfolio'],
  authors: [{ name: 'Maël Barbe' }],
  creator: 'Maël Barbe',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE,
    siteName: 'Maël Barbe',
    title: 'Maël Barbe — Développeur full stack',
    description: DESC,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Maël Barbe — Développeur full stack' }],
  },
  twitter: { card: 'summary_large_image', title: 'Maël Barbe — Développeur full stack', description: DESC, images: ['/og-image.jpg'] },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE },
  verification: { google: 'googleb3de645cb3fb0569' },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable} ${jp.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Maël Barbe',
              url: SITE,
              jobTitle: 'Développeur full stack',
              alumniOf: { '@type': 'EducationalOrganization', name: 'EFREI Paris' },
              founder: { '@type': 'Organization', name: 'YourWeb', url: 'https://yourweb.fr' },
              sameAs: ['https://github.com/Traxxouu', 'https://www.linkedin.com/in/maelbarbe/'],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
