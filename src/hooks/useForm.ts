'use client';

import { useState } from 'react';
import type { FormSubmission } from '@/types';

export function useForm(onSubmit: (data: FormSubmission) => Promise<void>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: FormSubmission) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await onSubmit(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao submeter formulário');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleSubmit };
}
