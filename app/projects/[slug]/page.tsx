/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProjectBySlug, Project } from '@/lib/sanity.client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { Moon, Sun, Github, ExternalLink, ArrowLeft, Code2 } from 'lucide-react';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDark(hour < 6 || hour >= 18);
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      if (params.slug) {
        const data = await getProjectBySlug(params.slug as string);
        setProject(data);
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  const handleToggle = () => {
    setIsDark(!isDark);
  };

  // Composants personnalisés pour PortableText
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        const position = value.position || 'center';
        const imageUrl = urlFor(value.asset as any).width(1200).url();
        
        return (
          <div className={`my-8 ${
            position === 'left' ? 'float-left mr-6 w-full md:w-1/2' :
            position === 'right' ? 'float-right ml-6 w-full md:w-1/2' :
            'w-full'
          }`}>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={value.alt || ''}
                fill
                className="object-cover"
              />
            </div>
            {value.caption && (
              <p className={`text-sm mt-2 text-center italic ${
                isDark ? 'text-gray-400' : 'text-slate-600'
              }`}>
                {value.caption}
              </p>
            )}
          </div>
        );
      },
      code: ({ value }: any) => {
        return (
          <div className={`my-6 rounded-xl overflow-hidden ${
            isDark ? 'bg-slate-900/80' : 'bg-slate-100'
          }`}>
            {value.filename && (
              <div className={`px-4 py-2 text-sm font-mono flex items-center gap-2 border-b ${
                isDark 
                  ? 'bg-slate-800/80 text-gray-300 border-slate-700' 
                  : 'bg-slate-200 text-slate-700 border-slate-300'
              }`}>
                <Code2 className="w-4 h-4" />
                {value.filename}
              </div>
            )}
            <pre className={`p-4 overflow-x-auto ${
              isDark ? 'text-gray-300' : 'text-slate-800'
            }`}>
              <code className={`language-${value.language || 'text'}`}>
                {value.code}
              </code>
            </pre>
          </div>
        );
      },
    },
    block: {
      h2: ({ children }: any) => (
        <h2 className={`text-3xl sm:text-4xl font-light mt-12 mb-6 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className={`text-2xl sm:text-3xl font-light mt-8 mb-4 ${
          isDark ? 'text-blue-300' : 'text-orange-600'
        }`}>
          {children}
        </h3>
      ),
      h4: ({ children }: any) => (
        <h4 className={`text-xl sm:text-2xl font-light mt-6 mb-3 ${
          isDark ? 'text-gray-200' : 'text-slate-800'
        }`}>
          {children}
        </h4>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className={`border-l-4 pl-6 py-4 my-6 italic ${
          isDark 
            ? 'border-blue-500/50 bg-slate-800/30 text-gray-300' 
            : 'border-orange-500/50 bg-orange-50/50 text-slate-700'
        }`}>
          {children}
        </blockquote>
      ),
      normal: ({ children }: any) => (
        <p className={`text-lg leading-relaxed mb-6 ${
          isDark ? 'text-gray-300' : 'text-slate-700'
        }`}>
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className={`list-disc list-inside space-y-2 mb-6 ${
          isDark ? 'text-gray-300' : 'text-slate-700'
        }`}>
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className={`list-decimal list-inside space-y-2 mb-6 ${
          isDark ? 'text-gray-300' : 'text-slate-700'
        }`}>
          {children}
        </ol>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic">{children}</em>
      ),
      code: ({ children }: any) => (
        <code className={`px-2 py-1 rounded text-sm font-mono ${
          isDark 
            ? 'bg-slate-800/80 text-blue-300' 
            : 'bg-slate-200 text-orange-600'
        }`}>
          {children}
        </code>
      ),
      link: ({ value, children }: any) => {
        const target = value?.blank ? '_blank' : undefined;
        const rel = value?.blank ? 'noopener noreferrer' : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={rel}
            className={`underline hover:no-underline transition-colors ${
              isDark ? 'text-blue-400 hover:text-blue-300' : 'text-orange-600 hover:text-orange-500'
            }`}
          >
            {children}
          </a>
        );
      },
    },
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
      }`}>
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${
              isDark ? 'border-blue-400' : 'border-orange-500'
            }`} />
          </div>
          <p className={`text-lg font-light ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'
      }`}>
        <div className="text-center">
          <h1 className={`text-4xl font-light mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Projet introuvable
          </h1>
          <button
            onClick={() => router.push('/')}
            className={`px-6 py-3 rounded-full transition-all hover:scale-105 ${
              isDark 
                ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' 
                : 'bg-orange-500/20 text-orange-600 hover:bg-orange-500/30'
            }`}
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'}`}>
      {/* Blobs d'arrière-plan */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-blob animation-delay-2000" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-15 animate-blob animation-delay-2000" />
          </>
        )}
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push('/#projects')}
              className={`flex items-center gap-2 text-lg transition-all hover:scale-105 ${
                isDark ? 'text-white hover:text-blue-300' : 'text-slate-900 hover:text-orange-600'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Retour aux projets
            </button>
            
            <button
              onClick={handleToggle}
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                isDark 
                  ? 'bg-slate-800/50 text-yellow-300 hover:bg-slate-700/50' 
                  : 'bg-white/50 text-slate-900 hover:bg-orange-100/50'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Image de couverture */}
        {project.coverImage && (
          <div className="relative w-full h-[400px] md:h-[500px] mb-12 overflow-hidden">
            <Image
              src={urlFor(project.coverImage).width(1920).height(1080).url()}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent' 
                : 'bg-gradient-to-t from-[#ece7c1] via-[#ece7c1]/50 to-transparent'
            }`} />
          </div>
        )}

        {/* Contenu */}
        <article className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
          {/* En-tête du projet */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDark 
                      ? 'bg-slate-800/60 text-gray-300' 
                      : 'bg-white/60 text-slate-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-light mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {project.title}
            </h1>

            <p className={`text-xl leading-relaxed mb-8 ${
              isDark ? 'text-gray-300' : 'text-slate-700'
            }`}>
              {project.description}
            </p>

            {/* Liens */}
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105 ${
                    isDark 
                      ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border-2 border-purple-500/30' 
                      : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30 border-2 border-purple-500/30'
                  }`}
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105 ${
                    isDark 
                      ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-2 border-blue-500/30' 
                      : 'bg-orange-500/20 text-orange-600 hover:bg-orange-500/30 border-2 border-orange-500/30'
                  }`}
                >
                  <ExternalLink className="w-5 h-5" />
                  Voir le site
                </a>
              )}
            </div>
          </div>

          {/* Contenu riche */}
          {project.fullDescription && (
            <div className={`prose prose-lg max-w-none ${
              isDark ? 'prose-invert' : ''
            }`}>
              <PortableText
                value={project.fullDescription as any}
                components={portableTextComponents as any}
              />
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
