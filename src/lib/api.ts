import axios from 'axios';
import type { ApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function submitLead(data: any): Promise<ApiResponse<any>> {
  try {
    const response = await api.post('/leads', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao submeter formulário',
    };
  }
}

export default api;
