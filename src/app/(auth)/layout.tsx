import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Authentication – SmartAssess',
    template: '%s – SmartAssess',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[linear-gradient(to_right,var(--secondary-faint)_1px,transparent_1px),linear-gradient(to_bottom,var(--secondary-faint)_1px,transparent_1px)] bg-size-[24px_24px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60%,rgba(0,0,0,0.05)_70%,rgba(0,0,0,0.10)_80%,rgba(0,0,0,0.35)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60%,rgba(0,0,0,0.30)_70%,rgba(0,0,0,0.6)_80%,rgba(0,0,0,1)_100%)]"></div>
      <div className="flex min-h-screen items-center justify-center">{children}</div>
    </div>
  );
}
