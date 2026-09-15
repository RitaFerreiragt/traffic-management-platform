import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/authService';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logout bem-sucedido',
      },
      { status: 200 }
    );

    response.cookies.delete('auth_token');

    console.log(`📤 User logged out`);

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar logout' },
      { status: 500 }
    );
  }
}
