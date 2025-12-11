'use client';

import { useEffect, useState } from 'react';

interface ScrollSpyOptions {
  offsetTop?: number;
  threshold?: number;
}

export const useScrollSpy = (sectionIds: string[], options: ScrollSpyOptions = {}) => {
  const { offsetTop = 0, threshold = 0.1 } = options;
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: `-${offsetTop}px 0px -55% 0px`,
        threshold: threshold,
      },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offsetTop, threshold]);

  return activeId;
};
