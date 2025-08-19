import Link from 'next/link';

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/registration"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default page;
