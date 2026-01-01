import { JSX } from 'react';

interface AuthCardProps {
  header?: JSX.Element;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const AuthCard = ({ header, footer, children }: AuthCardProps) => {
  return (
    <section className="shadow-glow-sm bg-card before:from-primary before:to-accent before:via-secondary border-border relative max-w-120 overflow-hidden rounded-xl border shadow-black/15 before:absolute before:top-0 before:left-0 before:block before:h-1.5 before:w-full before:bg-linear-to-r">
      <div className="xxs:p-8 p-6 sm:p-12">
        {header && <header className="mb-8 text-center">{header}</header>}
        {children}
      </div>

      {footer && (
        <footer className="border-border bg-input/40 border-t p-5 text-center dark:bg-white/4">
          {footer}
        </footer>
      )}
    </section>
  );
};

export default AuthCard;
