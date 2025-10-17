'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Moon, Sun, Cloud } from 'lucide-react';
import Image from 'next/image';
import { 
  SiOpenjdk, SiPython, SiJavascript, SiTypescript, SiPhp, SiMysql,
  SiReact, SiVuedotjs, SiNodedotjs, SiHtml5, SiCss3,
  SiDocker, SiGithub, SiMongodb, SiMariadb, SiSalesforce
} from 'react-icons/si';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [manualToggle, setManualToggle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [relativeMousePosition, setRelativeMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
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
      
      // Calculer la position relative au titre
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

  const handleToggle = () => {
    setManualToggle(true);
    setIsDark(!isDark);
  };

  const handlePageTransition = (page: 'about' | 'home') => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600); // Laisser le temps pour l'animation d'entrée
    }, 1200); // Durée de la transition
  };

  return (
    <div className={`fixed inset-0 overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'} transition-colors duration-1000 ${currentPage === 'home' ? 'cursor-none' : ''}`}>
      
      {/* Curseur personnalisé - seulement sur la page home */}
      {currentPage === 'home' && (
        <div 
          className="fixed w-8 h-8 rounded-full pointer-events-none z-[100] border-2"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.2s, height 0.2s',
            backgroundColor: isDark ? 'white' : 'black',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)',
            boxShadow: isDark 
              ? '0 0 20px rgba(255, 255, 255, 0.3)' 
              : '0 0 20px rgba(0, 0, 0, 0.3)'
          }}
        ></div>
      )}
      
      <div className="absolute inset-0 overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-25 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-[550px] h-[550px] bg-pink-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-violet-600 rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-blob animation-delay-6000"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-[550px] h-[550px] bg-amber-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-orange-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-15 animate-blob animation-delay-6000"></div>
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
        
        {/* TEXTE ÉNORME EN HAUT */}
        <div ref={titleRef} className="text-center mb-8 lg:mb-12 animate-fade-in-up relative">
          <h1 className="font-serif leading-[0.8] tracking-tight relative">
            {/* Texte normal */}
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
            
            {/* Texte inversé avec effet lampe torche */}
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

        {/* CONTENU PRINCIPAL */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-24">
          
          {/* PHOTO */}
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

          {/* NAVIGATION - Texte simple avec effet élastique */}
          <nav className="flex flex-col items-center lg:items-start gap-3 lg:gap-4 animate-fade-in-up animation-delay-400">
            {['About', 'Projects', 'Contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => item === 'About' && handlePageTransition('about')}
                className={`group relative text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide transition-all duration-300 hover:scale-105 hover:translate-x-2 ${
                  isDark ? 'text-white hover:text-blue-300' : 'text-slate-900 hover:text-orange-600'
                }`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <span className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${
                  isDark ? 'bg-blue-500/20' : 'bg-orange-500/20'
                }`}></span>
                {item.split('').map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block relative z-10 transition-transform duration-200 ease-out group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6"
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

            {/* Liens sociaux */}
            <div className="flex gap-4 mt-6 animate-fade-in-up animation-delay-1000">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 backdrop-blur-xl rounded-xl border-2 transition-all hover:scale-110 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30 text-white hover:bg-slate-700/50 shadow-lg shadow-purple-500/10' 
                    : 'bg-white/40 border-orange-200/40 text-slate-900 hover:bg-white/60 shadow-lg shadow-orange-300/20'
                }`}
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 backdrop-blur-xl rounded-xl border-2 transition-all hover:scale-110 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30 text-white hover:bg-slate-700/50 shadow-lg shadow-purple-500/10' 
                    : 'bg-white/40 border-orange-200/40 text-slate-900 hover:bg-white/60 shadow-lg shadow-orange-300/20'
                }`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Transition liquide morphing */}
      {isTransitioning && (
        <>
          {/* Vagues liquides qui montent */}
          <div className="fixed inset-0 z-[200] pointer-events-none">
            <div className={`absolute inset-0 ${
              isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
            } animate-liquid-rise`}>
              <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
                <path
                  className={`${isDark ? 'fill-blue-500' : 'fill-orange-400'} animate-wave-1`}
                  d="M0,800 C360,700 720,750 1440,800 L1440,800 L0,800 Z"
                  opacity="0.3"
                />
                <path
                  className={`${isDark ? 'fill-purple-500' : 'fill-rose-400'} animate-wave-2`}
                  d="M0,800 C360,720 720,770 1440,800 L1440,800 L0,800 Z"
                  opacity="0.4"
                />
                <path
                  className={`${isDark ? 'fill-slate-800' : 'fill-white'} animate-wave-3`}
                  d="M0,800 C360,740 720,790 1440,800 L1440,800 L0,800 Z"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes liquid-rise {
              0% { clip-path: circle(0% at 50% 100%); }
              100% { clip-path: circle(150% at 50% 100%); }
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

      {/* Page About */}
      {currentPage === 'about' && (
        <div className={`fixed inset-0 z-[150] overflow-auto ${
          isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
        } animate-fade-in`}>
          <div className="min-h-screen p-6 sm:p-8 lg:p-12">
            <div className="max-w-6xl mx-auto">
              {/* Header avec bouton retour et toggle */}
              <div className="flex justify-between items-center mb-12">
                <button
                  onClick={() => handlePageTransition('home')}
                  className={`text-2xl sm:text-3xl font-light transition-all hover:scale-105 hover:translate-x-2 group ${
                    isDark ? 'text-white hover:text-blue-300' : 'text-slate-900 hover:text-orange-600'
                  }`}
                >
                  <span className="inline-block transition-transform group-hover:-translate-x-2">←</span> Retour
                </button>
                
                {/* Toggle jour/nuit */}
                <button
                  onClick={handleToggle}
                  className={`p-4 rounded-full transition-all hover:scale-110 ${
                    isDark 
                      ? 'bg-slate-800/50 text-yellow-300 hover:bg-slate-700/50' 
                      : 'bg-white/50 text-slate-900 hover:bg-orange-100/50'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </div>
              
              {/* Header */}
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

              {/* Grid Layout pour Skills et Experience */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                
                {/* Hard Skills */}
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

                {/* Soft Skills */}
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

              {/* Experience - Style Edenred */}
              <div className={`backdrop-blur-2xl p-8 sm:p-10 lg:p-12 rounded-3xl border-2 mb-12 relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-green-950/40 to-slate-900/40 border-green-500/30' 
                  : 'bg-gradient-to-br from-green-50/80 to-emerald-50/80 border-green-300/40'
              } animate-fade-in-up animation-delay-600`}>
                
                {/* Logo Edenred en arrière-plan */}
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

              {/* Education & Interests */}
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
                    <p>💻 l’apprentissage autodidacte</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className={`mt-12 backdrop-blur-2xl p-8 rounded-3xl border-2 text-center ${
                isDark 
                  ? 'bg-slate-800/40 border-purple-500/30' 
                  : 'bg-white/40 border-orange-200/40'
              } animate-fade-in-up animation-delay-1200`}>
                <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Contactez-moi
                </h2>
                <div className={`space-y-2 text-lg ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  <p>📧 pro.mael.dev@gmail.com</p>
                  <div className="flex justify-center gap-4 mt-6">
                    <a 
                      href="https://github.com/Traxxouu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`px-6 py-3 rounded-full transition-all hover:scale-105 ${
                        isDark 
                          ? 'bg-slate-700 text-white hover:bg-slate-600' 
                          : 'bg-white text-slate-900 hover:bg-orange-50'
                      }`}
                    >
                      GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`px-6 py-3 rounded-full transition-all hover:scale-105 ${
                        isDark 
                          ? 'bg-slate-700 text-white hover:bg-slate-600' 
                          : 'bg-white text-slate-900 hover:bg-orange-50'
                      }`}
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}