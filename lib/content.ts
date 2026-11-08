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
  cv: '/CV_Barbe_Mael.pdf',
  pitch:
    "Étudiant en 3e année à l'EFREI, je conçois et développe des sites et des applications web, du front au back : SaaS, outils internes, sites pour des clients.",
  status: 'Ouvert aux projets et collaborations',
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
    period: 'Nov. 2025 — aujourd’hui',
    title: 'Fondateur & développeur web',
    org: 'YourWeb',
    kind: 'entreprise',
    summary:
      'Sites vitrines et e-commerce pour des clients locaux, refontes UX/UI, intégration Stripe (paiement et abonnements), SEO on-page et performances. Je gère chaque projet seul, du recueil du besoin à la livraison.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Supabase', 'SEO'],
    url: 'https://yourweb.fr',
  },
  {
    period: 'Mai — juil. 2026',
    title: 'Stagiaire développeur',
    org: 'Maison Asteria',
    kind: 'stage',
    summary:
      'Maintenance et optimisation d’un site WordPress / WooCommerce, plugins et extensions en PHP, SEO technique, modules SuiteCRM, intégrations d’API et participation à la conception d’une webapp interne.',
    tags: ['PHP', 'WordPress', 'WooCommerce', 'SuiteCRM', 'API'],
  },
  {
    period: 'Juin — août 2025',
    title: 'Stagiaire développeur',
    org: 'Edenred France',
    kind: 'stage',
    summary:
      'Dans l’équipe Salesforce (Redforce), en Scrum : développement Apex, SOQL, LWC, Node.js et TypeScript, mises en production, système de contrôle qualité des données et audit automatisé de code (Azure DevOps, Einstein AI).',
    tags: ['Salesforce', 'Apex', 'SOQL', 'LWC', 'TypeScript'],
  },
  {
    period: 'Sept. 2024 — 2027',
    title: 'Bachelor Développeur Web & Applications',
    org: 'EFREI Paris Panthéon-Assas Université',
    kind: 'formation',
    summary: 'Troisième année : back-end, sécurité des applications, cloud, tests et qualité, conteneurisation et CI/CD.',
    tags: ['B3', 'Promo 2027'],
  },
  {
    period: '2021 — 2024',
    title: 'Baccalauréat général',
    org: 'Spécialités mathématiques et SES',
    kind: 'formation',
    summary: 'Avec l’option NSI suivie en parallèle au CNED.',
  },
];

export const STACK: { group: string; jp: string; items: { name: string; main?: boolean }[] }[] = [
  { group: 'Front-end', jp: 'フロント', items: [{ name: 'Next.js', main: true }, { name: 'TypeScript', main: true }, { name: 'React' }, { name: 'Vue.js' }, { name: 'Alpine.js' }, { name: 'Tailwind' }] },
  { group: 'Back-end', jp: 'バック', items: [{ name: 'Python', main: true }, { name: 'Node.js' }, { name: 'PHP' }, { name: 'Java' }, { name: 'Prisma' }] },
  { group: 'Salesforce', jp: '顧客管理', items: [{ name: 'Apex', main: true }, { name: 'SOQL' }, { name: 'LWC' }] },
  { group: 'Données', jp: 'データ', items: [{ name: 'Supabase', main: true }, { name: 'PostgreSQL' }, { name: 'MongoDB' }, { name: 'MySQL' }, { name: 'Sanity' }] },
  { group: 'Cloud & ops', jp: '運用', items: [{ name: 'Docker', main: true }, { name: 'Linux' }, { name: 'Vercel' }, { name: 'Azure DevOps' }, { name: 'n8n' }] },
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
    description: "Mon agence web pour artisans et TPE : site vitrine, devis, facturation et paiement Stripe, CMS et blog, assistant de qualification des demandes.",
    technologies: ['Next.js', 'Supabase', 'Stripe', 'Sanity', 'Resend'],
    status: 'en-cours' as const,
    featured: false,
    order: 6,
    context: 'Mon agence',
    year: '2025',
    liveUrl: 'https://yourweb.fr',
    image: '/images/yourweb.webp',
    coverFit: 'contain' as const,
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
    context: 'Projet YourWeb',
    year: '2026',
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
    order: 4,
    context: 'Projet perso',
    year: '2026',
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
    order: 5,
    context: 'Stage Maison Asteria',
    year: '2026',
    image: '/images/setup.webp',
  },
  {
    _id: 'cracheck',
    title: 'CRAcheck',
    slug: { current: 'cracheck' },
    description: "SaaS de mise en conformité au Cyber Resilience Act : analyse d'un dépôt GitHub (SBOM, vulnérabilités) et génération des documents réglementaires.",
    technologies: ['Next.js 16', 'TypeScript', 'Supabase', 'Stripe', 'Sanity', 'n8n'],
    status: 'en-cours' as const,
    featured: true,
    order: 3,
    context: 'Projet perso',
    year: '2026',
    liveUrl: 'https://cracheck.eu',
    image: '/images/invalides.webp',
  },
  {
    _id: 'smartbiz',
    title: 'SmartBiz AI',
    slug: { current: 'smartbiz-ai' },
    description: 'SaaS de gestion pour boulangeries : stocks, recettes, production, tableaux de bord et recommandations par IA.',
    technologies: ['Next.js 14', 'TypeScript', 'Prisma', 'Supabase', 'Mistral', 'Stripe'],
    status: 'terminé' as const,
    featured: false,
    order: 6,
    context: 'Projet perso',
    year: '2025',
    image: '/images/montmartre.webp',
  },
];

// Semaine de cours à afficher sur l'accueil (la semaine en cours, ou la prochaine semaine avec des cours)
import { COURSES } from './planning';
export function parisToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
}
export function courseWeek(today = parisToday()) {
  const d = new Date(today + 'T12:00:00');
  const monday = new Date(d);
  // le week-end, on regarde déjà la semaine suivante
  if (d.getDay() === 0 || d.getDay() === 6) monday.setDate(d.getDate() + (d.getDay() === 6 ? 2 : 1));
  else monday.setDate(d.getDate() - (d.getDay() - 1));
  const build = (m: Date) =>
    Array.from({ length: 5 }, (_, i) => {
      const x = new Date(m);
      x.setDate(m.getDate() + i);
      const key = x.toISOString().slice(0, 10);
      return { date: key, courses: COURSES.filter((c) => c.date === key) };
    });
  let week = build(monday);
  let label = 'Cette semaine';
  if (!week.some((w) => w.courses.length)) {
    const next = COURSES.find((c) => c.date > today);
    if (next) {
      const n = new Date(next.date + 'T12:00:00');
      n.setDate(n.getDate() - ((n.getDay() + 6) % 7));
      week = build(n);
      label = 'Prochaine semaine de cours';
    }
  }
  return { label, week };
}
