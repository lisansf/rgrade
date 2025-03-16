import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// * Library
import { Post } from "@/lib/types";
import { deletePost, getPosts } from "@/lib/api";

// * Components
import { ErrorComponent, LoadingComponent } from "@/app/Components/Status";

export default function MyPosts() {
    // * State
    const [showPosts, setShowPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [deleting, setDeleting] = useState<string | null>(null);
    const router = useRouter(); // * Router

    useEffect(() => {
        const fetchPosts = async () => { // * Mengambil semua Post
            try {
                const data: Post[] = await getPosts(); // * Fetching Posts
                const currentUser = sessionStorage.getItem("username"); // * Get the username from session storage
                if (!currentUser) throw new Error("User not found in session"); // * When username aren't in session storage

                const filteredPosts = data.filter((post) => post.author === currentUser); // * It's filtered post when post author is similar with username / currentUser variabel

                setShowPosts(filteredPosts);
            } catch (error) {
                console.error(error instanceof Error ? `Error fetching posts: ${error.message}` : "Unknown error");
                setIsError(true);
                setErrorMessage(error instanceof Error ? `Error fetching posts: ${error.message}` : "Unknown error");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // * 🗑️ Fungsi untuk menghapus post
    const handleDelete = async (postId: string) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        setDeleting(postId);

        try {
            const success = await deletePost(postId); // ✅ Pakai fungsi API

            if (success) {
                setShowPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
            } else {
                throw new Error("Failed to delete post");
            }
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
                                            src={post.images[0] || "https://placehold.co/80"}
                                            alt="Post Thumbnail"
                                            className="h-[80px] w-[80px] object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="font-bold p-2">{post.title}</td>
                                    <td className="text-center p-2">
                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "No Date"}
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