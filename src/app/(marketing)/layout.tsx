import '../globals.css';
import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/layout/navbar/Navbar';
import { Inter, Poppins, Montserrat } from 'next/font/google';
import Providers from '@/providers/providers';

export const metadata: Metadata = {
  title: {
    default: 'SmartAssess - AI-Powered Assessment & Candidate Evaluation Platform',
    template: '%s - SmartAssess',
  },
  description:
    'SmartAssess is an AI-powered assessment and candidate evaluation platform that helps recruiters instantly generate role-based interviews, enforce secure proctoring, and receive AI-scored performance reports—faster, fairer, and bias-free hiring.',
  keywords: [
    'SmartAssess',
    'Assessment platform',
    'Interview platform',
    'AI-powered assessments',
    'candidate evaluation',
    'role-based interviews',
    'interview automation',
    'AI interview generator',
    'secure interview monitoring',
    'recruitment SaaS',
    'proctoring system',
    'AI scoring',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'SmartAssess Team' }],
  creator: 'SmartAssess',
  publisher: 'SmartAssess',
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: dark)', color: '#FFFFFF' },
  ],
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="bg-background dark:bg-dark-background">
        <Providers>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
