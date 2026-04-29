'use client';

import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Calendar, Hash, Award, X } from 'lucide-react';
import Image from 'next/image';
import { getCertifications, type Certification } from '@/lib/sanity.client';
import { urlFor } from '@/sanity/lib/image';
import { useTheme } from './ThemeProvider';

function CertificationCard({ cert, onClick }: { cert: Certification; onClick: () => void }) {
  const { isDark } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || window.matchMedia('(max-width: 768px)').matches) return;

    let tiltInstance: any = null;

    import('vanilla-tilt').then(({ default: VanillaTilt }) => {
      if (!el) return;
      VanillaTilt.init(el, {
        max: 12,
        speed: 400,
        perspective: 1000,
        scale: 1.03,
        glare: true,
        'max-glare': 0.2,
        gyroscope: false,
      });
      tiltInstance = (el as any).vanillaTilt;
    });

    return () => { if (tiltInstance) tiltInstance.destroy(); };
  }, []);

  const issueDate = new Date(cert.issueDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  const expiryDate = cert.expiryDate
    ? new Date(cert.expiryDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
    : null;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative rounded-2xl border-2 overflow-hidden cursor-pointer
        transition-all duration-300 active:scale-95 touch-manipulation
        ${isDark
          ? 'bg-slate-800/60 border-purple-500/30 hover:border-purple-400/50 shadow-xl hover:shadow-purple-500/20'
          : 'bg-white/60 border-orange-200/40 hover:border-orange-300/60 shadow-xl hover:shadow-orange-300/20'
        }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {cert.media && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={urlFor(cert.media).width(600).height(450).url()}
            alt={cert.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-900/80 via-transparent' : 'from-white/80 via-transparent'}`} />
        </div>
      )}

      <div className="p-4 sm:p-5" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-center gap-3 mb-3">
          {cert.issuerLogo ? (
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200/20">
              <Image src={urlFor(cert.issuerLogo).width(80).height(80).url()} alt={cert.issuer} fill className="object-contain p-1" sizes="48px" />
            </div>
          ) : (
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-purple-500/20' : 'bg-orange-500/20'}`}>
              <Award className={`w-5 h-5 ${isDark ? 'text-purple-300' : 'text-orange-600'}`} />
            </div>
          )}
          <div className="min-w-0">
            <h3 className={`text-base sm:text-lg font-medium leading-tight truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{cert.name}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{cert.issuer}</p>
          </div>
        </div>

        <div className={`flex items-center gap-1.5 text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          <Calendar className="w-3.5 h-3.5" />
          <span>Émise {issueDate}</span>
          {expiryDate && <span>· Expire {expiryDate}</span>}
        </div>

        {cert.credentialId && (
          <div className={`flex items-center gap-1.5 text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
            <Hash className="w-3.5 h-3.5" />
            <span className="truncate">{cert.credentialId}</span>
          </div>
        )}

        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {cert.skills.slice(0, 4).map((skill, i) => (
              <span key={i} className={`px-2 py-0.5 rounded-full text-xs ${isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-orange-500/15 text-orange-700'}`}>{skill}</span>
            ))}
            {cert.skills.length > 4 && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${isDark ? 'bg-slate-700/50 text-gray-400' : 'bg-gray-200/50 text-slate-600'}`}>+{cert.skills.length - 4}</span>
            )}
          </div>
        )}

        {cert.credentialUrl && (
          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${isDark ? 'text-purple-300 hover:text-purple-200' : 'text-orange-600 hover:text-orange-500'}`}>
            Afficher le diplôme <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

function CertificationModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const { isDark } = useTheme();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const issueDate = new Date(cert.issueDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const expiryDate = cert.expiryDate
    ? new Date(cert.expiryDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in-scale" onClick={e => e.stopPropagation()}>
        <div className={`rounded-3xl border-2 overflow-hidden ${isDark ? 'bg-slate-900/95 border-purple-500/40' : 'bg-white/95 border-orange-200/60'}`}>
          <div className="flex items-center justify-between p-4 sm:p-6">
            <div className="flex items-center gap-3">
              {cert.issuerLogo && (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-200/20">
                  <Image src={urlFor(cert.issuerLogo).width(80).height(80).url()} alt={cert.issuer} fill className="object-contain p-1" sizes="48px" />
                </div>
              )}
              <div>
                <h2 className={`text-xl sm:text-2xl font-light ${isDark ? 'text-white' : 'text-slate-900'}`}>{cert.name}</h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{cert.issuer}</p>
              </div>
            </div>
            <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800 text-gray-400' : 'hover:bg-gray-100 text-slate-600'}`}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {cert.media && (
            <div className="px-4 sm:px-6 pb-4">
              <div className={`rounded-2xl overflow-hidden border-2 ${isDark ? 'border-slate-700/50 shadow-2xl' : 'border-gray-200/50 shadow-2xl'}`}>
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  <Image src={urlFor(cert.media).width(1200).height(900).url()} alt={cert.name} fill className="object-contain" sizes="(max-width: 768px) 95vw, 800px" quality={90} />
                </div>
              </div>
            </div>
          )}

          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                <div className={`text-xs mb-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Date d&apos;émission</div>
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{issueDate}</div>
              </div>
              {expiryDate && (
                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                  <div className={`text-xs mb-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Date d&apos;expiration</div>
                  <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{expiryDate}</div>
                </div>
              )}
              {cert.credentialId && (
                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                  <div className={`text-xs mb-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Identifiant</div>
                  <div className={`text-sm font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{cert.credentialId}</div>
                </div>
              )}
            </div>

            {cert.skills && cert.skills.length > 0 && (
              <div>
                <div className={`text-xs mb-2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Compétences</div>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, i) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-orange-500/15 text-orange-700'}`}>{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-light transition-all hover:scale-105 ${
                  isDark ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30' : 'bg-orange-500/20 text-orange-600 hover:bg-orange-500/30 border border-orange-500/30'
                }`}>
                <ExternalLink className="w-4 h-4" /> Afficher le diplôme
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CertificationsSection() {
  const { isDark } = useTheme();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  useEffect(() => {
    getCertifications()
      .then(data => setCertifications(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={`backdrop-blur-2xl p-8 sm:p-10 lg:p-12 rounded-3xl border-2 mb-12 ${
        isDark ? 'bg-gradient-to-br from-amber-950/40 to-slate-900/40 border-amber-500/30' : 'bg-gradient-to-br from-amber-50/80 to-yellow-50/80 border-amber-300/40'
      }`}>
        <div className="flex justify-center py-12">
          <div className={`w-10 h-10 border-4 border-t-transparent rounded-full animate-spin ${isDark ? 'border-amber-400' : 'border-amber-500'}`} />
        </div>
      </div>
    );
  }

  if (certifications.length === 0) return null;

  return (
    <>
      <div className={`backdrop-blur-2xl p-8 sm:p-10 lg:p-12 rounded-3xl border-2 mb-12 relative overflow-hidden ${
        isDark ? 'bg-gradient-to-br from-amber-950/40 to-slate-900/40 border-amber-500/30' : 'bg-gradient-to-br from-amber-50/80 to-yellow-50/80 border-amber-300/40'
      } animate-fade-in-up animation-delay-800`}>
        <div className="relative z-10">
          <h2 className={`text-3xl sm:text-4xl font-light mb-2 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            🏆 Certifications & Badges
          </h2>
          <p className={`text-base mb-8 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Mes certifications professionnelles et badges obtenus
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map(cert => (
              <CertificationCard key={cert._id} cert={cert} onClick={() => setSelectedCert(cert)} />
            ))}
          </div>
        </div>
      </div>

      {selectedCert && <CertificationModal cert={selectedCert} onClose={() => setSelectedCert(null)} />}
    </>
  );
}
