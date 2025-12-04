import Link from 'next/link';
import Logo from '../../common/Logo';
import ThemeSwitcher from '../../common/ThemeSwitcher';
import HamburgerMenu from './HamburgerMenu';
import { navLinks } from '@/config/nav-links';

const Navbar = () => {
  return (
    <nav className="border-border border-b px-4">
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
                className="hover:bg-primary/10 rounded-md px-3 py-1.5 transition-[background-color] duration-200"
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
  );
};

export default Navbar;
