import { NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import Post from "@/app/models/post/Post";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const author = searchParams.get("author"); // Ambil username dari query params

        let query = {};
        if (author) {
            query = { author }; // Cari berdasarkan username
        }

        const posts = await Post.find(query);

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { message: "Failed to fetch posts", error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { title, content, images, author } = await request.json();

        // Validasi input
        if (!title || !content || !author) {
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