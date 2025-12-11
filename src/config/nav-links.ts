export type NavLink = {
  id: string;
  name: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { id: 'hero', name: 'Home', href: '#hero' },
  { id: 'features', name: 'Features', href: '#features' },
  { id: 'about', name: 'About', href: '#about' },
  { id: 'how-it-works', name: 'How it Works', href: '#how-it-works' },
  { id: 'faq', name: 'FAQ', href: '#faq' },
];
