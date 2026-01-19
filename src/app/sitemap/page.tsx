"use client";

import { useEffect, useState } from "react";

interface SitemapEntry {
    loc: string;
    lastmod: string;
    priority: number;
}

export default function SitemapPage() {
    const [sitemap, setSitemap] = useState<SitemapEntry[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSitemap = async () => {
            try {
                const res = await fetch("/api/sitemap");
                if (!res.ok) throw new Error("Failed to fetch sitemap");

                const text = await res.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "text/xml");

                const urls = Array.from(xmlDoc.getElementsByTagName("url")).map((url) => ({
                    loc: url.getElementsByTagName("loc")[0]?.textContent || "",
                    lastmod: url.getElementsByTagName("lastmod")[0]?.textContent || "",
                    priority: parseFloat(url.getElementsByTagName("priority")[0]?.textContent || "0"),
                }));

                setSitemap(urls);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchSitemap();
    }, []);

    if (loading) return <p className="text-gray-500">Loading sitemap...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">📌 Sitemap</h1>
            <ul className="list-disc pl-6">
                {sitemap.map((entry, index) => (
                    <li key={index}>
                        <a href={entry.loc} className="text-blue-500 hover:underline">
                            {entry.loc.replace("https://rgwfebe.vercel.app", "")}
                        </a>
                        <span className="text-gray-500"> (Updated: {new Date(entry.lastmod).toLocaleDateString()})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}