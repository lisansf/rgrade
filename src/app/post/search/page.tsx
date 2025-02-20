'use client';

import { Suspense } from "react";
import SearchComponent from "@/app/Components/Header/SearchComponent";

export default function SearchPage() {
    return (
        <Suspense fallback={<p className="text-center">Loading search...</p>}>
            <SearchComponent />
        </Suspense>
    );
}
