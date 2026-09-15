'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <>
      <Header />
      <section className="min-h-screen bg-warm-white pt-32 pb-16 md:pb-24 flex items-center">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <div>
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl md:text-6xl lg:text-6xl font-serif font-bold leading-tight text-charcoal"
                >
                  O teu negócio não precisa de mais cliques.
                  <br />
                  <span className="text-gold-subtle">Precisa das pessoas certas.</span>
                </motion.h1>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-taupe leading-relaxed max-w-2xl"
              >
                Estratégia e gestão de tráfego pago para negócios que querem transformar
                investimento em publicidade em oportunidades reais de negócio.
              </motion.p>

              <motion.div variants={itemVariants} className="text-sm text-taupe font-medium">
                <p>Meta Ads · Google Ads · Estratégia de Aquisição</p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Link href="#diagnostico" className="btn btn-primary">
                  ANALISAR O MEU NEGÓCIO
                </Link>
              </motion.div>

              <motion.p variants={itemVariants} className="text-sm text-taupe">
                Reunião de oportunidade gratuita · Sem compromisso
              </motion.p>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div
              variants={itemVariants}
              className="hidden lg:flex items-center justify-center h-96 lg:h-full"
            >
              <div className="w-full h-full bg-gradient-to-br from-ivory to-beige rounded-lg flex items-center justify-center border border-beige">
                <div className="text-center">
                  <p className="text-taupe text-lg font-serif">Fotografia Profissional</p>
                  <p className="text-sm text-taupe mt-2">Espaço reservado para imagem</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
