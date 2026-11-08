// Contenu de base du portfolio.
// Tout ce qui bouge souvent est éditable dans Sanity (réglages, parcours, projets, blog, bandeau, certifications) ;
// ces valeurs servent de repli si Sanity est vide ou injoignable.

export const PROFILE = {
  name: 'Maël Barbe',
  role: 'Développeur full stack',
  location: 'Paris, France',
  email: 'pro.mael.dev@gmail.com',
  github: 'https://github.com/Traxxouu',
  linkedin: 'https://www.linkedin.com/in/maelbarbe/',
  yourweb: 'https://yourweb.fr',
  cv: '/NotelCvBarbeMaelB2DEVEnc3.pdf',
  pitch:
    "Je conçois et développe des sites et des applications web, du front au back. En parallèle de mon Bachelor à l'EFREI, je fais tourner YourWeb, mon agence web pour les artisans et commerces d'Île-de-France.",
  status: 'Ouvert aux projets via YourWeb',
  focus: ['DevSecOps', 'Docker & CI/CD', 'AWS & sécurité'],
  languages: [
    { name: 'Français', level: 'Natif' },
    { name: 'Anglais', level: 'B1' },
    { name: 'Allemand', level: 'A2' },
  ],
};

export type Experience = {
  _id?: string;
  period: string;
  title: string;
  org: string;
  kind: 'entreprise' | 'stage' | 'formation';
  summary: string;
  tags?: string[];
  url?: string;
};

export const EXPERIENCES: Experience[] = [
  {
    period: '2025 — aujourd’hui',
    title: 'Fondateur',
    org: 'YourWeb',
    kind: 'entreprise',
    summary:
      "Agence web pour artisans, commerçants et TPE d'Île-de-France : sites vitrines, CMS, SEO local, automatisations n8n et maintenance. De la prospection à la mise en ligne.",
    tags: ['Next.js', 'Supabase', 'Stripe', 'Sanity', 'n8n'],
    url: 'https://yourweb.fr',
  },
  {
    period: 'Mai — juil. 2026',
    title: 'Stage développeur',
    org: 'Maison Asteria',
    kind: 'stage',
    summary:
      "WordPress / WooCommerce, développement de plugins PHP, SEO technique, modules SuiteCRM et intégration d'API. Création d'une application desktop Python d'OCR pour les notes de frais.",
    tags: ['PHP', 'WordPress', 'Python', 'OCR', 'SuiteCRM'],
  },
  {
    period: '',
    title: 'Stage développeur',
    org: 'Edenred France',
    kind: 'stage',
    summary: 'Développement Salesforce / Apex en environnement agile.',
    tags: ['Salesforce', 'Apex', 'Agile'],
  },
  {
    period: '2024 — 2027',
    title: 'Bachelor Développeur Web & Applications',
    org: 'EFREI Paris',
    kind: 'formation',
    summary:
      'Troisième année : back-end, sécurité des applications, cloud, tests et qualité, conteneurisation et CI/CD.',
    tags: ['B3', 'Promo 2027'],
  },
];

export const STACK: { group: string; jp: string; items: { name: string; main?: boolean }[] }[] = [
  { group: 'Front-end', jp: 'フロント', items: [{ name: 'Next.js', main: true }, { name: 'TypeScript', main: true }, { name: 'React' }, { name: 'Vue.js' }, { name: 'Alpine.js' }, { name: 'Tailwind' }] },
  { group: 'Back-end', jp: 'バック', items: [{ name: 'Python', main: true }, { name: 'Node.js' }, { name: 'Java' }, { name: 'PHP' }] },
  { group: 'Données', jp: 'データ', items: [{ name: 'Supabase', main: true }, { name: 'PostgreSQL' }, { name: 'MongoDB' }, { name: 'MySQL' }, { name: 'Sanity' }] },
  { group: 'Cloud & ops', jp: '運用', items: [{ name: 'Docker', main: true }, { name: 'Linux' }, { name: 'Vercel' }, { name: 'Azure' }, { name: 'Salesforce' }, { name: 'n8n' }] },
];

