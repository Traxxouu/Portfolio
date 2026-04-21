'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Tag, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';
import { ThemeToggle } from '../components/ThemeToggle';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { SubPageNav } from '../components/SubPageNav';
import { getBlogPosts, type BlogPost } from '@/lib/sanity.client';
import { urlFor } from '@/sanity/lib/image';

export default function BlogPage() {
  const { isDark } = useTheme();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then(data => setBlogPosts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={`fixed inset-0 z-0 overflow-auto ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'} transition-colors duration-500`}>
      <BackgroundBlobs />
      <ThemeToggle />

      <div className="relative min-h-screen px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <SubPageNav backLabel="Accueil" backPath="/" forwardLabel="Contact" forwardPath="/contact" />

          <div className="mb-16 text-center animate-fade-in-up">
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>Blog</span> & Réflexions
            </h1>
            <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
              Mes découvertes, apprentissages et expériences dans le monde du développement
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="flex flex-col items-center gap-6">
                <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${isDark ? 'border-blue-400' : 'border-orange-500'}`} />
                <p className={`text-lg font-light ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Chargement des articles...</p>
              </div>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className={`text-center py-20 backdrop-blur-2xl p-12 rounded-3xl border-2 ${
              isDark ? 'bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30' : 'bg-gradient-to-br from-orange-100/60 to-white/60 border-orange-300/40'
            } animate-fade-in-up`}>
              <BookOpen className={`w-24 h-24 mx-auto mb-6 ${isDark ? 'text-blue-300' : 'text-orange-600'}`} />
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Bientôt disponible</h2>
              <p className={`text-xl sm:text-2xl font-light ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>Les premiers articles sont en cours de rédaction...</p>
            </div>
          ) : (
            <>
              {/* Article featured */}
              {blogPosts.find(post => post.featured) && (() => {
                const featuredPost = blogPosts.find(post => post.featured)!;
                return (
                  <div className="mb-16 animate-fade-in-up">
                    <Link href={`/blog/${featuredPost.slug.current}`}
                      className={`block backdrop-blur-2xl p-8 lg:p-12 rounded-3xl border-2 transition-all duration-500 md:hover:scale-[1.02] active:scale-[0.98] touch-manipulation group ${
                        isDark ? 'bg-gradient-to-br from-blue-950/60 to-purple-950/60 border-blue-500/40 md:hover:border-blue-400/60 shadow-2xl shadow-blue-500/20' : 'bg-gradient-to-br from-orange-100/80 to-rose-100/80 border-orange-300/50 md:hover:border-orange-400/70 shadow-2xl shadow-orange-300/30'
                      }`}>
                      <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
                          {featuredPost.mainImage && (
                            <Image src={urlFor(featuredPost.mainImage).width(800).height(600).url()} alt={featuredPost.title} fill
                              className="object-cover transition-transform duration-700 md:group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                          )}
                          <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-light backdrop-blur-xl ${isDark ? 'bg-blue-500/30 text-blue-200' : 'bg-orange-500/30 text-orange-800'}`}>
                            ⭐ Article mis en avant
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-3 mb-4">
                            {featuredPost.categories?.slice(0, 2).map(cat => (
                              <span key={cat._id} className={`px-3 py-1 rounded-full text-sm font-light ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-700'}`}>{cat.title}</span>
                            ))}
                          </div>
                          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{featuredPost.title}</h2>
                          <p className={`text-lg sm:text-xl font-light mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>{featuredPost.excerpt}</p>
                          <div className={`flex flex-wrap items-center gap-4 mb-6 text-sm font-light ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                            <div className="flex items-center gap-2"><Calendar size={16} />{new Date(featuredPost.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                            <div className="flex items-center gap-2"><Clock size={16} />{featuredPost.readTime} min de lecture</div>
                          </div>
                          <div className={`inline-flex items-center gap-2 text-lg font-light transition-all duration-300 group-hover:gap-4 ${isDark ? 'text-blue-300' : 'text-orange-600'}`}>
                            Lire l&apos;article <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })()}

              {/* Grille des autres articles */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {blogPosts.filter(post => !post.featured).map((post, index) => (
                  <Link key={post._id} href={`/blog/${post.slug.current}`}
                    className={`backdrop-blur-2xl p-6 rounded-2xl border-2 transition-all duration-500 md:hover:scale-105 md:hover:-translate-y-2 active:scale-95 touch-manipulation group animate-fade-in-up ${
                      isDark ? 'bg-gradient-to-br from-slate-900/60 to-slate-800/60 border-slate-700/50 md:hover:border-blue-500/50 shadow-xl' : 'bg-gradient-to-br from-white/70 to-orange-50/70 border-orange-200/40 md:hover:border-orange-400/60 shadow-xl'
                    }`} style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                      {post.mainImage && (
                        <Image src={urlFor(post.mainImage).width(400).height(300).url()} alt={post.title} fill
                          className="object-cover transition-transform duration-700 md:group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories?.slice(0, 2).map(cat => (
                        <span key={cat._id} className={`px-2 py-1 rounded-full text-xs font-light ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-700'}`}>{cat.title}</span>
                      ))}
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-light mb-3 line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{post.title}</h3>
                    <p className={`text-sm sm:text-base font-light mb-4 line-clamp-3 leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>{post.excerpt}</p>
                    <div className={`flex items-center justify-between text-xs font-light ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                      <div className="flex items-center gap-2"><Calendar size={14} />{new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
                      <div className="flex items-center gap-2"><Clock size={14} />{post.readTime} min</div>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t" style={{ borderColor: isDark ? 'rgba(96,165,250,0.2)' : 'rgba(249,115,22,0.2)' }}>
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-light ${isDark ? 'bg-slate-800/50 text-gray-400' : 'bg-white/50 text-slate-600'}`}>
                            <Tag size={12} />{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
