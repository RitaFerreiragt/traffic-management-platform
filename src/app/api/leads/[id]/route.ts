import { NextRequest, NextResponse } from 'next/server';

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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const leadId = params.id;
    const body = await request.json();
    const { status } = body;

    const leadIndex = leadsStorage.findIndex((lead) => lead.id === leadId);

    if (leadIndex === -1) {
      return NextResponse.json(
        { error: 'Lead não encontrado' },
        { status: 404 }
      );
    }

    leadsStorage[leadIndex].status = status;
    console.log(`📝 Lead ${leadId} status updated to ${status}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Lead atualizado com sucesso',
        lead: leadsStorage[leadIndex],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar lead' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const leadId = params.id;

    const leadIndex = leadsStorage.findIndex((lead) => lead.id === leadId);

    if (leadIndex === -1) {
      return NextResponse.json(
        { error: 'Lead não encontrado' },
        { status: 404 }
      );
    }

    const deletedLead = leadsStorage.splice(leadIndex, 1);
    console.log(`🗑️  Lead ${leadId} deleted`);

    return NextResponse.json(
      {
        success: true,
        message: 'Lead eliminado com sucesso',
        lead: deletedLead[0],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Erro ao eliminar lead' },
      { status: 500 }
    );
  }
}
