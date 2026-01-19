"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, getUserProfile, deleteUser } from "@/lib/api"; // ✅ Tambahkan deleteUser
import { User } from "@/lib/types";
import { CldUploadWidget } from "next-cloudinary";

export default function ProfilePage() {
    const router = useRouter();

    // * State untuk data user
    const [user, setUser] = useState<User | null>(null);
    const [newUsername, setNewUsername] = useState("");
    const [newProfilePict, setNewProfilePict] = useState("");
    const [isLoading, setIsLoading] = useState(true); // ✅ Tambahkan loading state
    const [error, setError] = useState<string | null>(null); // ✅ Tambahkan error state

    // * Ambil data user dari API atau SessionStorage
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = sessionStorage.getItem("username");
                if (!username) {
                    alert("Please log in first.");
                    return;
                }

                const userData = await getUserProfile(username);
                if (userData) {
                    setUser(userData);
                    setNewUsername(userData.username);
                    setNewProfilePict(userData.profilePict);
                } else {
                    setError("User not found or session expired.");
                }
            } catch (err) {
                setError("Failed to fetch user data.");
                console.error("Error fetching user data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    interface CloudinaryUploadResult {
        info: {
            secure_url: string;
            [key: string]: unknown;
        };
    }

    // * Hapus Akun
    const handleDeleteAccount = async () => {
        if (!user) return;

        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
        if (!confirmDelete) return;

        try {
            const res = await deleteUser(user.email);
            if (res) {
                alert("Account deleted successfully!");
                sessionStorage.clear();
                router.push("/");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Failed to delete account.");
        }
    };

    // * Handle Submit Update Profile
    const handleUpdateProfile = async () => {
        if (!user) return;

        try {
            const updatedUser = await updateProfile(user.email, {
                username: newUsername,
                profilePict: newProfilePict,
            });

            if (updatedUser) {
                alert("Profile updated successfully!");
                sessionStorage.setItem("username", newUsername);
                sessionStorage.setItem("profilePict", newProfilePict);
                router.refresh();
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>

            {isLoading ? (
                <p className="text-gray-500">Loading profile...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : user ? (
                <div className="flex flex-col items-center gap-4">
                    {/* Foto Profil */}
                    <img
                        src={newProfilePict}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border border-gray-300"
                    />

                    {/* Upload Foto Profil */}
                    <CldUploadWidget
                        uploadPreset="rgidb_upload_preset"
                        onSuccess={(result: unknown) => {
                            const uploadResult = result as CloudinaryUploadResult;
                            setNewProfilePict(uploadResult.info.secure_url);
                        }}
                    >
                        {({ open }) => (
                            <button
                                onClick={() => open()}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Change Profile Picture
                            </button>
                        )}
                    </CldUploadWidget>

                    {/* Edit Username */}
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md mt-1"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>

                    {/* Email (Tidak Bisa Diedit) */}
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-md mt-1 bg-gray-100"
                            value={user.email}
                            disabled
                        />
                    </div>

                    {/* Role */}
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold">Role</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md mt-1 bg-gray-100"
                            value={user.role}
                            disabled
                        />
                    </div>

                    {/* Tombol Update */}
                    <button
                        onClick={handleUpdateProfile}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                </div>
            ) : null}

            {/* Tombol Hapus Akun */}
            {!isLoading && !error && user && (
                <button
                    onClick={handleDeleteAccount}
                    className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
                >
                    Delete Account
                </button>
            )}
        </div>
    );
}