import { useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';
import Tiptap from "@/app/Components/RichTextEditor/Tiptap";
import { useRouter } from "next/navigation";
import { addPost } from "@/lib/api";

export default function AddPost() {
    // * State
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<string[]>([]);
    const [images, setImageUrl] = useState<string[]>([]);

    // * Router
    const router = useRouter();

    // * Pengiriman form postingan
    const sendForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const author = sessionStorage.getItem("username")

        if (!title) return alert('Title is required!');
        if (!content) return alert('Content is required!');
        if (images.length < 2 || !images) return alert('Image is required! Need 2 Images Upload or More.');
        if (category.length === 0) return alert('At least one category is required!');
        if (!author) return alert('Author is required!');
        try {
            const data = await addPost(images, title, content, category, author);
            if (data) {
                alert('Post submitted successfully!');
                setTitle('');
                setContent('');
                setCategory([]);
                setImageUrl([]);
                router.refresh()
            } else {
                alert(data.message || 'Failed to submit post');
            }
        } catch (error) {
            console.error('Error submitting post:', error);
            alert('Error submitting post');
        }
    };

    // * Cloudinary Interface
    interface CloudinaryUploadResult {
        info: {
            url: string;
            [key: string]: unknown;
        };
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value)
                ? prev.filter((cat) => cat !== value) // ✅ Hapus jika sudah ada
                : [...prev, value] // ✅ Tambahkan jika belum ada
        );
    };

    return (
        <>
            <CldUploadWidget
                uploadPreset="rgidb_upload_preset"
                options={{
                    sources: ['local', 'url', 'camera', 'instagram', 'google_drive'],
                    maxFiles: 3,
                }}
                onSuccess={(results) => {
                    const uploadResult = results as CloudinaryUploadResult;
                    setImageUrl((prevUrls) => [...prevUrls, uploadResult.info.url]);
                }}
            >
                {({ open, isLoading }) => {
                    return (
                        <>
                            <div className="pt-3 px-3 bg-gray-100">
                                {isLoading ? (
                                    <button
                                        className="p-2 bg-red-500"
                                    >
                                        Please wait...
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => open()}
                                        className="p-2 py-10 w-full bg-gray-50 border-2 border-gray-400 text-gray-400"
                                    >
                                        Upload an Image
                                    </button>
                                )}
                            </div>
                        </>
                    );
                }}
            </CldUploadWidget>
            <div>
                {images.map((url, index) => {
                    return (
                        <div key={index} className="flex gap-2 p-4 pb-0 text-white text-center">
                            <img src={url} alt={`Uploaded ${index}`} className='w-[120px] h-[120px]' />
                            <p
                                className="cursor-pointer hover:text-blue-400 h-fit text-gray-500"
                                onClick={() => {
                                    navigator.clipboard.writeText(url);
                                    alert(`Copied to clipboard: ${url}`);
                                }}>
                                Klik to Copy Link
                            </p>
                        </div>
                    );
                })}
            </div>
            <form onSubmit={sendForm} className="flex flex-col gap-4 bg-gray-100 px-3 pt-3 text-grey-950">
                {/* //* ✅ Input Judul */}
                <label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 bg-white border-gray-400 border-b border text-black"
                    />
                </label>
                {/* //* ✅ Checkbox untuk kategori */}
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
                    <label>
                        <input type="checkbox" value="art" onChange={handleCategoryChange} checked={category.includes("art")} />
                        &nbsp;Art & Design
                    </label>
                    <label>
                        <input type="checkbox" value="photography" onChange={handleCategoryChange} checked={category.includes("photography")} />
                        &nbsp;Photography
                    </label>
                </div>
                <Tiptap
                    onChange={setContent} />
                <button type="submit" className="bg-[rgb(4_28_50)] p-2 text-white">ADD POST</button>
            </form>
        </>
    )
}