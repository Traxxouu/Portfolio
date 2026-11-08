import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, imageUrl } from '@/lib/sanity.client';
import { PortableBody } from '../../../components/PortableBody';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Article introuvable' };
  const img = imageUrl(post.mainImage, 1200, 630);
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: { type: 'article', publishedTime: post.publishedAt, images: img ? [img] : undefined },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();
  const img = imageUrl(post.mainImage, 2000, 1000);

  return (
    <article>
      <header className="detail-head">
        <div className="wrap detail-col">
          <Link href="/blog" className="arrow-link label back">
            <span aria-hidden className="arrow">←</span>
            <span>Tout le blog</span>
          </Link>
          <p className="label red detail-kicker">
            {new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readTime} min de lecture
          </p>
          <h1 className="f-display detail-title detail-title-post">{post.title}</h1>
          <p className="detail-lead">{post.excerpt}</p>
          {post.categories?.length ? (
            <div className="detail-tags" style={{ marginTop: '1.5rem' }}>
              {post.categories.map((c) => (
                <span key={c._id} className="chip">{c.title}</span>
              ))}
            </div>
          ) : null}
        </div>
      </header>
      {img && (
        <div className="wrap">
          <div className="detail-cover cut">
            <Image src={img} alt={post.title} fill priority sizes="(max-width: 1240px) 100vw, 1240px" className="cover" />
          </div>
        </div>
      )}
      <div className="wrap detail-col detail-body">
        <PortableBody value={post.body} />
        <div className="post-end">
          <p className="label dim">Écrit par Maël Barbe</p>
          <Link href="/contact" className="btn btn-red">
            <span>Me contacter</span>
            <span aria-hidden className="arrow">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
