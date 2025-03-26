import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Post from "@/lib/models/Post";

export async function GET(request: Request, { params }: { params: Record<string, string> }) {
    try {
        await connectDB();

        const postId = params.id; // Ambil ID dari params
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

export async function PUT(request: Request, { params }: { params: Record<string, string> }) {
    try {
        await connectDB();

        const postId = params.id; // Ambil ID dari params
        if (!postId) {
            return NextResponse.json({ message: "Invalid Post ID" }, { status: 400 });
        }

        const { title, content, images, category, tags } = await request.json(); // Ambil data dari body

        // Validasi input
        if (!title || !content || !category || !tags) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content, images, category, tags },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Post updated successfully", post: updatedPost },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update post", error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}