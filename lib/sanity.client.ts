import { createClient, type SanityClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { EXPERIENCES, FALLBACK_PROJECTS, PROFILE, type Experience } from './content';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-18',
      useCdn: true,
    })
  : null;

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export function imageUrl(source: SanityImageSource | undefined, w = 1200, h?: number): string | null {
  if (!source || !builder) return null;
  let b = builder.image(source).width(w).auto('format').quality(80);
  if (h) b = b.height(h).fit('crop');
  return b.url();
}

// Toutes les requêtes passent par ici : jamais de crash si Sanity est vide ou injoignable
async function safeFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!client) return fallback;
  try {
    const data = await client.fetch<T>(query, params, { next: { revalidate: 60 } });
    return (data ?? fallback) as T;
  } catch {
    return fallback;
  }
}

/* ---------------- Réglages ---------------- */
export type Settings = { pitch: string; status: string; focus: string[] };

export async function getSettings(): Promise<Settings> {
  const s = await safeFetch<Partial<Settings> | null>(`*[_type == "siteSettings"][0]{ pitch, status, focus }`, {}, null);
  return {
    pitch: s?.pitch || PROFILE.pitch,
    status: s?.status || PROFILE.status,
    focus: s?.focus?.length ? s.focus : PROFILE.focus,
  };
}

/* ---------------- Bandeau ---------------- */
export interface Banner {
  enabled: boolean;
  text: string;
  backgroundColor: string;
  textColor: string;
  link?: string;
}

export async function getBanner(): Promise<Banner | null> {
  return safeFetch<Banner | null>(`*[_type == "banner"][0]{ enabled, text, backgroundColor, textColor, link }`, {}, null);
}

/* ---------------- Parcours ---------------- */
export async function getExperiences(): Promise<Experience[]> {
  const list = await safeFetch<Experience[]>(
    `*[_type == "experience"] | order(order asc){ _id, title, org, kind, period, summary, tags, url }`,
    {},
    [],
  );
  return list.length ? list : EXPERIENCES;
}

/* ---------------- Projets ---------------- */
export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: SanityImageSource;
  image?: string; // image locale (contenu de repli)
  description: string;
  fullDescription?: unknown[];
  technologies: string[];
  status: 'en-cours' | 'terminé' | 'abandonné';
  featured?: boolean;
  tags?: string[];
  context?: string;
  year?: string;
  order: number;
  githubUrl?: string;
  liveUrl?: string;
}

const PROJECT_FIELDS = `_id, title, slug, coverImage, description, technologies, status, featured, tags, context, year, order, githubUrl, liveUrl`;

export async function getProjects(): Promise<Project[]> {
  const list = await safeFetch<Project[]>(`*[_type == "project"] | order(featured desc, order asc){ ${PROJECT_FIELDS} }`, {}, []);
  return list.length ? list : [...(FALLBACK_PROJECTS as Project[])].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const p = await safeFetch<Project | null>(
    `*[_type == "project" && slug.current == $slug][0]{ ${PROJECT_FIELDS}, fullDescription }`,
    { slug },
    null,
  );
  return p ?? ((FALLBACK_PROJECTS as Project[]).find((f) => f.slug.current === slug) || null);
}

export function projectImage(p: Project, w = 1200, h?: number): string | null {
  return imageUrl(p.coverImage, w, h) || p.image || null;
}

/* ---------------- Certifications ---------------- */
export interface Certification {
  _id: string;
  name: string;
  issuer: string;
  issuerLogo?: SanityImageSource;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  media?: SanityImageSource;
  order: number;
}

export async function getCertifications(): Promise<Certification[]> {
  return safeFetch<Certification[]>(
    `*[_type == "certification"] | order(order asc, issueDate desc){ _id, name, issuer, issuerLogo, issueDate, expiryDate, credentialId, credentialUrl, skills, media, order }`,
    {},
    [],
  );
}

/* ---------------- Blog ---------------- */
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: SanityImageSource;
  categories?: Array<{ title: string; _id: string }>;
  author?: { name: string; image?: SanityImageSource };
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  body?: unknown[];
  tags?: string[];
  seo?: { metaTitle?: string; metaDescription?: string };
}

const POST_FIELDS = `_id, title, slug, excerpt, mainImage, "categories": categories[]->{ title, _id }, "author": author->{ name, image }, publishedAt, readTime, featured, tags`;

export async function getBlogPosts(): Promise<BlogPost[]> {
  return safeFetch<BlogPost[]>(`*[_type == "blog"] | order(featured desc, publishedAt desc){ ${POST_FIELDS} }`, {}, []);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return safeFetch<BlogPost | null>(`*[_type == "blog" && slug.current == $slug][0]{ ${POST_FIELDS}, body, seo }`, { slug }, null);
}
