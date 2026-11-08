import type { Metadata } from 'next';
import Image from 'next/image';
import { getExperiences, getCertifications, getSettings, imageUrl } from '@/lib/sanity.client';
import { MODULES, PROFILE, STACK } from '@/lib/content';
import { PageHero } from '../../components/PageHero';
import { SectionHead } from '../../components/ui';

export const revalidate = 60;
export const metadata: Metadata = {
  title: 'Parcours',
  description: 'Parcours de Maël Barbe : YourWeb, stages chez Maison Asteria et Edenred, Bachelor à l’EFREI Paris, certifications.',
};

const month = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
const day = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

export default async function AboutPage() {
  const [experiences, certs, settings] = await Promise.all([getExperiences(), getCertifications(), getSettings()]);
  const today = new Date().toISOString().slice(0, 10);
  const modules = [...MODULES].sort((a, b) => a.start.localeCompare(b.start));

  return (
    <>
      <PageHero
        n="02"
        label="Parcours"
        jp="経歴"
        title="Parcours"
        intro={settings.pitch}
        image="/images/montmartre.webp"
        meta={[PROFILE.location, 'EFREI · Promo 2027', 'Fondateur de YourWeb']}
      />

      {/* ---------- expériences ---------- */}
      <section className="section">
        <div className="wrap split">
          <div className="split-side reveal">
            <div className="sec-tab">
              <span className="label">A // Expériences</span>
              <span className="f-jp">経験</span>
            </div>
            <h2 className="f-display sec-title">Entreprise, stages, école</h2>
            <div className="about-side-grid">
              <div>
                <p className="label dim">Langues</p>
                <ul className="about-list">
                  {PROFILE.languages.map((l) => (
                    <li key={l.name}>
                      <span>{l.name}</span>
                      <span className="dim">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label dim">En ce moment</p>
                <ul className="about-list">
                  {settings.focus.map((f) => (
                    <li key={f}>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a href={PROFILE.cv} target="_blank" rel="noopener noreferrer" className="btn btn-red">
              <span>Télécharger mon CV</span>
              <span aria-hidden className="arrow">↓</span>
            </a>
          </div>
          <ol className="timeline">
            {experiences.map((e, i) => (
              <li key={e._id || e.org + i} className="tl-item reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <p className="label tl-meta">
                  <span className="red">{e.kind}</span>
                  {e.period && <span className="dim"> · {e.period}</span>}
                </p>
                <h3 className="tl-title">
                  {e.title} <span className="dim">—</span>{' '}
                  {e.url ? (
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="tl-org tl-link">
                      {e.org} ↗
                    </a>
                  ) : (
                    <span className="tl-org">{e.org}</span>
                  )}
                </h3>
                <p className="dim tl-sum">{e.summary}</p>
                {e.tags?.length ? (
                  <div className="tl-tags">
                    {e.tags.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- programme ---------- */}
      <section className="section" id="programme">
        <div className="wrap">
          <SectionHead n="B" label="Programme" jp="授業" title={<>Mon année à l’EFREI</>} intro="Les modules de ma troisième année de Bachelor développeur web, tirés de mon planning." />
          <ol className="prog">
            {modules.map((m, i) => {
              const state = m.end < today ? 'done' : m.start <= today ? 'live' : 'next';
              return (
                <li key={m.title} className={`prog-item reveal is-${state}`} style={{ transitionDelay: `${(i % 4) * 50}ms` }}>
                  <span className="label prog-date">{m.start === m.end ? day(m.start) : `${month(m.start)}`}</span>
                  <span className="prog-title">{m.title}</span>
                  <span className="label prog-state">{state === 'live' ? <><span className="blink">●</span> En cours</> : state === 'done' ? 'Terminé' : 'À venir'}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------- certifications ---------- */}
      {certs.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead n="C" label="Certifications" jp="資格" title={<>Certifications &amp; badges</>} />
            <div className="cgrid">
              {certs.map((c, i) => {
                const img = imageUrl(c.media, 900);
                const logo = imageUrl(c.issuerLogo, 96, 96);
                const inner = (
                  <div className="panel cut ccard reveal" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                    <div className="panel-in">
                      <div className="ccard-media">
                        {img ? <Image src={img} alt={c.name} fill sizes="(max-width: 900px) 100vw, 33vw" className="ccard-img" /> : <div className="pcard-empty dots" />}
                      </div>
                      <div className="ccard-body">
                        <div className="ccard-issuer">
                          {logo && <Image src={logo} alt="" width={28} height={28} className="ccard-logo" />}
                          <span className="label yellow">{c.issuer}</span>
                        </div>
                        <h3 className="ccard-title">{c.name}</h3>
                        <p className="label dim">{c.issueDate ? new Date(c.issueDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : ''}</p>
                        {c.skills?.length ? (
                          <div className="pcard-tags">
                            {c.skills.slice(0, 4).map((s) => (
                              <span key={s} className="chip">{s}</span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
                return c.credentialUrl ? (
                  <a key={c._id} href={c.credentialUrl} target="_blank" rel="noopener noreferrer">{inner}</a>
                ) : (
                  <div key={c._id}>{inner}</div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------- stack ---------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead n="D" label="Stack" jp="技術" title={<>Outils &amp; langages</>} />
          <div className="stack">
            {STACK.map((g) => (
              <div key={g.group} className="stack-row reveal">
                <div className="stack-head">
                  <p className="label yellow">{g.group}</p>
                  <p className="f-jp red stack-jp">{g.jp}</p>
                </div>
                <div className="stack-items">
                  {g.items.map((it) => (
                    <span key={it.name} className={`chip ${it.main ? 'is-main' : ''}`}>{it.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- photos ---------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead n="E" label="Paris" jp="写真" title={<>Paris, par moi</>} intro="Quand je ne code pas, je photographie la ville. C’est d’ailleurs d’ici que vient l’univers du site." />
          <div className="photos">
            {[
              ['/images/toits.webp', 'Toits du 9e arrondissement', '9e — Toits'],
              ['/images/montmartre.webp', 'Rue graffée de Montmartre', '18e — Montmartre'],
              ['/images/invalides.webp', 'Le dôme des Invalides la nuit', '7e — Invalides'],
            ].map(([src, alt, cap], i) => (
              <figure key={src} className="photo reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="photo-frame">
                  <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 33vw" className="cover" />
                </div>
                <figcaption className="label dim">{String(i + 1).padStart(2, '0')} · {cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
