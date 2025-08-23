import React from 'react';

const VerifyEmailMessagePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Verify your email
        </h2>
        <p className="mt-4 text-center text-gray-600">
          We’ve sent a verification link to your email address.
          <br />
          Please check your inbox (and spam folder) to continue.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailMessagePage;
