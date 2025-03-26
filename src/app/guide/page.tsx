'use client'

import { useState, useEffect } from "react";
import { getPosts } from "@/lib/api"
import { Post } from "@/lib/types"

export default function Guides() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data: Post[] = await getPosts();
                if (data) {
                    // **Filter hanya yang memiliki tags "guides" atau "tips"**
                    const filteredPosts = data.filter(post =>
                        post.tags?.some(tag => tag.toLowerCase() === "guides" || tag.toLowerCase() === "tips")
                    );

                    setPosts(filteredPosts);
                    // console.log(filteredPosts); // 🔍 Debugging
                }
            } catch (err) {
                console.error(err instanceof Error ? `Error fetching posts: ${err.message}` : 'Unknown error');
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <h1>Tips & Guides</h1>
            {posts.length > 0 ? (
                posts.map((postItem, index) => (
                    <div key={index}>
                        <h2>{postItem.title}</h2>
                        <p>Tags: {postItem.tags?.join(", ") || "No tags"}</p>
                    </div>
                ))
            ) : (
                <p>No posts available with guide or tips tags.</p>
            )}
        </>
    );
}