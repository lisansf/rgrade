'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { searchPosts } from "@/lib/api";
import { Post } from "@/lib/types";

export default function SearchComponent() {
    const searchParams = useSearchParams();
    const query: string = searchParams.get("q") ?? "";

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query) return;

        const fetchPosts = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await searchPosts(query);
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
                {query ? `Search Results for "${query}"` : "Enter a search term"}
            </h1>

            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && posts.length === 0 && query && (
                <p className="text-center text-gray-500">No posts found.</p>
            )}

            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post._id} className="border p-4 rounded-lg shadow-md">
                        <Link href={`/${post.title.replace(/\s+/g, '-')}`}>
                            <h2 className="text-xl font-bold text-blue-600 hover:underline">{post.title}</h2>
                        </Link>
                        <p className="text-gray-700">{post.content.slice(0, 100).replace(/<\/?[^>]+(>|$)/g, "")}...</p>
                        <p className="text-sm text-gray-500">By {post.author}</p>
                        <p className="text-sm text-gray-500">By {post.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}