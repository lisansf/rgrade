'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Search() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() === "") return; // Jangan submit kalau input kosong
        router.push(`/search?q=${encodeURIComponent(query)}`);
    };
    return (
        <>
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    placeholder="Search Title"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 pl-8 pr-10 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* Search Icon */}
                <button type="submit" className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            </form>
        </>
    )
}