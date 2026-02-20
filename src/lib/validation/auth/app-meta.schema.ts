import { z } from 'zod';

/**
 * Schema for the `app_meta` cookie payload.
 * Matches `src/types/app-meta.ts` (r: UserRole, oc: boolean).
 */
export const appMetaSchema = z.object({
  r: z.enum(['candidate', 'recruiter']),
  oc: z.boolean(),
});

export type AppMetaData = z.infer<typeof appMetaSchema>;
