'use client';
import { useEffect, useState } from 'react';
import { LoadingComponent, ErrorComponent } from '../Components/Status';
import Link from 'next/link';

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
}

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]); // Tambahkan tipe array Post
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    //? FETCHING BY USERNAME SEARCH
    // const fetchPostsByUser = async (username: string) => {
    //     try {
    //         const response = await fetch(`/api/post?author=${username}`);
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch posts");
    //         }
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error("Error fetching posts:", error);
    //     }
    // };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data: Post[] = await response.json(); // Berikan tipe untuk respons data
                setPosts(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('unknown Error!')
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <ErrorComponent msg={`Error: ${error}`} />;
    }

    return (
        <div className='py-3'>
            <ul>
                {posts.map((post) => (
                    <li key={post._id} style={{ border: '1px solid black', padding: '10px', width: 'auto', }}>
                        <Link href={`/post/${post.title.replace(/\s+/g, '-')}`} className="text-[2rem] font-bold">{post.title}</Link>
                        <p>Author: {post.author || 'Unknown'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}