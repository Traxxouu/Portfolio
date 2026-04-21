'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { BackgroundBlobs } from './components/BackgroundBlobs';
import { usePageTransition, PageTransition } from './components/PageTransition';
import { getProjects, type Project } from '@/lib/sanity.client';
import { urlFor } from '@/sanity/lib/image';
import { Users, GitFork, Star } from 'lucide-react';

export default function Home() {
  const { isDark } = useTheme();
  const { isTransitioning, navigate } = usePageTransition();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [relativeMousePosition, setRelativeMousePosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef<HTMLDivElement>(null);
  
  // Notification projet featured
  const [notificationExpanded, setNotificationExpanded] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // GitHub stats
  const [githubStats, setGithubStats] = useState<{
    followers: number;
    following: number;
    public_repos: number;
  } | null>(null);

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        if (titleRef.current) {
          const rect = titleRef.current.getBoundingClientRect();
          setRelativeMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          });
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Charger les projets (pour notification featured)
  useEffect(() => {
    getProjects()
      .then(data => setProjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Notification timer
  useEffect(() => {
    const timer = setTimeout(() => setNotificationExpanded(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // GitHub stats
  useEffect(() => {
    fetch('/api/github-stats')
      .then(r => r.json())
      .then(data => { if (!data.error) setGithubStats(data); })
      .catch(console.error);
  }, []);

  return (
    <div className={`fixed inset-0 overflow-hidden overflow-x-hidden ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'} transition-colors duration-1000 ease-in-out md:cursor-none`}>
      
      <PageTransition isTransitioning={isTransitioning} isDark={isDark} />

      {/* Curseur personnalisé - Desktop uniquement */}
      <div 
        className="hidden md:block fixed w-8 h-8 rounded-full pointer-events-none z-[100] border-2"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
          willChange: 'transform',
          backgroundColor: isDark ? 'white' : 'black',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)',
          boxShadow: isDark 
            ? '0 0 25px rgba(255, 255, 255, 0.4), 0 0 50px rgba(255, 255, 255, 0.2)' 
            : '0 0 25px rgba(0, 0, 0, 0.4), 0 0 50px rgba(0, 0, 0, 0.2)'
        }}
      />
      
      <BackgroundBlobs />
      <ThemeToggle />

      {/* Notification Projet Featured - Desktop uniquement */}
      {notificationVisible && !loading && projects.length > 0 && projects.find(p => p.featured) && (
        <div className={`hidden lg:block fixed top-6 left-6 z-40 transition-all duration-500 ${
          notificationExpanded ? 'max-w-sm' : 'max-w-[80px]'
        }`}>
          {(() => {
            const featuredProject = projects.find(p => p.featured)!;
            return (
              <Link
                href={`/projects/${featuredProject.slug.current}`}
                onClick={(e) => {
                  if (!notificationExpanded) {
                    e.preventDefault();
                    setNotificationExpanded(true);
                  }
                }}
                className={`block backdrop-blur-xl rounded-2xl border-2 transition-all duration-500 hover:scale-105 hover:-translate-y-1 group overflow-hidden ${
                  notificationExpanded ? 'p-4' : 'p-3'
                } ${
                  isDark 
                    ? 'bg-slate-800/90 border-purple-500/50 hover:border-purple-400/70 shadow-2xl shadow-purple-500/20' 
                    : 'bg-white/90 border-orange-300/50 hover:border-orange-400/70 shadow-2xl shadow-orange-300/30'
                }`}
              >
                {notificationExpanded ? (
                  <>
                    <div className="flex items-center gap-2 mb-2 animate-fade-in">
                      <div className={`px-2 py-1 rounded-full text-xs font-light ${
                        isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-orange-500/20 text-orange-600'
                      }`}>
                        ✨ Nouveau projet
                      </div>
                    </div>
                    <div className="flex gap-3 animate-fade-in">
                      {featuredProject.coverImage ? (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={urlFor(featuredProject.coverImage).width(120).height(120).url()}
                            alt={featuredProject.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="64px"
                          />
                        </div>
                      ) : featuredProject.emoji && (
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                          <span className="text-3xl">{featuredProject.emoji}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-light text-sm mb-1 truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {featuredProject.title}
                        </h3>
                        <p className={`text-xs line-clamp-2 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                          {featuredProject.description}
                        </p>
                      </div>
                    </div>
                    <div className={`mt-2 text-xs flex items-center gap-1 transition-all duration-300 group-hover:gap-2 animate-fade-in ${
                      isDark ? 'text-purple-300' : 'text-orange-600'
                    }`}>
                      Voir le projet
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center relative group">
                    {featuredProject.coverImage ? (
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden">
                        <Image
                          src={urlFor(featuredProject.coverImage).width(80).height(80).url()}
                          alt={featuredProject.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="56px"
                        />
                      </div>
                    ) : featuredProject.emoji ? (
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                        <span className="text-2xl">{featuredProject.emoji}</span>
                      </div>
                    ) : (
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isDark ? 'bg-purple-500/20' : 'bg-orange-500/20'}`}>
                        <ArrowRight className={isDark ? 'text-purple-300' : 'text-orange-600'} size={24} />
                      </div>
                    )}
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 ${
                      isDark ? 'bg-purple-500 border-slate-800' : 'bg-orange-500 border-white'
                    } animate-pulse`} />
                  </div>
                )}
              </Link>
            );
          })()}
        </div>
      )}

      {/* Conteneur principal */}
      <div className="relative h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-8">
        
        <div ref={titleRef} className="text-center mb-3 sm:mb-4 lg:mb-6 animate-fade-in-up relative">
          <h1 className="font-serif leading-[0.8] tracking-tight relative">
            <span className={`block text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              MAËL BARBE
            </span>
            <span className={`block text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light mt-1 lg:mt-2 ${
              isDark ? 'text-blue-300' : 'text-orange-600'
            }`}>
              Full Stack Developer
            </span>
            
            {/* Effet de révélation au survol - Desktop uniquement */}
            <div 
              className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none"
              style={{
                clipPath: `circle(120px at ${relativeMousePosition.x}px ${relativeMousePosition.y}px)`
              }}
            >
              <span className={`block text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light ${
                isDark ? 'text-slate-900' : 'text-white'
              }`}>
                MAËL BARBE
              </span>
              <span className={`block text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light mt-1 lg:mt-2 ${
                isDark ? 'text-orange-600' : 'text-blue-300'
              }`}>
                Full Stack Developer
              </span>
            </div>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-8 xl:gap-12">
          
          <div className="animate-fade-in-scale animation-delay-200">
            <div className={`relative group backdrop-blur-2xl p-3 rounded-[2.5rem] border-2 transition-all hover:scale-105 ${
              isDark 
                ? 'bg-slate-800/40 border-purple-500/30 shadow-2xl shadow-purple-500/20' 
                : 'bg-white/40 border-orange-200/40 shadow-2xl shadow-orange-300/30'
            }`}>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 rounded-[2rem] overflow-hidden">
                <Image
                  src={isDark ? "/profile-dark.jpg" : "/profile-light.jpg"}
                  alt="Maël Barbe"
                  fill
                  sizes="(max-width: 640px) 128px, (max-width: 1024px) 176px, (max-width: 1280px) 224px, 256px"
                  priority
                  quality={85}
                  className="object-cover"
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-tr rounded-[2.5rem] pointer-events-none ${
                isDark ? 'from-blue-500/10 to-purple-500/10' : 'from-orange-300/10 to-rose-300/10'
              }`}></div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col items-center lg:items-start gap-1 sm:gap-2 lg:gap-1 animate-fade-in-up animation-delay-400">
            {[
              { label: 'About', path: '/about' },
              { label: 'Blog', path: '/blog' },
              { label: 'Projects', path: '/projects' },
              { label: 'Contact', path: '/contact' },
            ].map((item, index) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`group relative text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-light tracking-wide 
                  transition-all duration-500 
                  md:hover:scale-110 md:hover:translate-x-4
                  py-2 px-4 rounded-lg
                  active:scale-95 touch-manipulation
                  ${isDark ? 'text-white md:hover:text-blue-300 active:text-blue-300' : 'text-slate-900 md:hover:text-orange-600 active:text-orange-600'}`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <span className={`absolute inset-0 rounded-lg opacity-0 md:group-hover:opacity-100 transition-all duration-500 blur-2xl ${
                  isDark ? 'bg-blue-500/30' : 'bg-orange-500/30'
                }`}></span>
                {item.label.split('').map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block relative z-10 transition-all duration-300 ease-out md:group-hover:scale-125 md:group-hover:-translate-y-2 md:group-hover:rotate-6"
                    style={{ 
                      transitionDelay: `${i * 30}ms`,
                      transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </button>
            ))}

            {/* Stats GitHub + Social Links */}
            <div className="flex flex-col gap-2 mt-2 sm:mt-3 animate-fade-in-up animation-delay-1000">
              {githubStats && (
                <div className={`backdrop-blur-xl rounded-xl border-2 p-2 sm:p-3 transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30 shadow-lg shadow-purple-500/10' 
                    : 'bg-white/40 border-orange-200/40 shadow-lg shadow-orange-300/20'
                }`}>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`p-1.5 rounded-lg mb-1 ${isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
                        <Users className={`w-4 h-4 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                      </div>
                      <span className={`text-xl font-light ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {githubStats.followers}
                      </span>
                      <span className={`text-xs font-light ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Followers</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`p-1.5 rounded-lg mb-1 ${isDark ? 'bg-purple-500/20' : 'bg-purple-500/10'}`}>
                        <GitFork className={`w-4 h-4 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
                      </div>
                      <span className={`text-xl font-light ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {githubStats.public_repos}
                      </span>
                      <span className={`text-xs font-light ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Repos</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`p-1.5 rounded-lg mb-1 ${isDark ? 'bg-pink-500/20' : 'bg-pink-500/10'}`}>
                        <Star className={`w-4 h-4 ${isDark ? 'text-pink-300' : 'text-pink-600'}`} />
                      </div>
                      <span className={`text-xl font-light ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {githubStats.following}
                      </span>
                      <span className={`text-xs font-light ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Following</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="flex gap-2 sm:gap-3">
                <a href="https://github.com/Traxxouu" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className={`p-3 backdrop-blur-xl rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isDark 
                      ? 'bg-slate-800/40 border-purple-500/30 text-white hover:bg-slate-700/50 hover:border-purple-400/50 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30' 
                      : 'bg-white/40 border-orange-200/40 text-slate-900 hover:bg-white/60 hover:border-orange-300/60 shadow-lg shadow-orange-300/20 hover:shadow-orange-300/40'
                  }`}
                >
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/maelbarbe/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className={`p-3 backdrop-blur-xl rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isDark 
                      ? 'bg-slate-800/40 border-purple-500/30 text-white hover:bg-slate-700/50 hover:border-purple-400/50 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30' 
                      : 'bg-white/40 border-orange-200/40 text-slate-900 hover:bg-white/60 hover:border-orange-300/60 shadow-lg shadow-orange-300/20 hover:shadow-orange-300/40'
                  }`}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://yourweb.fr" target="_blank" rel="noopener noreferrer" aria-label="YourWeb"
                  className={`p-3 backdrop-blur-xl rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isDark 
                      ? 'bg-slate-800/40 border-purple-500/30 text-white hover:bg-slate-700/50 hover:border-purple-400/50 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30' 
                      : 'bg-white/40 border-orange-200/40 text-slate-900 hover:bg-white/60 hover:border-orange-300/60 shadow-lg shadow-orange-300/20 hover:shadow-orange-300/40'
                  }`}
                >
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
