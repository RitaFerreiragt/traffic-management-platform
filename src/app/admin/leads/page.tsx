import AdminHeader from '@/components/admin/AdminHeader';
import LeadsAdminDashboard from '@/components/admin/LeadsAdminDashboard';

export const metadata = {
  title: 'Dashboard Admin - Traffic Management',
  description: 'Gerir leads e acompanhar campanhas',
};

export default function AdminLeadsPage() {
  return (
    <>
      <AdminHeader />
      <LeadsAdminDashboard />
    </>
  );
}
