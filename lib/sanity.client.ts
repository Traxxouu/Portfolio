import { createClient } from 'next-sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-18',
  useCdn: true,
});

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  emoji?: string;
  coverImage?: SanityImageSource;
  description: string;
  fullDescription?: unknown[];
  technologies: string[];
  status: 'en-cours' | 'terminé' | 'abandonné';
  featured?: boolean;
  tags?: string[];
  gradientFrom?: string;
  gradientTo?: string;
  order: number;
  githubUrl?: string;
  liveUrl?: string;
}

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(featured desc, order asc) {
    _id,
    title,
    slug,
    emoji,
    coverImage,
    description,
    technologies,
    status,
    featured,
    tags,
    gradientFrom,
    gradientTo,
    order,
    githubUrl,
    liveUrl
  }`;

  return await client.fetch(query);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    emoji,
    coverImage,
    description,
    fullDescription,
    technologies,
    status,
    featured,
    tags,
    gradientFrom,
    gradientTo,
    order,
    githubUrl,
    liveUrl
  }`;

  return await client.fetch(query, { slug });
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: SanityImageSource;
  categories?: Array<{ title: string; _id: string }>;
  author?: {
    name: string;
    image?: SanityImageSource;
  };
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  body: unknown[];
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blog"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    "categories": categories[]->{ title, _id },
    "author": author->{ name, image },
    publishedAt,
    readTime,
    featured,
    tags
  }`;

  return await client.fetch(query);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    "categories": categories[]->{ title, _id },
    "author": author->{ name, image },
    publishedAt,
    readTime,
    featured,
    body,
    tags,
    seo
  }`;

  return await client.fetch(query, { slug });
}
