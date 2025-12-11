'use client';

import Link from 'next/link';
import Logo from '../../common/Logo';
import ThemeSwitcher from '../../common/ThemeSwitcher';
import HamburgerMenu from './HamburgerMenu';
import { navLinks } from '@/config/nav-links';
import { useScrollSpy } from '@/hooks/use-scroll-spy';

const Navbar = () => {
  const activeSection = useScrollSpy(
    navLinks.map(({ id }) => id),
    { offsetTop: 72 },
  );

  return (
    <header className="border-border sticky top-0 z-50 border-b">
      <nav className="bg-white/75 px-4 backdrop-blur-lg dark:bg-black/75">
        <div className="text-foreground mx-auto flex h-18 max-w-7xl items-center">
          <div className="flex flex-1 items-center">
            <Link href="/" className="inline-flex items-center space-x-1">
              <Logo className="w-12" />
              <h1 className="font-montserrat hidden text-xl font-bold sm:block">SmartAssess</h1>
            </Link>
          </div>
          <ul className="font-poppins hidden flex-1 justify-center space-x-3 lg:flex">
            {navLinks.map((link) => (
              <li key={link.name} className="font-medium whitespace-nowrap">
                <Link
                  href={link.href}
                  className={`rounded-md px-3 py-1.5 transition-[background-color] duration-200 ${
                    activeSection === link.id ? 'bg-primary/10 font-semibold' : 'hover:bg-primary/5'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-1 items-center justify-end">
            <div className="mr-4 flex lg:mr-0">
              <ThemeSwitcher />
              <button className="bg-primary font-montserrat hover:bg-primary/90 active:bg-primary/70 ml-4 cursor-pointer rounded-lg px-6 py-2 font-semibold text-white transition-[background-color] duration-150">
                Login
              </button>
            </div>
            <HamburgerMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
