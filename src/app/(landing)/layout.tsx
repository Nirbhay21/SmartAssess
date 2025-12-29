import type { Metadata } from 'next';
import Navbar from '@/components/layout/navbar/Navbar';

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

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main role="main">{children}</main>
    </>
  );
}
