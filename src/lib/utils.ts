import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOnboardingType = (role?: string | null): 'candidate' | 'recruiter' | null =>
  role === 'candidate' ? 'candidate' : role === 'recruiter' ? 'recruiter' : null;
