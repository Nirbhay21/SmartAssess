'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/app/store';
import { useGetMeQuery } from '@/features/auth/api';
import { useSession } from '@/lib/auth-client';

import ThemeProvider from './ThemeProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  /*
    `AuthSync` runs *inside* the Redux Provider so RTK Query hooks have access to the store.
    It calls the `/api/me` BFF via RTK Query (includes cookies) and acts as the canonical
    place to keep `app_meta` in sync with the backend.
  */
  const AuthSync = ({ sessionPresent }: { sessionPresent?: boolean }) => {
    // skip when there is no session to avoid unnecessary network calls
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = useGetMeQuery(undefined, { skip: !sessionPresent });
    return null;
  };

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      <Provider store={store}>
        <AuthSync sessionPresent={Boolean(session)} />
        {children}
      </Provider>
    </ThemeProvider>
  );
};

export default Providers;
