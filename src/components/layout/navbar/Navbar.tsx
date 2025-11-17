import Link from 'next/link'
import Logo from '../../common/Logo'
import ThemeSwitcher from '../../common/ThemeSwitcher'
import HamburgerMenu from './HamburgerMenu'
import { navLinks } from '@/config/nav-links'

const Navbar = () => {
  return (
    <nav className='border-b border-border px-4'>
      <div className='flex h-18 mx-auto max-w-7xl items-center text-foreground'>
        <div className='flex-1 flex items-center'>
          <Link href='/' className='inline-flex items-center space-x-1'>
            <Logo className='w-12' />
            <h1 className='text-xl font-montserrat font-bold hidden sm:block'>
              SmartAssess
            </h1>
          </Link>
        </div>
        <ul className='flex-1 space-x-3 justify-center font-poppins lg:flex hidden'>
          {navLinks.map(link => (
            <li key={link.name} className='whitespace-nowrap font-medium'>
              <Link
                href={link.href}
                className='hover:bg-primary/10 transition-[background-color] duration-200 rounded-md px-3 py-1.5'
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex-1 flex justify-end items-center'>
          <div className='flex mr-4 lg:mr-0'>
            <ThemeSwitcher />
            <button className='bg-primary cursor-pointer text-white px-6 py-2 font-montserrat rounded-lg ml-4 font-semibold hover:bg-primary/90 active:bg-primary/70 transition-[background-color] duration-150'>
              Login
            </button>
          </div>
          <HamburgerMenu />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
