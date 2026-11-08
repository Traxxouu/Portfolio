'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Photo } from '@/lib/photos';

// Galerie : vignettes en noir et blanc, clic = photo originale en couleur
export function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const touch = useRef<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((n: number) => setOpen((i) => (i === null ? i : (i + n + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, go]);

  const cur = open !== null ? photos[open] : null;

  return (
    <>
      <div className="gal">
        {photos.map((p, i) => (
          <button key={p.slug} className="gal-item reveal" style={{ transitionDelay: `${(i % 4) * 50}ms` }} onClick={() => setOpen(i)} aria-label={`Voir en grand : ${p.alt}`}>
            <span className="gal-frame" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
              <Image src={`/photos/${p.slug}-bw.webp`} alt={p.alt} fill sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw" className="gal-bw" />
              <span className="gal-hint label">Voir en couleur ↗</span>
            </span>
            <span className="label dim gal-cap">
              {String(i + 1).padStart(2, '0')} · {p.caption}
            </span>
          </button>
        ))}
      </div>

      {cur && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label={cur.alt}
          onClick={close}
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <div className="lb-top" onClick={(e) => e.stopPropagation()}>
            <span className="label">
              <span className="red">{String(open! + 1).padStart(2, '0')}</span> / {photos.length} · {cur.caption}
            </span>
            <button className="plan-nav" onClick={close} aria-label="Fermer">✕</button>
          </div>
          <div className="lb-img" onClick={(e) => e.stopPropagation()}>
            <Image key={cur.slug} src={`/photos/${cur.slug}.webp`} alt={cur.alt} fill sizes="100vw" quality={85} className="lb-photo" priority />
          </div>
          <p className="lb-alt dim" onClick={(e) => e.stopPropagation()}>{cur.alt} — photo de Maël Barbe</p>
          <button className="plan-nav lb-prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Photo précédente">←</button>
          <button className="plan-nav lb-next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Photo suivante">→</button>
        </div>
      )}
    </>
  );
}
