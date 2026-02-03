import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_AUTH_BASE_URL is not defined in environment variables');
}

export const authClient = createAuthClient({
  baseURL: BASE_URL, // The base URL of auth server - (backend url)
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
