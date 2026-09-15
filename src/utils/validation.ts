import { z } from 'zod';

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z
    .string()
    .regex(/^[+]?[0-9]{9,15}$/, 'Telefone inválido. Deve conter 9-15 dígitos.'),
  businessName: z
    .string()
    .min(2, 'Nome do negócio deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do negócio deve ter no máximo 100 caracteres'),
  businessType: z.enum(['clinic', 'professional', 'store'], {
    errorMap: () => ({ message: 'Tipo de negócio inválido' }),
  }),
  currentChallenges: z
    .array(z.string())
    .min(1, 'Seleciona pelo menos um desafio')
    .max(5, 'Máximo 5 desafios'),
  budget: z
    .string()
    .optional()
    .refine(
      (val) => !val || ['500-1000', '1000-2500', '2500-5000', '5000+'].includes(val),
      'Orçamento inválido'
    ),
  message: z.string().max(500, 'Mensagem muito longa').optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
