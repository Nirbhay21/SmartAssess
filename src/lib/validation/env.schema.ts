import { z } from 'zod';

export const envSchema = z.object({
  NEXT_PUBLIC_AUTH_BASE_URL: z.url('NEXT_PUBLIC_AUTH_BASE_URL must be a valid URL'),
  NEXT_PUBLIC_API_BASE_URL: z.url('NEXT_PUBLIC_API_BASE_URL must be a valid URL'),
  NEXT_PUBLIC_APP_NAME: z.string().min(1, 'NEXT_PUBLIC_APP_NAME is required'),
});

export type Env = z.infer<typeof envSchema>;
