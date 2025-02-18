import { useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';
import Tiptap from "../../Components/RichTextEditor/Tiptap";

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImageUrl] = useState<string[]>([]);

    const sendForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const author = sessionStorage.getItem("username")

        if (!title) {
            alert('Title is required!');
            return;
        }
        if (!content) {
            alert('Content is required!');
            return;
        }
        if (!author) {
            alert('author is required!');
            return;
        }
        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ images, title, content, author }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Post submitted successfully!');
                setTitle('');
                setContent('');
                setImageUrl([]);
            } else {
                alert(data.message || 'Failed to submit post');
            }
        } catch (error) {
            console.error('Error submitting post:', error);
            alert('Error submitting post');
        }
    };

    interface CloudinaryUploadResult {
        info: {
            url: string;
            [key: string]: unknown;
        };
    }

    return (
        <>
            <CldUploadWidget
                uploadPreset="veoidb_upload_preset"
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
                <Tiptap
                    onChange={setContent} />
                <button type="submit" className="bg-[rgb(4_28_50)] p-2 text-white">ADD POST</button>
            </form>
        </>
    )
}