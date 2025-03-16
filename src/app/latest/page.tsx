'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { LoadingComponent } from '@/app/Components/Status';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  images: string;
}

export default function Latest() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/archive", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Latest News
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Articles Section */}
        <div className="flex-1 grid grid-cols-1 gap-8">
          {isLoading ? (
            <LoadingComponent />
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts available.</p>
          ) : (
            <div className="flex flex-col gap-8">
              {posts.slice(0, 10).map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-100 w-[857px] rounded-lg shadow-md flex flex-col"
                >
                  {/* Artikel Box */}
                  <div className="h-[478px] w-full bg-gray-300 flex items-start justify-start p-4 rounded-t-lg">
                    <p><img src={post.images || "https://placehold.co/857x400"} /></p>
                  </div>
                  {/* Judul Artikel */}
                  <div className="p-4 w-full bg-white rounded-b-lg">
                    <h2 className="text-lg font-medium text-gray-800">
                      {post.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Advertisements Section */}
        <div className="w-full lg:w-[279px] flex flex-col gap-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`ad-${index}`}
              className="bg-gray-200 h-[578px] w-full rounded-lg shadow-md flex items-start justify-start p-4"
            >
              Ad Box {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}