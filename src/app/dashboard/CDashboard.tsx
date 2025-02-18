'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LoadingComponent } from '../Components/Status';
import DashboardMenu from "@/app/Components/Dashboard/Dashboardmenu";
import MyPosts from "../Components/Dashboard/MyPosts";
import AddPost from "../Components/Dashboard/AddPost";

function CDashboard() {
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Untuk menghindari flash sebelum redirect
    const router = useRouter();

    useEffect(() => {
        const storedUsername = sessionStorage.getItem("username");
        const storedRole = sessionStorage.getItem("role"); // Ambil role dari sessionStorage

        if (!storedUsername || storedRole !== "admin") {
            alert("Access Denied! Admin only.");
            router.push("/"); // Redirect ke halaman utama
        } else {
            setUsername(storedUsername);
            setRole(storedRole);
        }

        setLoading(false); // Hentikan loading setelah cek selesai
    }, [router]);

    if (loading) {
        return <LoadingComponent />; // Mencegah tampilan flash sebelum redirect
    }

    return (
        <>
            {!username || role !== "admin" ? (
                <h1>Access Denied!</h1>
            ) : (
                <div className="flex flex-col gap-2 pt-4">
                    <div className="bg-gray-100 shadow-md">
                        <div className="flex justify-between items-center py-1">
                            <h1 className="text-4xl pl-6 font-bold">Dashboard</h1>
                            <DashboardMenu /> {/* Menu berada di sebelah judul */}
                        </div>
                    </div>
                    <div id="addpost">
                        <AddPost />
                    </div>
                    <div id="posts" className="mt-4">
                        <h1>My Post</h1>
                        <MyPosts />
                    </div>
                </div>)
            }
        </>
    );
}

export default CDashboard;