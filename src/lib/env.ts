import { z } from 'zod';

import { serverEnvSchema } from './validation/server.env.schema';

// Validate server-only environment (run on server startup)
const parsedEnv = serverEnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid server environment variables:');
  console.error(z.flattenError(parsedEnv.error).fieldErrors);
  throw new Error('Invalid server environment configuration');
}

export const env = parsedEnv.data;
