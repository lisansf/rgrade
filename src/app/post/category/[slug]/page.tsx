import { fetchPostsByCategory } from "@/lib/api";
import { Post } from "@/lib/types";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const category = params.slug;
    const posts: Post[] = await fetchPostsByCategory(category);

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold">Kategori:</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post: Post) => (
                    <div key={post._id} className="p-4 border rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <a href={`/post/${post.title.replace(/\s+/g, '-')}`} className="text-blue-500 hover:underline">Baca Selengkapnya</a>
                    </div>
                ))}
            </div>
        </div>
    );
}