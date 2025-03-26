import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Post from "@/lib/models/Post";

export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        await connectDB();
        const post = await Post.findById(context.params.id).lean();
        if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });

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
        const updatedData = await req.json();
        const updatedPost = await Post.findByIdAndUpdate(context.params.id, updatedData, { new: true });

        if (!updatedPost) return NextResponse.json({ message: "Post not found" }, { status: 404 });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update post", error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}