'use client';

import { useState } from "react";

export default function RegisterModal({
  isOpen,
  toggleModal,
  switchToLogin,
  onClose,
}: {
  isOpen: boolean;
  toggleModal: () => void;
  switchToLogin: () => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isProfileModalOpen, setProfileModalOpen] = useState(false); // Tambahan untuk modal profil

  if (!isOpen) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPass) {
      alert('Passwords do not match');
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message); // Signup success
      setEmail('');
      setUserName('');
      setPassword('');
      setConfirmPass('');
      setProfileModalOpen(true); // Buka modal profil
      onClose();
    } else {
      alert(data.message); // Error message
    }
  };

  const onProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Tambahkan logika penyimpanan profil
    alert('Profile updated successfully!');
    setProfileModalOpen(false);
    toggleModal(); // Tutup modal registrasi
    switchToLogin(); // Alihkan ke login
  };

  return (
    <>
      {/* Register Modal */}
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
              <h2 className="text-4xl font-bold mb-6 text-center py-6">Register</h2>
              <form
                onSubmit={onSubmit}
                className="space-y-4 flex flex-col items-center w-full">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="w-[347px] p-2 border bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ECB365]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-[347px] p-2 border bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ECB365]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-[347px] p-2 border bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ECB365]"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                  className="w-[347px] p-2 border bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ECB365]"
                />
                <button
                  type="submit"
                  className="w-[347px] bg-[#ECB365] text-white px-4 py-2 rounded-lg hover:bg-[#d8a554] transition-colors"
                >
                  Register
                </button>
                <p className="text-center text-gray-400">Or Register Using</p>
                <div className="flex gap-4">
                  <img src="/facebook-icon.png" alt="Facebook" className="w-[35px]" />
                  <img src="/google-icon.png" alt="Google" className="w-[35px]" />
                </div>
              </form>
            </div>
            <button
              className="text-blue-500 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                toggleModal();
                switchToLogin();
              }}
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-[20px] shadow-lg w-[600px] p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Complete Your Profile</h2>
            <form onSubmit={onProfileSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border bg-[#EFEFEF] rounded-md"
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                className="w-full p-2 border bg-[#EFEFEF] rounded-md"
                required
              />
              <select
                className="w-full p-2 border bg-[#EFEFEF] rounded-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="file"
                className="w-full p-2 border bg-[#EFEFEF] rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#ECB365] text-white px-4 py-2 rounded-lg"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
