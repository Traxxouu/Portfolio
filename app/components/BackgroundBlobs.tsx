'use client';

import { useTheme } from './ThemeProvider';

export function BackgroundBlobs() {
  const { isDark } = useTheme();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {isDark ? (
        <>
          <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-15 animate-blob"></div>
          <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-10 animate-blob animation-delay-2000"></div>
        </>
      ) : (
        <>
          <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-15 animate-blob"></div>
          <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-rose-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-blob animation-delay-2000"></div>
        </>
      )}
    </div>
  );
}
