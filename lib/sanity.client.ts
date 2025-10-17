import { createClient } from 'next-sanity';

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
  emoji: string;
  description: string;
  technologies: string[];
  status: 'en-cours' | 'terminé' | 'abandonné';
  gradientFrom: string;
  gradientTo: string;
  order: number;
  githubUrl?: string;
  liveUrl?: string;
}

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    emoji,
    description,
    technologies,
    status,
    gradientFrom,
    gradientTo,
    order,
    githubUrl,
    liveUrl
  }`;

  return await client.fetch(query);
}
