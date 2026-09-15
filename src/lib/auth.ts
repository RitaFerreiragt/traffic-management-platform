import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
);

export interface JWTPayload {
  id: string;
  email: string;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
}

/**
 * Verify JWT token
 */
export async function verifyAuth(token: string): Promise<JWTPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as JWTPayload;
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}

/**
 * Get current user from request
 */
export async function getCurrentUser(request: NextRequest): Promise<JWTPayload | null> {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyAuth(token);
    return payload;
  } catch (err) {
    console.error('Error getting current user:', err);
    return null;
  }
}

/**
 * Get current user from server component
 */
export async function getCurrentUserServer(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyAuth(token);
    return payload;
  } catch (err) {
    console.error('Error getting current user (server):', err);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const user = await getCurrentUser(request);
  return user !== null;
}

/**
 * Check if user is admin
 */
export async function isAdmin(request: NextRequest): Promise<boolean> {
  const user = await getCurrentUser(request);
  return user?.role === 'admin';
}

/**
 * Create unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json(
    { error: message },
    { status: 401 }
  );
}

/**
 * Create forbidden response
 */
export function forbiddenResponse(message: string = 'Forbidden') {
  return NextResponse.json(
    { error: message },
    { status: 403 }
  );
}
