import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Post from "@/lib/models/Post";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get("s") || ""; // Ambil query pencarian
        const category = searchParams.get("category") || ""; // 🏷️ Query filter kategori

        const query: Partial<Record<string, unknown>> = {};

        if (search) {
            query.title = { $regex: search, $options: "i" }; // 🔍 Case-insensitive search untuk title
        }

        if (category) {
            query.category = category; // 🏷️ Filter berdasarkan kategori
        }

        const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch posts", error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { title, content, images, category, author } = await request.json();

        // Validasi input
        if (!title || !content || !author || !category || !images) {
            return NextResponse.json(
                { message: "Title, Content, and Author ID are required" },
                { status: 400 }
            );
        }

        // Koneksi ke database
        await connectDB();

        const newPost = new Post({
            images: images || [],
            title,
            content,
            category: category || [],
            author, // Pastikan authorId tersimpan
        });

        await newPost.save();

        return NextResponse.json({
            message: "Post created successfully",
            post: newPost
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { message: "Error creating post", error },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const postId = searchParams.get("id"); // Ambil ID dari query params

        if (!postId) {
            return NextResponse.json(
                { message: "Post ID is required" },
                { status: 400 }
            );
        }

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Post deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json(
            { message: "Failed to delete post", error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();

        const { id, title, content, images } = await request.json(); // Ambil data dari body

        if (!id) {
            return NextResponse.json(
                { message: "Post ID is required" },
                { status: 400 }
            );
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, images },
            { new: true, runValidators: true } // Mengembalikan post yang sudah diperbarui
        );

        if (!updatedPost) {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Post updated successfully", post: updatedPost },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json(
            { message: "Failed to update post", error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}