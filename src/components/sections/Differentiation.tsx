'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'DIAGNÓSTICO',
    description: 'Analisamos o negócio, a oferta, o público e o actual processo de aquisição.',
  },
  {
    number: '02',
    title: 'ESTRATÉGIA',
    description: 'Definimos canais, mensagem, público, orçamento e objectivos.',
  },
  {
    number: '03',
    title: 'IMPLEMENTAÇÃO',
    description: 'Criamos e gerimos campanhas de Meta Ads e Google Ads.',
  },
  {
    number: '04',
    title: 'OPTIMIZAÇÃO',
    description: 'Medimos, testamos e ajustamos continuamente aquilo que demonstra potencial.',
  },
];

export default function Differentiation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
            Não começo pelo anúncio.
            <br />
            <span className="text-gold-subtle">Começo pelo negócio.</span>
          </h2>
          <p className="text-lg text-taupe leading-relaxed">
            Antes de definir campanhas, preciso de perceber o que vendes, quem quer comprar,
            onde estás a perder oportunidades e que resultado faz sentido procurar.
            <br />
            <span className="font-semibold">Só depois definimos a estratégia.</span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="flex flex-col gap-6"
            >
              <div>
                <p className="text-5xl font-serif font-bold text-gold mb-4">{step.number}</p>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-taupe leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
