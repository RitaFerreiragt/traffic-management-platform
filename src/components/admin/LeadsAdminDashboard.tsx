'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from 'lucide-react';

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

const statusConfig = {
  new: {
    label: 'Novo',
    color: 'bg-blue-50',
    badge: 'bg-blue-200 text-blue-800',
    icon: Clock,
  },
  contacted: {
    label: 'Contactado',
    color: 'bg-yellow-50',
    badge: 'bg-yellow-200 text-yellow-800',
    icon: AlertCircle,
  },
  qualified: {
    label: 'Qualificado',
    color: 'bg-green-50',
    badge: 'bg-green-200 text-green-800',
    icon: CheckCircle,
  },
  disqualified: {
    label: 'Desqualificado',
    color: 'bg-gray-50',
    badge: 'bg-gray-200 text-gray-800',
    icon: XCircle,
  },
};

const businessTypeConfig = {
  clinic: { label: 'Clínica', color: 'bg-purple-100 text-purple-800' },
  professional: { label: 'Profissional', color: 'bg-blue-100 text-blue-800' },
  store: { label: 'Loja', color: 'bg-green-100 text-green-800' },
};

export default function LeadsAdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [businessTypeFilter, setBusinessTypeFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Fetch leads
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/leads');
      if (!response.ok) throw new Error('Erro ao carregar leads');
      const data = await response.json();
      setLeads(data.leads || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Erro ao buscar leads:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search leads
  useEffect(() => {
    let filtered = leads;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    // Business type filter
    if (businessTypeFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.businessType === businessTypeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter, businessTypeFilter, sortBy]);

  // Update lead status
  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar lead');

      setLeads(
        leads.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus as any } : lead
        )
      );

      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus as any });
      }
    } catch (err: any) {
      console.error('Erro ao atualizar lead:', err);
    }
  };

  // Delete lead
  const deleteLead = async (leadId: string) => {
    if (!confirm('Tens a certeza que queres eliminar este lead?')) return;

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao eliminar lead');

      setLeads(leads.filter((lead) => lead.id !== leadId));
      setShowDetailModal(false);
    } catch (err: any) {
      console.error('Erro ao eliminar lead:', err);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Nome',
      'Email',
      'Telefone',
      'Negócio',
      'Tipo',
      'Status',
      'Data',
      'Desafios',
    ];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map((lead) =>
        [
          `"${lead.name}"`,
          `"${lead.email}"`,
          `"${lead.phone}"`,
          `"${lead.businessName}"`,
          businessTypeConfig[lead.businessType].label,
          statusConfig[lead.status].label,
          format(new Date(lead.createdAt), 'dd/MM/yyyy', { locale: ptBR }),
          `"${lead.currentChallenges.join('; ')}}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  // Stats
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    disqualified: leads.filter((l) => l.status === 'disqualified').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#FAFAF8] to-[#F5F3F0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-[#B8A89F]">Carregando leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF8] to-[#F5F3F0] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-playfair text-4xl font-bold text-[#1A1A1A] mb-2">
          🎯 Dashboard de Leads
        </h1>
        <p className="text-[#B8A89F]">Gerir e acompanhar todos os leads do negócio</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-[#D4C5B9] p-4 shadow-sm">
          <p className="text-[#B8A89F] text-sm font-semibold mb-2">Total de Leads</p>
          <p className="font-playfair text-3xl font-bold text-[#1A1A1A]">{stats.total}</p>
        </div>
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 shadow-sm">
          <p className="text-blue-600 text-sm font-semibold mb-2">Novos</p>
          <p className="font-playfair text-3xl font-bold text-blue-700">{stats.new}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4 shadow-sm">
          <p className="text-yellow-600 text-sm font-semibold mb-2">Contactados</p>
          <p className="font-playfair text-3xl font-bold text-yellow-700">{stats.contacted}</p>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-4 shadow-sm">
          <p className="text-green-600 text-sm font-semibold mb-2">Qualificados</p>
          <p className="font-playfair text-3xl font-bold text-green-700">{stats.qualified}</p>
        </div>
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 shadow-sm">
          <p className="text-gray-600 text-sm font-semibold mb-2">Desqualificados</p>
          <p className="font-playfair text-3xl font-bold text-gray-700">{stats.disqualified}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-[#D4C5B9] p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#B8A89F]" />
            <input
              type="text"
              placeholder="Procurar por nome, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#D4C5B9] rounded-lg focus:outline-none focus:border-[#D4AF37] bg-[#FAFAF8]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[#D4C5B9] rounded-lg focus:outline-none focus:border-[#D4AF37] bg-[#FAFAF8] text-[#1A1A1A]"
          >
            <option value="all">Todos os Status</option>
            <option value="new">Novo</option>
            <option value="contacted">Contactado</option>
            <option value="qualified">Qualificado</option>
            <option value="disqualified">Desqualificado</option>
          </select>

          {/* Business Type Filter */}
          <select
            value={businessTypeFilter}
            onChange={(e) => setBusinessTypeFilter(e.target.value)}
            className="px-4 py-2 border border-[#D4C5B9] rounded-lg focus:outline-none focus:border-[#D4AF37] bg-[#FAFAF8] text-[#1A1A1A]"
          >
            <option value="all">Todos os Tipos</option>
            <option value="clinic">Clínica</option>
            <option value="professional">Profissional</option>
            <option value="store">Loja</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-[#D4C5B9] rounded-lg focus:outline-none focus:border-[#D4AF37] bg-[#FAFAF8] text-[#1A1A1A]"
          >
            <option value="newest">Mais Recentes</option>
            <option value="oldest">Mais Antigos</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-[#B8A89F]">
            {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''} encontrado{filteredLeads.length !== 1 ? 's' : ''}
          </p>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#B8A89F] transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg border border-[#D4C5B9] overflow-hidden shadow-sm">
        {filteredLeads.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#B8A89F]">
              {leads.length === 0 ? 'Nenhum lead registado ainda' : 'Nenhum lead encontrado com esses filtros'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FAFAF8] border-b border-[#D4C5B9]">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#1A1A1A]">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#1A1A1A]">Negócio</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#1A1A1A]">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#1A1A1A]">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#1A1A1A]">Data</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-[#1A1A1A]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, index) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-[#D4C5B9] hover:bg-[#F5F3F0] transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#1A1A1A]">{lead.name}</p>
                      <p className="text-sm text-[#B8A89F]">{lead.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[#1A1A1A]">{lead.businessName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          businessTypeConfig[lead.businessType].color
                        }`}
                      >
                        {businessTypeConfig[lead.businessType].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${
                          statusConfig[lead.status].badge
                        }`}
                      >
                        <option value="new">Novo</option>
                        <option value="contacted">Contactado</option>
                        <option value="qualified">Qualificado</option>
                        <option value="disqualified">Desqualificado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#B8A89F]">
                      {format(new Date(lead.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowDetailModal(true);
                          }}
                          className="p-2 text-[#D4AF37] hover:bg-[#FFF8E7] rounded-lg transition-colors"
                          title="Ver detalhes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#1A1A1A] to-[#B8A89F] px-6 py-4 flex justify-between items-center">
              <h2 className="font-playfair text-2xl font-bold text-white">{selectedLead.name}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-white hover:text-[#FAFAF8] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Status Section */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Status do Lead
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border-0 font-semibold cursor-pointer text-center ${
                    statusConfig[selectedLead.status].badge
                  }`}
                >
                  <option value="new">Novo</option>
                  <option value="contacted">Contactado</option>
                  <option value="qualified">Qualificado</option>
                  <option value="disqualified">Desqualificado</option>
                </select>
              </div>

              {/* Personal Info */}
              <div className="mb-6 pb-6 border-b border-[#D4C5B9]">
                <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#B8A89F] mb-1">Nome Completo</p>
                    <p className="font-semibold text-[#1A1A1A]">{selectedLead.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#B8A89F] mb-1">Email</p>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="font-semibold text-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
                    >
                      {selectedLead.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-[#B8A89F] mb-1">Telefone</p>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="font-semibold text-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
                    >
                      {selectedLead.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-[#B8A89F] mb-1">Data de Registro</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      {format(new Date(selectedLead.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Info */}
              <div className="mb-6 pb-6 border-b border-[#D4C5B9]">
                <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-4">Informações do Negócio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#B8A89F] mb-1">Nome do Negócio</p>
                    <p className="font-semibold text-[#1A1A1A]">{selectedLead.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#B8A89F] mb-1">Tipo de Negócio</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        businessTypeConfig[selectedLead.businessType].color
                      }`}
                    >
                      {businessTypeConfig[selectedLead.businessType].label}
                    </span>
                  </div>
                  {selectedLead.budget && (
                    <div>
                      <p className="text-sm text-[#B8A89F] mb-1">Orçamento Aproximado</p>
                      <p className="font-semibold text-[#1A1A1A]">{selectedLead.budget}€/mês</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Challenges */}
              <div className="mb-6 pb-6 border-b border-[#D4C5B9]">
                <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-4">Desafios Principais</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.currentChallenges.map((challenge, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] rounded-full text-sm font-semibold"
                    >
                      ✓ {challenge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Message */}
              {selectedLead.message && (
                <div className="mb-6">
                  <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-3">Mensagem Adicional</h3>
                  <div className="bg-[#F5F3F0] p-4 rounded-lg border-l-4 border-[#D4AF37]">
                    <p className="text-[#1A1A1A] whitespace-pre-wrap">{selectedLead.message}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-[#D4C5B9] flex gap-3">
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 px-4 py-2 bg-[#D4AF37] text-[#1A1A1A] font-semibold rounded-lg hover:bg-[#B8A89F] transition-colors text-center"
                >
                  Enviar Email
                </a>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 px-4 py-2 bg-[#1A1A1A] text-white font-semibold rounded-lg hover:bg-[#B8A89F] transition-colors text-center"
                >
                  Ligar
                </a>
                <button
                  onClick={() => deleteLead(selectedLead.id)}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
