import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/sanity.client';
import { projectImage } from '@/lib/sanity.client';

export function SectionHead({ n, label, jp, title, intro, action }: { n: string; label: string; jp: string; title: React.ReactNode; intro?: string; action?: React.ReactNode }) {
  return (
    <div className="sec-head reveal">
      <div>
        <div className="sec-tab">
          <span className="label">{n} // {label}</span>
          <span className="f-jp">{jp}</span>
        </div>
        <h2 className="f-display sec-title">{title}</h2>
      </div>
      <div className="sec-head-side">
        {intro && <p className="sec-intro">{intro}</p>}
        {action}
      </div>
    </div>
  );
}

export function ArrowLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = 'arrow-link label';
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="arrow">{external ? '↗' : '→'}</span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

const STATUS: Record<Project['status'], string> = { 'en-cours': 'En cours', terminé: 'Terminé', abandonné: 'Archivé' };

export function ProjectCard({ p, index, large }: { p: Project; index: number; large?: boolean }) {
  const img = projectImage(p, large ? 1400 : 900, large ? 820 : 620);
  return (
    <Link href={`/projects/${p.slug.current}`} className={`pcard reveal ${large ? 'pcard-large' : ''}`} style={{ transitionDelay: `${(index % 3) * 70}ms` }}>
      <div className="pcard-media cut">
        {img ? (
          <Image src={img} alt={p.title} fill sizes={large ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 900px) 100vw, 33vw'} className="pcard-img" />
        ) : (
          <div className="pcard-empty dots" />
        )}
        <div className="pcard-shade" />
        <span className="pcard-n label">{String(index + 1).padStart(2, '0')}</span>
        <span className={`pcard-status label ${p.status === 'en-cours' ? 'is-live' : ''}`}>
          {p.status === 'en-cours' && <span className="blink">●</span>} {STATUS[p.status] || p.status}
        </span>
      </div>
      <div className="pcard-body">
        {(p.context || p.year) && <p className="label dim">{[p.context, p.year].filter(Boolean).join(' · ')}</p>}
        <h3 className="f-display pcard-title">{p.title}</h3>
        <p className="pcard-desc">{p.description}</p>
        <div className="pcard-tags">
          {p.technologies?.slice(0, large ? 6 : 4).map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
