import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts, imageUrl } from '@/lib/sanity.client';
import { PageHero } from '../../components/PageHero';

export const revalidate = 60;
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles de Maël Barbe sur le développement web, ses projets et ce qu’il apprend.',
};

const date = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [first, ...rest] = posts;

  return (
    <>
      <PageHero n="03" label="Blog" jp="記録" title="Blog" intro="Ce que j’apprends, ce que je construis, et ce que j’en retiens." image="/images/opera.webp" meta={[`${posts.length} article${posts.length > 1 ? 's' : ''}`]} />
      <section className="section">
        <div className="wrap">
          {!first && <p className="dim">Les premiers articles arrivent bientôt.</p>}
          {first && (
            <Link href={`/blog/${first.slug.current}`} className="bfeat reveal">
              <div className="bfeat-media cut">
                {imageUrl(first.mainImage, 1400, 800) ? (
                  <Image src={imageUrl(first.mainImage, 1400, 800)!} alt={first.title} fill priority sizes="(max-width: 900px) 100vw, 60vw" className="pcard-img" />
                ) : (
                  <div className="pcard-empty dots" />
                )}
              </div>
              <div className="bfeat-body">
                <p className="label red">À la une</p>
                <h2 className="f-display bfeat-title">{first.title}</h2>
                <p className="dim">{first.excerpt}</p>
                <p className="label dim">
                  {date(first.publishedAt)} · {first.readTime} min de lecture
                </p>
              </div>
            </Link>
          )}
          {rest.length > 0 && (
            <div className="bgrid" style={{ marginTop: '3.5rem' }}>
              {rest.map((p, i) => {
                const img = imageUrl(p.mainImage, 800, 500);
                return (
                  <Link key={p._id} href={`/blog/${p.slug.current}`} className="bcard reveal" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                    <div className="bcard-media cut">{img ? <Image src={img} alt={p.title} fill sizes="(max-width: 900px) 100vw, 33vw" className="pcard-img" /> : <div className="pcard-empty dots" />}</div>
                    <p className="label dim">
                      {date(p.publishedAt)} · {p.readTime} min
                    </p>
                    <h3 className="bcard-title">{p.title}</h3>
                    <p className="dim bcard-ex">{p.excerpt}</p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
