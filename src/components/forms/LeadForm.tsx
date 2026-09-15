'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { leadFormSchema, type LeadFormData } from '@/utils/validation';
import { CHALLENGES } from '@/config/constants';

interface LeadFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function LeadForm({ onSuccess, onError }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      businessType: 'clinic',
      currentChallenges: [],
    },
  });

  const selectedChallenges = watch('currentChallenges');

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao submeter formulário');
      }

      setSubmitSuccess(true);
      reset();
      onSuccess?.();

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error: any) {
      const errorMessage = error.message || 'Erro ao submeter formulário';
      setSubmitError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Success Message */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <p className="text-green-800 font-medium">
              ✓ Formulário submetido com sucesso! Em breve entraremos em contacto.
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <p className="text-red-800 font-medium">✗ {submitError}</p>
          </motion.div>
        )}

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
            Nome Completo *
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="O teu nome"
            className="w-full px-4 py-3 border border-beige rounded-lg bg-warm-white text-charcoal placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
            Email *
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="teu@email.com"
            className="w-full px-4 py-3 border border-beige rounded-lg bg-warm-white text-charcoal placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
            Telefone *
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            placeholder="+351 912 345 678"
            className="w-full px-4 py-3 border border-beige rounded-lg bg-warm-white text-charcoal placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>
          )}
        </div>

        {/* Business Name Field */}
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-charcoal mb-2">
            Nome do Negócio *
          </label>
          <input
            {...register('businessName')}
            type="text"
            id="businessName"
            placeholder="O nome da tua clínica/loja/negócio"
            className="w-full px-4 py-3 border border-beige rounded-lg bg-warm-white text-charcoal placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-2">{errors.businessName.message}</p>
          )}
        </div>

        {/* Business Type Field */}
        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-charcoal mb-2">
            Tipo de Negócio *
          </label>
          <select
            {...register('businessType')}
            id="businessType"
            className="w-full px-4 py-3 border border-beige rounded-lg bg-warm-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          >
            <option value="clinic">Clínica (Estética, Saúde, Bem-estar)</option>
            <option value="professional">Profissional Independente</option>
            <option value="store">Loja (Moda, Artesanato, Retalho)</option>
          </select>
          {errors.businessType && (
            <p className="text-red-500 text-sm mt-2">{errors.businessType.message}</p>
          )}
        </div>

        {/* Current Challenges Field */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-4">
            Quais são os teus principais desafios? * (Seleciona pelo menos um)
          </label>
          <div className="space-y-3">
            {CHALLENGES.map((challenge) => (
              <motion.label
                key={challenge}
                className="flex items-center cursor-pointer group"
                whileHover={{ x: 4 }}
              >
                <input
                  {...register('currentChallenges')}
                  type="checkbox"
                  value={challenge}
                  className="w-5 h-5 text-gold bg-warm-white border-beige rounded focus:ring-2 focus:ring-gold cursor-pointer"
                />
                <span className="ml-3 text-charcoal group-hover:text-gold transition-colors">
                  {challenge}
                </span>
              </motion.label>
            ))}
          </div>
          {errors.currentChallenges && (
            <p className="text-red-500 text-sm mt-2">{errors.currentChallenges.message}</p>
          )}
        </div>

        {/* Message Field (Optional) */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
            Mensagem Adicional (Opcional)
          </label>
          <textarea
            {...register('message')}
            id="message"
            placeholder="Conta-nos mais sobre o teu negócio ou dúvidas específicas..."
            rows={4}
            className="w-full px-4 py-3 border border-beige rounded-lg bg-warm-white text-charcoal placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Budget Field (Optional) */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-charcoal mb-2">
            Orçamento Aproximado para Publicidade (Opcional)
          </label>
          <select
            {...register('budget')}
            id="budget"
            className="w-full px-4 py-3 border border-beige rounded-lg bg-warm-white text-charcoal placeholder-taupe focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          >
            <option value="">Seleciona uma opção...</option>
            <option value="500-1000">500€ - 1.000€/mês</option>
            <option value="1000-2500">1.000€ - 2.500€/mês</option>
            <option value="2500-5000">2.500€ - 5.000€/mês</option>
            <option value="5000+">5.000€+/mês</option>
          </select>
        </div>

        {/* Privacy Policy Checkbox */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="privacy"
            required
            className="w-5 h-5 text-gold bg-warm-white border-beige rounded focus:ring-2 focus:ring-gold mt-1 cursor-pointer"
          />
          <label htmlFor="privacy" className="ml-3 text-sm text-taupe">
            Concordo com a <a href="#" className="text-gold hover:underline">política de privacidade</a> e
            autorizo o armazenamento dos meus dados para fins de contacto.
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'A enviar...' : 'ENVIAR FORMULÁRIO'}
        </motion.button>

        {/* Form Info */}
        <p className="text-center text-xs text-taupe">
          Respeitamos a tua privacidade. Nunca partilharemos o teu email com terceiros.
        </p>
      </form>
    </motion.div>
  );
}
