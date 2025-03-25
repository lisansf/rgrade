'use client'

import { useState, useEffect } from "react";

import { getPosts } from "@/lib/api"
import { Post } from "@/lib/types"

export default function Guides() {
    const [post, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data: Post[] = await getPosts();

                if (data) {
                    setPosts(data);
                    console.log(data)
                }
            } catch (err) {
                console.error(err instanceof Error ? `Error Tags: ${err.message}` : 'Unknown error');
            }
        }

        fetchPosts()
    }, [])

    return (
        <>
            <h1>Tips & Guides</h1>
            {post.map((post) => {
                <div>
                    <p>Tags: {post.tags}</p>
                </div>
            })}
        </>
    )
}