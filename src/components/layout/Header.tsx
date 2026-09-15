'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-warm-white/95 backdrop-blur-sm z-50 border-b border-beige">
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-serif font-bold text-charcoal">
          Traffic
        </Link>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row gap-8 absolute md:static top-full left-0 right-0 bg-warm-white md:bg-transparent p-4 md:p-0`}
        >
          <Link href="#servicos" className="hover:text-gold transition-colors">
            Serviços
          </Link>
          <Link href="#para-quem" className="hover:text-gold transition-colors">
            Para Quem
          </Link>
          <Link href="#diagnostico" className="hover:text-gold transition-colors">
            Diagnóstico Gratuito
          </Link>
          <button className="btn btn-primary">
            Agendar Reunião
          </button>
        </div>
      </nav>
    </header>
  );
}
