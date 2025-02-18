import { NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import User from "@/app/models/user/User";

export async function POST(request: Request) {
    try {
        const { email, username, password } = await request.json();

        if (!email || !username || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        await connectDB();

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ message: "Username already taken" }, { status: 400 });
        }

        const newUser = new User({ email, username, password });
        await newUser.save();

        return NextResponse.json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error during signup:", error);
        return NextResponse.json({ message: "Error during signup", error: error }, { status: 500 });
    }
}