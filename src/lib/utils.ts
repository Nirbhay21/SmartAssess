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

/**
 * Take a full name string and return either the name unchanged (if 1-2 words)
 * or the first and last word when more than two words are provided. Falls
 * back to a default when no name is given.
 */
export function formatUserName(fullName?: string, fallback = 'Jane Doe') {
  if (!fullName) return fallback;
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 2) return parts.join(' ');
  return `${parts[0]} ${parts[parts.length - 1]}`;
}
