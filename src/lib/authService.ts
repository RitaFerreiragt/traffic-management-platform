import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'digital@ritaferreiragt.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change in production!

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  id: string;
  email: string;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
}

/**
 * Generate JWT token
 */
export async function generateToken(
  id: string,
  email: string,
  role: 'admin' | 'user' = 'user'
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 days

  const token = await new SignJWT({
    id,
    email,
    role,
    iat,
    exp,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(exp)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Validate admin login
 */
export async function validateAdminLogin(
  credentials: LoginCredentials
): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    // Simple validation - in production, use proper password hashing
    if (
      credentials.email !== ADMIN_EMAIL ||
      credentials.password !== ADMIN_PASSWORD
    ) {
      return {
        success: false,
        error: 'Email ou password inválida',
      };
    }

    const token = await generateToken(
      'admin_001',
      ADMIN_EMAIL,
      'admin'
    );

    return {
      success: true,
      token,
    };
  } catch (err: any) {
    console.error('Login validation error:', err);
    return {
      success: false,
      error: 'Erro ao validar credenciais',
    };
  }
}

/**
 * Set auth cookie
 */
export async function setAuthCookie(token: string, maxAge: number = 60 * 60 * 24 * 7) {
  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  });
}

/**
 * Clear auth cookie
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}
