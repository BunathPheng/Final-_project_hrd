// components/feature/progress/ProgressBar.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  speed: 500,
  minimum: 0.3,
  easing: 'ease',
  trickleSpeed: 200,
});

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Complete progress when route changes
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Simple approach: Listen for clicks on the document
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if clicked element is a link or inside a link
      const link = target.closest('a[href]') as HTMLAnchorElement;
      if (link && link.href && link.href !== window.location.href) {
        // Check if it's an internal link (same origin)
        try {
          const linkUrl = new URL(link.href);
          const currentUrl = new URL(window.location.href);
          if (linkUrl.origin === currentUrl.origin) {
            NProgress.start();
          }
        } catch {
          // Invalid URL, ignore
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}