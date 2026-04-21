'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: false, toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [manualToggle, setManualToggle] = useState(false);

  useEffect(() => {
    if (!manualToggle) {
      const hour = new Date().getHours();
      setIsDark(hour < 6 || hour >= 18);
    }
  }, [manualToggle]);

  const toggleTheme = () => {
    setManualToggle(true);
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
