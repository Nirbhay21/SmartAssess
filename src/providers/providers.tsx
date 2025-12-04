import { ReactNode } from 'react';
import ThemeProvider from './ThemeProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;
