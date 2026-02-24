import { NextRequest } from 'next/server';

import { backendFetch } from '@/lib/bff/backend-fetch';
import { handleError } from '@/lib/bff/errors';

// proxy GET to fetch current organization details
export async function GET(req: NextRequest) {
  try {
    return await backendFetch(req, '/recruiter/organization');
  } catch (error) {
    return handleError(error);
  }
}

// proxy PATCH for updating the organization (edit flow)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    return await backendFetch(req, '/recruiter/organization', {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  } catch (error) {
    return handleError(error);
  }
}
