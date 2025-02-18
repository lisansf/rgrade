'use client';

import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Link from 'next/link';
import Profile from './Profile';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };

  const switchToRegister = () => {
    setIsModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false); // ✅ Tutup modal login
    window.location.reload(); // ✅ Refresh halaman agar session terupdate
  };

  return (
    <>
      <header>
        <div className="bg-[#ECB365] h-1.5 w-full"></div>

        <nav className="bg-customDarkBlue text-white p-4 flex justify-between px-5 text-1xl font-bold py-8">
          <div className="max-w-[1365px] mx-auto w-full flex justify-between items-center">
            <div className="flex items-center gap-8">
              <img src="/Logo_White.png" className="w-[4rem]" alt="Logo" />
              <img src="/Garis.png" className="w-[0.5rem] h-10" alt="separator" />
            </div>

            <div className="flex gap-10">
              <Link href="/" className="hover:text-[#ECB365]">Home</Link>
              <Link href="/post/latest" className="hover:text-[#ECB365]">Latest</Link>
              <Link href="/post/guide" className="hover:text-[#ECB365]">Guide</Link>
              <Link href="/post/category" className="hover:text-[#ECB365]">Category</Link>
            </div>

            {/* Search Bar dan Profile */}
            <div className="flex gap-10 relative items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <Profile />
            </div>
          </div>
        </nav>
      </header>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-customDarkBlue text-white w-64 p-5 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl text-[#ECB365] font-bold mb-5">Discover</h2>
        <img src="/PemisahOrange.png" alt="Separator" />
        <Link
          href="/"
          className="block py-2 pt-8 text-2xl font-bold hover:text-[#ECB365]">
          Home
        </Link>
        <img src="PemisahPutih.png" alt="Separator" />
        <Link
          href="/post/latest"
          className="block py-2 text-2xl font-bold hover:text-[#ECB365]">
          Latest
        </Link>
        <img src="PemisahPutih.png" alt="Separator" />
        <Link
          href="/post/guide"
          className="block py-2 text-2xl font-bold hover:text-[#ECB365]">
          Guide
        </Link>
        <img src="PemisahPutih.png" alt="Separator" />
        <Link
          href="/post/category"
          className="block py-2 text-2xl font-bold hover:text-[#ECB365]">
          Category
        </Link>
      </div>

      <LoginModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        switchToRegister={switchToRegister}
        onLoginSuccess={handleLoginSuccess}
      />

      <RegisterModal isOpen={isRegisterModalOpen} toggleModal={toggleRegisterModal} switchToLogin={switchToLogin} />
    </>
  );
}
