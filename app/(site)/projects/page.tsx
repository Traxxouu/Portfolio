import type { Metadata } from 'next';
import { getProjects } from '@/lib/sanity.client';
import { ProjectCard } from '../../components/ui';
import { PageHero } from '../../components/PageHero';
import { GithubIcon } from '../../components/icons';
import { PROFILE } from '@/lib/content';

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
        <div className="wrap gh-cta">
          <div className="panel cut">
            <div className="panel-in gh-cta-in">
              <div>
                <p className="label red">Code source</p>
                <p className="f-display gh-cta-title">Tout le reste est sur GitHub</p>
                <p className="dim">Projets d’école, expérimentations et outils perso.</p>
              </div>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                <span className="btn-ico"><GithubIcon /> github.com/Traxxouu</span>
                <span aria-hidden className="arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
