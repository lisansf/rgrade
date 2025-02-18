import { NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import Post from "@/app/models/post/Post";

export async function GET() {
    try {
        await connectDB();

        const posts = await Post.find().sort({ createdAt: -1 });

        return NextResponse.json(posts, { status: 200 });
    } catch (err) {
        if (err instanceof Error) {
            console.error("There's an error:", err.message)
        }
        return NextResponse.json(
            { message: "Failed to fetch posts", err },
            { status: 500 }
        );
    }
}