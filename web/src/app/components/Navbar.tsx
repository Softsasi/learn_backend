'use client';

import { useAuthInfo } from '@/provider/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { user, setUser } = useAuthInfo();

  const handleLogOut = () => {
    // Implement logout functionality, e.g., clear cookies, update context, redirect, etc.
    console.log('Logging out...');
    // destroy local storage access token, refresh token and user
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setUser(null);

    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white">My Next App</span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/post"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Post
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        {!user ? (
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              href="/registration"
              className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-300">Hello, {user.name}</span>
            <Link
              href="#"
              className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              onClick={handleLogOut}
            >
              Logout
            </Link>
          </div>
        )}

        {/* Mobile Menu Placeholder */}
        {/* <button className="md:hidden text-gray-300 hover:text-white focus:outline-none">
          ☰
        </button> */}
      </nav>
    </header>
  );
};

export default Navbar;
