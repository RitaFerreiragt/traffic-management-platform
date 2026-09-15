'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FreeDiagnostic() {
  return (
    <section id="diagnostico" className="section bg-ivory">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-charcoal">
            Antes de trabalharmos juntos,
            <br />
            <span className="text-gold-subtle">quero saber se faz sentido trabalharmos juntos.</span>
          </h2>

          <div className="bg-warm-white p-8 md:p-12 rounded-lg border border-beige mb-8">
            <p className="text-lg text-charcoal leading-relaxed mb-6">
              Nem todos os negócios estão preparados para investir em tráfego pago.
            </p>
            <p className="text-lg text-charcoal leading-relaxed mb-6">
              E nem todas as campanhas precisam de mais orçamento.
            </p>
            <p className="text-lg text-charcoal leading-relaxed mb-6">
              Por isso, começo por uma <span className="font-semibold">Reunião de Oportunidade Gratuita</span>.
            </p>
            <p className="text-lg text-taupe leading-relaxed mb-6">
              Analisamos o teu negócio, o actual processo de aquisição e o potencial de uma
              estratégia de publicidade.
            </p>
            <p className="text-lg text-taupe leading-relaxed mb-6">
              Se existir uma oportunidade real, explico-te como podemos trabalhar.
            </p>
            <p className="text-lg text-taupe leading-relaxed">
              Se não existir, fico com a certeza de que fiz a melhor orientação possível.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agendar" className="btn btn-primary">
              AGENDAR REUNIÃO GRATUITA
            </Link>
            <Link href="#" className="btn btn-secondary">
              FALE COMIGO
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
