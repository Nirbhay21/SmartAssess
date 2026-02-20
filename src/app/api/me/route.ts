import { NextRequest } from 'next/server';

import { env } from '@/lib/env';

const BACKEND_URL = env.BACKEND_URL;

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie');

  const res = await fetch(`${BACKEND_URL}/me`, {
    method: 'GET',
    headers: {
      ...(cookie ? { cookie } : {}),
    },
    credentials: 'include',
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}
