'use client';

import { useAuthInfo } from '@/provider/AuthProvider';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthInfo();

  if (!user) {
    return (
      <div className="flex min-h-screen" suppressHydrationWarning>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="text-gray-600">
            Please log in to access your dashboard.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" suppressHydrationWarning>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold">Menu</h2>
          {user && (
            <p className="text-sm text-gray-400 mt-2">Hello, {user.name}</p>
          )}
        </div>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/settings" className="hover:text-gray-300">
              Settings
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
