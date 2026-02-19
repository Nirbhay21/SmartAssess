import { NextResponse } from 'next/server';

/**
 * Custom error class for BFF layer
 * Preserves HTTP status codes from backend
 */
export class BFFError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'BFFError';
  }
}

/**
 * Centralized error handler for all route handlers
 */
export function handleError(error: unknown) {
  console.error('[BFF ERROR]', error);

  if (error instanceof BFFError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}
