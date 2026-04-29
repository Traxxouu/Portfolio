'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { BackgroundBlobs } from './components/BackgroundBlobs';
import { usePageTransition, PageTransition } from './components/PageTransition';
import { Users, GitFork, Star } from 'lucide-react';

export default function Home() {
  const { isDark } = useTheme();
  const { isTransitioning, navigate } = usePageTransition();

  // GitHub stats — fetched after first paint
  const [githubStats, setGithubStats] = useState<{
    followers: number;
    total_stars: number;
    public_repos: number;
  } | null>(null);

  useEffect(() => {
    // Defer non-critical fetch so it doesn't block paint
    const id = requestIdleCallback?.(() => {
      fetch('/api/github-stats')
        .then(r => r.json())
        .then(data => { if (!data.error) setGithubStats(data); })
        .catch(() => {});
    }) ?? setTimeout(() => {
      fetch('/api/github-stats')
        .then(r => r.json())
        .then(data => { if (!data.error) setGithubStats(data); })
        .catch(() => {});
    }, 1000);

    return () => {
      if (typeof id === 'number') {
        if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id);
        else clearTimeout(id);
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'} transition-colors duration-700`}>
      
      <PageTransition isTransitioning={isTransitioning} isDark={isDark} />
      <BackgroundBlobs />
      <ThemeToggle />

      {/* Conteneur principal */}
      <div className="relative h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Titre */}
        <div className="text-center mb-2 sm:mb-3 lg:mb-6 animate-fade-in-up">
          <h1 className="font-serif leading-[0.85] tracking-tight">
            <span className={`block text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              MAËL BARBE
            </span>
            <span className={`block text-base sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light mt-1 lg:mt-2 ${
              isDark ? 'text-blue-300' : 'text-orange-600'
            }`}>
              Full Stack Developer
            </span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-8 xl:gap-12">
          
          {/* Photo de profil */}
          <div className="animate-fade-in-scale animation-delay-200">
            <div className={`relative backdrop-blur-2xl p-2 sm:p-3 rounded-[2rem] sm:rounded-[2.5rem] border-2 transition-transform duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-slate-800/40 border-purple-500/30 shadow-2xl shadow-purple-500/20' 
                : 'bg-white/40 border-orange-200/40 shadow-2xl shadow-orange-300/30'
            }`}>
              <div className="relative w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
                <Image
                  src={isDark ? "/profile-dark.jpg" : "/profile-light.jpg"}
                  alt="Maël Barbe"
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, (max-width: 1280px) 224px, 256px"
                  priority
                  quality={80}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col items-center lg:items-start gap-0 sm:gap-1 lg:gap-1 animate-fade-in-up animation-delay-400">
            {[
              { label: 'About', path: '/about' },
              { label: 'Blog', path: '/blog' },
              { label: 'Projects', path: '/projects' },
              { label: 'Contact', path: '/contact' },
            ].map((item, index) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`group relative text-xl sm:text-3xl lg:text-3xl xl:text-4xl font-light tracking-wide 
                  transition-colors duration-300 
                  md:hover:scale-110 md:hover:translate-x-4
                  py-1 sm:py-2 px-4 rounded-lg
                  active:scale-95 touch-manipulation
                  ${isDark ? 'text-white md:hover:text-blue-300 active:text-blue-300' : 'text-slate-900 md:hover:text-orange-600 active:text-orange-600'}`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {item.label.split('').map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block relative z-10 transition-transform duration-300 ease-out md:group-hover:scale-125 md:group-hover:-translate-y-2"
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
            <div className="flex flex-col gap-1.5 sm:gap-2 mt-1 sm:mt-2 animate-fade-in-up animation-delay-1000">
              {githubStats && (
                <div className={`backdrop-blur-xl rounded-xl border-2 p-1.5 sm:p-2 transition-transform duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30 shadow-lg shadow-purple-500/10' 
                    : 'bg-white/40 border-orange-200/40 shadow-lg shadow-orange-300/20'
                }`}>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: Users, value: githubStats.followers, label: 'Followers', color: isDark ? 'blue' : 'blue' },
                      { icon: GitFork, value: githubStats.public_repos, label: 'Repos', color: isDark ? 'purple' : 'purple' },
                      { icon: Star, value: githubStats.total_stars, label: 'Stars', color: isDark ? 'pink' : 'pink' },
                    ].map(({ icon: Icon, value, label, color }) => (
                      <div key={label} className="flex flex-col items-center">
                        <div className={`p-1 rounded-lg mb-0.5 bg-${color}-500/${isDark ? '20' : '10'}`}>
                          <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${color}-${isDark ? '300' : '600'}`} />
                        </div>
                        <span className={`text-base sm:text-lg font-light leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</span>
                        <span className={`text-[10px] sm:text-xs font-light ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="flex gap-2">
                {[
                  { href: 'https://github.com/Traxxouu', label: 'GitHub', icon: Github },
                  { href: 'https://www.linkedin.com/in/maelbarbe/', label: 'LinkedIn', icon: Linkedin },
                  { href: 'https://yourweb.fr', label: 'YourWeb', icon: ExternalLink },
                ].map(({ href, label, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className={`p-2.5 sm:p-3 backdrop-blur-xl rounded-xl border-2 transition-transform duration-300 hover:scale-110 hover:-translate-y-1 ${
                      isDark 
                        ? 'bg-slate-800/40 border-purple-500/30 text-white hover:bg-slate-700/50 hover:border-purple-400/50 shadow-lg shadow-purple-500/10' 
                        : 'bg-white/40 border-orange-200/40 text-slate-900 hover:bg-white/60 hover:border-orange-300/60 shadow-lg shadow-orange-300/20'
                    }`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
