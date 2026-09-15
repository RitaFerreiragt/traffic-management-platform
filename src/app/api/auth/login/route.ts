import { NextRequest, NextResponse } from 'next/server';
import { validateAdminLogin, setAuthCookie } from '@/lib/authService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e password são obrigatórios' },
        { status: 400 }
      );
    }

    // Validate credentials
    const result = await validateAdminLogin({ email, password });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    // Set auth cookie
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login bem-sucedido',
      },
      { status: 200 }
    );

    response.cookies.set('auth_token', result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    console.log(`✅ Admin login successful: ${email}`);

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    );
  }
}
