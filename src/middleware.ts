import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

// Routes that require authentication
const protectedRoutes = ['/admin'];

// Routes that should redirect to dashboard if already logged in
const authRoutes = ['/login', '/admin/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Protected route - require authentication
    if (!token) {
      console.log(`🔒 Redirecting unauthenticated user from ${pathname} to /login`);
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token is valid
    try {
      const user = await getCurrentUser(request);
      if (!user) {
        console.log(`🔒 Invalid token, redirecting from ${pathname} to /login`);
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Check if user is admin
      if (user.role !== 'admin') {
        console.log(`🚫 Non-admin user attempting to access ${pathname}`);
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (err) {
      console.error('Middleware authentication error:', err);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isAuthRoute && token) {
    // Already logged in, redirect to admin dashboard
    console.log(`✅ Already authenticated, redirecting from ${pathname} to /admin`);
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/admin/login/:path*',
  ],
};
