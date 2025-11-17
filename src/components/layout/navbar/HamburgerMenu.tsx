'use client'

import { useScrollLock } from '@/hooks/use-scroll-lock'
import { AnimatePresence, motion } from 'motion/react'
import { navLinks } from '@/config/nav-links'
import { MoveRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const HamburgerMenu = () => {
  const [open, setOpen] = useState<boolean>(false)

  useScrollLock(open)

  return (
    <>
      {/* Menu toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className='w-11 h-9.5 flex flex-col justify-between cursor-pointer hover:bg-muted p-2 transition-[background-color] duration-200 rounded-md lg:hidden border border-border active:bg-muted-foreground/20'
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls='mobile-menu'
      >
        <motion.span
          aria-hidden='true'
          animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className='h-0.5 w-full bg-foreground rounded-md'
        />
        <motion.span
          aria-hidden='true'
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.14 }}
          className='h-0.5 w-full bg-foreground rounded-md'
        />
        <motion.span
          aria-hidden='true'
          animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className='h-0.5 w-full bg-foreground rounded-md'
        />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id='mobile-menu'
            role='dialog'
            aria-modal='true'
            aria-label='Mobile navigation'
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.2 }}
            className='fixed z-5 inset-0 top-18 px-4 py-6 border-t border-border bg-background'
          >
            <nav>
              <ul className='flex flex-col space-y-2 font-poppins text-lg'>
                {navLinks.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className='py-1 px-4 group hover:bg-secondary/25 transition-[background-color] rounded-md flex w-full justify-between items-center'
                    >
                      <span>{link.name}</span>
                      <MoveRight
                        className='opacity-0 group-hover:opacity-100 duration-200 transition-opacity'
                        aria-hidden='true'
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default HamburgerMenu
