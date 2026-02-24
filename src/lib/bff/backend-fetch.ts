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

  // The Node `fetch` implementation automatically decompresses
  // responses from the backend. If we blindly forward the headers
  // the browser will see a `Content-Encoding: gzip` header with an
  // already-decompressed body and blow up with ERR_CONTENT_DECODING_FAILED.
  // To avoid that, we copy over headers but drop any encoding fields.
  const forwarded = new Headers(response.headers);
  forwarded.delete('content-encoding');
  forwarded.delete('transfer-encoding');

  return new Response(response.body, {
    status: response.status,
    headers: forwarded,
  });
}
