import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostBySlug } from '@/lib/sanity.client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import type { TypedObject } from '@portabletext/types';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header avec image de couverture */}
      <div className="relative h-[60vh] lg:h-[70vh]">
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(1920).height(1080).url()}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
        
        {/* Bouton retour */}
        <div className="absolute top-8 left-8 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl bg-slate-900/50 border border-slate-700/50 text-white hover:bg-slate-800/60 transition-all hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </Link>
        </div>

        {/* Titre et meta */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Catégories */}
            <div className="flex flex-wrap gap-3 mb-6">
              {post.categories?.map((category) => (
                <span 
                  key={category._id}
                  className="px-4 py-2 rounded-full text-sm font-light backdrop-blur-xl bg-blue-500/30 text-blue-200 border border-blue-400/30"
                >
                  {category.title}
                </span>
              ))}
            </div>

            {/* Titre */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm font-light">
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={urlFor(post.author.image).width(80).height(80).url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  )}
                  <span className="text-base">{post.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime} min de lecture
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu de l'article */}
      <article className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        {/* Extrait */}
        <p className="text-xl sm:text-2xl font-light text-gray-300 mb-12 leading-relaxed italic border-l-4 border-blue-500 pl-6">
          {post.excerpt}
        </p>

        {/* Corps de l'article */}
        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-light prose-headings:text-white
          prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12
          prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-strong:font-medium
          prose-code:text-blue-300 prose-code:bg-slate-900 prose-code:px-2 prose-code:py-1 prose-code:rounded
          prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-400
          prose-ul:text-gray-300 prose-ol:text-gray-300
          prose-li:mb-2
          prose-img:rounded-xl prose-img:shadow-2xl"
        >
          <PortableText value={post.body as TypedObject[]} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-800">
            <h3 className="text-xl font-light text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 text-gray-400 text-sm font-light hover:bg-slate-800/50 transition-colors"
                >
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Retour */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-500/20 border-2 border-blue-500/30 text-blue-300 text-lg font-light hover:bg-blue-500/30 hover:scale-105 transition-all"
          >
            <ArrowLeft size={20} />
            Retour au blog
          </Link>
        </div>
      </article>

      {/* Section auteur (si présent) */}
      {post.author && (
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/60 to-slate-800/60 border-2 border-slate-700/50 rounded-3xl p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {post.author.image && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={urlFor(post.author.image).width(200).height(200).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-light text-white mb-2">
                  À propos de {post.author.name}
                </h3>
                <p className="text-gray-300 font-light">
                  Développeur Full Stack passionné par les nouvelles technologies et le partage de connaissances.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : [],
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  };
}
