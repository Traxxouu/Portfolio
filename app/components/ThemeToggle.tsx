'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
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
        <Sun className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
      )}
    </button>
  );
}

export function InlineThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      className={`p-3 sm:p-4 rounded-full 
        transition-all md:hover:scale-110 active:scale-95
        touch-manipulation ${
        isDark 
          ? 'bg-slate-800/50 text-yellow-300 md:hover:bg-slate-700/50' 
          : 'bg-white/50 text-slate-900 md:hover:bg-orange-100/50'
      }`}
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
