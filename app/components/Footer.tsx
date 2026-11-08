import Link from 'next/link';
import Image from 'next/image';
import { PROFILE } from '@/lib/content';
import { LINKS } from '@/lib/nav';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-photo">
        <Image src="/images/stairs.webp" alt="Escalier de Montmartre la nuit, photo de Maël" fill sizes="100vw" className="footer-img" />
        <div className="footer-shade" />
        <div className="wrap footer-hero">
          <p className="label yellow">Fin de transmission · <span className="f-jp">通信終了</span></p>
          <p className="f-display footer-big">
            See you
            <br />
            <span className="red">space cowboy...</span>
          </p>
        </div>
      </div>

      <div className="wrap footer-grid">
        <div>
          <p className="f-display footer-name">Maël Barbe</p>
          <p className="dim footer-txt">Développeur full stack à Paris. Fondateur de YourWeb, étudiant à l’EFREI.</p>
        </div>
        <nav aria-label="Pied de page" className="footer-col">
          <p className="label dim">Navigation</p>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>
        <div className="footer-col">
          <p className="label dim">Ailleurs</p>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={PROFILE.yourweb} target="_blank" rel="noopener noreferrer">YourWeb ↗</a>
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span className="label dim">© {new Date().getFullYear()} Maël Barbe · Néo-Paris</span>
        <span className="label dim">Photos : Maël Barbe</span>
      </div>
      <div className="hazard footer-hazard" />
    </footer>
  );
}
