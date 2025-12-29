// app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Poppins, Montserrat } from 'next/font/google';
import { cn } from '@/lib/cn';
import Providers from '@/providers/providers';

export const metadata: Metadata = {
  title: {
    default: 'SmartAssess',
    template: '%s – SmartAssess',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: dark)', color: '#FFFFFF' },
  ],
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, poppins.variable, montserrat.variable)}
      suppressHydrationWarning={true}
    >
      <body className="bg-background dark:bg-dark-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
