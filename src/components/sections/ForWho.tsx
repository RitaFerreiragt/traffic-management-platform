'use client';

import { motion } from 'framer-motion';

const segments = [
  {
    title: 'CLÍNICAS',
    subtitle: 'Estética · Saúde · Bem-estar',
    description: 'Captação de novos pacientes e oportunidades de marcação através de campanhas direccionadas.',
  },
  {
    title: 'PROFISSIONAIS',
    subtitle: 'Estética · Fisioterapia · Massagem · Serviços especializados',
    description: 'Estratégias de aquisição adaptadas a negócios locais e profissionais independentes.',
  },
  {
    title: 'LOJAS',
    subtitle: 'Moda · Artesanato · Retalho especializado',
    description: 'Publicidade orientada para vendas, procura e escoamento estratégico de produtos.',
  },
];

export default function ForWho() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="para-quem" className="section bg-ivory">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-charcoal">
            Não trabalho para todos os negócios.
          </h2>
          <p className="text-lg text-taupe leading-relaxed">
            Trabalho melhor com negócios que têm uma boa oferta, capacidade para crescer e vontade
            de deixar de depender apenas da aquisição espontânea.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {segments.map((segment) => (
            <motion.div
              key={segment.title}
              variants={itemVariants}
              className="bg-warm-white p-8 md:p-10 rounded-lg border border-beige hover:border-gold transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">
                {segment.title}
              </h3>
              <p className="text-sm font-medium text-gold mb-6">{segment.subtitle}</p>
              <p className="text-taupe leading-relaxed">{segment.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
