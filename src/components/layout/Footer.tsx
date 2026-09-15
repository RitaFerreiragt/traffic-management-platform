'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-warm-white py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Traffic</h3>
            <p className="text-taupe text-sm">Investimento com direção.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-taupe">
              <li><a href="#servicos" className="hover:text-gold transition-colors">Serviços</a></li>
              <li><a href="#para-quem" className="hover:text-gold transition-colors">Para Quem</a></li>
              <li><a href="#diagnostico" className="hover:text-gold transition-colors">Diagnóstico</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-taupe">
              <li><a href="#" className="hover:text-gold transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <ul className="space-y-2 text-sm text-taupe">
              <li><a href="#" className="hover:text-gold transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-taupe/20 pt-8">
          <p className="text-center text-sm text-taupe">
            © {currentYear} Traffic Management. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
