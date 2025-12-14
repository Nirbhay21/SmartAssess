'use client';

import { Sun, Moon, LaptopMinimal, LucideIcon, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ThemeIcon = dynamic(() => import('./ThemeIcon'), {
  ssr: false,
  loading: () => <div className="bg-secondary/45 h-9 w-9 animate-pulse rounded-full" />,
});

type Theme = 'light' | 'dark' | 'system';

interface Themes {
  name: Theme;
  icon: LucideIcon;
}

const themes: Themes[] = [
  { name: 'light', icon: Sun },
  { name: 'dark', icon: Moon },
  { name: 'system', icon: LaptopMinimal },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectThemeAndCloseMenu = (themeName: Theme) => {
    setTheme(themeName);
    setIsMenuOpen(false);
  };

  const currentTheme =
    themes.find((t) => t.name === (theme as Theme)) ||
    themes.find((t) => t.name === 'system') ||
    themes[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative flex items-center" ref={containerRef}>
      <button
        className="cursor-pointer"
        aria-label="Toggle Theme Menu"
        aria-haspopup="menu"
        aria-controls="theme-menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <motion.div
          key={currentTheme.name}
          initial={{ rotate: '180deg' }}
          animate={{ rotate: '0deg' }}
          exit={{ rotate: '180deg' }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
        >
          <ThemeIcon
            icon={currentTheme.icon}
            size={24}
            className="bg-secondary/45 box-content rounded-full p-1.5"
          />
        </motion.div>
      </button>

      {/* Theme Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            role="menu"
            id="theme-menu"
            aria-label="Theme options"
            initial={{ y: -10, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="bg-card before:bg-card after:bg-card before:border-border border-border absolute top-10.5 -left-2 z-10 mt-3 rounded-xl border px-2 py-3 shadow-lg before:absolute before:top-0 before:left-4.5 before:block before:size-4 before:-translate-y-1/2 before:rotate-45 before:border after:absolute after:top-1.5 after:left-3.5 after:block after:h-3 after:w-6 after:-translate-y-1/2"
          >
            {themes.map((theme) => (
              <button
                key={theme.name}
                role="menuitem"
                aria-label={`Switch to ${theme.name} theme`}
                className={`text-card-foreground flex w-35 cursor-pointer items-center justify-between rounded-md py-1.5 pl-2 ${
                  theme.name === currentTheme.name
                    ? 'bg-accent/20'
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                onClick={() => selectThemeAndCloseMenu(theme.name)}
              >
                <div className="flex space-x-2">
                  <theme.icon size={22} aria-hidden="true" />
                  <span className="font-inter capitalize">{theme.name}</span>
                </div>
                {theme.name === currentTheme.name && <Check className="text mr-2" size={18} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
