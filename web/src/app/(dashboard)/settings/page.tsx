'use client';

import { appConfig } from '@/config/appConfig';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SettingsPage() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newPassword) {
      toast.warning('New password is required', {
        position: 'top-center',
      });
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-center',
      });
      return;
    }

    const res = await fetch(`${appConfig.backend_Url}/auth/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        newPassword,
      }),
    });

    const result = await res.json();

    console.log(result);

    if (result.code !== 200) {
      toast.error(result.error || 'Something went wrong', {
        position: 'top-center',
      });
    }

    toast.success('Password reset successful', {
      position: 'top-center',
    });
  };

  return (
    <h1 className="text-2xl font-bold">
      <h2 className="text-xl font-semibold">Password Reset</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            className="w-full border px-3 py-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="w-full border px-3 py-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Reset Password
        </button>
      </form>
    </h1>
  );
}
