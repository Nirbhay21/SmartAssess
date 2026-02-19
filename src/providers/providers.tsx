'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/app/store';

import ThemeProvider from './ThemeProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

export default Providers;
