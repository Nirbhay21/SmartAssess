import { z } from 'zod';

import { envSchema } from './validation/env.schema';

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.log('❌ Invalid environment variables:');
  console.log(z.flattenError(parsedEnv.error).fieldErrors);
  throw new Error(`Invalid environment configuration`);
}

export const env = parsedEnv.data;
