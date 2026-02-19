import { NextRequest, NextResponse } from 'next/server';

import { backendFetch } from '@/lib/bff/backend-fetch';
import { handleError } from '@/lib/bff/errors';

export async function GET(req: NextRequest) {
  try {
    const data = await backendFetch(req, '/onboarding');
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await backendFetch(req, '/onboarding', {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
