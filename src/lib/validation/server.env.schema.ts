import { z } from 'zod';

// Server-side environment schema (validates secrets / server-only vars)
export const serverEnvSchema = z.object({
  AUTH_BASE_URL: z.url('AUTH_BASE_URL must be a valid URL'),
  BACKEND_URL: z.url('BACKEND_URL must be a valid URL'),
  NEXT_PUBLIC_APP_NAME: z.string().min(1, 'NEXT_PUBLIC_APP_NAME is required'),
  NEXT_PUBLIC_APP_URL: z.url('NEXT_PUBLIC_APP_URL must be a valid URL'),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
