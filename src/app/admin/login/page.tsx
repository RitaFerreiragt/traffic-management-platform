'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao fazer login');
        setLoading(false);
        return;
      }

      setSuccess(true);
      console.log('✅ Login bem-sucedido');

      // Redirect after short delay
      setTimeout(() => {
        router.push(redirect);
      }, 500);
    } catch (err: any) {
      setError('Erro ao conectar ao servidor');
      console.error('Login error:', err);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAF8] to-[#F5F3F0] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-2">
            Login bem-sucedido!
          </h1>
          <p className="text-[#B8A89F]">A redirecionar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF8] to-[#F5F3F0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg border border-[#D4C5B9] shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#B8A89F] px-8 py-12 text-center">
            <div className="mb-4">
              <Lock className="w-12 h-12 text-[#D4AF37] mx-auto" />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-white mb-2">
              Admin Access
            </h1>
            <p className="text-[#FFF8E7]">Traffic Management Platform</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 font-semibold text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </p>
              </div>
            )}

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Email de Administrador
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-[#B8A89F]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="digital@ritaferreiragt.com"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2 border border-[#D4C5B9] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-50 bg-[#FAFAF8] disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-[#B8A89F]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-2 border border-[#D4C5B9] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-50 bg-[#FAFAF8] disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-3 text-[#B8A89F] hover:text-[#1A1A1A] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-[#B8A89F] mt-2">
                💡 Demo: admin@example.com / admin123
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#1A1A1A] to-[#B8A89F] text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Entrar no Admin
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-[#FAFAF8] px-8 py-4 border-t border-[#D4C5B9] text-center">
            <p className="text-sm text-[#B8A89F]">
              Acesso restrito a administradores
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-[#D4C5B9]">
          <h3 className="font-semibold text-[#1A1A1A] mb-2">🔐 Credenciais de Teste:</h3>
          <p className="text-sm text-[#B8A89F] font-mono mb-1">
            Email: digital@ritaferreiragt.com
          </p>
          <p className="text-sm text-[#B8A89F] font-mono">
            Password: admin123
          </p>
          <p className="text-xs text-red-500 mt-3 font-semibold">
            ⚠️ Alterar em produção!
          </p>
        </div>
      </div>
    </div>
  );
}
