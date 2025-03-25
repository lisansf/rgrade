import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/lib/models/User";

// * GET: Ambil data user berdasarkan username
export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        if (!username) {
            return NextResponse.json({ message: "Username is required" }, { status: 400 });
        }

        const user = await User.findOne({ username }).select("-password").lean();
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return error instanceof Error ? NextResponse.json({ message: "Failed to fetch user", error: error.message }, { status: 500 }) : NextResponse.json({ message: "Failed to fetch user", error }, { status: 500 });
    }
}

// * PUT: Update profil user
export async function PUT(request: Request) {
    try {
        await connectDB();
        const { email, username, profilePict } = await request.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { username, profilePict },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return error instanceof Error ? NextResponse.json({ message: "Failed to update profile", error: error.message }, { status: 500 }) : NextResponse.json({ message: "Failed to update profile", error }, { status: 500 });
    }
}

// * DELETE: Hapus user berdasarkan email
export async function DELETE(request: Request) {
    try {
        await connectDB();
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        return error instanceof Error ? NextResponse.json({ message: "Failed to delete user", error: error.message }, { status: 500 }) : NextResponse.json({ message: "Failed to delete user", error }, { status: 500 });
    }
}