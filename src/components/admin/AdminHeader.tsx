'use client';

import Link from 'next/link';
import { BarChart3, LogOut, Settings, HelpCircle } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="bg-gradient-to-r from-[#1A1A1A] to-[#B8A89F] text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <BarChart3 className="w-6 h-6" />
          <span className="font-playfair text-xl font-bold">Traffic Admin</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/admin/leads"
            className="flex items-center gap-2 hover:text-[#FFF8E7] transition-colors"
          >
            Leads
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-2 hover:text-[#FFF8E7] transition-colors"
          >
            <Settings className="w-4 h-4" />
            Configurações
          </Link>
          <Link
            href="/admin/help"
            className="flex items-center gap-2 hover:text-[#FFF8E7] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Ajuda
          </Link>
        </nav>

        {/* Actions */}
        <button className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors rounded-lg">
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}
