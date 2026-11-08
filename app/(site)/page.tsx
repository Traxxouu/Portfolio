import Image from 'next/image';
import Link from 'next/link';
import { getSettings, getProjects, getExperiences, getBlogPosts, imageUrl } from '@/lib/sanity.client';
import { PROFILE, STACK, currentModule, courseWeek } from '@/lib/content';
import { SectionHead, ProjectCard, ArrowLink } from '../components/ui';

export const revalidate = 60;

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

export default async function Home() {
  const [settings, projects, experiences, posts] = await Promise.all([getSettings(), getProjects(), getExperiences(), getBlogPosts()]);
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const shown = featured.length >= 3 ? featured : projects.slice(0, 3);
  const mod = currentModule();
  const { label: weekLabel, week } = courseWeek();
  const ticker = STACK.flatMap((g) => g.items.map((i) => i.name));

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-sun" aria-hidden>
          <Image src="/images/eclipse.webp" alt="" fill priority sizes="(max-width: 900px) 70vw, 40vw" className="hero-sun-img" />
          <div className="hero-sun-dots dots" />
        </div>
        <svg className="hero-wires" viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden>
          <path d="M0 70 Q 240 120 480 70 T 960 70 T 1440 70" />
          <path d="M0 100 Q 240 155 480 100 T 960 100 T 1440 100" />
          <path d="M0 126 Q 240 170 480 126 T 960 126 T 1440 126" />
        </svg>
        <div className="hero-sky" aria-hidden>
          <Image src="/images/skyline.webp" alt="" fill priority sizes="100vw" className="hero-sky-img" />
        </div>

        <div className="wrap hero-in">
          <p className="label hero-kicker">
            <span className="red">Portfolio</span> · Paris · 2026
          </p>
          <h1 className="hero-title f-display">
            <span className="hero-first">Maël</span>
            <span className="hero-last">Barbe</span>
          </h1>
          <p className="hero-role label">{PROFILE.role}</p>
          <p className="hero-pitch">{settings.pitch}</p>
          <div className="hero-actions">
            <Link href="/projects" className="btn btn-red">
              <span>Voir mes projets</span>
              <span aria-hidden className="arrow">→</span>
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              <span>Me contacter</span>
            </Link>
          </div>
          <p className="hero-status label">
            <span className="yellow blink">●</span> {settings.status}
          </p>
        </div>
        <div className="hero-vjp f-jp" aria-hidden>
          マ<br />エ<br />ル
        </div>

        <div className="ticker" aria-hidden>
          <div className="ticker-track">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="label">
                {t} <span className="red">/</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AUJOURD'HUI ================= */}
      <section className="section">
        <div className="wrap">
          <SectionHead n="01" label="Aujourd’hui" jp="現在" title={<>Là où j’en suis</>} intro="Ce qui m’occupe en ce moment : l’école, mes projets et ce que j’apprends." />
          <div className="now-grid">
            <div className="panel cut now-card now-main reveal">
              <div className="panel-in">
                <div className="now-photo">
                  <Image src="/images/opera.webp" alt="Toits de Paris vers l’Opéra, photo de Maël" fill sizes="(max-width: 900px) 100vw, 50vw" className="now-photo-img" />
                  <span className="label now-photo-tag">Paris // EFREI</span>
                </div>
                <div className="now-body">
                  <p className="label red">École · <span className="f-jp">学校</span></p>
                  <h3 className="f-display now-title">Bachelor 3 · EFREI Paris</h3>
                  <p className="dim">Développeur web &amp; applications, promo 2027.</p>
                  {mod && (
                    <div className="now-module">
                      <p className="label yellow">{mod.state === 'en cours' ? '● Module en cours' : 'Prochain module'}</p>
                      <p className="now-module-title">{mod.module.title}</p>
                      <p className="label dim">
                        {mod.state === 'en cours' ? `jusqu’au ${fmtDate(mod.module.end)}` : `à partir du ${fmtDate(mod.module.start)}`}
                      </p>
                    </div>
                  )}
                  <div className="week">
                    <p className="label dim">{weekLabel}</p>
                    <ol className="week-days">
                      {week.map((d) => (
                        <li key={d.date} className={d.courses.length ? 'has' : ''}>
                          <span className="label">{new Date(d.date + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}</span>
                          <span className="week-title">{d.courses[0]?.title || 'Projets'}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <ArrowLink href="/about#planning">Voir mon planning</ArrowLink>
                </div>
              </div>
            </div>

            <div className="panel cut now-card reveal" style={{ transitionDelay: '80ms' }}>
              <div className="panel-in now-body">
                <p className="label red">En parallèle · <span className="f-jp">会社</span></p>
                <h3 className="f-display now-title">YourWeb</h3>
                <p className="dim">Je réalise aussi des sites et des outils pour des artisans et des TPE, sous ma micro-entreprise.</p>
                <ArrowLink href="/projects/yourweb">Voir le projet</ArrowLink>
              </div>
            </div>

            <div className="panel cut now-card reveal" style={{ transitionDelay: '160ms' }}>
              <div className="panel-in now-body">
                <p className="label red">Focus · <span className="f-jp">学習</span></p>
                <h3 className="f-display now-title">Ce que j’apprends</h3>
                <ul className="now-list">
                  {settings.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="now-langs">
                  {PROFILE.languages.map((l) => (
                    <span key={l.name} className="chip">
                      {l.name} · {l.level}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROJETS ================= */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            n="02"
            label="Projets"
            jp="計画"
            title={<>Ce que j’ai construit</>}
            intro="Une sélection de projets clients, de stages et de projets perso."
            action={<ArrowLink href="/projects">Tous les projets</ArrowLink>}
          />
          <div className="pgrid">
            {shown.map((p, i) => (
              <ProjectCard key={p._id} p={p} index={i} large={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= PARCOURS ================= */}
      <section className="section">
        <div className="wrap split">
          <div className="split-side reveal">
            <div className="sec-tab">
              <span className="label">03 // Parcours</span>
              <span className="f-jp">経歴</span>
            </div>
            <h2 className="f-display sec-title">Mon parcours</h2>
            <p className="sec-intro">Entreprise, stages et formation. Le détail, les certifications et le programme de l’année sont sur la page Parcours.</p>
            <div className="split-photo cut">
              <Image src="/images/setup.webp" alt="Mon poste de travail la nuit, photo de Maël" fill sizes="(max-width: 900px) 100vw, 35vw" className="cover" />
              <span className="label split-photo-tag">Setup // 04:17</span>
            </div>
            <ArrowLink href="/about">Voir le parcours complet</ArrowLink>
          </div>
          <ol className="timeline">
            {experiences.slice(0, 4).map((e, i) => (
              <li key={e._id || e.org + i} className="tl-item reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <p className="label tl-meta">
                  <span className="red">{e.kind}</span>
                  {e.period && <span className="dim"> · {e.period}</span>}
                </p>
                <h3 className="tl-title">
                  {e.title} <span className="dim">—</span> <span className="tl-org">{e.org}</span>
                </h3>
                <p className="dim tl-sum">{e.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= STACK ================= */}
      <section className="section">
        <div className="wrap">
          <SectionHead n="04" label="Stack" jp="技術" title={<>Avec quoi je travaille</>} intro="Les outils que j’utilise au quotidien, en rouge ceux que je maîtrise le mieux." />
          <div className="stack">
            {STACK.map((g, i) => (
              <div key={g.group} className="stack-row reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="stack-head">
                  <p className="label yellow">{g.group}</p>
                  <p className="f-jp red stack-jp">{g.jp}</p>
                </div>
                <div className="stack-items">
                  {g.items.map((it) => (
                    <span key={it.name} className={`chip ${it.main ? 'is-main' : ''}`}>
                      {it.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLOG ================= */}
      {posts.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead n="05" label="Blog" jp="記録" title={<>Derniers articles</>} action={<ArrowLink href="/blog">Tout le blog</ArrowLink>} />
            <div className="bgrid">
              {posts.slice(0, 3).map((p, i) => {
                const img = imageUrl(p.mainImage, 800, 500);
                return (
                  <Link key={p._id} href={`/blog/${p.slug.current}`} className="bcard reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                    <div className="bcard-media cut">{img ? <Image src={img} alt={p.title} fill sizes="(max-width: 900px) 100vw, 33vw" className="pcard-img" /> : <div className="pcard-empty dots" />}</div>
                    <p className="label dim">
                      {new Date(p.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })} · {p.readTime} min
                    </p>
                    <h3 className="bcard-title">{p.title}</h3>
                    <p className="dim bcard-ex">{p.excerpt}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= CONTACT ================= */}
      <section className="section cta">
        <div className="wrap cta-in">
          <div className="cta-text reveal">
            <div className="sec-tab">
              <span className="label">{posts.length > 0 ? '06' : '05'} // Contact</span>
              <span className="f-jp">連絡</span>
            </div>
            <h2 className="f-display cta-title">
              Un projet ?<br />
              <span className="red">Parlons-en.</span>
            </h2>
            <p className="sec-intro">Un site, une application, une collaboration : écris-moi, je réponds vite.</p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-red">
                <span>M’écrire</span>
                <span aria-hidden className="arrow">→</span>
              </Link>
              <a href={`mailto:${PROFILE.email}`} className="btn btn-ghost">
                <span>{PROFILE.email}</span>
              </a>
            </div>
          </div>
          <div className="cta-photo cut reveal">
            <Image src="/images/eiffel.webp" alt="La tour Eiffel la nuit, photo de Maël" fill sizes="(max-width: 900px) 100vw, 40vw" className="cover" />
            <span className="label split-photo-tag">Paris 7e // Nuit</span>
          </div>
        </div>
      </section>
    </>
  );
}
