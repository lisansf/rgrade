import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Post from "@/lib/models/Post";

// ✅ FIX: Gunakan `context` untuk menangkap `params`
export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        await connectDB();

        const postId = context.params.id; // Ambil ID dari params
        if (!postId) {
            return NextResponse.json({ message: "Invalid Post ID" }, { status: 400 });
        }

        const post = await Post.findById(postId).lean();
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch post", error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
    try {
        await connectDB();

        const postId = context.params.id;
        if (!postId) {
            return NextResponse.json({ message: "Invalid Post ID" }, { status: 400 });
        }

        const updatedData = await req.json();
        const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, { new: true, runValidators: true });

        if (!updatedPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update post", error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}