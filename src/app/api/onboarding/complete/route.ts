import { NextRequest, NextResponse } from 'next/server';

import { backendFetch } from '@/lib/bff/backend-fetch';
import { handleError } from '@/lib/bff/errors';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await backendFetch(req, '/onboarding/complete', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
