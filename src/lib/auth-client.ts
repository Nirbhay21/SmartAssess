import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { publicEnv } from './publicEnv';

export const authClient = createAuthClient({
  baseURL: publicEnv.NEXT_PUBLIC_AUTH_BASE_URL, // The base URL of auth server - (backend url)
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
          required: true,
        },
        termsAccepted: {
          type: 'boolean',
          required: true,
        },
      },
    }),
  ],
});

export const { useSession } = authClient;
