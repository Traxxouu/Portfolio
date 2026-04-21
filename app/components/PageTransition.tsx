'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useTheme } from './ThemeProvider';

export function usePageTransition() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isDark } = useTheme();

  const navigate = useCallback((path: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(path);
    }, 600);
  }, [router]);

  return { isTransitioning, navigate, isDark };
}

export function PageTransition({ isTransitioning, isDark }: { isTransitioning: boolean; isDark: boolean }) {
  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      <div 
        className={`absolute inset-0 ${isDark ? 'bg-slate-950' : 'bg-[#ece7c1]'}`}
        style={{
          animation: 'liquid-rise 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards'
        }}
      />
    </div>
  );
}
