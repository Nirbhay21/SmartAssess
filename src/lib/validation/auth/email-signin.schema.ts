import { z } from 'zod';

export const EmailSigninSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').pipe(z.email('Invalid email address')),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(100, 'Password must be at most 100 characters long'),
});

export type EmailSigninFormData = z.infer<typeof EmailSigninSchema>;