// Programme de l'année, extrait du planning EFREI (B3-DEV2)
export const MODULES: { title: string; start: string; end: string }[] = [
  { title: 'Back-end — Application', start: '2026-11-02', end: '2026-11-02' },
  { title: 'Panorama des technos legacy', start: '2026-11-03', end: '2026-11-04' },
  { title: 'Back-end — API', start: '2026-11-05', end: '2026-11-23' },
  { title: 'Front-end — Framework', start: '2026-11-24', end: '2026-11-24' },
  { title: 'Sécurité des applications', start: '2026-11-25', end: '2026-12-16' },
  { title: 'Cloud Computing', start: '2027-01-04', end: '2027-01-13' },
  { title: 'Tests et qualité', start: '2027-01-06', end: '2027-01-11' },
  { title: 'De la virtualisation à la conteneurisation', start: '2027-02-01', end: '2027-03-03' },
  { title: 'Intégration et déploiement continus — Audit', start: '2027-02-04', end: '2027-03-22' },
  { title: 'Projet transverse', start: '2027-02-22', end: '2027-02-26' },
  { title: 'Intégration et déploiement continus — Pipeline', start: '2027-03-23', end: '2027-03-31' },
  { title: 'English & documentary research', start: '2026-12-18', end: '2027-06-21' },
];

// Module en cours (ou le prochain) à une date donnée
export function currentModule(now = new Date()) {
  const d = now.toISOString().slice(0, 10);
  const sorted = [...MODULES].sort((a, b) => a.start.localeCompare(b.start));
  const live = sorted.filter((m) => m.start <= d && m.end >= d && !m.title.startsWith('English'));
  if (live.length) return { state: 'en cours' as const, module: live[live.length - 1] };
  const next = sorted.find((m) => m.start > d);
  return next ? { state: 'à venir' as const, module: next } : null;
}

export const FALLBACK_PROJECTS = [
  {
    _id: 'yourweb',
    title: 'YourWeb',
    slug: { current: 'yourweb' },
    description: "Mon agence web : plateforme Next.js avec devis, facturation, paiement Stripe et CMS, pensée pour les artisans et commerces.",
    technologies: ['Next.js', 'Supabase', 'Stripe', 'Sanity', 'Resend'],
    status: 'en-cours' as const,
    featured: true,
    order: 1,
    liveUrl: 'https://yourweb.fr',
    image: '/images/skyline.webp',
  },
  {
    _id: 'orcalia',
    title: 'Orcalia',
    slug: { current: 'orcalia' },
    description: "SaaS de capture de leads pour artisans, réalisé avec YourWeb pour un client.",
    technologies: ['Next.js', 'Supabase', 'n8n'],
    status: 'en-cours' as const,
    featured: true,
    order: 2,
    image: '/images/toits.webp',
  },
  {
    _id: 'wired',
    title: 'Wired — profil GitHub',
    slug: { current: 'wired-traxxouu' },
    description: "Une API qui génère en direct les visuels de mon profil GitHub : terminal interactif, stats, Spotify, Faceit.",
    technologies: ['Node.js', 'SVG', 'Supabase', 'Vercel'],
    status: 'terminé' as const,
    featured: true,
    order: 3,
    githubUrl: 'https://github.com/Traxxouu',
    image: '/images/opera.webp',
  },
  {
    _id: 'ocr',
    title: 'OCR notes de frais',
    slug: { current: 'ocr-notes-de-frais' },
    description: "Application desktop Python qui lit les tickets de caisse et extrait les montants, développée pendant mon stage chez Maison Asteria.",
    technologies: ['Python', 'OpenCV', 'EasyOCR', 'PyQt6'],
    status: 'terminé' as const,
    featured: false,
    order: 4,
    image: '/images/setup.webp',
  },
  {
    _id: 'cracheck',
    title: 'CRAcheck',
    slug: { current: 'cracheck' },
    description: "Site de CRAcheck, une activité d'audit et d'accompagnement à la mise en conformité.",
    technologies: ['Next.js'],
    status: 'terminé' as const,
    featured: false,
    order: 5,
    liveUrl: 'https://cracheck.eu',
    image: '/images/invalides.webp',
  },
];
