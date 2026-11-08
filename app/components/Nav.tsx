'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LINKS } from '@/lib/nav';


export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="wrap nav-row">
        <Link href="/" className="nav-logo" aria-label="Maël Barbe, accueil">
          <span className="f-display">Maël Barbe</span>
          <span className="f-jp nav-logo-jp">マエル</span>
        </Link>

        <nav className="nav-links" aria-label="Navigation principale">
          {LINKS.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link ${isActive(l.href) ? 'is-active' : ''}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <a href="https://yourweb.fr" target="_blank" rel="noopener noreferrer" className="btn btn-red nav-cta">
            <span>YourWeb</span>
            <span aria-hidden className="arrow">↗</span>
          </a>
          <button className="nav-burger" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav-sheet" aria-hidden={!open}>
        <div className="wrap nav-sheet-in">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-sheet-link ${isActive(l.href) ? 'is-active' : ''}`} tabIndex={open ? 0 : -1}>
              <span className="label red">{l.n}</span>
              <span className="f-display">{l.label}</span>
              <span className="f-jp dim">{l.jp}</span>
            </Link>
          ))}
          <div className="nav-sheet-foot">
            <a href="mailto:pro.mael.dev@gmail.com" className="label" tabIndex={open ? 0 : -1}>pro.mael.dev@gmail.com</a>
            <div className="hazard nav-sheet-hazard" />
          </div>
        </div>
      </div>
    </header>
  );
}
