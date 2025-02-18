"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { LoadingComponent } from "@/app/Components/Status";
interface Post {
    title: string;
    content: string;
    author: string;
}

export default function PostSlug() {
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const slug = params?.slug ? String(params.slug) : ""; // Pastikan `slug` adalah string

    useEffect(() => {
        if (!slug) return; // Jangan fetch jika slug tidak ada

        const fetchPost = async () => {
            try {
                const response = await fetch("/api/post", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const data: Post[] = await response.json();

                // Ubah slug menjadi format yang sama seperti judul (contoh: "ini-contoh" => "Ini Contoh")
                const formattedTitle = slug.replace(/-/g, " ");

                // Cari post yang judulnya cocok dengan slug dari URL
                const matchedPost = data.find(
                    (post) => post.title.toLowerCase() === formattedTitle.toLowerCase()
                );

                if (matchedPost) {
                    setPost(matchedPost);
                } else {
                    setError("Postingan tidak ditemukan.");
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message || "Terjadi kesalahan");
                } else {
                    setError("Unknown error occurred");
                }
            }
        };

        fetchPost();
    }, [slug]);

    // **Jika terjadi error**
    if (error) {
        return (
            <div className="w-full p-6 bg-red-100 text-red-600">
                <h1 className="text-xl font-bold">Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    // **Jika postingan belum dimuat**
    if (!post) {
        return <LoadingComponent />;
    }

    // **Render detail postingan jika ditemukan**
    return (
        <div className="w-full bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-2">By {post.author}</p>
            <div className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
    );
}