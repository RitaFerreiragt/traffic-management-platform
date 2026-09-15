import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Investimento com Direção | Gestão de Tráfego Pago',
  description:
    'Estratégia e gestão de tráfego pago para negócios que querem transformar investimento em publicidade em oportunidades reais de negócio.',
  keywords: [
    'Meta Ads',
    'Google Ads',
    'Gestão de Tráfego',
    'Publicidade Digital',
    'Portugal',
  ],
  authors: [{ name: 'Traffic Management' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://trafficmanagement.pt',
    title: 'Investimento com Direção | Gestão de Tráfego Pago',
    description:
      'Estratégia e gestão de tráfego pago para negócios que querem transformar investimento em publicidade em oportunidades reais de negócio.',
    images: [{
      url: 'https://trafficmanagement.pt/og-image.png',
      width: 1200,
      height: 630,
    }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-warm-white text-charcoal">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
