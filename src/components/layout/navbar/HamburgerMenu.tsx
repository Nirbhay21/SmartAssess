'use client';

import { useScrollLock } from '@/hooks/use-scroll-lock';
import { AnimatePresence, motion } from 'motion/react';
import { navLinks } from '@/config/nav-links';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useScrollSpy } from '@/hooks/use-scroll-spy';

const HamburgerMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const activeSection = useScrollSpy(
    navLinks.map(({ id }) => id),
    { offsetTop: 72 },
  );

  useScrollLock(open);

  return (
    <>
      {/* Menu toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="hover:bg-muted border-border active:bg-muted-foreground/20 flex h-9.5 w-11 cursor-pointer flex-col justify-between rounded-md border p-2 transition-[background-color] duration-200 lg:hidden"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <motion.span
          aria-hidden="true"
          animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-foreground h-0.5 w-full rounded-md"
        />
        <motion.span
          aria-hidden="true"
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.14 }}
          className="bg-foreground h-0.5 w-full rounded-md"
        />
        <motion.span
          aria-hidden="true"
          animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-foreground h-0.5 w-full rounded-md"
        />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.2 }}
            className="border-border bg-background fixed top-18 right-0 bottom-0 left-0 z-5 h-[calc(100dvh-4.5rem)] border-t px-4 py-6"
          >
            <nav>
              <ul className="font-poppins flex flex-col space-y-2 text-lg">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`group flex w-full items-center justify-between rounded-md px-4 py-2 transition-all duration-200 ${
                          isActive
                            ? 'bg-secondary/25 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-secondary/10 hover:text-foreground'
                        }`}
                      >
                        <span>{link.name}</span>
                        <MoveRight
                          size={18}
                          className={`transition-opacity duration-200 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
