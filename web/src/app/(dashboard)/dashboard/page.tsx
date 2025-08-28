'use client';

import { useAuthInfo } from '@/provider/AuthProvider';

export default function DashboardPage() {
  const user = useAuthInfo();
  return <h1 className="text-2xl font-bold">Dashboard</h1>;
}
