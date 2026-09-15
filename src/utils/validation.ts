import { z } from 'zod';

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório').max(100),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone inválido'),
  businessName: z.string().min(2, 'Nome do negócio é obrigatório'),
  businessType: z.enum(['clinic', 'professional', 'store']),
  currentChallenges: z.array(z.string()).min(1, 'Selecione pelo menos um desafio'),
  budget: z.string().optional(),
  message: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
