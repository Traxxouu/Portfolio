import Image from 'next/image';

// En-tête des pages secondaires : titre affiche + photo en bandeau
export function PageHero({ n, label, jp, title, intro, image, meta }: { n: string; label: string; jp: string; title: string; intro?: string; image?: string; meta?: string[] }) {
  return (
    <section className="phero">
      {image && (
        <div className="phero-img" aria-hidden>
          <Image src={image} alt="" fill priority sizes="100vw" className="cover" />
        </div>
      )}
      <div className="wrap phero-in">
        <div className="sec-tab">
          <span className="label">{n} // {label}</span>
          <span className="f-jp">{jp}</span>
        </div>
        <h1 className="f-display phero-title">{title}</h1>
        {intro && <p className="phero-intro">{intro}</p>}
        {meta && (
          <div className="phero-meta">
            {meta.map((m) => (
              <span key={m} className="label dim">{m}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
