import { NextRequest } from 'next/server';

import { env } from '../env';
import { BFFError } from './errors';

export async function backendFetch(req: NextRequest, path: string, init?: RequestInit) {
  const cookie = req.headers.get('cookie');

  const response = await fetch(`${env.BACKEND_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { cookie } : {}),
      ...init?.headers,
    },
    credentials: 'include', // Ensure cookies are included in the request
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new BFFError(errorBody?.message || 'Backend Error', response.status);
  }

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  }).json();
}
