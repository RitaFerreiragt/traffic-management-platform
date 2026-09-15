import AdminHeader from '@/components/admin/AdminHeader';

export const metadata = {
  title: 'Admin Dashboard - Traffic Management',
  description: 'Dashboard administrativo',
};

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAF8] to-[#F5F3F0] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <h1 className="font-playfair text-4xl font-bold text-[#1A1A1A] mb-4">
              Bem-vindo ao Dashboard Admin
            </h1>
            <p className="text-[#B8A89F] mb-8">Selecciona uma opção no menu acima para começar</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <a
                href="/admin/leads"
                className="p-6 bg-white rounded-lg border border-[#D4C5B9] hover:shadow-lg transition-shadow"
              >
                <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-2">🎯 Leads</h2>
                <p className="text-[#B8A89F]">Gerir e acompanhar todos os leads</p>
              </a>
              <a
                href="/admin/settings"
                className="p-6 bg-white rounded-lg border border-[#D4C5B9] hover:shadow-lg transition-shadow"
              >
                <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-2">⚙️ Configurações</h2>
                <p className="text-[#B8A89F]">Ajustar preferências e integrações</p>
              </a>
              <a
                href="/admin/help"
                className="p-6 bg-white rounded-lg border border-[#D4C5B9] hover:shadow-lg transition-shadow"
              >
                <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-2">❓ Ajuda</h2>
                <p className="text-[#B8A89F]">Documentação e suporte</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
