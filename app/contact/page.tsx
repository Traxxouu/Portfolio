'use client';

import { useState } from 'react';
import { Github, Linkedin, Instagram, Send, Mail } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { ThemeToggle } from '../components/ThemeToggle';
import { BackgroundBlobs } from '../components/BackgroundBlobs';
import { SubPageNav } from '../components/SubPageNav';

export default function ContactPage() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
        setTimeout(() => { setFormStatus('idle'); setFormMessage(''); }, 5000);
      } else {
        setFormStatus('error');
        setFormMessage(data.error || 'Une erreur est survenue');
      }
    } catch {
      setFormStatus('error');
      setFormMessage("Erreur lors de l'envoi du message");
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border-2 backdrop-blur-xl transition-all focus:scale-[1.02] focus:outline-none ${
    isDark 
      ? 'bg-slate-900/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-400/50' 
      : 'bg-white/50 border-orange-200/40 text-slate-900 placeholder-slate-400 focus:border-orange-300/60'
  }`;

  return (
    <div className={`fixed inset-0 z-0 overflow-auto ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'} transition-colors duration-500`}>
      <BackgroundBlobs />
      <ThemeToggle />

      <div className="relative min-h-screen px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <SubPageNav backLabel="Accueil" backPath="/" />

          {/* Titre */}
          <div className="mb-16 text-center animate-fade-in-up">
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Restons en <span className={isDark ? 'text-blue-300' : 'text-orange-600'}>Contact</span>
            </h1>
            <p className={`text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
              Une question ? Un projet ? N&apos;hésite pas à m&apos;écrire !
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Formulaire */}
            <div className={`backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border-2 ${
              isDark ? 'bg-slate-800/40 border-purple-500/30' : 'bg-white/40 border-orange-200/40'
            } animate-fade-in-up animation-delay-200`}>
              <h2 className={`text-3xl sm:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Envoie-moi un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className={`block text-sm font-light mb-2 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>Prénom</label>
                    <input type="text" id="firstName" required value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={inputClass} placeholder="John" disabled={formStatus === 'sending'} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={`block text-sm font-light mb-2 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>Nom</label>
                    <input type="text" id="lastName" required value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={inputClass} placeholder="D." disabled={formStatus === 'sending'} />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-light mb-2 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>Ton email</label>
                  <input type="email" id="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass} placeholder="john@example.com" disabled={formStatus === 'sending'} />
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-sm font-light mb-2 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>Objet</label>
                  <input type="text" id="subject" required value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={inputClass} placeholder="Sujet de ton message" disabled={formStatus === 'sending'} />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-light mb-2 ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>Ton message</label>
                  <textarea id="message" required value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6} className={`${inputClass} resize-none`} placeholder="Dis-moi tout !" disabled={formStatus === 'sending'} />
                </div>

                {formMessage && (
                  <div className={`p-4 rounded-xl border-2 animate-fade-in ${
                    formStatus === 'success'
                      ? isDark ? 'bg-green-900/30 border-green-500/50 text-green-300' : 'bg-green-100/50 border-green-400/50 text-green-700'
                      : isDark ? 'bg-red-900/30 border-red-500/50 text-red-300' : 'bg-red-100/50 border-red-400/50 text-red-700'
                  }`}>{formMessage}</div>
                )}

                <button type="submit" disabled={formStatus === 'sending'}
                  className={`w-full px-8 py-4 rounded-xl text-lg font-light transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 touch-manipulation ${
                    formStatus === 'sending'
                      ? isDark ? 'bg-slate-700/50 text-gray-400 cursor-not-allowed' : 'bg-gray-300/50 text-gray-500 cursor-not-allowed'
                      : isDark ? 'bg-blue-500/20 text-blue-300 md:hover:bg-blue-500/30 border-2 border-blue-500/30 md:hover:scale-105' : 'bg-orange-500/20 text-orange-600 md:hover:bg-orange-500/30 border-2 border-orange-500/30 md:hover:scale-105'
                  }`}>
                  {formStatus === 'sending' ? (
                    <><div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />Envoi en cours...</>
                  ) : (
                    <>Envoyer le message<Send size={20} /></>
                  )}
                </button>
              </form>
            </div>

            {/* Infos contact */}
            <div className="space-y-8">
              <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${
                isDark ? 'bg-slate-800/40 border-purple-500/30' : 'bg-white/40 border-orange-200/40'
              } animate-fade-in-up animation-delay-400`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-orange-500/20'}`}>
                    <Mail className={isDark ? 'text-blue-300' : 'text-orange-600'} size={24} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-light ${isDark ? 'text-white' : 'text-slate-900'}`}>Email direct</h3>
                    <a href="mailto:pro.mael.dev@gmail.com"
                      className={`text-sm transition-colors ${isDark ? 'text-blue-300 hover:text-blue-200' : 'text-orange-600 hover:text-orange-500'}`}>
                      pro.mael.dev@gmail.com
                    </a>
                  </div>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-700'}`}>Tu peux aussi m&apos;envoyer un email directement</p>
              </div>

              <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 ${
                isDark ? 'bg-slate-800/40 border-purple-500/30' : 'bg-white/40 border-orange-200/40'
              } animate-fade-in-up animation-delay-600`}>
                <h3 className={`text-2xl font-light mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Retrouve-moi sur</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { href: 'https://www.linkedin.com/in/maelbarbe/', icon: <Linkedin size={32} />, label: 'LinkedIn', color: 'blue' },
                    { href: 'https://github.com/Traxxouu', icon: <Github size={32} />, label: 'GitHub', color: 'purple' },
                    { href: 'https://www.instagram.com/maelsanst/', icon: <Instagram size={32} />, label: 'Instagram', color: 'pink' },
                  ].map(link => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 touch-manipulation group ${
                        isDark 
                          ? `bg-slate-900/50 border-${link.color}-500/30 md:hover:border-${link.color}-400/50 text-${link.color}-300` 
                          : `bg-white/50 border-${link.color}-400/40 md:hover:border-${link.color}-500/60 text-${link.color}-600`
                      }`}>
                      {link.icon}
                      <span className={`text-sm font-light ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className={`backdrop-blur-2xl p-8 rounded-3xl border-2 text-center ${
                isDark ? 'bg-slate-800/40 border-purple-500/30' : 'bg-white/40 border-orange-200/40'
              } animate-fade-in-up animation-delay-800`}>
                <p className={`text-xl sm:text-2xl font-light italic leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                  &ldquo;Les meilleurs projets naissent souvent d&apos;une simple conversation&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
