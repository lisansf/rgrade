import { useEffect, useState } from "react"

export default function MyPosts() {
    const [showPosts, setShowPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true);

    interface Post {
        images: string[];
        title: string;
        content: string;
        author: string;
        createdAt: Date;
    }

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`/api/post`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    const currentUser = sessionStorage.getItem("username");
                    const filteredPosts = data.filter((post: Post) => post.author === currentUser);

                    setShowPosts(filteredPosts);
                } else {
                    console.error('Failed to fetch posts:', data.message);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); // Hentikan loading
            }
        };

        getPost();
    }, []);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : showPosts.length === 0 ? (
                <div>
                    <p>No Post Available</p>
                </div>
            ) : (
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
                        {showPosts.map((post, index) => (
                            <tr key={index} className="">
                                <td className="p-2">
                                    <img src={post.images[0]} className="h-[80px] w-[80px] object-cover rounded-lg" />
                                </td>
                                <td className="font-bold border-b-2 p-2">{post.title}</td>
                                <td className="text-center p-2">{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td className="text-center p-2">Actions Here!</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </>
    )
}