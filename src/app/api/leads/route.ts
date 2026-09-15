import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/utils/validation';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: 'clinic' | 'professional' | 'store';
  currentChallenges: string[];
  budget?: string;
  message?: string;
  createdAt: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'disqualified';
}

const leadsStorage: Lead[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = leadFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('; ');

      return NextResponse.json(
        { error: `Validação falhou: ${errors}` },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    const existingLead = leadsStorage.find((lead) => lead.email === validatedData.email);
    if (existingLead) {
      return NextResponse.json(
        { error: 'Este email já foi registado. Em breve entraremos em contacto.' },
        { status: 409 }
      );
    }

    const newLead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validatedData,
      createdAt: new Date().toISOString(),
      source: 'website-form',
      status: 'new',
    };

    leadsStorage.push(newLead);

    console.log('📍 New lead received:', newLead);

    return NextResponse.json(
      {
        success: true,
        message: 'Formulário recebido com sucesso!',
        leadId: newLead.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Erro ao processar o formulário. Tente novamente.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        totalLeads: leadsStorage.length,
        leads: leadsStorage,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Erro ao obter leads' },
      { status: 500 }
    );
  }
}
