"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPostById, updatePost } from "@/lib/api";

export default function EditPost() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                if (!data) throw new Error("Post not found");

                setTitle(data.title);
                setContent(data.content);
            } catch (err) {
                console.error("Error fetching post:", err);
            }
        };

        fetchPost();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedPost = { title, content };
            const success = await updatePost(id, updatedPost);

            if (success) {
                alert("Post updated successfully!");
                router.push("/dashboard");
            }
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button type="submit">Update</button>
        </form>
    );
}