import { NextRequest } from 'next/server';

import { env } from '@/lib/env';

const BACKEND_URL = env.BACKEND_URL;

async function proxy(req: NextRequest, params: Promise<{ path: string[] }>) {
  const path = (await params).path.join('/');
  const url = new URL(req.url);
  const search = url.search;

  // simply forward the incoming headers verbatim; they already include cookie
  const res = await fetch(`${BACKEND_URL}/auth/${path}${search}`, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined,
    credentials: 'include',
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, params);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, params);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, params);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(req, params);
}
