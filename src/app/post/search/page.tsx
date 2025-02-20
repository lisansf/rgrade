'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query: string = searchParams.get("q") ?? ""; // ✅ Pastikan `query` selalu string

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query) return;

        const fetchPosts = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`/api/post?s=${encodeURIComponent(query)}`);
                if (!response.ok) throw new Error("Failed to fetch posts");

                const data: Post[] = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [query]);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-4">
                Search Results for {query}
            </h1>

            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && posts.length === 0 && query && (
                <p className="text-center text-gray-500">No posts found.</p>
            )}

            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post._id} className="border p-4 rounded-lg shadow-md">
                        <Link href={`/post/${post.title.replace(/\s+/g, '-')}`}>
                            <h2 className="text-xl font-bold text-blue-600 hover:underline">{post.title}</h2>
                        </Link>
                        <p className="text-gray-700">{post.content.slice(0, 100).replace(/<\/?[^>]+(>|$)/g, "")}...</p>
                        <p className="text-sm text-gray-500">By {post.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}