'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type registerData = {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
};
const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerData>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

  const onSubmit = async (data: registerData) => {
    setError(null);

    console.log(data);

    if (!data.name || !data.username || !data.email || !data.password) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);

    // email validate
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: data.name,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      };

      const res = await fetch(`${apiBase}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.status !== 200) {
        setError(result?.message || result?.error || 'Registration failed');
        toast.error(result?.message || result?.error || 'Registration failed');
        setLoading(false);
        return;
      }

      toast.success('Registration successful. Redirecting to verify email...');
      setTimeout(() => router.push('/verify-email'), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Full name
        </label>
        <div className="mt-2">
          <input
            id="name"
            {...register('name', {
              required: { value: true, message: 'Name is required' },
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters long',
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Username
        </label>
        <div className="mt-2">
          <input
            id="username"
            {...register('username', { required: true })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            {...register('email', {
              required: true,
              validate: (v) => v.includes('@'),
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Phone number
        </label>
        <div className="mt-2">
          <input
            id="phone"
            {...register('phoneNumber', { required: true })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            {...register('password', { required: true })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div className=" *:mt-2 flex justify-center font-semibold">
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
