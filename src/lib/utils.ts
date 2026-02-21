import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOnboardingType = (role?: string | null): 'candidate' | 'recruiter' | null =>
  role === 'candidate' ? 'candidate' : role === 'recruiter' ? 'recruiter' : null;

export function parseAppMetaCookie(): { r: UserType; oc: boolean } | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )app_meta=([^;]+)/);
  if (!match) return null;
  try {
    const encoded = decodeURIComponent(match[1]);
    const [payload] = encoded.split('.');
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(b64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}
