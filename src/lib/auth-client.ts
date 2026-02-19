import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const baseAuthUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`;

export const authClient = createAuthClient({
  baseURL: baseAuthUrl,
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
