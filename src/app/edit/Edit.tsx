"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPostById, updatePost } from "@/lib/api";
import { CldUploadWidget } from "next-cloudinary";
import Tiptap from "@/app/Components/RichTextEditor/Tiptap";

export default function Edit() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                if (!data) throw new Error("Post not found");

                setTitle(data.title || "");
                setContent(data.content || "");
                setCategory(data.category || []);
                setImages(data.images || []);
                setTags(data.tags || []);
            } catch (err) {
                console.error("Error fetching post:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedPost = { title, content, images, category, tags };
            const success = await updatePost(id as string, updatedPost);

            if (success) {
                alert("Post updated successfully!");
                router.push("/dashboard");
            }
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((cat) => cat !== value) : [...prev, value]
        );
    };

    const addTag = () => {
        if (tagInput.trim() !== "" && !tags.includes(tagInput)) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    if (loading) return <p className="text-center mt-6">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </label>

                <Tiptap onChange={setContent} value={content} />

                <CldUploadWidget
                    uploadPreset="rgidb_upload_preset"
                    onSuccess={(result) => {
                        const uploadResult = result as { info: { secure_url: string } };
                        setImages([...images, uploadResult.info.secure_url]);
                    }}
                >
                    {({ open }) => (
                        <button
                            type="button"
                            onClick={() => open()}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Upload Image
                        </button>
                    )}
                </CldUploadWidget>

                <div className="flex flex-wrap gap-2">
                    {images.map((url, index) => (
                        <img key={index} src={url} alt={`Image ${index}`} className="w-20 h-20 rounded-md" />
                    ))}
                </div>

                <div className="flex gap-2">
                    <span className="font-semibold">Select Categories:</span>
                    <label>
                        <input type="checkbox" value="film" onChange={handleCategoryChange} checked={category.includes("film")} />
                        &nbsp;Film & Series
                    </label>
                    <label>
                        <input type="checkbox" value="games" onChange={handleCategoryChange} checked={category.includes("games")} />
                        &nbsp;Games
                    </label>
                    <label>
                        <input type="checkbox" value="music" onChange={handleCategoryChange} checked={category.includes("music")} />
                        &nbsp;Music
                    </label>
                </div>

                <div className="mt-4">
                    <span className="block font-semibold">Edit Tags:</span>
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="Enter tag..."
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            className="p-2 border rounded-md w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={addTag}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            type="button"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag, index) => (
                            <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                                <span className="mr-2">#{tag}</span>
                                <button onClick={() => removeTag(index)} className="text-red-500 hover:text-red-700">
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Update Post
                </button>
            </form>
        </div>
    );
}