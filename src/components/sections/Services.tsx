'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'META ADS',
    description: 'Campanhas no Instagram e Facebook orientadas para aquisição.',
  },
  {
    title: 'GOOGLE ADS',
    description: 'Captação de pessoas que já procuram activamente o teu produto ou serviço.',
  },
  {
    title: 'ESTRATÉGIA DE AQUISIÇÃO',
    description: 'Definição do público, oferta, mensagem, canais e percurso até à conversão.',
  },
  {
    title: 'OPTIMIZAÇÃO',
    description: 'Análise contínua para perceber o que deve ser mantido, alterado ou eliminado.',
  },
  {
    title: 'TRACKING E ANÁLISE',
    description:
      'Porque não basta saber quantas pessoas clicaram. É necessário perceber o que aconteceu depois do clique.',
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="servicos" className="section bg-warm-white">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-charcoal"
        >
          O que posso construir contigo
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="bg-ivory p-8 rounded-lg border border-beige hover:border-gold transition-all duration-300 group"
            >
              <h3 className="text-xl font-serif font-bold text-charcoal mb-4 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-taupe leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
