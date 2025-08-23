import { Link } from 'react-router';

const Navbar = () => {
  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white">My Vite App</span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/post"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Post
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/registration"
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Placeholder */}
        <button className="md:hidden text-gray-300 hover:text-white focus:outline-none">
          ☰
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
