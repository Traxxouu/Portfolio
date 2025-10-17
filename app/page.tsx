'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Moon, Sun, Cloud, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { 
  SiOpenjdk, SiPython, SiJavascript, SiTypescript, SiPhp, SiMysql,
  SiReact, SiVuedotjs, SiNodedotjs, SiHtml5, SiCss3,
  SiDocker, SiGithub, SiMongodb, SiMariadb, SiSalesforce
} from 'react-icons/si';
import { getProjects, type Project } from '@/lib/sanity.client';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [manualToggle, setManualToggle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [relativeMousePosition, setRelativeMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'projects'>('home');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!manualToggle) {
      const hour = new Date().getHours();
      setIsDark(hour < 6 || hour >= 18);
    }
  }, [manualToggle]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        setRelativeMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Charger les projets depuis Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentPage === 'projects') {
      fetchProjects();
    }
  }, [currentPage]);

  const handleToggle = () => {
    setManualToggle(true);
    setIsDark(!isDark);
  };

  const handlePageTransition = (page: 'about' | 'home' | 'projects') => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'} transition-all duration-1000 ease-in-out ${currentPage === 'home' ? 'cursor-none' : ''}`}>
      
      {currentPage === 'home' && (
        <div 
          className="fixed w-8 h-8 rounded-full pointer-events-none z-[100] border-2"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: isDark ? 'white' : 'black',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)',
            boxShadow: isDark 
              ? '0 0 25px rgba(255, 255, 255, 0.4), 0 0 50px rgba(255, 255, 255, 0.2)' 
              : '0 0 25px rgba(0, 0, 0, 0.4), 0 0 50px rgba(0, 0, 0, 0.2)'
          }}
        ></div>
      )}
      
      <div className="absolute inset-0 overflow-hidden will-change-transform gpu-accelerated">
        {isDark ? (
          <>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob will-change-transform"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-25 animate-blob animation-delay-2000 will-change-transform"></div>
            <div className="absolute bottom-0 left-1/2 w-[550px] h-[550px] bg-pink-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-4000 will-change-transform"></div>
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-violet-600 rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-blob animation-delay-6000 will-change-transform"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob will-change-transform"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 animate-blob animation-delay-2000 will-change-transform"></div>
            <div className="absolute bottom-0 left-1/2 w-[550px] h-[550px] bg-amber-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000 will-change-transform"></div>
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-orange-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-15 animate-blob animation-delay-6000 will-change-transform"></div>
          </>
        )}
      </div>

      <button
        onClick={handleToggle}
        className={`fixed top-8 right-8 z-50 p-4 rounded-full backdrop-blur-xl border transition-all hover:scale-110 group ${
          isDark 
            ? 'bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/60' 
            : 'bg-white/50 border-orange-200/50 hover:bg-white/70'
        }`}
      >
        {isDark ? (
          <Sun className={`w-6 h-6 text-yellow-300`} />
        ) : (
          <Moon className={`w-6 h-6 text-slate-700`} />
        )}
      </button>

      <div className="relative h-full flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12">
        
        <div ref={titleRef} className="text-center mb-8 lg:mb-12 animate-fade-in-up relative">
          <h1 className="font-serif leading-[0.8] tracking-tight relative">
            <span className={`block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] font-light ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              MAËL BARBE
            </span>
            <span className={`block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light mt-2 lg:mt-4 ${
              isDark ? 'text-blue-300' : 'text-orange-600'
            }`}>
              Full Stack Developer
            </span>
            
            <div 
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{
                clipPath: `circle(120px at ${relativeMousePosition.x}px ${relativeMousePosition.y}px)`
              }}
            >
              <span className={`block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] font-light ${
                isDark ? 'text-slate-900' : 'text-white'
              }`}>
                MAËL BARBE
              </span>
              <span className={`block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light mt-2 lg:mt-4 ${
                isDark ? 'text-orange-600' : 'text-blue-300'
              }`}>
                Full Stack Developer
              </span>
            </div>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-24">
          
          <div className="animate-fade-in-scale animation-delay-200">
            <div className={`relative group backdrop-blur-2xl p-3 rounded-[2.5rem] border-2 transition-all hover:scale-105 ${
              isDark 
                ? 'bg-slate-800/40 border-purple-500/30 shadow-2xl shadow-purple-500/20' 
                : 'bg-white/40 border-orange-200/40 shadow-2xl shadow-orange-300/30'
            }`}>
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-[2rem] overflow-hidden">
                <Image
                  src={isDark ? "/profile-dark.jpg" : "/profile-light.jpg"}
                  alt="Maël Barbe"
                  fill
                  className="object-cover"
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-tr rounded-[2.5rem] pointer-events-none ${
                isDark ? 'from-blue-500/10 to-purple-500/10' : 'from-orange-300/10 to-rose-300/10'
              }`}></div>
            </div>
          </div>

          <nav className="flex flex-col items-center lg:items-start gap-3 lg:gap-4 animate-fade-in-up animation-delay-400">
            {['About', 'Projects', 'Contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'About') handlePageTransition('about');
                  if (item === 'Projects') handlePageTransition('projects');
                }}
                className={`group relative text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide transition-all duration-500 hover:scale-110 hover:translate-x-4 ${
                  isDark ? 'text-white hover:text-blue-300' : 'text-slate-900 hover:text-orange-600'
                }`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <span className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl ${
                  isDark ? 'bg-blue-500/30' : 'bg-orange-500/30'
                }`}></span>
                {item.split('').map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block relative z-10 transition-all duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6"
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

            <div className="flex gap-4 mt-6 animate-fade-in-up animation-delay-1000">
              <a
                href="https://github.com/Traxxouu"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 backdrop-blur-xl rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30 text-white hover:bg-slate-700/50 hover:border-purple-400/50 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30' 
                    : 'bg-white/40 border-orange-200/40 text-slate-900 hover:bg-white/60 hover:border-orange-300/60 shadow-lg shadow-orange-300/20 hover:shadow-orange-300/40'
                }`}
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 backdrop-blur-xl rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30 text-white hover:bg-slate-700/50 hover:border-purple-400/50 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30' 
                    : 'bg-white/40 border-orange-200/40 text-slate-900 hover:bg-white/60 hover:border-orange-300/60 shadow-lg shadow-orange-300/20 hover:shadow-orange-300/40'
                }`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Transitions liquides - Version améliorée et plus fluide */}
      {isTransitioning && (
        <>
          <div className="fixed inset-0 z-[200] pointer-events-none will-change-transform">
            <div className={`absolute inset-0 ${
              isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
            } animate-liquid-rise`}>
              <svg className="absolute bottom-0 w-full h-full will-change-transform" viewBox="0 0 1440 800" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={isDark ? '#3b82f6' : '#fb923c'} stopOpacity="0.4" />
                    <stop offset="50%" stopColor={isDark ? '#8b5cf6' : '#f97316'} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={isDark ? '#3b82f6' : '#fb923c'} stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={isDark ? '#a855f7' : '#fb7185'} stopOpacity="0.5" />
                    <stop offset="50%" stopColor={isDark ? '#ec4899' : '#fda4af'} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={isDark ? '#a855f7' : '#fb7185'} stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={isDark ? '#1e293b' : '#ffffff'} stopOpacity="0.7" />
                    <stop offset="50%" stopColor={isDark ? '#334155' : '#fef3c7'} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={isDark ? '#1e293b' : '#ffffff'} stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#wave-gradient-1)"
                  d="M0,800 C360,700 720,750 1440,800 L1440,800 L0,800 Z"
                  style={{
                    animation: 'wave-1 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                  }}
                />
                <path
                  fill="url(#wave-gradient-2)"
                  d="M0,800 C360,720 720,770 1440,800 L1440,800 L0,800 Z"
                  style={{
                    animation: 'wave-2 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards'
                  }}
                />
                <path
                  fill="url(#wave-gradient-3)"
                  d="M0,800 C360,740 720,790 1440,800 L1440,800 L0,800 Z"
                  style={{
                    animation: 'wave-3 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards'
                  }}
                />
              </svg>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes liquid-rise {
              0% { clip-path: circle(0% at 50% 100%); }
              100% { clip-path: circle(150% at 50% 100%); }
            }
            @keyframes spiral-transition {
              0% { 
                clip-path: polygon(50% 50%, 50% 0%, 50% 0%, 50% 0%);
                transform: rotate(0deg) scale(0);
              }
              100% { 
                clip-path: polygon(50% 50%, 100% 0%, 100% 100%, 0% 100%, 0% 0%);
                transform: rotate(360deg) scale(1.5);
              }
            }
            @keyframes wave-1 {
              0% { d: path("M0,800 C360,700 720,750 1440,800 L1440,800 L0,800 Z"); }
              50% { d: path("M0,600 C360,500 720,550 1440,600 L1440,800 L0,800 Z"); }
              100% { d: path("M0,0 C360,0 720,0 1440,0 L1440,800 L0,800 Z"); }
            }
            @keyframes wave-2 {
              0% { d: path("M0,800 C360,720 720,770 1440,800 L1440,800 L0,800 Z"); }
              50% { d: path("M0,550 C360,450 720,500 1440,550 L1440,800 L0,800 Z"); }
              100% { d: path("M0,0 C360,0 720,0 1440,0 L1440,800 L0,800 Z"); }
            }
            @keyframes wave-3 {
              0% { d: path("M0,800 C360,740 720,790 1440,800 L1440,800 L0,800 Z"); }
              50% { d: path("M0,500 C360,400 720,450 1440,500 L1440,800 L0,800 Z"); }
              100% { d: path("M0,0 C360,0 720,0 1440,0 L1440,800 L0,800 Z"); }
            }
            .animate-liquid-rise {
              animation: liquid-rise 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
            }
            .animate-spiral-transition {
              animation: spiral-transition 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
            }
            .animate-wave-1 {
              animation: wave-1 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
            }
            .animate-wave-2 {
              animation: wave-2 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards;
            }
            .animate-wave-3 {
              animation: wave-3 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards;
            }
          `}</style>
        </>
      )}

      {/* Page About - identique à avant */}
      {currentPage === 'about' && (
        <div className={`fixed inset-0 z-[150] overflow-auto ${
          isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
        } animate-fade-in`}>
          <div className="min-h-screen p-6 sm:p-8 lg:p-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <button
                  onClick={() => handlePageTransition('home')}
                  className={`text-2xl sm:text-3xl font-light transition-all hover:scale-105 hover:translate-x-2 group ${
                    isDark ? 'text-white hover:text-blue-300' : 'text-slate-900 hover:text-orange-600'
                  }`}
                >
                  <span className="inline-block transition-transform group-hover:-translate-x-2">←</span> Retour
                </button>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handlePageTransition('projects')}
                    className={`text-2xl sm:text-3xl font-light transition-all hover:scale-105 hover:-translate-x-2 group ${
                      isDark ? 'text-white hover:text-blue-300' : 'text-slate-900 hover:text-orange-600'
                    }`}
                  >
                    Projets <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                  </button>

                  <button
                    onClick={handleToggle}
                    className={`p-4 rounded-full transition-all hover:scale-110 ${
                      isDark 
                        ? 'bg-slate-800/50 text-yellow-300 hover:bg-slate-700/50' 
                        : 'bg-white/50 text-slate-900 hover:bg-orange-100/50'
                    }`}
                  >
                    {isDark ? <Sun size={24} /> : <Moon size={24} />}
                  </button>
                </div>
              </div>
              
              <div className="mb-16 animate-fade-in-up">
                <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Salut ! Je suis <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>Maël</span>
                </h1>
                <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed flex flex-wrap items-center gap-2 ${
                  isDark ? 'text-gray-300' : 'text-slate-700'
                }`}>
                  <span>Développeur web passionné, actuellement étudiant à l&apos;</span>
                  <span className="inline-flex items-center gap-0 font-normal group/efrei relative min-w-[50px] sm:min-w-[60px]">
                    <span className="opacity-0 transition-all duration-500 ease-out group-hover/efrei:opacity-100 whitespace-nowrap absolute left-0 z-0">
                      EFREI
                    </span>
                    <Image 
                      src="/efreilogo.svg" 
                      alt="EFREI Logo" 
                      width={50} 
                      height={50} 
                      className="inline-block transition-all duration-500 ease-out group-hover/efrei:translate-x-[80px] sm:group-hover/efrei:translate-x-[100px] relative z-10"
                      style={{ display: 'inline-block', verticalAlign: 'middle' }}
                    />
                  </span>
                  <span>. J&apos;adore créer des projets dynamiques et innovants, tout en garantissant des solutions modernes, optimisées, et une expérience utilisateur fluide.</span>
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30' 
                    : 'bg-white/40 border-orange-200/40'
                } animate-fade-in-up animation-delay-200`}>
                  <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Hard Skills
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-xl font-light mb-3 ${
                        isDark ? 'text-blue-300' : 'text-orange-600'
                      }`}>Langages</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'Java', Icon: SiOpenjdk },
                          { name: 'Python', Icon: SiPython },
                          { name: 'JavaScript', Icon: SiJavascript },
                          { name: 'TypeScript', Icon: SiTypescript },
                          { name: 'PHP', Icon: SiPhp },
                          { name: 'SQL', Icon: SiMysql }
                        ].map((skill) => (
                          <span key={skill.name} className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                            isDark 
                              ? 'bg-slate-700/50 text-gray-200' 
                              : 'bg-white/60 text-slate-800'
                          }`}>
                            <skill.Icon className="w-4 h-4" />
                            <span>{skill.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-xl font-light mb-3 ${
                        isDark ? 'text-blue-300' : 'text-orange-600'
                      }`}>Web & Frameworks</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'React.js', Icon: SiReact },
                          { name: 'Vue.js', Icon: SiVuedotjs },
                          { name: 'Node.js', Icon: SiNodedotjs },
                          { name: 'HTML', Icon: SiHtml5 },
                          { name: 'CSS', Icon: SiCss3 }
                        ].map((skill) => (
                          <span key={skill.name} className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                            isDark 
                              ? 'bg-slate-700/50 text-gray-200' 
                              : 'bg-white/60 text-slate-800'
                          }`}>
                            <skill.Icon className="w-4 h-4" />
                            <span>{skill.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-xl font-light mb-3 ${
                        isDark ? 'text-blue-300' : 'text-orange-600'
                      }`}>Outils & BDD</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'Docker', Icon: SiDocker },
                          { name: 'GitHub', Icon: SiGithub },
                          { name: 'MongoDB', Icon: SiMongodb },
                          { name: 'MariaDB', Icon: SiMariadb },
                          { name: 'MySQL', Icon: SiMysql },
                          { name: 'Azure', Icon: Cloud },
                          { name: 'Salesforce', Icon: SiSalesforce }
                        ].map((skill) => (
                          <span key={skill.name} className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                            isDark 
                              ? 'bg-slate-700/50 text-gray-200' 
                              : 'bg-white/60 text-slate-800'
                          }`}>
                            <skill.Icon className="w-4 h-4" />
                            <span>{skill.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30' 
                    : 'bg-white/40 border-orange-200/40'
                } animate-fade-in-up animation-delay-400`}>
                  <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Soft Skills
                  </h2>
                  
                  <div className={`space-y-4 text-lg ${
                    isDark ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    <div className="flex items-start gap-3">
                      <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>•</span>
                      <span>Autonomie & polyvalence</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>•</span>
                      <span>Esprit d&apos;équipe (PSE1 obtenu)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>•</span>
                      <span>Excellente communication verbale</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>•</span>
                      <span>Souci du détail</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>•</span>
                      <span>Mobilité (Permis B)</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className={`text-xl font-light mb-3 ${
                      isDark ? 'text-blue-300' : 'text-orange-600'
                    }`}>Langues</h3>
                    <div className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      <p>🇫🇷 Français - Natif</p>
                      <p>🇬🇧 Anglais - B1</p>
                      <p>🇩🇪 Allemand - A2</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`backdrop-blur-2xl p-8 sm:p-10 lg:p-12 rounded-3xl border-2 mb-12 relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-green-950/40 to-slate-900/40 border-green-500/30' 
                  : 'bg-gradient-to-br from-green-50/80 to-emerald-50/80 border-green-300/40'
              } animate-fade-in-up animation-delay-600`}>
                
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-10">
                  <Image 
                    src="/edenredlogo.svg" 
                    alt="Edenred Logo" 
                    width={120} 
                    height={120} 
                    className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
                  />
                </div>

                <div className="relative z-10">
                  <h2 className={`text-3xl sm:text-4xl font-light mb-8 flex items-center gap-4 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    <Image 
                      src="/edenredlogo.svg" 
                      alt="Edenred Logo" 
                      width={50} 
                      height={50} 
                      className="w-10 h-10 sm:w-12 sm:h-12"
                    />
                    Expérience
                  </h2>
                  
                  <div className={`space-y-6 p-6 sm:p-8 rounded-2xl ${
                    isDark 
                      ? 'bg-slate-900/30 border border-green-500/20' 
                      : 'bg-white/50 border border-green-300/30'
                  }`}>
                    <div>
                      <h3 className={`text-2xl sm:text-3xl font-normal mb-2 ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`}>
                        Stagiaire Développeur • Edenred France
                      </h3>
                      <p className={`text-sm sm:text-base mb-6 font-medium ${
                        isDark ? 'text-green-300/80' : 'text-green-600/80'
                      }`}>
                        📍 Juin - Août 2024 (2 mois) • Malakoff, France
                      </p>
                      <ul className={`space-y-4 text-base sm:text-lg ${
                        isDark ? 'text-gray-300' : 'text-slate-700'
                      }`}>
                        <li className="flex items-start gap-3">
                          <span className={`text-xl ${isDark ? 'text-green-400' : 'text-green-600'}`}>▸</span>
                          <span>Intégré à l&apos;équipe Salesforce <span className="font-semibold">(Redforce)</span> en environnement agile <span className="font-semibold">(SCRUM)</span></span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={`text-xl ${isDark ? 'text-green-400' : 'text-green-600'}`}>▸</span>
                          <span>Développement en <span className="font-semibold">Apex, SOQL, LWC, Node.js/TypeScript</span></span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={`text-xl ${isDark ? 'text-green-400' : 'text-green-600'}`}>▸</span>
                          <span>Réalisation d&apos;un système de <span className="font-semibold">contrôle qualité des données</span> et <span className="font-semibold">audit automatisé</span> (Azure DevOps & Einstein AI)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30' 
                    : 'bg-white/40 border-orange-200/40'
                } animate-fade-in-up animation-delay-1000`}>
                  <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Formation
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className={`text-xl font-light ${
                        isDark ? 'text-blue-300' : 'text-orange-600'
                      }`}>
                        Bachelor Développeur Web & Applications
                      </h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        EFREI, Paris • 2024 - 2027
                      </p>
                    </div>
                    <div className="pt-4">
                      <h3 className={`text-xl font-light ${
                        isDark ? 'text-blue-300' : 'text-orange-600'
                      }`}>
                        Baccalauréat Général
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        Spécialité Maths & SES
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        CNED : NSI (investissement personnel)
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30' 
                    : 'bg-white/40 border-orange-200/40'
                } animate-fade-in-up animation-delay-1000`}>
                  <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Centres d&apos;intérêt
                  </h2>
                  <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    <p>🏀 Sport : Basket, Judo, Ju-jitsu, Natation</p>
                    <p>🎮 Jeux vidéo : Modding & création serveur GTA RP</p>
                    <p>🔐 Cybersécurité</p>
                    <p>💻 l&apos;apprentissage autodidacte</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center gap-4">
                <a 
                  href="https://github.com/Traxxouu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-full transition-all hover:scale-105 flex items-center gap-2 ${
                    isDark 
                      ? 'bg-slate-700 text-white hover:bg-slate-600' 
                      : 'bg-white text-slate-900 hover:bg-orange-50'
                  }`}
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-full transition-all hover:scale-105 flex items-center gap-2 ${
                    isDark 
                      ? 'bg-slate-700 text-white hover:bg-slate-600' 
                      : 'bg-white text-slate-900 hover:bg-orange-50'
                  }`}
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Projects - Avec Sanity */}
      {currentPage === 'projects' && (
        <div className={`fixed inset-0 z-[150] overflow-auto ${
          isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
        } animate-fade-in`}>
          <div className="min-h-screen p-6 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <button
                  onClick={() => handlePageTransition('about')}
                  className={`text-2xl sm:text-3xl font-light transition-all hover:scale-105 hover:translate-x-2 group ${
                    isDark ? 'text-white hover:text-blue-300' : 'text-slate-900 hover:text-orange-600'
                  }`}
                >
                  <span className="inline-block transition-transform group-hover:-translate-x-2">←</span> About
                </button>
                
                <button
                  onClick={handleToggle}
                  className={`p-4 rounded-full transition-all hover:scale-110 ${
                    isDark 
                      ? 'bg-slate-800/50 text-yellow-300 hover:bg-slate-700/50' 
                      : 'bg-white/50 text-slate-900 hover:bg-orange-100/50'
                  }`}
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </div>
              
              <div className="mb-16 animate-fade-in-up">
                <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Mes <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>Projets</span>
                </h1>
                <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-slate-700'
                }`}>
                  Une sélection de mes réalisations les plus significatives
                </p>
              </div>

              {/* Loader pendant le chargement - Version moderne */}
              {loading ? (
                <div className="flex flex-col justify-center items-center py-20 gap-6">
                  <div className={`relative w-16 h-16`}>
                    <div className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${
                      isDark ? 'border-blue-400' : 'border-orange-500'
                    }`}
                    style={{ animation: 'spin-smooth 1s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                    ></div>
                    <div className={`absolute inset-2 rounded-full border-4 border-b-transparent animate-spin ${
                      isDark ? 'border-purple-400' : 'border-rose-400'
                    }`}
                    style={{ animation: 'spin-smooth 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse' }}
                    ></div>
                  </div>
                  <p className={`text-lg font-light animate-pulse ${
                    isDark ? 'text-gray-400' : 'text-slate-600'
                  }`}>
                    Chargement des projets...
                  </p>
                </div>
              ) : (
                <>
                  {/* Grid de projets depuis Sanity */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                      <div 
                        key={project._id}
                        className={`backdrop-blur-2xl p-6 rounded-3xl border-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group will-change-transform ${
                          isDark 
                            ? 'bg-slate-800/40 border-purple-500/30 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20' 
                            : 'bg-white/40 border-orange-200/40 hover:border-orange-300/60 hover:shadow-2xl hover:shadow-orange-300/20'
                        } animate-fade-in-up`}
                        style={{ animationDelay: `${200 + index * 150}ms` }}
                      >
                        <div className="w-full h-48 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br transition-all duration-500 group-hover:scale-105 overflow-hidden"
                          style={{
                            backgroundImage: `linear-gradient(to bottom right, 
                              ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'}, 
                              ${isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.3)'}
                            )`
                          }}
                        >
                          <span className="text-6xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-6">{project.emoji}</span>
                        </div>
                        <h3 className={`text-2xl font-light mb-2 transition-colors duration-300 ${isDark ? 'text-white group-hover:text-blue-300' : 'text-slate-900 group-hover:text-orange-600'}`}>
                          {project.title}
                        </h3>
                        <p className={`text-sm mb-4 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                          {project.technologies.join(' • ')}
                        </p>
                        <p className={`text-base mb-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                          {project.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {project.status === 'terminé' && (
                            <>
                              {project.liveUrl && (
                                <a 
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center gap-1 ${
                                    isDark ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-orange-500/20 text-orange-600 hover:bg-orange-500/30'
                                  }`}
                                >
                                  Démo <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                              {project.githubUrl && (
                                <a 
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center gap-1 ${
                                    isDark ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30'
                                  }`}
                                >
                                  GitHub <Github className="w-3 h-3" />
                                </a>
                              )}
                            </>
                          )}
                          {project.status === 'en-cours' && (
                            <span className={`px-4 py-2 rounded-full text-sm ${
                              isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-500/20 text-yellow-600'
                            }`}>
                              En cours...
                            </span>
                          )}
                          {project.status === 'abandonné' && (
                            <span className={`px-4 py-2 rounded-full text-sm ${
                              isDark ? 'bg-slate-700/50 text-gray-400' : 'bg-gray-200/50 text-gray-600'
                            }`}>
                              Abandonné
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message si aucun projet */}
                  {projects.length === 0 && (
                    <div className={`text-center py-20 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                      <p className="text-2xl mb-4">Aucun projet pour le moment</p>
                      <p className="text-lg">Connecte-toi à ton studio Sanity pour ajouter tes premiers projets !</p>
                    </div>
                  )}
                </>
              )}

              <div className={`mt-16 backdrop-blur-2xl p-8 rounded-3xl border-2 text-center ${
                isDark 
                  ? 'bg-slate-800/40 border-purple-500/30' 
                  : 'bg-white/40 border-orange-200/40'
              } animate-fade-in-up animation-delay-1000`}>
                <h2 className={`text-3xl sm:text-4xl font-light mb-4 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Vous avez un projet en tête ?
                </h2>
                <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  N&apos;hésitez pas à me contacter pour en discuter !
                </p>
                <a 
                  href="mailto:pro.mael.dev@gmail.com"
                  className={`inline-block px-8 py-4 rounded-full text-lg transition-all hover:scale-105 ${
                    isDark 
                      ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-2 border-blue-500/30' 
                      : 'bg-orange-500/20 text-orange-600 hover:bg-orange-500/30 border-2 border-orange-500/30'
                  }`}
                >
                  Me contacter
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}