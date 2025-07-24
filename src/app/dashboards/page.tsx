// app/dashboard/page.tsx (Server Component)
import AdminDashboard from '@/components/server/dashboard/dashboard';
import dynamic from 'next/dynamic';

// Dynamically load the AdminDashboard Client Component
// const AdminDashboard = dynamic(() => import('../../components/server/dashboard/dashboard'), {
//   ssr: false,
// });

export const revalidate = 60; // Enable ISR – regenerate this page every 60s

export default function DashboardPage() {
  return <AdminDashboard />;
}

























