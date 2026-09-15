'use client';

import { motion } from 'framer-motion';
import LeadForm from '@/components/forms/LeadForm';

export default function LeadFormSection() {
  const handleFormSuccess = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="section bg-warm-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-charcoal">
            Vamos Conversar?
          </h2>
          <p className="text-lg text-taupe leading-relaxed">
            Preenche o formulário abaixo e vamos analisar o potencial do teu negócio.
          </p>
        </motion.div>

        <LeadForm onSuccess={handleFormSuccess} />
      </div>
    </section>
  );
}
