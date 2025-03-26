"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { LoadingComponent, ErrorComponent, PostNotFound } from "@/app/Components/Status";
import { getPosts } from "@/lib/api";
import { Post } from "@/lib/types";

export default function PostSlug() {
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const slug = params?.slug ? String(params.slug) : ""; // Pastikan `slug` adalah string

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            try {
                const data: Post[] = await getPosts();
                const formattedTitle = slug.replace(/-/g, " "); // Format slug ke judul

                // Cari postingan berdasarkan title
                const matchedPost = data.find(
                    (post) => post.title.toLowerCase() === formattedTitle.toLowerCase()
                );

                if (matchedPost) {
                    setPost(matchedPost);
                }
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Terjadi kesalahan saat memuat data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    // **Tampilkan Loading**
    if (isLoading) return <LoadingComponent />;

    // **Tampilkan Error**
    if (error) return <ErrorComponent msg={error} />;

    // **Tampilkan Not Found jika tidak ada postingan**
    if (!post) return <PostNotFound />;

    // **Render detail postingan jika ditemukan**
    return (
        <div className="w-full bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-2">By {post.author}</p>
            <p className="text-gray-500 mb-2">Category: {post.category.join(", ")}</p>
            <p className="text-gray-500 mb-2">Tags: {post.tags.join(", ")}</p>
            <div className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
    );
}