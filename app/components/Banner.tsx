'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getBanner, type Banner } from '@/lib/sanity.client';

export function BannerBar() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    getBanner()
      .then(data => setBanner(data))
      .catch(() => setBanner(null));
  }, []);

  if (!banner || !banner.enabled || dismissed) return null;

  const content = (
    <span className="text-sm sm:text-base font-light">{banner.text}</span>
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center px-4 py-2 sm:py-2.5"
      style={{ backgroundColor: banner.backgroundColor, color: banner.textColor }}
    >
      <div className="flex-1 text-center">
        {banner.link ? (
          <a href={banner.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {content}
          </a>
        ) : content}
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="ml-2 p-1 rounded-full opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
        style={{ color: banner.textColor }}
        aria-label="Fermer le bandeau"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
