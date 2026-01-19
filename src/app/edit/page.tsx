import { Suspense } from "react";
import EditPost from "./Edit";

export default function Page() {
    return (
        <Suspense fallback={<p className="text-center mt-6">Loading...</p>}>
            <EditPost />
        </Suspense>
    );
}