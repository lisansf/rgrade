'use client';

import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useRouter } from "next/navigation";

export default function Profile() {
    const [dropDown, setDropDown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        name: "",
        img: "",
        role: "",
    });

    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropDown && !(event.target as HTMLElement).closest(".dropdown-container")) {
                setDropDown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropDown]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleRegisterModal = () => {
        setIsRegisterModalOpen(!isRegisterModalOpen);
    };

    const switchToRegister = () => {
        setIsModalOpen(false); // Tutup login modal
        setIsRegisterModalOpen(true); // Buka register modal
    };

    const switchToLogin = () => {
        setIsRegisterModalOpen(false); // Tutup register modal
        setIsModalOpen(true); // Buka login modal
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // ✅ Perbarui state user
        setIsModalOpen(false); // ✅ Tutup modal login
        window.location.reload(); // ✅ Refresh halaman agar session terupdate
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const username = sessionStorage.getItem("username") || "";
            const name = sessionStorage.getItem("name") || "";
            const img = sessionStorage.getItem("img") || "/person.png";
            const role = sessionStorage.getItem("role") || "";

            setIsLoggedIn(!!username);
            setUserData({ username, name, img, role });
        }
    }, [router]);

    return (
        <div className="relative">
            <button
                onClick={() => setDropDown((prev) => !prev)}
                className="flex items-center"
            >
                <img
                    src={userData.img || "/person.png"}
                    alt={`Pic of ${userData.username}`}
                    className="w-[50px] h-[50px] rounded-full "
                />
            </button>

            <div
                className={`absolute top-[60px] right-0 ${isLoggedIn ? "w-[250px]" : "w-[150px]"}
                    bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${dropDown ? "opacity-100 max-h-[400px]" : "opacity-0 max-h-0"}
                `}
            >
                {!isLoggedIn ? (
                    <div className="flex flex-col p-2 gap-2">
                        <div
                            onClick={toggleModal}
                            className="text-gray-700 hover:text-blue-500 text-center cursor-pointer transform transition-transform duration-200 hover:scale-125">
                            <span>Login</span>
                        </div>
                        <div
                            onClick={toggleRegisterModal}
                            className="text-gray-700 hover:text-blue-500 text-center cursor-pointer transform transition-transform duration-200 hover:scale-125">
                            <span>Register</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-2 p-3 border-b border-gray-300">
                            <img
                                src={userData.img || "https://placehold.co/60x60"}
                                alt={`Pic of ${userData.username}`}
                                className="w-[50px] h-[50px] rounded-full"
                            />
                            <div className="truncate">
                                <p className="font-semibold text-gray-800">{userData.username}</p>
                                <p className="text-sm text-gray-500">{userData.name}</p>
                                <p className="text-xs text-gray-400">{userData.role}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 p-3">
                            <a href="/profile" className="text-gray-700 hover:text-blue-500">
                                Profile
                            </a>
                            {userData.role === "admin" && (
                                <a href="/dashboard" className="text-gray-700 hover:text-blue-500">
                                    Dashboard
                                </a>
                            )}
                            <button
                                onClick={() => {
                                    sessionStorage.clear();
                                    setUserData({ username: "", name: "", img: "", role: "" });
                                    setIsLoggedIn(false);
                                    router.refresh();
                                }}
                                className="text-red-500 hover:text-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Tampilkan modal jika state aktif */}
            {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} toggleModal={toggleModal} switchToRegister={switchToRegister} onLoginSuccess={handleLoginSuccess} />}
            {showRegister && <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} toggleModal={toggleRegisterModal} switchToLogin={switchToLogin} />}
            {/* Modal Login */}
            <LoginModal
                isOpen={isModalOpen}
                toggleModal={toggleModal}
                switchToRegister={switchToRegister}
                onLoginSuccess={handleLoginSuccess}
                onClose={toggleModal}
            />

            {/* Modal Register */}
            <RegisterModal
                isOpen={isRegisterModalOpen}
                toggleModal={toggleRegisterModal}
                switchToLogin={switchToLogin}
                onClose={toggleRegisterModal}
            />
        </div>
    );
}
