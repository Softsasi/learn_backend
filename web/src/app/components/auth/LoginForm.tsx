'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const apiBase = process.env.NEXT_PUBLIC_API_URL ?? '';

type inputData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputData>();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<inputData> = async (data) => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ email: data.email, password: data.password }),
        credentials: 'include',
      });

      const result = await res.json();
      console.log(result);

      if (result.error) {
        setError(
          result?.status && result.status === 404
            ? 'User not found'
            : result.error || 'Something went wrong'
        );
        setLoading(false);
        return;
      }

      toast.success('Login successful!', {
        delay: 100,
        position: 'top-right',
      });

      setTimeout(() => {
        router.push('/');
      }, 2500);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // let random = Math.random();
  // useEffect(() => {
  //   let sum = 0;
  //   console.time('render');

  //   for (let index = 0; index < 500000000; index++) {
  //     sum += index + random;
  //   }
  //   console.timeEnd('render');
  // }, [getValues]);

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              required
              {...register('email', { required: 'Email is required' })}
              autoComplete="email"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              type="password"
              required
              {...register('password', { required: 'Password is required' })}
              autoComplete="current-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="mt-2 flex justify-center font-semibold">
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Not a user?
        <Link
          href="/registration"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Signup
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
