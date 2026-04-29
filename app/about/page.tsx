'use client';

import type { ReactElement } from 'react';
import { Github, Linkedin, Instagram, ExternalLink, Mail, Download, Cloud, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';
import { ThemeToggle } from '../components/ThemeToggle';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { SubPageNav } from '../components/SubPageNav';
import { CertificationsSection } from '../components/Certifications';

// Simple SVG icons au lieu de react-icons (qui charge un bundle entier)
const icons: Record<string, () => ReactElement> = {
  Java: () => <span className="text-sm font-bold">☕</span>,
  Python: () => <span className="text-sm">🐍</span>,
  JavaScript: () => <span className="text-xs font-bold text-yellow-500">JS</span>,
  TypeScript: () => <span className="text-xs font-bold text-blue-500">TS</span>,
  PHP: () => <span className="text-xs font-bold text-indigo-500">PHP</span>,
  SQL: () => <span className="text-xs font-bold text-orange-500">SQL</span>,
  'React.js': () => <span className="text-xs font-bold text-cyan-500">⚛️</span>,
  'Vue.js': () => <span className="text-xs font-bold text-green-500">V</span>,
  'Node.js': () => <span className="text-xs font-bold text-green-600">N</span>,
  HTML: () => <span className="text-xs font-bold text-orange-600">H5</span>,
  CSS: () => <span className="text-xs font-bold text-blue-600">C3</span>,
  Docker: () => <span className="text-sm">🐳</span>,
  GitHub: () => <span className="text-sm">🐙</span>,
  MongoDB: () => <span className="text-xs font-bold text-green-500">M</span>,
  MariaDB: () => <span className="text-xs font-bold text-blue-800">Ma</span>,
  MySQL: () => <span className="text-xs font-bold text-blue-600">My</span>,
  Azure: () => <span className="text-sm">☁️</span>,
  Salesforce: () => <span className="text-xs font-bold text-blue-400">SF</span>,
};

export default function AboutPage() {
  const { isDark } = useTheme();

  return (
    <div className={`fixed inset-0 z-0 overflow-auto ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'} transition-colors duration-500`}>
      <BackgroundBlobs />
      <ThemeToggle />

      <div className="relative min-h-screen px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <SubPageNav backLabel="Retour" backPath="/" forwardLabel="Projets" forwardPath="/projects" />
          
          <div className="mb-16 animate-fade-in-up">
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Salut ! Je suis <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>Maël</span>
            </h1>
            <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed flex flex-wrap items-center gap-2 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
              <span>Développeur web passionné, actuellement étudiant à l&apos;</span>
              <span className="inline-flex items-center gap-0 font-normal group/efrei relative min-w-[50px] sm:min-w-[60px]">
                <span className="opacity-0 transition-all duration-500 ease-out group-hover/efrei:opacity-100 whitespace-nowrap absolute left-0 z-0">EFREI.</span>
                <Image src="/efreilogo.svg" alt="EFREI Logo" width={50} height={50}
                  className="inline-block transition-all duration-500 ease-out group-hover/efrei:translate-x-[80px] sm:group-hover/efrei:translate-x-[100px] relative z-10"
                  style={{ display: 'inline-block', verticalAlign: 'middle' }}
                />
              </span>
              <span>J&apos;adore créer des projets dynamiques et innovants, tout en garantissant des solutions modernes, optimisées, et une expérience utilisateur fluide.</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Hard Skills */}
            <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${
              isDark ? 'bg-slate-800/40 border-purple-500/30' : 'bg-white/40 border-orange-200/40'
            } animate-fade-in-up animation-delay-200`}>
              <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Hard Skills</h2>
              <div className="space-y-6">
                {[
                  { title: 'Langages', skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'SQL'] },
                  { title: 'Web & Frameworks', skills: ['React.js', 'Vue.js', 'Node.js', 'HTML', 'CSS'] },
                  { title: 'Outils & BDD', skills: ['Docker', 'GitHub', 'MongoDB', 'MariaDB', 'MySQL', 'Azure', 'Salesforce'] },
                ].map(group => (
                  <div key={group.title}>
                    <h3 className={`text-xl font-light mb-3 ${isDark ? 'text-blue-300' : 'text-orange-600'}`}>{group.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map(skill => {
                        const IconComponent = icons[skill];
                        return (
                          <span key={skill} className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                            isDark ? 'bg-slate-700/50 text-gray-200' : 'bg-white/60 text-slate-800'
                          }`}>
                            {IconComponent && <IconComponent />}
                            <span>{skill}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${
              isDark ? 'bg-slate-800/40 border-purple-500/30' : 'bg-white/40 border-orange-200/40'
            } animate-fade-in-up animation-delay-400`}>
              <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Soft Skills</h2>
              <div className={`space-y-4 text-lg ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                {['Autonomie & polyvalence', "Esprit d'équipe (PSE1 obtenu)", 'Excellente communication verbale', 'Souci du détail', 'Mobilité (Permis B)'].map(s => (
                  <div key={s} className="flex items-start gap-3">
                    <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>•</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className={`text-xl font-light mb-3 ${isDark ? 'text-blue-300' : 'text-orange-600'}`}>Langues</h3>
                <div className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                  <p>🇫🇷 Français - Natif</p>
                  <p>🇬🇧 Anglais - B1</p>
                  <p>🇩🇪 Allemand - A2</p>
                </div>
              </div>
            </div>
          </div>

          {/* YourWeb */}
          <div className={`backdrop-blur-2xl p-8 sm:p-10 lg:p-12 rounded-3xl border-2 mb-12 relative overflow-hidden ${
            isDark ? 'bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30' : 'bg-gradient-to-br from-blue-50/80 to-sky-50/80 border-blue-300/40'
          } animate-fade-in-up animation-delay-600`}>
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-10">
              <Image src={isDark ? "/logoyourwebWhite.svg" : "/logoyourweb.svg"} alt="YourWeb Logo" width={120} height={120}
                className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32" />
            </div>
            <div className="relative z-10">
              <h2 className={`text-3xl sm:text-4xl font-light mb-8 flex items-center gap-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Image src={isDark ? "/logoyourwebWhite.svg" : "/logoyourweb.svg"} alt="YourWeb Logo" width={50} height={50} className="w-10 h-10 sm:w-12 sm:h-12" />
                Expériences Professionnelles
              </h2>
              <div className={`space-y-6 p-6 sm:p-8 rounded-2xl mb-8 ${isDark ? 'bg-slate-900/30 border border-blue-500/20' : 'bg-white/50 border border-blue-300/30'}`}>
                <div>
                  <h3 className={`text-2xl sm:text-3xl font-normal mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    Fondateur & Développeur Web • <a href="https://yourweb.fr" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">YourWeb <ExternalLink className="w-4 h-4" /></a>
                  </h3>
                  <p className={`text-sm sm:text-base mb-4 font-medium ${isDark ? 'text-blue-300/80' : 'text-blue-600/80'}`}>
                    📍 Novembre 2025 - Présent • SIREN: 993780485
                  </p>
                  <ul className={`space-y-4 text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                    <li className="flex items-start gap-3"><span className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>▸</span><span>Conception de <span className="font-semibold">sites vitrines et e-commerce</span> pour clients locaux (prospection B2B)</span></li>
                    <li className="flex items-start gap-3"><span className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>▸</span><span>Refonte complète de sites existants avec <span className="font-semibold">focus UX/UI</span></span></li>
                    <li className="flex items-start gap-3"><span className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>▸</span><span>Intégration <span className="font-semibold">Stripe</span>, optimisation <span className="font-semibold">SEO</span> et solutions sur mesure</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Edenred */}
          <div className={`backdrop-blur-2xl p-8 sm:p-10 lg:p-12 rounded-3xl border-2 mb-12 relative overflow-hidden ${
            isDark ? 'bg-gradient-to-br from-green-950/40 to-slate-900/40 border-green-500/30' : 'bg-gradient-to-br from-green-50/80 to-emerald-50/80 border-green-300/40'
          } animate-fade-in-up animation-delay-600`}>
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-10">
              <Image src="/edenredlogo.svg" alt="Edenred Logo" width={120} height={120} className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32" />
            </div>
            <div className="relative z-10">
              <h2 className={`text-3xl sm:text-4xl font-light mb-8 flex items-center gap-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Image src="/edenredlogo.svg" alt="Edenred Logo" width={50} height={50} className="w-10 h-10 sm:w-12 sm:h-12" />
                Expériences Professionnelles
              </h2>
              <div className={`space-y-6 p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-slate-900/30 border border-green-500/20' : 'bg-white/50 border border-green-300/30'}`}>
                <div>
                  <h3 className={`text-2xl sm:text-3xl font-normal mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    Stagiaire Développeur • <a href="https://www.edenred.fr/" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">Edenred France <ExternalLink className="w-4 h-4" /></a>
                  </h3>
                  <p className={`text-sm sm:text-base mb-6 font-medium ${isDark ? 'text-green-300/80' : 'text-green-600/80'}`}>
                    📍 Juin - Août 2025 (2 mois)
                  </p>
                  <ul className={`space-y-4 text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                    <li className="flex items-start gap-3"><span className={`text-xl ${isDark ? 'text-green-400' : 'text-green-600'}`}>▸</span><span>Intégré à l&apos;équipe Salesforce <span className="font-semibold">(Redforce)</span> en environnement agile <span className="font-semibold">(SCRUM)</span></span></li>
                    <li className="flex items-start gap-3"><span className={`text-xl ${isDark ? 'text-green-400' : 'text-green-600'}`}>▸</span><span>Développement en <span className="font-semibold">Apex, SOQL, LWC, Node.js/TypeScript</span></span></li>
                    <li className="flex items-start gap-3"><span className={`text-xl ${isDark ? 'text-green-400' : 'text-green-600'}`}>▸</span><span>Réalisation d&apos;un système de <span className="font-semibold">contrôle qualité des données</span> et <span className="font-semibold">audit automatisé</span> (Azure DevOps & Einstein AI)</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Projets Personnels */}
          <div className={`backdrop-blur-2xl p-8 sm:p-10 lg:p-12 rounded-3xl border-2 mb-12 relative overflow-hidden ${
            isDark ? 'bg-gradient-to-br from-purple-950/40 to-slate-900/40 border-purple-500/30' : 'bg-gradient-to-br from-purple-50/80 to-pink-50/80 border-purple-300/40'
          } animate-fade-in-up animation-delay-800`}>
            <div className="relative z-10">
              <h2 className={`text-3xl sm:text-4xl font-light mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>💡 Projets Personnels</h2>
              <div className={`space-y-6 p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-slate-900/30 border border-purple-500/20' : 'bg-white/50 border border-purple-300/30'}`}>
                <div>
                  <h3 className={`text-2xl sm:text-3xl font-normal mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    <Link href="/projects/dashboard-boulangerie-pro" className="hover:underline inline-flex items-center gap-1">
                      SmartBiz AI - Dashboard Gestion Boulangerie <ArrowRight className="w-4 h-4" />
                    </Link>
                  </h3>
                  <p className={`text-sm sm:text-base mb-6 font-medium ${isDark ? 'text-purple-300/80' : 'text-purple-600/80'}`}>Application de gestion intelligente pour boulangeries avec IA (Mistral)</p>
                  <ul className={`space-y-4 text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                    <li className="flex items-start gap-3"><span className={`text-xl ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>▸</span><span><span className="font-semibold">Full-stack :</span> Next.js 14, TypeScript, Prisma, Tailwind CSS, Supabase Auth</span></li>
                    <li className="flex items-start gap-3"><span className={`text-xl ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>▸</span><span><span className="font-semibold">Features :</span> gestion stocks, recettes, production, analytics temps réel, insights IA</span></li>
                    <li className="flex items-start gap-3"><span className={`text-xl ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>▸</span><span><span className="font-semibold">Monétisation :</span> intégration Stripe pour abonnements SaaS (Starter/Pro/Enterprise)</span></li>
                    <li className="flex items-start gap-3"><span className={`text-xl ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>▸</span><span>Architecture scalable avec API routes, optimisations performances</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Badges */}
          <CertificationsSection />

          {/* Formation + Centres d'intérêt */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${isDark ? 'bg-slate-800/40 border-purple-500/30' : 'bg-white/40 border-orange-200/40'} animate-fade-in-up animation-delay-1000`}>
              <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Formation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className={`text-xl font-light ${isDark ? 'text-blue-300' : 'text-orange-600'}`}>Bachelor Développeur Web & Applications</h3>
                  <p className={isDark ? 'text-gray-300' : 'text-slate-800'}>EFREI, Paris • 2024 - 2027</p>
                </div>
                <div className="pt-4">
                  <h3 className={`text-xl font-light ${isDark ? 'text-blue-300' : 'text-orange-600'}`}>Baccalauréat Général</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>Spécialité Maths & SES</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-700'}`}>CNED : NSI (investissement personnel)</p>
                </div>
              </div>
            </div>
            <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${isDark ? 'bg-slate-800/40 border-purple-500/30' : 'bg-white/40 border-orange-200/40'} animate-fade-in-up animation-delay-1000`}>
              <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Centres d&apos;intérêt</h2>
              <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                <p>🏀 Sport : Basket, Judo, Ju-jitsu, Natation</p>
                <p>🎮 Jeux vidéo : Modding & création serveur GTA RP</p>
                <p>🔐 Cybersécurité</p>
                <p>💻 L&apos;apprentissage autodidacte</p>
              </div>
            </div>
          </div>

          {/* Contact + Réseaux + CV + Blog */}
          <div className="mt-12 flex justify-center">
            <Link href="/contact" className={`px-8 py-4 rounded-full text-lg sm:text-xl font-light transition-all hover:scale-105 flex items-center gap-3 ${
              isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/30' : 'bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-400 hover:to-rose-400 shadow-lg shadow-orange-500/30'
            }`}>
              <Mail className="w-6 h-6" />
              Me contacter
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { href: 'https://github.com/Traxxouu', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/maelbarbe/', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
              { href: 'https://www.instagram.com/maelsanst/', icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
              { href: 'https://yourweb.fr', icon: <ExternalLink className="w-5 h-5" />, label: 'Site Web' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className={`px-6 py-3 rounded-full transition-all hover:scale-105 flex items-center gap-2 ${
                  isDark ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-white text-slate-900 hover:bg-orange-50'
                }`}>
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>

          <div className={`mt-12 backdrop-blur-2xl p-8 rounded-3xl border-2 text-center ${
            isDark ? 'bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30' : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border-blue-300/40'
          } animate-fade-in-up animation-delay-1200`}>
            <h2 className={`text-2xl sm:text-3xl font-light mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Télécharge mon CV</h2>
            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>Retrouve toutes mes compétences et expériences en un clic</p>
            <a href="/NotelCvBarbeMaelB2DEVEnc3.pdf" download="CV_Mael_Barbe.pdf"
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-light transition-all hover:scale-105 hover:shadow-2xl ${
                isDark ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-2 border-blue-500/30' : 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 border-2 border-blue-500/30'
              }`}>
              <Download className="w-5 h-5" />
              Télécharger mon CV (PDF)
            </a>
          </div>

          <div className={`mt-12 backdrop-blur-2xl p-8 rounded-3xl border-2 overflow-hidden relative ${
            isDark ? 'bg-gradient-to-br from-purple-950/40 to-blue-950/40 border-purple-500/30' : 'bg-gradient-to-br from-orange-50/80 to-rose-50/80 border-orange-300/40'
          } animate-fade-in-up animation-delay-1400`}>
            <div className={`absolute top-4 right-4 opacity-10 ${isDark ? 'text-purple-300' : 'text-orange-400'}`}>
              <BookOpen size={80} />
            </div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className={`w-8 h-8 ${isDark ? 'text-purple-300' : 'text-orange-600'}`} />
                <h2 className={`text-2xl sm:text-3xl font-light ${isDark ? 'text-white' : 'text-slate-900'}`}>Découvre mon blog</h2>
              </div>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                Retrouve mes articles sur le développement web, mes astuces et retours d&apos;expérience
              </p>
              <div className="flex justify-center">
                <Link href="/blog"
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-light transition-all md:hover:scale-105 md:hover:gap-4 active:scale-95 touch-manipulation ${
                    isDark ? 'bg-purple-500/20 text-purple-300 md:hover:bg-purple-500/30 border-2 border-purple-500/30' : 'bg-orange-500/20 text-orange-600 md:hover:bg-orange-500/30 border-2 border-orange-500/30'
                  }`}>
                  Voir tous les articles
                  <ArrowRight className="w-5 h-5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
