"use client"; // ✅ Tambahkan ini agar jadi Client Component

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { fetchPostsByCategory } from "@/lib/api";
import { Post } from "@/lib/types";

export default function CategoryPage() {
    const params = useParams();
    const category = params?.slug ? String(params.slug) : "";
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (!category) return;
        const fetchData = async () => {
            const data = await fetchPostsByCategory(category);
            setPosts(data);
        };
        fetchData();
    }, [category]);

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold">Kategori: {category}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                    <div key={post._id} className="p-4 border rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <a href={`/${post.title.replace(/\s+/g, '-')}`} className="text-blue-500 hover:underline">
                            Baca Selengkapnya
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}