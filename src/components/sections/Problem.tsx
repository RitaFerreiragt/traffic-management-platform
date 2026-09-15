'use client';

import { motion } from 'framer-motion';

const problems = [
  'Investes em anúncios, mas recebes poucos contactos.',
  'Recebes contactos, mas muitos não têm intenção real de compra.',
  'Não sabes exactamente o que está a funcionar.',
  'Já investiste em publicidade sem perceber claramente o retorno.',
  'Continuas demasiado dependente do passa-palavra para conseguir novos clientes.',
];

export default function Problem() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="problema" className="section bg-ivory">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-charcoal">
            Talvez o problema não seja falta de publicidade.
          </h2>
          <p className="text-lg md:text-xl text-taupe">
            Pode ser a forma como o teu investimento está a ser utilizado.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-warm-white p-8 rounded-lg border border-beige hover:border-gold transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-serif font-bold text-gold flex-shrink-0">
                  {index + 1}.
                </span>
                <p className="text-charcoal font-medium">{problem}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center bg-warm-white p-8 md:p-12 rounded-lg"
        >
          <p className="text-lg text-charcoal leading-relaxed">
            Se reconheceste o teu negócio aqui, talvez não precises simplesmente de mais anúncios.
            <br />
            <span className="font-serif font-bold text-xl">Precisas de uma estratégia de aquisição.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
