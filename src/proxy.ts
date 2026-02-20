import { getSessionCookie } from 'better-auth/cookies';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { env } from './lib/env';
import { appMetaSchema } from './lib/validation/auth/app-meta.schema';

const encoder = new TextEncoder();

// pre‑import HMAC key once; reuse promise to avoid repeated crypto work
const keyPromise = (async () => {
  const secret = encoder.encode(env.SECRET_KEY);
  return crypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
})();

async function verifySignature(payload: string, signature: string) {
  const key = await keyPromise;
  const signed = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expectedSignature = Buffer.from(signed).toString('base64url');

  return signature === expectedSignature;
}

export async function proxy(req: NextRequest) {
  const sessionToken = getSessionCookie(req);

  // Short-circuit unauthenticated requests early to avoid unnecessary/expensive work
  if (!sessionToken) {
    const response = NextResponse.next();

    // Remove any stale `app_meta` left over from a previous session (best-effort cleanup)
    if (req.cookies.get('app_meta')) {
      response.cookies.delete('app_meta');
    }

    // Protect routes that require authentication
    if (
      req.nextUrl.pathname.startsWith('/dashboard') ||
      req.nextUrl.pathname.startsWith('/candidate/dashboard') ||
      req.nextUrl.pathname.startsWith('/recruiter/dashboard') ||
      req.nextUrl.pathname.startsWith('/candidate/onboarding') ||
      req.nextUrl.pathname.startsWith('/recruiter/onboarding')
    ) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    return response;
  }

  // Only read and verify `app_meta` when a session exists
  const meta = req.cookies.get('app_meta')?.value;
  const [payload, signature] = meta?.split('.') || [];

  if (!payload || !signature) {
    const response = NextResponse.redirect(new URL('/signin', req.url));
    response.cookies.delete('app_meta');
    return response;
  }

  const isValid = await verifySignature(payload, signature);

  if (!isValid) {
    // If the signature is invalid, clear the cookies to log the user out
    const response = NextResponse.next();
    response.cookies.delete('app_meta');
    return response;
  }

  const parsed = appMetaSchema.safeParse(JSON.parse(Buffer.from(payload, 'base64url').toString()));
  if (!parsed.success) {
    // If the cookie payload doesn't match the expected shape, clear it and abort
    const response = NextResponse.next();
    response.cookies.delete('app_meta');
    return response;
  }

  const appMeta = parsed.data;

  const { pathname } = req.nextUrl;
  const isSignin = pathname === '/signin';
  const isCandidateOnboarding = pathname.startsWith('/candidate/onboarding');
  const isRecruiterOnboarding = pathname.startsWith('/recruiter/onboarding');
  const isCandidateDashboard = pathname.startsWith('/candidate/dashboard');
  const isRecruiterDashboard = pathname.startsWith('/recruiter/dashboard');

  const requestedRole =
    isCandidateOnboarding || isCandidateDashboard
      ? 'candidate'
      : isRecruiterOnboarding || isRecruiterDashboard
        ? 'recruiter'
        : undefined;
  const isRoleMismatch = Boolean(requestedRole && requestedRole !== appMeta.r);

  // state machine checks
  if (isSignin) {
    if (!appMeta.oc) return NextResponse.redirect(new URL(`/${appMeta.r}/onboarding`, req.url));
    return NextResponse.redirect(new URL(`/${appMeta.r}/dashboard`, req.url));
  }

  if (isRoleMismatch) {
    if (!appMeta.oc) return NextResponse.redirect(new URL(`/${appMeta.r}/onboarding`, req.url));
    return NextResponse.redirect(new URL(`/${appMeta.r}/dashboard`, req.url));
  }

  if ((isCandidateDashboard || isRecruiterDashboard) && !appMeta.oc) {
    return NextResponse.redirect(new URL(`/${appMeta.r}/onboarding`, req.url));
  }

  if ((isCandidateOnboarding || isRecruiterOnboarding) && appMeta.oc) {
    return NextResponse.redirect(new URL(`/${appMeta.r}/dashboard`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signin',
    '/candidate/dashboard/:path*',
    '/recruiter/dashboard/:path*',
    '/candidate/onboarding/:path*',
    '/recruiter/onboarding/:path*',
  ],
};
