'use client'
import React, { useState } from 'react';

export default function LoginModal({
  isOpen,
  toggleModal,
  switchToRegister,
  onLoginSuccess,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  toggleModal: () => void;
  switchToRegister: () => void;
  onLoginSuccess: () => void;
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!isOpen) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('role', data.role);
      alert(data.message);
      setEmail('')
      setPassword('')
      toggleModal();
      onLoginSuccess();
      onClose();
      window.location.reload();
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[20px] shadow-lg w-[777px] h-[580px] flex relative">
        <div>
          <img
            src="/backgroun-login-page.png"
            alt="Background"
            className="w-[245px] h-[580px] rounded-l-lg"
          />
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between items-center h-full">
          <button
            onClick={toggleModal}
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
          <div className="flex flex-col items-center w-full">
            <h2 className="text-4xl font-bold mb-6 text-center py-12">Login</h2>
            <form
              onSubmit={onSubmit}
              className="space-y-4 flex flex-col items-center w-full">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-[347px] text-black p-2 border bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ECB365]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-[347px] text-black p-2 border bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ECB365]"
              />
              <p className="text-gray-400">Forgot Password?</p>
              <button
                type="submit"
                className="w-[347px] bg-[#ECB365] text-white px-4 py-2 rounded-lg hover:bg-[#d8a554] transition-colors"
              >
                Login
              </button>
              <p className="text-center text-gray-400">Or Login Using</p>
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-row gap-4">
                  <img src="/facebook-icon.png" className="w-[35px]" alt="Facebook" />
                  <img src="/google-icon.png" className="w-[35px]" alt="Google" />
                </div>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    switchToRegister();
                  }}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
