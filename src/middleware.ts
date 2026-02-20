import { getSessionCookie } from 'better-auth/cookies';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionToken = getSessionCookie(req);

  if (req.nextUrl.pathname === '/signin' && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (req.nextUrl.pathname === '/dashboard' && !sessionToken) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Protect new onboarding routes
  if (
    (req.nextUrl.pathname.startsWith('/candidate/onboarding') ||
      req.nextUrl.pathname.startsWith('/recruiter/onboarding')) &&
    !sessionToken
  ) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/candidate/onboarding/:path*', '/recruiter/onboarding/:path*'],
};
