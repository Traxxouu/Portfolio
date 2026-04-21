'use client';

import { useTheme } from './ThemeProvider';
import { usePageTransition, PageTransition } from './PageTransition';

interface SubPageNavProps {
  backLabel?: string;
  backPath?: string;
  forwardLabel?: string;
  forwardPath?: string;
}

export function SubPageNav({ backLabel = 'Accueil', backPath = '/', forwardLabel, forwardPath }: SubPageNavProps) {
  const { isDark } = useTheme();
  const { isTransitioning, navigate } = usePageTransition();

  return (
    <>
      <PageTransition isTransitioning={isTransitioning} isDark={isDark} />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-12">
        <button
          onClick={() => navigate(backPath!)}
          className={`text-xl sm:text-2xl lg:text-3xl font-light 
            transition-all md:hover:scale-105 md:hover:translate-x-2 
            active:scale-95 touch-manipulation
            py-2 px-4 rounded-lg
            group ${
            isDark ? 'text-white md:hover:text-blue-300 active:text-blue-300' : 'text-slate-900 md:hover:text-orange-600 active:text-orange-600'
          }`}
        >
          <span className="inline-block transition-transform md:group-hover:-translate-x-2">←</span> {backLabel}
        </button>
        
        {forwardLabel && forwardPath && (
          <button
            onClick={() => navigate(forwardPath)}
            className={`text-xl sm:text-2xl lg:text-3xl font-light 
              transition-all md:hover:scale-105 md:hover:-translate-x-2 
              active:scale-95 touch-manipulation
              py-2 px-4 rounded-lg
              group ${
              isDark ? 'text-white md:hover:text-blue-300 active:text-blue-300' : 'text-slate-900 md:hover:text-orange-600 active:text-orange-600'
            }`}
          >
            {forwardLabel} <span className="inline-block transition-transform md:group-hover:translate-x-2">→</span>
          </button>
        )}
      </div>
    </>
  );
}
