import { NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import User from "@/app/models/user/User";

//? Login Authentication
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Validasi input
        if (!email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Koneksi ke DB
        await connectDB();

        // Cari user berdasarkan username
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "Login successful!", _id: user._id, email: user.email, username: user.username, role: user.role }, { status: 200 });
        }

        // User tidak ditemukan, buat user baru
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Validasi password
        if (user.password !== password) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        return NextResponse.json({ message: "Login successful!" });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Error during login", error: error }, { status: 500 });
    }
}