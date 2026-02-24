import { NextRequest } from 'next/server';

import { backendFetch } from '@/lib/bff/backend-fetch';
import { handleError } from '@/lib/bff/errors';

export async function GET(req: NextRequest) {
  try {
    return await backendFetch(req, '/recruiter/profile');
  } catch (error) {
    return handleError(error);
  }
}
