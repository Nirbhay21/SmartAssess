import { z } from 'zod';

import { envSchema } from './validation/env.schema';

// Validate only the NEXT_PUBLIC_* subset so this module is safe to import in
// client bundles. Failure will surface early during startup in dev/CI.
const clientEnv = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

const parsed = envSchema.safeParse(clientEnv);

if (!parsed.success) {
  // Keep the error informative and fail fast so configuration issues are visible.
  console.error('Invalid public environment variables:');
  console.error(z.flattenError(parsed.error).fieldErrors);
  throw new Error('Invalid public environment configuration (public)');
}

export const publicEnv = parsed.data;
export type PublicEnv = typeof publicEnv;
