'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Moon, Sun, Cloud, ExternalLink, Instagram, Send, Mail, Download, Calendar, Clock, Tag, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getProjects, type Project, getBlogPosts, type BlogPost } from '@/lib/sanity.client';
import { urlFor } from '@/sanity/lib/image';
import { Users, GitFork, Star } from 'lucide-react';

// Lazy load des icônes lourdes
const SiOpenjdk = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiOpenjdk })), { ssr: false });
const SiPython = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiPython })), { ssr: false });
const SiJavascript = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiJavascript })), { ssr: false });
const SiTypescript = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiTypescript })), { ssr: false });
const SiPhp = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiPhp })), { ssr: false });
const SiMysql = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiMysql })), { ssr: false });
const SiReact = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiReact })), { ssr: false });
const SiVuedotjs = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiVuedotjs })), { ssr: false });
const SiNodedotjs = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiNodedotjs })), { ssr: false });
const SiHtml5 = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiHtml5 })), { ssr: false });
const SiCss3 = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiCss3 })), { ssr: false });
const SiDocker = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiDocker })), { ssr: false });
const SiGithub = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiGithub })), { ssr: false });
const SiMongodb = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiMongodb })), { ssr: false });
const SiMariadb = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiMariadb })), { ssr: false });
const SiSalesforce = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiSalesforce })), { ssr: false });
const SiTwitch = dynamic(() => import('react-icons/si').then(mod => ({ default: mod.SiTwitch })), { ssr: false });

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [manualToggle, setManualToggle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [relativeMousePosition, setRelativeMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'projects' | 'contact' | 'blog'>('home');
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef<HTMLDivElement>(null);
  
  // États pour la notification de projet featured
  const [notificationExpanded, setNotificationExpanded] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);
  
  // États pour le formulaire de contact
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    subject: '', 
    message: '' 
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  // États pour les stats GitHub
  const [githubStats, setGithubStats] = useState<{
    followers: number;
    following: number;
    public_repos: number;
  } | null>(null);
  const [loadingGithub, setLoadingGithub] = useState(false);

  // Détection du hash dans l'URL pour naviguer vers la bonne page
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'projects' || hash === 'about' || hash === 'blog' || hash === 'contact') {
      setCurrentPage(hash as 'home' | 'about' | 'projects' | 'contact' | 'blog');
    }
  }, []);

  useEffect(() => {
    if (!manualToggle) {
      const hour = new Date().getHours();
      setIsDark(hour < 6 || hour >= 18);
    }
  }, [manualToggle]);

  useEffect(() => {
    let rafId: number;
    let lastCall = 0;
    const throttleMs = 16; // ~60fps max
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      if (now - lastCall < throttleMs) {
        return;
      }
      
      lastCall = now;
      
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
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
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Charger les projets depuis Sanity (toujours pour la notification)
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

    const fetchBlogPosts = async () => {
      try {
        const data = await getBlogPosts();
        setBlogPosts(data);
      } catch (error) {
        console.error('Erreur lors du chargement des articles de blog:', error);
      }
    };

    // Charger les projets au démarrage (pour la notification sur home)
    if (currentPage === 'home' || currentPage === 'projects') {
      fetchProjects();
    }
    
    if (currentPage === 'blog') {
      fetchBlogPosts();
    }
  }, [currentPage]);

  // Gestion de l'animation de la notification - Affiche au retour sur home
  useEffect(() => {
    if (currentPage === 'home') {
      // Affiche la notification dès le retour sur home
      setNotificationVisible(true);
      setNotificationExpanded(true);
      
      // Après 5 secondes, réduit la notification
      const timer = setTimeout(() => {
        setNotificationExpanded(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      // Cache la notification sur les autres pages
      setNotificationVisible(false);
    }
  }, [currentPage]);

  // Charger les stats GitHub
  useEffect(() => {
    const fetchGithubStats = async () => {
      setLoadingGithub(true);
      try {
        const response = await fetch('/api/github-stats');
        const data = await response.json();
        if (!data.error) {
          setGithubStats(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des stats GitHub:', error);
      } finally {
        setLoadingGithub(false);
      }
    };

    fetchGithubStats();
  }, []);

  const handleToggle = () => {
    setManualToggle(true);
    setIsDark(!isDark);
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormMessage('Message envoyé avec succès ! Je te répondrai très vite 🚀');
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setFormStatus('idle');
          setFormMessage('');
        }, 5000);
      } else {
        setFormStatus('error');
        setFormMessage(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Erreur lors de l\'envoi du message');
      console.error(error);
    }
  };

  const handlePageTransition = (page: 'about' | 'home' | 'projects' | 'contact' | 'blog') => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 ${currentPage === 'home' ? 'overflow-y-auto lg:overflow-hidden' : 'overflow-y-auto'} overflow-x-hidden ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'} transition-all duration-1000 ease-in-out ${currentPage === 'home' ? 'md:cursor-none' : ''}`}>
      
      {/* Curseur personnalisé - Desktop uniquement */}
      {currentPage === 'home' && (
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
        ></div>
      )}
      
      {/* Blobs animés - Réduits sur mobile pour performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute top-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] md:blur-[120px] opacity-15 md:opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] md:blur-[120px] opacity-10 md:opacity-15 animate-blob animation-delay-2000"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-orange-300 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[120px] opacity-15 md:opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-rose-300 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[120px] opacity-10 md:opacity-15 animate-blob animation-delay-2000"></div>
          </>
        )}
      </div>

      {/* Bouton toggle thème - Optimisé pour mobile */}
      <button
        onClick={handleToggle}
        aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
        className={`fixed top-6 right-6 md:top-8 md:right-8 z-50 
          p-3 md:p-4 rounded-full backdrop-blur-xl border 
          transition-all md:hover:scale-110 active:scale-95
          touch-manipulation
          group ${
          isDark 
            ? 'bg-slate-800/50 border-slate-600/50 md:hover:bg-slate-700/60' 
            : 'bg-white/50 border-orange-200/50 md:hover:bg-white/70'
        }`}
      >
        {isDark ? (
          <Sun className={`w-5 h-5 md:w-6 md:h-6 text-yellow-300`} />
        ) : (
          <Moon className={`w-5 h-5 md:w-6 md:h-6 text-slate-700`} />
        )}
      </button>

      {/* Notification Projet Featured - Desktop uniquement (lg:) avec animation */}
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
                  // Si réduit, étendre au lieu de naviguer
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
                    {/* Badge "Nouveau projet" */}
                    <div className="flex items-center gap-2 mb-2 animate-fade-in">
                      <div className={`px-2 py-1 rounded-full text-xs font-light ${
                        isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-orange-500/20 text-orange-600'
                      }`}>
                        ✨ Nouveau projet
                      </div>
                    </div>

                    {/* Contenu étendu */}
                    <div className="flex gap-3 animate-fade-in">
                      {/* Image ou Emoji */}
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

                      {/* Texte */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-light text-sm mb-1 truncate ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {featuredProject.title}
                        </h3>
                        <p className={`text-xs line-clamp-2 ${
                          isDark ? 'text-gray-400' : 'text-slate-600'
                        }`}>
                          {featuredProject.description}
                        </p>
                      </div>
                    </div>

                    {/* Indicateur "Voir plus" */}
                    <div className={`mt-2 text-xs flex items-center gap-1 transition-all duration-300 group-hover:gap-2 animate-fade-in ${
                      isDark ? 'text-purple-300' : 'text-orange-600'
                    }`}>
                      Voir le projet
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </>
                ) : (
                  // Version réduite - Bouton icône uniquement
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
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-purple-500/20' : 'bg-orange-500/20'
                      }`}>
                        <ArrowRight className={isDark ? 'text-purple-300' : 'text-orange-600'} size={24} />
                      </div>
                    )}
                    
                    {/* Badge minimal */}
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 ${
                      isDark 
                        ? 'bg-purple-500 border-slate-800' 
                        : 'bg-orange-500 border-white'
                    } animate-pulse`} />
                  </div>
                )}
              </Link>
            );
          })()}
        </div>
      )}

      {/* Conteneur principal - Desktop sans scroll, Mobile avec scroll */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-16 pb-32 lg:pb-16">
        
        <div ref={titleRef} className="text-center mb-6 sm:mb-8 lg:mb-8 animate-fade-in-up relative">
          <h1 className="font-serif leading-[0.8] tracking-tight relative">
            <span className={`block text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              MAËL BARBE
            </span>
            <span className={`block text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light mt-2 lg:mt-3 ${
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
              <span className={`block text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light ${
                isDark ? 'text-slate-900' : 'text-white'
              }`}>
                MAËL BARBE
              </span>
              <span className={`block text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light mt-2 lg:mt-3 ${
                isDark ? 'text-orange-600' : 'text-blue-300'
              }`}>
                Full Stack Developer
              </span>
            </div>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          
          <div className="animate-fade-in-scale animation-delay-200">
            <div className={`relative group backdrop-blur-2xl p-3 rounded-[2.5rem] border-2 transition-all hover:scale-105 ${
              isDark 
                ? 'bg-slate-800/40 border-purple-500/30 shadow-2xl shadow-purple-500/20' 
                : 'bg-white/40 border-orange-200/40 shadow-2xl shadow-orange-300/30'
            }`}>
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-[2rem] overflow-hidden">
                <Image
                  src={isDark ? "/profile-dark.jpg" : "/profile-light.jpg"}
                  alt="Maël Barbe"
                  fill
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, (max-width: 1280px) 256px, 256px"
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

          {/* Navigation - Optimisée pour mobile avec zones tactiles élargies */}
          <nav className="flex flex-col items-center lg:items-start gap-3 sm:gap-4 lg:gap-3 animate-fade-in-up animation-delay-400">
            {['About', 'Blog', 'Projects', 'Contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'About') handlePageTransition('about');
                  if (item === 'Blog') handlePageTransition('blog');
                  if (item === 'Projects') handlePageTransition('projects');
                  if (item === 'Contact') handlePageTransition('contact');
                }}
                className={`group relative text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-light tracking-wide 
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
                {item.split('').map((letter, i) => (
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

            {/* Stats GitHub - Desktop et Mobile */}
            <div className="flex flex-col gap-4 mt-4 sm:mt-6 animate-fade-in-up animation-delay-1000">
              {/* Stats Card */}
              {!loadingGithub && githubStats && (
                <div className={`backdrop-blur-xl rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30 shadow-lg shadow-purple-500/10' 
                    : 'bg-white/40 border-orange-200/40 shadow-lg shadow-orange-300/20'
                }`}>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Followers */}
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-lg mb-2 ${
                        isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'
                      }`}>
                        <Users className={`w-5 h-5 ${
                          isDark ? 'text-blue-300' : 'text-blue-600'
                        }`} />
                      </div>
                      <span className={`text-2xl font-light ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {githubStats.followers}
                      </span>
                      <span className={`text-xs font-light ${
                        isDark ? 'text-gray-400' : 'text-slate-600'
                      }`}>
                        Followers
                      </span>
                    </div>

                    {/* Repos */}
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-lg mb-2 ${
                        isDark ? 'bg-purple-500/20' : 'bg-purple-500/10'
                      }`}>
                        <GitFork className={`w-5 h-5 ${
                          isDark ? 'text-purple-300' : 'text-purple-600'
                        }`} />
                      </div>
                      <span className={`text-2xl font-light ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {githubStats.public_repos}
                      </span>
                      <span className={`text-xs font-light ${
                        isDark ? 'text-gray-400' : 'text-slate-600'
                      }`}>
                        Repos
                      </span>
                    </div>

                    {/* Following */}
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-lg mb-2 ${
                        isDark ? 'bg-pink-500/20' : 'bg-pink-500/10'
                      }`}>
                        <Star className={`w-5 h-5 ${
                          isDark ? 'text-pink-300' : 'text-pink-600'
                        }`} />
                      </div>
                      <span className={`text-2xl font-light ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {githubStats.following}
                      </span>
                      <span className={`text-xs font-light ${
                        isDark ? 'text-gray-400' : 'text-slate-600'
                      }`}>
                        Following
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading state */}
              {loadingGithub && (
                <div className={`backdrop-blur-xl rounded-2xl border-2 p-4 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30' 
                    : 'bg-white/40 border-orange-200/40'
                }`}>
                  <div className="flex justify-center items-center h-24">
                    <div className={`w-6 h-6 border-2 border-t-transparent rounded-full animate-spin ${
                      isDark ? 'border-blue-400' : 'border-orange-500'
                    }`} />
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://github.com/Traxxouu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir mon profil GitHub"
                  className={`p-3 backdrop-blur-xl rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isDark 
                      ? 'bg-slate-800/40 border-purple-500/30 text-white hover:bg-slate-700/50 hover:border-purple-400/50 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30' 
                      : 'bg-white/40 border-orange-200/40 text-slate-900 hover:bg-white/60 hover:border-orange-300/60 shadow-lg shadow-orange-300/20 hover:shadow-orange-300/40'
                  }`}
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/maelbarbe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir mon profil LinkedIn"
                  className={`p-3 backdrop-blur-xl rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isDark 
                      ? 'bg-slate-800/40 border-purple-500/30 text-white hover:bg-slate-700/50 hover:border-purple-400/50 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30' 
                      : 'bg-white/40 border-orange-200/40 text-slate-900 hover:bg-white/60 hover:border-orange-300/60 shadow-lg shadow-orange-300/20 hover:shadow-orange-300/40'
                  }`}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
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
        <div className={`fixed inset-0 z-[150] overflow-auto cursor-crosshair ${
          isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
        } animate-fade-in`}>

          <div className="min-h-screen px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
            <div className="max-w-6xl mx-auto">
              {/* Navigation - Optimisée pour mobile */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-12">
                <button
                  onClick={() => handlePageTransition('home')}
                  className={`text-xl sm:text-2xl lg:text-3xl font-light 
                    transition-all md:hover:scale-105 md:hover:translate-x-2 
                    active:scale-95 touch-manipulation
                    py-2 px-4 rounded-lg
                    group ${
                    isDark ? 'text-white md:hover:text-blue-300 active:text-blue-300' : 'text-slate-900 md:hover:text-orange-600 active:text-orange-600'
                  }`}
                >
                  <span className="inline-block transition-transform md:group-hover:-translate-x-2">←</span> Retour
                </button>
                
                <button
                  onClick={handleToggle}
                  aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
                  className={`p-3 sm:p-4 rounded-full 
                    transition-all md:hover:scale-110 active:scale-95
                    touch-manipulation
                    ${
                    isDark 
                      ? 'bg-slate-800/50 text-yellow-300 md:hover:bg-slate-700/50' 
                      : 'bg-white/50 text-slate-900 md:hover:bg-orange-100/50'
                  }`}
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>

                <button
                  onClick={() => handlePageTransition('projects')}
                  className={`text-xl sm:text-2xl lg:text-3xl font-light 
                    transition-all md:hover:scale-105 md:hover:-translate-x-2 
                    active:scale-95 touch-manipulation
                    py-2 px-4 rounded-lg
                    group ${
                    isDark ? 'text-white md:hover:text-blue-300 active:text-blue-300' : 'text-slate-900 md:hover:text-orange-600 active:text-orange-600'
                  }`}
                >
                  Projets <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                </button>
              </div>
              
              <div className="mb-16 animate-fade-in-up">
                <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Salut ! Je suis <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>Maël</span>
                </h1>
                <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed flex flex-wrap items-center gap-2 ${
                  isDark ? 'text-gray-300' : 'text-slate-800'
                }`}>
                  <span>Développeur web passionné, actuellement étudiant à l&apos;</span>
                  <span className="inline-flex items-center gap-0 font-normal group/efrei relative min-w-[50px] sm:min-w-[60px]">
                    <span className="opacity-0 transition-all duration-500 ease-out group-hover/efrei:opacity-100 whitespace-nowrap absolute left-0 z-0">
                      EFREI.
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
                  <span>J&apos;adore créer des projets dynamiques et innovants, tout en garantissant des solutions modernes, optimisées, et une expérience utilisateur fluide.</span>
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
                    isDark ? 'text-gray-300' : 'text-slate-800'
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
                    <div className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                      <p>🇫🇷 Français - Natif</p>
                      <p>🇬🇧 Anglais - B1</p>
                      <p>🇩🇪 Allemand - A2</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section YourWeb */}
              <div className={`backdrop-blur-2xl p-8 sm:p-10 lg:p-12 rounded-3xl border-2 mb-12 relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30' 
                  : 'bg-gradient-to-br from-blue-50/80 to-sky-50/80 border-blue-300/40'
              } animate-fade-in-up animation-delay-600`}>
                
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-10">
                  <Image 
                    src={isDark ? "/logoyourwebWhite.svg" : "/logoyourweb.svg"}
                    alt="YourWeb Logo" 
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
                      src={isDark ? "/logoyourwebWhite.svg" : "/logoyourweb.svg"}
                      alt="YourWeb Logo" 
                      width={50} 
                      height={50} 
                      className="w-10 h-10 sm:w-12 sm:h-12"
                    />
                    Expériences Professionnelles
                  </h2>
                  
                  <div className={`space-y-6 p-6 sm:p-8 rounded-2xl mb-8 ${
                    isDark 
                      ? 'bg-slate-900/30 border border-blue-500/20' 
                      : 'bg-white/50 border border-blue-300/30'
                  }`}>
                    <div>
                      <h3 className={`text-2xl sm:text-3xl font-normal mb-2 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        Fondateur & Développeur Web • <a href="https://yourweb.fr" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">YourWeb <ExternalLink className="w-4 h-4" /></a>
                      </h3>
                      <p className={`text-sm sm:text-base mb-4 font-medium ${
                        isDark ? 'text-blue-300/80' : 'text-blue-600/80'
                      }`}>
                        📍 Novembre 2025 - Présent • SIREN: 993780485
                      </p>
                      <ul className={`space-y-4 text-base sm:text-lg ${
                        isDark ? 'text-gray-300' : 'text-slate-800'
                      }`}>
                        <li className="flex items-start gap-3">
                          <span className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>▸</span>
                          <span>Conception de <span className="font-semibold">sites vitrines et e-commerce</span> pour clients locaux (prospection B2B)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>▸</span>
                          <span>Refonte complète de sites existants avec <span className="font-semibold">focus UX/UI</span></span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>▸</span>
                          <span>Intégration <span className="font-semibold">Stripe</span>, optimisation <span className="font-semibold">SEO</span> et solutions sur mesure</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Edenred */}
              <div className={`backdrop-blur-2xl p-8 sm:p-10 lg:p-12 rounded-3xl border-2 mb-12 relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-green-950/40 to-slate-900/40 border-green-500/30' 
                  : 'bg-gradient-to-br from-green-50/80 to-emerald-50/80 border-green-300/40'
              } animate-fade-in-up animation-delay-700`}>
                
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
                    Expériences Professionnelles
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
                        Stagiaire Développeur • <a href="https://www.edenred.fr/" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">Edenred France <ExternalLink className="w-4 h-4" /></a>
                      </h3>
                      <p className={`text-sm sm:text-base mb-6 font-medium ${
                        isDark ? 'text-green-300/80' : 'text-green-600/80'
                      }`}>
                        📍 Juin - Août 2024 (2 mois) • Malakoff, France
                      </p>
                      <ul className={`space-y-4 text-base sm:text-lg ${
                        isDark ? 'text-gray-300' : 'text-slate-800'
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

              {/* Section Projets Personnels */}
              <div className={`backdrop-blur-2xl p-8 sm:p-10 lg:p-12 rounded-3xl border-2 mb-12 relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-purple-950/40 to-slate-900/40 border-purple-500/30' 
                  : 'bg-gradient-to-br from-purple-50/80 to-pink-50/80 border-purple-300/40'
              } animate-fade-in-up animation-delay-800`}>
                
                <div className="relative z-10">
                  <h2 className={`text-3xl sm:text-4xl font-light mb-8 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    💡 Projets Personnels
                  </h2>
                  
                  <div className={`space-y-6 p-6 sm:p-8 rounded-2xl ${
                    isDark 
                      ? 'bg-slate-900/30 border border-purple-500/20' 
                      : 'bg-white/50 border border-purple-300/30'
                  }`}>
                    <div>
                      <h3 className={`text-2xl sm:text-3xl font-normal mb-2 ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        <Link href="/projects/dashboard-boulangerie-pro" className="hover:underline inline-flex items-center gap-1">
                          SmartBiz AI - Dashboard Gestion Boulangerie <ArrowRight className="w-4 h-4" />
                        </Link>
                      </h3>
                      <p className={`text-sm sm:text-base mb-6 font-medium ${
                        isDark ? 'text-purple-300/80' : 'text-purple-600/80'
                      }`}>
                        Application de gestion intelligente pour boulangeries avec IA (Mistral)
                      </p>
                      <ul className={`space-y-4 text-base sm:text-lg ${
                        isDark ? 'text-gray-300' : 'text-slate-800'
                      }`}>
                        <li className="flex items-start gap-3">
                          <span className={`text-xl ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>▸</span>
                          <span><span className="font-semibold">Full-stack :</span> Next.js 14, TypeScript, Prisma, Tailwind CSS, Supabase Auth</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={`text-xl ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>▸</span>
                          <span><span className="font-semibold">Features :</span> gestion stocks, recettes, production, analytics temps réel, insights IA</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={`text-xl ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>▸</span>
                          <span><span className="font-semibold">Monétisation :</span> intégration Stripe pour abonnements SaaS (Starter/Pro/Enterprise)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={`text-xl ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>▸</span>
                          <span>Architecture scalable avec API routes, optimisations performances</span>
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
                      <p className={`${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                        EFREI, Paris • 2024 - 2027
                      </p>
                    </div>
                    <div className="pt-4">
                      <h3 className={`text-xl font-light ${
                        isDark ? 'text-blue-300' : 'text-orange-600'
                      }`}>
                        Baccalauréat Général
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                        Spécialité Maths & SES
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-700'}`}>
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
                  <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                    <p>🏀 Sport : Basket, Judo, Ju-jitsu, Natation</p>
                    <p>🎮 Jeux vidéo : Modding & création serveur GTA RP</p>
                    <p>🔐 Cybersécurité</p>
                    <p>💻 l&apos;apprentissage autodidacte</p>
                  </div>
                </div>
              </div>

              {/* Bouton Contact */}
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => handlePageTransition('contact')}
                  className={`px-8 py-4 rounded-full text-lg sm:text-xl font-light transition-all hover:scale-105 flex items-center gap-3 ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/30' 
                      : 'bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-400 hover:to-rose-400 shadow-lg shadow-orange-500/30'
                  }`}
                >
                  <Mail className="w-6 h-6" />
                  Me contacter
                </button>
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
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
                  href="https://www.linkedin.com/in/maelbarbe/" 
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
                <a 
                  href="https://www.instagram.com/maelsanst/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-full transition-all hover:scale-105 flex items-center gap-2 ${
                    isDark 
                      ? 'bg-slate-700 text-white hover:bg-slate-600' 
                      : 'bg-white text-slate-900 hover:bg-orange-50'
                  }`}
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
                <a 
                  href="https://www.twitch.tv/traxxouu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-full transition-all hover:scale-105 flex items-center gap-2 ${
                    isDark 
                      ? 'bg-slate-700 text-white hover:bg-slate-600' 
                      : 'bg-white text-slate-900 hover:bg-orange-50'
                  }`}
                >
                  <SiTwitch className="w-5 h-5" />
                  Twitch
                </a>
              </div>

              {/* Section Télécharger CV */}
              <div className={`mt-12 backdrop-blur-2xl p-8 rounded-3xl border-2 text-center ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30' 
                  : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border-blue-300/40'
              } animate-fade-in-up animation-delay-1200`}>
                <h2 className={`text-2xl sm:text-3xl font-light mb-4 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Télécharge mon CV
                </h2>
                <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                  Retrouve toutes mes compétences et expériences en un clic
                </p>
                <a 
                  href="/NotelCvBarbeMaelB2DEVEnc3.pdf" 
                  download="CV_Mael_Barbe.pdf"
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-light transition-all hover:scale-105 hover:shadow-2xl ${
                    isDark 
                      ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-2 border-blue-500/30 hover:shadow-blue-500/30' 
                      : 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 border-2 border-blue-500/30 hover:shadow-blue-300/30'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  Télécharger mon CV (PDF)
                </a>
              </div>

              {/* Section Découvre mon Blog */}
              <div className={`mt-12 backdrop-blur-2xl p-8 rounded-3xl border-2 overflow-hidden relative ${
                isDark 
                  ? 'bg-gradient-to-br from-purple-950/40 to-blue-950/40 border-purple-500/30' 
                  : 'bg-gradient-to-br from-orange-50/80 to-rose-50/80 border-orange-300/40'
              } animate-fade-in-up animation-delay-1400`}>
                {/* Icône décorative */}
                <div className={`absolute top-4 right-4 opacity-10 ${
                  isDark ? 'text-purple-300' : 'text-orange-400'
                }`}>
                  <BookOpen size={80} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <BookOpen className={`w-8 h-8 ${
                      isDark ? 'text-purple-300' : 'text-orange-600'
                    }`} />
                    <h2 className={`text-2xl sm:text-3xl font-light ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Découvre mon blog
                    </h2>
                  </div>
                  
                  <p className={`mb-6 text-center ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                    Retrouve mes articles sur le développement web, mes astuces et retours d&apos;expérience
                  </p>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={() => handlePageTransition('blog')}
                      className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-light 
                        transition-all md:hover:scale-105 md:hover:gap-4 active:scale-95
                        touch-manipulation
                        ${
                        isDark 
                          ? 'bg-purple-500/20 text-purple-300 md:hover:bg-purple-500/30 border-2 border-purple-500/30 md:hover:shadow-2xl md:hover:shadow-purple-500/30' 
                          : 'bg-orange-500/20 text-orange-600 md:hover:bg-orange-500/30 border-2 border-orange-500/30 md:hover:shadow-2xl md:hover:shadow-orange-300/30'
                      }`}
                    >
                      Voir tous les articles
                      <ArrowRight className="w-5 h-5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Projects - Avec Sanity */}
      {currentPage === 'projects' && (
        <div className={`fixed inset-0 z-[150] overflow-auto cursor-crosshair ${
          isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
        } animate-fade-in`}>

          <div className="min-h-screen px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto">
              {/* Navigation - Optimisée pour mobile */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-12">
                <button
                  onClick={() => handlePageTransition('home')}
                  className={`text-xl sm:text-2xl lg:text-3xl font-light 
                    transition-all md:hover:scale-105 md:hover:translate-x-2 
                    active:scale-95 touch-manipulation
                    py-2 px-4 rounded-lg
                    group ${
                    isDark ? 'text-white md:hover:text-blue-300 active:text-blue-300' : 'text-slate-900 md:hover:text-orange-600 active:text-orange-600'
                  }`}
                >
                  <span className="inline-block transition-transform md:group-hover:-translate-x-2">←</span> Accueil
                </button>
                
                <button
                  onClick={handleToggle}
                  aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
                  className={`p-3 sm:p-4 rounded-full 
                    transition-all md:hover:scale-110 active:scale-95
                    touch-manipulation
                    ${
                    isDark 
                      ? 'bg-slate-800/50 text-yellow-300 md:hover:bg-slate-700/50' 
                      : 'bg-white/50 text-slate-900 md:hover:bg-orange-100/50'
                  }`}
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>

                <button
                  onClick={() => handlePageTransition('about')}
                  className={`text-xl sm:text-2xl lg:text-3xl font-light 
                    transition-all md:hover:scale-105 md:hover:-translate-x-2 
                    active:scale-95 touch-manipulation
                    py-2 px-4 rounded-lg
                    group ${
                    isDark ? 'text-white md:hover:text-blue-300 active:text-blue-300' : 'text-slate-900 md:hover:text-orange-600 active:text-orange-600'
                  }`}
                >
                  About <span className="inline-block transition-transform md:group-hover:translate-x-2">→</span>
                </button>
              </div>
              
              <div className="mb-16 animate-fade-in-up">
                <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Mes <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>Projets</span>
                </h1>
                <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-slate-800'
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
                      <Link
                        href={`/projects/${project.slug.current}`}
                        key={project._id}
                        className={`backdrop-blur-2xl p-6 rounded-3xl border-2 
                          transition-all duration-500 
                          md:hover:scale-105 md:hover:-translate-y-2 
                          active:scale-95
                          group will-change-transform cursor-pointer 
                          touch-manipulation
                          ${
                          isDark 
                            ? 'bg-slate-800/40 border-purple-500/30 md:hover:border-purple-400/50 md:hover:shadow-2xl md:hover:shadow-purple-500/20' 
                            : 'bg-white/40 border-orange-200/40 md:hover:border-orange-300/60 md:hover:shadow-2xl md:hover:shadow-orange-300/20'
                        } animate-fade-in-up`}
                        style={{ animationDelay: `${200 + index * 150}ms` }}
                      >
                        {/* Image ou Emoji */}
                        <div className="w-full h-48 rounded-2xl mb-4 relative overflow-hidden transition-all duration-500 md:group-hover:scale-105">
                          {project.coverImage ? (
                            <Image
                              src={urlFor(project.coverImage).width(600).height(400).url()}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              loading="lazy"
                              className="object-cover"
                            />
                          ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center bg-gradient-to-br"
                              style={{
                                backgroundImage: project.gradientFrom && project.gradientTo
                                  ? `linear-gradient(to bottom right, 
                                      ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'}, 
                                      ${isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.3)'}
                                    )`
                                  : `linear-gradient(to bottom right, 
                                      ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'}, 
                                      ${isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.3)'}
                                    )`
                              }}
                            >
                              {project.emoji && (
                                <span className="text-6xl transition-all duration-500 md:group-hover:scale-125 md:group-hover:rotate-6">
                                  {project.emoji}
                                </span>
                              )}
                            </div>
                          )}
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
                                <span 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.open(project.liveUrl, '_blank');
                                  }}
                                  className={`px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center gap-1 ${
                                    isDark ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-orange-500/20 text-orange-600 hover:bg-orange-500/30'
                                  }`}
                                >
                                  Démo <ExternalLink className="w-3 h-3" />
                                </span>
                              )}
                              {project.githubUrl && (
                                <span 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.open(project.githubUrl, '_blank');
                                  }}
                                  className={`px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center gap-1 ${
                                    isDark ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30'
                                  }`}
                                >
                                  GitHub <Github className="w-3 h-3" />
                                </span>
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
                      </Link>
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

              {/* Section Découvre mon Blog */}
              <div className={`mt-16 backdrop-blur-2xl p-8 rounded-3xl border-2 overflow-hidden relative ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-950/40 to-purple-950/40 border-blue-500/30' 
                  : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border-blue-300/40'
              } animate-fade-in-up animation-delay-800`}>
                {/* Icône décorative */}
                <div className={`absolute top-4 right-4 opacity-10 ${
                  isDark ? 'text-blue-300' : 'text-blue-400'
                }`}>
                  <BookOpen size={80} />
                </div>

                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <BookOpen className={`w-8 h-8 ${
                      isDark ? 'text-blue-300' : 'text-blue-600'
                    }`} />
                    <h2 className={`text-2xl sm:text-3xl font-light ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Découvre le processus de création
                    </h2>
                  </div>
                  
                  <p className={`mb-6 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                    Retrouve sur mon blog les coulisses de mes projets, mes choix techniques et retours d&apos;expérience
                  </p>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={() => handlePageTransition('blog')}
                      className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-light 
                        transition-all md:hover:scale-105 md:hover:gap-4 active:scale-95
                        touch-manipulation
                        ${
                        isDark 
                          ? 'bg-blue-500/20 text-blue-300 md:hover:bg-blue-500/30 border-2 border-blue-500/30 md:hover:shadow-2xl md:hover:shadow-blue-500/30' 
                          : 'bg-blue-500/20 text-blue-600 md:hover:bg-blue-500/30 border-2 border-blue-500/30 md:hover:shadow-2xl md:hover:shadow-blue-300/30'
                      }`}
                    >
                      Lire mes articles
                      <ArrowRight className="w-5 h-5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

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
                <button 
                  onClick={() => handlePageTransition('contact')}
                  className={`inline-block px-8 py-4 rounded-full text-lg 
                    transition-all md:hover:scale-105 active:scale-95
                    touch-manipulation
                    ${
                    isDark 
                      ? 'bg-blue-500/20 text-blue-300 md:hover:bg-blue-500/30 border-2 border-blue-500/30' 
                      : 'bg-orange-500/20 text-orange-600 md:hover:bg-orange-500/30 border-2 border-orange-500/30'
                  }`}
                >
                  Me contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE CONTACT */}
      {currentPage === 'contact' && (
        <div className={`fixed inset-0 z-[150] overflow-auto cursor-crosshair ${
          isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
        } animate-fade-in`}>

          <div className="min-h-screen px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
            <div className="max-w-6xl mx-auto">
              {/* Header - Optimisé pour mobile */}
              <div className="flex justify-between items-center mb-12">
                <button
                  onClick={() => handlePageTransition('home')}
                  className={`text-2xl sm:text-3xl font-light 
                    transition-all md:hover:scale-105 md:hover:translate-x-2 
                    active:scale-95 touch-manipulation
                    py-2 px-4 rounded-lg
                    group ${
                    isDark ? 'text-white md:hover:text-blue-300 active:text-blue-300' : 'text-slate-900 md:hover:text-orange-600 active:text-orange-600'
                  }`}
                >
                  <span className="inline-block transition-transform md:group-hover:-translate-x-2">←</span> Accueil
                </button>
                
                <button
                  onClick={handleToggle}
                  aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
                  className={`p-3 sm:p-4 rounded-full 
                    transition-all md:hover:scale-110 active:scale-95
                    touch-manipulation
                    ${
                    isDark 
                      ? 'bg-slate-800/50 text-yellow-300 md:hover:bg-slate-700/50' 
                      : 'bg-white/50 text-slate-900 md:hover:bg-orange-100/50'
                  }`}
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </div>

              {/* Titre */}
              <div className="mb-16 text-center animate-fade-in-up">
                <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Restons en <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>Contact</span>
                </h1>
                <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-slate-800'
                }`}>
                  Une question ? Un projet ? N&apos;hésite pas à m&apos;écrire !
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Formulaire de contact */}
                <div className={`backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border-2 ${
                  isDark 
                    ? 'bg-slate-800/40 border-purple-500/30' 
                    : 'bg-white/40 border-orange-200/40'
                } animate-fade-in-up animation-delay-200`}>
                  <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Envoie-moi un message
                  </h2>
                  
                  <form onSubmit={handleSubmitContact} className="space-y-6">
                    {/* Prénom et Nom sur la même ligne */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Prénom */}
                      <div>
                        <label htmlFor="firstName" className={`block text-sm font-light mb-2 ${
                          isDark ? 'text-gray-300' : 'text-slate-800'
                        }`}>
                          Prénom
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border-2 backdrop-blur-xl transition-all focus:scale-[1.02] focus:outline-none ${
                            isDark 
                              ? 'bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-400/50' 
                              : 'bg-white/50 border-orange-200/40 text-slate-900 placeholder-slate-400 focus:border-orange-300/60'
                          }`}
                          placeholder="John"
                          disabled={formStatus === 'sending'}
                        />
                      </div>

                      {/* Nom */}
                      <div>
                        <label htmlFor="lastName" className={`block text-sm font-light mb-2 ${
                          isDark ? 'text-gray-300' : 'text-slate-800'
                        }`}>
                          Nom
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border-2 backdrop-blur-xl transition-all focus:scale-[1.02] focus:outline-none ${
                            isDark 
                              ? 'bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-400/50' 
                              : 'bg-white/50 border-orange-200/40 text-slate-900 placeholder-slate-400 focus:border-orange-300/60'
                          }`}
                          placeholder="D."
                          disabled={formStatus === 'sending'}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className={`block text-sm font-light mb-2 ${
                        isDark ? 'text-gray-300' : 'text-slate-800'
                      }`}>
                        Ton email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border-2 backdrop-blur-xl transition-all focus:scale-[1.02] focus:outline-none ${
                          isDark 
                            ? 'bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-400/50' 
                            : 'bg-white/50 border-orange-200/40 text-slate-900 placeholder-slate-400 focus:border-orange-300/60'
                        }`}
                        placeholder="john@example.com"
                        disabled={formStatus === 'sending'}
                      />
                    </div>

                    {/* Objet */}
                    <div>
                      <label htmlFor="subject" className={`block text-sm font-light mb-2 ${
                        isDark ? 'text-gray-300' : 'text-slate-800'
                      }`}>
                        Objet
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border-2 backdrop-blur-xl transition-all focus:scale-[1.02] focus:outline-none ${
                          isDark 
                            ? 'bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-400/50' 
                            : 'bg-white/50 border-orange-200/40 text-slate-900 placeholder-slate-400 focus:border-orange-300/60'
                        }`}
                        placeholder="Sujet de ton message"
                        disabled={formStatus === 'sending'}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className={`block text-sm font-light mb-2 ${
                        isDark ? 'text-gray-300' : 'text-slate-800'
                      }`}>
                        Ton message
                      </label>
                      <textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl border-2 backdrop-blur-xl transition-all focus:scale-[1.02] focus:outline-none resize-none ${
                          isDark 
                            ? 'bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-400/50' 
                            : 'bg-white/50 border-orange-200/40 text-slate-900 placeholder-slate-400 focus:border-orange-300/60'
                        }`}
                        placeholder="Dis-moi tout !"
                        disabled={formStatus === 'sending'}
                      />
                    </div>

                    {/* Message de statut */}
                    {formMessage && (
                      <div className={`p-4 rounded-xl border-2 animate-fade-in ${
                        formStatus === 'success'
                          ? isDark 
                            ? 'bg-green-900/30 border-green-500/50 text-green-300' 
                            : 'bg-green-100/50 border-green-400/50 text-green-700'
                          : isDark
                            ? 'bg-red-900/30 border-red-500/50 text-red-300'
                            : 'bg-red-100/50 border-red-400/50 text-red-700'
                      }`}>
                        {formMessage}
                      </div>
                    )}

                    {/* Bouton Submit - Optimisé pour mobile */}
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className={`w-full px-8 py-4 rounded-xl text-lg font-light 
                        transition-all duration-300 
                        flex items-center justify-center gap-2
                        active:scale-95 touch-manipulation
                        ${
                        formStatus === 'sending'
                          ? isDark
                            ? 'bg-slate-700/50 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-300/50 text-gray-500 cursor-not-allowed'
                          : isDark 
                            ? 'bg-blue-500/20 text-blue-300 md:hover:bg-blue-500/30 border-2 border-blue-500/30 md:hover:scale-105 md:hover:shadow-xl md:hover:shadow-blue-500/20' 
                            : 'bg-orange-500/20 text-orange-600 md:hover:bg-orange-500/30 border-2 border-orange-500/30 md:hover:scale-105 md:hover:shadow-xl md:hover:shadow-orange-300/20'
                      }`}
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Informations de contact et réseaux sociaux */}
                <div className="space-y-8">
                  {/* Email direct */}
                  <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${
                    isDark 
                      ? 'bg-slate-800/40 border-purple-500/30' 
                      : 'bg-white/40 border-orange-200/40'
                  } animate-fade-in-up animation-delay-400`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${
                        isDark ? 'bg-blue-500/20' : 'bg-orange-500/20'
                      }`}>
                        <Mail className={isDark ? 'text-blue-300' : 'text-orange-600'} size={24} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-light ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Email direct
                        </h3>
                        <a 
                          href="mailto:pro.mael.dev@gmail.com"
                          className={`text-sm transition-colors ${
                            isDark ? 'text-blue-300 hover:text-blue-200' : 'text-orange-600 hover:text-orange-500'
                          }`}
                        >
                          pro.mael.dev@gmail.com
                        </a>
                      </div>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-700'}`}>
                      Tu peux aussi m&apos;envoyer un email directement
                    </p>
                  </div>

                  {/* Réseaux sociaux */}
                  <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${
                    isDark 
                      ? 'bg-slate-800/40 border-purple-500/30' 
                      : 'bg-white/40 border-orange-200/40'
                  } animate-fade-in-up animation-delay-600`}>
                    <h3 className={`text-2xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Retrouve-moi sur
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/in/maelbarbe/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 
                          transition-all duration-300 
                          md:hover:scale-105 md:hover:-translate-y-1 
                          active:scale-95
                          touch-manipulation
                          group ${
                          isDark 
                            ? 'bg-slate-900/50 border-blue-500/30 md:hover:border-blue-400/50 md:hover:shadow-xl md:hover:shadow-blue-500/20' 
                            : 'bg-white/50 border-blue-400/40 md:hover:border-blue-500/60 md:hover:shadow-xl md:hover:shadow-blue-300/20'
                        }`}
                      >
                        <Linkedin className={`transition-colors ${
                          isDark ? 'text-blue-300 md:group-hover:text-blue-200' : 'text-blue-600 md:group-hover:text-blue-500'
                        }`} size={32} />
                        <span className={`text-sm font-light ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                          LinkedIn
                        </span>
                      </a>

                      {/* GitHub */}
                      <a
                        href="https://github.com/Traxxouu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 
                          transition-all duration-300 
                          md:hover:scale-105 md:hover:-translate-y-1 
                          active:scale-95
                          touch-manipulation
                          group ${
                          isDark 
                            ? 'bg-slate-900/50 border-purple-500/30 md:hover:border-purple-400/50 md:hover:shadow-xl md:hover:shadow-purple-500/20' 
                            : 'bg-white/50 border-purple-400/40 md:hover:border-purple-500/60 md:hover:shadow-xl md:hover:shadow-purple-300/20'
                        }`}
                      >
                        <Github className={`transition-colors ${
                          isDark ? 'text-purple-300 md:group-hover:text-purple-200' : 'text-purple-600 md:group-hover:text-purple-500'
                        }`} size={32} />
                        <span className={`text-sm font-light ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                          GitHub
                        </span>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/maelsanst/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 
                          transition-all duration-300 
                          md:hover:scale-105 md:hover:-translate-y-1 
                          active:scale-95
                          touch-manipulation
                          group ${
                          isDark 
                            ? 'bg-slate-900/50 border-pink-500/30 md:hover:border-pink-400/50 md:hover:shadow-xl md:hover:shadow-pink-500/20' 
                            : 'bg-white/50 border-pink-400/40 md:hover:border-pink-500/60 md:hover:shadow-xl md:hover:shadow-pink-300/20'
                        }`}
                      >
                        <Instagram className={`transition-colors ${
                          isDark ? 'text-pink-300 md:group-hover:text-pink-200' : 'text-pink-600 md:group-hover:text-pink-500'
                        }`} size={32} />
                        <span className={`text-sm font-light ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                          Instagram
                        </span>
                      </a>

                      {/* Twitch */}
                      <a
                        href="https://www.twitch.tv/traxxouu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 
                          transition-all duration-300 
                          md:hover:scale-105 md:hover:-translate-y-1 
                          active:scale-95
                          touch-manipulation
                          group ${
                          isDark 
                            ? 'bg-slate-900/50 border-violet-500/30 md:hover:border-violet-400/50 md:hover:shadow-xl md:hover:shadow-violet-500/20' 
                            : 'bg-white/50 border-violet-400/40 md:hover:border-violet-500/60 md:hover:shadow-xl md:hover:shadow-violet-300/20'
                        }`}
                      >
                        <SiTwitch className={`transition-colors ${
                          isDark ? 'text-violet-300 md:group-hover:text-violet-200' : 'text-violet-600 md:group-hover:text-violet-500'
                        }`} size={32} />
                        <span className={`text-sm font-light ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                          Twitch
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Citation motivante */}
                  <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 text-center ${
                    isDark 
                      ? 'bg-slate-800/40 border-purple-500/30' 
                      : 'bg-white/40 border-orange-200/40'
                  } animate-fade-in-up animation-delay-800`}>
                    <p className={`text-xl sm:text-2xl font-light italic leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-slate-800'
                    }`}>
                      &ldquo;Les meilleurs projets naissent souvent d&apos;une simple conversation&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE BLOG */}
      {currentPage === 'blog' && (
        <div className={`fixed inset-0 z-[150] overflow-auto cursor-crosshair ${
          isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
        } animate-fade-in`}>

          <div className="min-h-screen px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto">
              {/* Header - Optimisé pour mobile */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-12">
                <button
                  onClick={() => handlePageTransition('home')}
                  className={`text-xl sm:text-2xl lg:text-3xl font-light 
                    transition-all md:hover:scale-105 md:hover:translate-x-2 
                    active:scale-95 touch-manipulation
                    py-2 px-4 rounded-lg
                    group ${
                    isDark ? 'text-white md:hover:text-blue-300 active:text-blue-300' : 'text-slate-900 md:hover:text-orange-600 active:text-orange-600'
                  }`}
                >
                  <span className="inline-block transition-transform group-hover:-translate-x-2">←</span> Accueil
                </button>
                
                <button
                  onClick={handleToggle}
                  aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
                  className={`p-3 sm:p-4 rounded-full transition-all hover:scale-110 ${
                    isDark 
                      ? 'bg-slate-800/50 text-yellow-300 hover:bg-slate-700/50' 
                      : 'bg-white/50 text-slate-900 hover:bg-orange-100/50'
                  }`}
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>

                <button
                  onClick={() => handlePageTransition('projects')}
                  className={`text-xl sm:text-2xl lg:text-3xl font-light transition-all hover:scale-105 hover:-translate-x-2 group ${
                    isDark ? 'text-white hover:text-blue-300' : 'text-slate-900 hover:text-orange-600'
                  }`}
                >
                  Projets <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                </button>
              </div>

              {/* Titre */}
              <div className="mb-16 text-center animate-fade-in-up">
                <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>Blog</span> & Réflexions
                </h1>
                <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-slate-800'
                }`}>
                  Mes découvertes, apprentissages et expériences dans le monde du développement
                </p>
              </div>

              {/* Contenu */}
              {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className={`text-xl sm:text-2xl font-light ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Chargement des articles...
                  </div>
                </div>
              ) : blogPosts.length === 0 ? (
                <div className={`text-center py-20 backdrop-blur-2xl p-12 rounded-3xl border-2 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30' 
                    : 'bg-gradient-to-br from-orange-100/60 to-white/60 border-orange-300/40'
                } animate-fade-in-up`}>
                  <BookOpen className={`w-24 h-24 mx-auto mb-6 ${
                    isDark ? 'text-blue-300' : 'text-orange-600'
                  }`} />
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light mb-4 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Bientôt disponible
                  </h2>
                  <p className={`text-xl sm:text-2xl font-light ${
                    isDark ? 'text-gray-300' : 'text-slate-800'
                  }`}>
                    Les premiers articles sont en cours de rédaction...
                  </p>
                </div>
              ) : (
                <>
                  {/* Article mis en avant */}
                  {blogPosts.find(post => post.featured) && (
                    <div className="mb-16 animate-fade-in-up">
                      {(() => {
                        const featuredPost = blogPosts.find(post => post.featured)!;
                        return (
                          <Link 
                            href={`/blog/${featuredPost.slug.current}`}
                            className={`block backdrop-blur-2xl p-8 lg:p-12 rounded-3xl border-2 
                              transition-all duration-500 md:hover:scale-[1.02] active:scale-[0.98]
                              touch-manipulation
                              group ${
                              isDark 
                                ? 'bg-gradient-to-br from-blue-950/60 to-purple-950/60 border-blue-500/40 md:hover:border-blue-400/60 shadow-2xl shadow-blue-500/20' 
                                : 'bg-gradient-to-br from-orange-100/80 to-rose-100/80 border-orange-300/50 md:hover:border-orange-400/70 shadow-2xl shadow-orange-300/30'
                            }`}
                          >
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
                                {featuredPost.mainImage && (
                                  <Image
                                    src={urlFor(featuredPost.mainImage).width(800).height(600).url()}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                  />
                                )}
                                <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-light backdrop-blur-xl ${
                                  isDark ? 'bg-blue-500/30 text-blue-200' : 'bg-orange-500/30 text-orange-800'
                                }`}>
                                  ⭐ Article mis en avant
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex flex-wrap gap-3 mb-4">
                                  {featuredPost.categories?.slice(0, 2).map((category) => (
                                    <span 
                                      key={category._id}
                                      className={`px-3 py-1 rounded-full text-sm font-light ${
                                        isDark 
                                          ? 'bg-blue-500/20 text-blue-300' 
                                          : 'bg-orange-500/20 text-orange-700'
                                      }`}
                                    >
                                      {category.title}
                                    </span>
                                  ))}
                                </div>
                                
                                <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light mb-4 ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                }`}>
                                  {featuredPost.title}
                                </h2>
                                
                                <p className={`text-lg sm:text-xl font-light mb-6 leading-relaxed ${
                                  isDark ? 'text-gray-300' : 'text-slate-800'
                                }`}>
                                  {featuredPost.excerpt}
                                </p>
                                
                                <div className={`flex flex-wrap items-center gap-4 mb-6 text-sm font-light ${
                                  isDark ? 'text-gray-400' : 'text-slate-600'
                                }`}>
                                  <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    {new Date(featuredPost.publishedAt).toLocaleDateString('fr-FR', {
                                      day: 'numeric',
                                      month: 'long',
                                      year: 'numeric'
                                    })}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    {featuredPost.readTime} min de lecture
                                  </div>
                                </div>
                                
                                <div className={`inline-flex items-center gap-2 text-lg font-light transition-all duration-300 group-hover:gap-4 ${
                                  isDark ? 'text-blue-300' : 'text-orange-600'
                                }`}>
                                  Lire l&apos;article
                                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })()}
                    </div>
                  )}

                  {/* Grille des autres articles */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {blogPosts.filter(post => !post.featured).map((post, index) => (
                      <Link
                        key={post._id}
                        href={`/blog/${post.slug.current}`}
                        className={`backdrop-blur-2xl p-6 rounded-2xl border-2 
                          transition-all duration-500 
                          md:hover:scale-105 md:hover:-translate-y-2 
                          active:scale-95
                          touch-manipulation
                          group animate-fade-in-up ${
                          isDark 
                            ? 'bg-gradient-to-br from-slate-900/60 to-slate-800/60 border-slate-700/50 md:hover:border-blue-500/50 shadow-xl md:hover:shadow-2xl md:hover:shadow-blue-500/20' 
                            : 'bg-gradient-to-br from-white/70 to-orange-50/70 border-orange-200/40 md:hover:border-orange-400/60 shadow-xl md:hover:shadow-2xl md:hover:shadow-orange-300/30'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Image */}
                        <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                          {post.mainImage && (
                            <Image
                              src={urlFor(post.mainImage).width(400).height(300).url()}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          )}
                        </div>

                        {/* Catégories */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories?.slice(0, 2).map((category) => (
                            <span 
                              key={category._id}
                              className={`px-2 py-1 rounded-full text-xs font-light ${
                                isDark 
                                  ? 'bg-blue-500/20 text-blue-300' 
                                  : 'bg-orange-500/20 text-orange-700'
                              }`}
                            >
                              {category.title}
                            </span>
                          ))}
                        </div>

                        {/* Titre */}
                        <h3 className={`text-xl sm:text-2xl font-light mb-3 line-clamp-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {post.title}
                        </h3>

                        {/* Extrait */}
                        <p className={`text-sm sm:text-base font-light mb-4 line-clamp-3 leading-relaxed ${
                          isDark ? 'text-gray-300' : 'text-slate-800'
                        }`}>
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className={`flex items-center justify-between text-xs font-light ${
                          isDark ? 'text-gray-400' : 'text-slate-600'
                        }`}>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            {post.readTime} min
                          </div>
                        </div>

                        {/* Tags (si présents) */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-opacity-20" style={{
                            borderColor: isDark ? '#60a5fa' : '#f97316'
                          }}>
                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-light ${
                                  isDark 
                                    ? 'bg-slate-800/50 text-gray-400' 
                                    : 'bg-white/50 text-slate-600'
                                }`}
                              >
                                <Tag size={12} />
                                {tag}
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
      )}
    </div>
  );
}