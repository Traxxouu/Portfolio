import type { Metadata } from 'next';
import { getProjects } from '@/lib/sanity.client';
import { ProjectCard } from '../../components/ui';
import { PageHero } from '../../components/PageHero';

export const revalidate = 60;
export const metadata: Metadata = {
  title: 'Projets',
  description: 'Projets de Maël Barbe : réalisations YourWeb, stages, projets EFREI et projets perso.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const live = projects.filter((p) => p.status === 'en-cours').length;
  return (
    <>
      <PageHero
        n="01"
        label="Projets"
        jp="計画"
        title="Projets"
        intro="Réalisations clients avec YourWeb, projets de stage, projets d’école et expérimentations perso."
        image="/images/toits.webp"
        meta={[`${projects.length} projets`, `${live} en cours`]}
      />
      <section className="section">
        <div className="wrap pgrid-all">
          {projects.map((p, i) => (
            <ProjectCard key={p._id} p={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
