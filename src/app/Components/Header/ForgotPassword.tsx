import React, { useState } from 'react';

export default function ForgotPassword({
  closeForgotPassword,
  handlePasswordReset,
}: {
  closeForgotPassword: () => void;
  handlePasswordReset: (email: string) => void;
}) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePasswordReset(email);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[20px] shadow-lg w-[777px] h-[580px] flex relative">
        <button
          onClick={closeForgotPassword}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1 p-6 flex flex-col items-center h-full">
          <h2 className="text-4xl font-bold mb-6 text-center py-12">Forgot Password</h2>
          <form className="space-y-4 flex flex-col items-center w-full" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-[347px] p-2 border bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ECB365]"
            />
            <button
              type="submit"
              className="w-[347px] bg-[#ECB365] text-white px-4 py-2 rounded-lg hover:bg-[#d8a554] transition-colors"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
