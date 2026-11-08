import { getBanner } from '@/lib/sanity.client';

// Bandeau d'information géré dans Sanity (texte, couleurs, lien)
export async function BannerBar() {
  const banner = await getBanner();
  if (!banner?.enabled || !banner.text) return null;

  const inner = (
    <>
      <span className="banner-dot blink" style={{ background: banner.textColor }} aria-hidden />
      <span>{banner.text}</span>
      {banner.link && <span aria-hidden>↗</span>}
    </>
  );

  return (
    <div className="banner" style={{ backgroundColor: banner.backgroundColor, color: banner.textColor }}>
      {banner.link ? (
        <a href={banner.link} target={banner.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="banner-in">
          {inner}
        </a>
      ) : (
        <div className="banner-in">{inner}</div>
      )}
    </div>
  );
}
