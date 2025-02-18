import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorComponent, LoadingComponent } from "../Status";

interface Post {
    _id: string;
    images: string[];
    title: string;
    content: string;
    author: string;
    createdAt: Date;
}

export default function MyPosts() {
    const [showPosts, setShowPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`/api/post`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const data: Post[] = await response.json();
                const currentUser = sessionStorage.getItem("username");
                const filteredPosts = data.filter((post) => post.author === currentUser);

                setShowPosts(filteredPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setIsError(true);
                setErrorMessage(error instanceof Error ? error.message : "Unknown error");
            } finally {
                setIsLoading(false);
            }
        };

        getPost();
    }, []);

    // 🗑️ Fungsi untuk menghapus post
    const handleDelete = async (postId: string) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        setDeleting(postId);

        try {
            const response = await fetch(`/api/post?id=${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

            setShowPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Error deleting post");
        } finally {
            setDeleting(null);
        }
    };

    return (
        <>
            {isLoading && <LoadingComponent />}
            {isError && <ErrorComponent msg={`Error: ${errorMessage}`} />}
            {!isLoading && !isError && showPosts.length === 0 && (
                <div>
                    <p>No post available.</p>
                </div>
            )}
            {!isLoading && !isError && showPosts.length > 0 && (
                <div className="px-4 bg-gray-100 py-4">
                    <table className="rounded-lg drop-shadow-[0_0_1px_black] w-full bg-gray-100">
                        <thead className="w-full">
                            <tr className="bg-[rgb(4_28_50)] text-white">
                                <th className="w-[100px] p-2">Image</th>
                                <th className="w-2/3 p-2">Title</th>
                                <th className="p-2">Created At</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showPosts.map((post) => (
                                <tr key={post._id} className="border-b">
                                    <td className="p-2">
                                        <img
                                            src={post.images[0] || "https://via.placeholder.com/80"}
                                            alt="Post Thumbnail"
                                            className="h-[80px] w-[80px] object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="font-bold p-2">{post.title}</td>
                                    <td className="text-center p-2">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="text-center p-2">
                                        <button
                                            onClick={() => router.push(`/edit-post/${post._id}`)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            disabled={deleting === post._id}
                                        >
                                            {deleting === post._id ? "Deleting..." : "🗑️ Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}