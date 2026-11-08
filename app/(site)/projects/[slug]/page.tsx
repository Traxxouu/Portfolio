import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects, projectImage } from '@/lib/sanity.client';
import { PortableBody } from '../../../components/PortableBody';
import { ProjectCard } from '../../../components/ui';
import { GithubIcon } from '../../../components/icons';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return { title: 'Projet introuvable' };
  const img = projectImage(p, 1200, 630);
  return { title: p.title, description: p.description, openGraph: img ? { images: [img] } : undefined };
}

const STATUS: Record<string, string> = { 'en-cours': 'En cours', terminé: 'Terminé', abandonné: 'Archivé' };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getProjectBySlug(slug), getProjects()]);
  if (!p) notFound();
  const contain = p.coverFit === 'contain';
  const img = contain ? projectImage(p, 2000) : projectImage(p, 2000, 1000);
  const others = all.filter((o) => o.slug.current !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="detail-head">
          <div className="wrap detail-col">
            <Link href="/projects" className="arrow-link label back">
              <span aria-hidden className="arrow">←</span>
              <span>Tous les projets</span>
            </Link>
            <p className="label red detail-kicker">{[p.context, p.year].filter(Boolean).join(' · ') || 'Projet'}</p>
            <h1 className="f-display detail-title">{p.title}</h1>
            <p className="detail-lead">{p.description}</p>
            <dl className="detail-meta">
              <div>
                <dt className="label dim">Statut</dt>
                <dd className={p.status === 'en-cours' ? 'yellow' : ''}>{STATUS[p.status] || p.status}</dd>
              </div>
              <div>
                <dt className="label dim">Stack</dt>
                <dd className="detail-tags">
                  {p.technologies?.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </dd>
              </div>
              {(p.liveUrl || p.githubUrl) && (
                <div>
                  <dt className="label dim">Liens</dt>
                  <dd className="detail-links">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                        <span>Voir le site</span>
                        <span aria-hidden className="arrow">↗</span>
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                        <span className="btn-ico"><GithubIcon /> Code source ↗</span>
                      </a>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </header>

        {img && (
          <div className="wrap">
            <div className="detail-cover cut">
              <Image src={img} alt={p.title} fill priority sizes="(max-width: 1240px) 100vw, 1240px" className={contain ? 'is-contain' : 'cover'} />
            </div>
          </div>
        )}

        <div className="wrap detail-col detail-body">
          {p.fullDescription?.length ? (
            <PortableBody value={p.fullDescription} />
          ) : (
            <p className="dim">Le détail de ce projet arrive bientôt.</p>
          )}
        </div>
      </article>

      {others.length > 0 && (
        <section className="section">
          <div className="wrap">
            <p className="label dim" style={{ marginBottom: '1.5rem' }}>Autres projets</p>
            <div className="pgrid-all">
              {others.map((o, i) => (
                <ProjectCard key={o._id} p={o} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
