'use client';

import { useState, useEffect } from 'react';
import { Github, ExternalLink, BookOpen, ArrowRight, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';
import { ThemeToggle } from '../components/ThemeToggle';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { SubPageNav } from '../components/SubPageNav';
import { getProjects, type Project } from '@/lib/sanity.client';
import { urlFor } from '@/sanity/lib/image';

export default function ProjectsPage() {
  const { isDark } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(data => setProjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={`fixed inset-0 z-0 overflow-auto ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'} transition-colors duration-500`}>
      <BackgroundBlobs />
      <ThemeToggle />

      <div className="relative min-h-screen px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <SubPageNav backLabel="Accueil" backPath="/" forwardLabel="Blog & Réflexions" forwardPath="/blog" />
          
          <div className="mb-16 animate-fade-in-up">
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Mes <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>Projets</span>
            </h1>
            <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
              Une sélection de mes réalisations les plus significatives
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-6">
              <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${isDark ? 'border-blue-400' : 'border-orange-500'}`} />
              <p className={`text-lg font-light animate-pulse ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Chargement des projets...</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <Link href={`/projects/${project.slug.current}`} key={project._id}
                    className={`backdrop-blur-2xl p-6 rounded-3xl border-2 transition-all duration-500 md:hover:scale-105 md:hover:-translate-y-2 active:scale-95 group will-change-transform cursor-pointer touch-manipulation ${
                      isDark ? 'bg-slate-800/40 border-purple-500/30 md:hover:border-purple-400/50 md:hover:shadow-2xl md:hover:shadow-purple-500/20' : 'bg-white/40 border-orange-200/40 md:hover:border-orange-300/60 md:hover:shadow-2xl md:hover:shadow-orange-300/20'
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${200 + index * 150}ms` }}>
                    
                    <div className="w-full h-48 rounded-2xl mb-4 relative overflow-hidden transition-all duration-500 md:group-hover:scale-105">
                      {project.coverImage ? (
                        <Image src={urlFor(project.coverImage).width(600).height(400).url()} alt={project.title} fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" className="object-cover" />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/15'}`}>
                          {project.emoji && <span className="text-6xl transition-all duration-500 md:group-hover:scale-125 md:group-hover:rotate-6">{project.emoji}</span>}
                        </div>
                      )}
                    </div>

                    <h3 className={`text-2xl font-light mb-2 transition-colors duration-300 ${isDark ? 'text-white group-hover:text-blue-300' : 'text-slate-900 group-hover:text-orange-600'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm mb-4 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                      {project.technologies.join(' • ')}
                    </p>
                    <p className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{project.description}</p>
                    
                    <div className="flex gap-2 flex-wrap">
                      {project.status === 'terminé' && (
                        <>
                          {project.liveUrl && (
                            <span onClick={(e) => { e.preventDefault(); window.open(project.liveUrl, '_blank'); }}
                              className={`px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center gap-1 ${isDark ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-orange-500/20 text-orange-600 hover:bg-orange-500/30'}`}>
                              Démo <ExternalLink className="w-3 h-3" />
                            </span>
                          )}
                          {project.githubUrl && (
                            <span onClick={(e) => { e.preventDefault(); window.open(project.githubUrl, '_blank'); }}
                              className={`px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center gap-1 ${isDark ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30'}`}>
                              GitHub <Github className="w-3 h-3" />
                            </span>
                          )}
                        </>
                      )}
                      {project.status === 'en-cours' && (
                        <span className={`px-4 py-2 rounded-full text-sm ${isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-500/20 text-yellow-600'}`}>En cours...</span>
                      )}
                      {project.status === 'abandonné' && (
                        <span className={`px-4 py-2 rounded-full text-sm ${isDark ? 'bg-slate-700/50 text-gray-400' : 'bg-gray-200/50 text-gray-600'}`}>Abandonné</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {projects.length === 0 && (
                <div className={`text-center py-20 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  <p className="text-2xl mb-4">Aucun projet pour le moment</p>
                  <p className="text-lg">Connecte-toi à ton studio Sanity pour ajouter tes premiers projets !</p>
                </div>
              )}
            </>
          )}

          {/* CTA Blog */}
          <div className={`mt-16 backdrop-blur-2xl p-8 rounded-3xl border-2 overflow-hidden relative ${
            isDark ? 'bg-gradient-to-br from-blue-950/40 to-purple-950/40 border-blue-500/30' : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border-blue-300/40'
          } animate-fade-in-up animation-delay-800`}>
            <div className={`absolute top-4 right-4 opacity-10 ${isDark ? 'text-blue-300' : 'text-blue-400'}`}>
              <BookOpen size={80} />
            </div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className={`w-8 h-8 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                <h2 className={`text-2xl sm:text-3xl font-light ${isDark ? 'text-white' : 'text-slate-900'}`}>Découvre le processus de création</h2>
              </div>
              <p className={`mb-6 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                Retrouve sur mon blog les coulisses de mes projets, mes choix techniques et retours d&apos;expérience
              </p>
              <Link href="/blog"
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-light transition-all md:hover:scale-105 md:hover:gap-4 active:scale-95 touch-manipulation ${
                  isDark ? 'bg-blue-500/20 text-blue-300 md:hover:bg-blue-500/30 border-2 border-blue-500/30' : 'bg-blue-500/20 text-blue-600 md:hover:bg-blue-500/30 border-2 border-blue-500/30'
                }`}>
                Lire mes articles <ArrowRight className="w-5 h-5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* CTA Contact */}
          <div className={`mt-16 backdrop-blur-2xl p-8 rounded-3xl border-2 text-center ${
            isDark ? 'bg-slate-800/40 border-purple-500/30' : 'bg-white/40 border-orange-200/40'
          } animate-fade-in-up animation-delay-1000`}>
            <h2 className={`text-3xl sm:text-4xl font-light mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Vous avez un projet en tête ?</h2>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>N&apos;hésitez pas à me contacter pour en discuter !</p>
            <Link href="/contact"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg transition-all md:hover:scale-105 active:scale-95 touch-manipulation ${
                isDark ? 'bg-blue-500/20 text-blue-300 md:hover:bg-blue-500/30 border-2 border-blue-500/30' : 'bg-orange-500/20 text-orange-600 md:hover:bg-orange-500/30 border-2 border-orange-500/30'
              }`}>
              <Mail className="w-5 h-5" /> Me contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
