'use client';

import { useRouter } from "next/navigation";

import Link from "next/link";

export default function DashboardMenu() {
  const router = useRouter()
  return (
    <div className="flex justify-between items-center py-4 px-8">
      {/* Navbar Menu */}
      <div className="space-x-8">
        <Link
          href=""
          className="text-lg font-semibold hover:text-blue-500"
          onClick={(e) => {
            e.preventDefault();

            const postSection = document.getElementById("posts");
            if (postSection) {
              postSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}>
          My Posts
        </Link>
        <Link
          href=""
          className="text-lg font-semibold hover:text-blue-500"
          onClick={(e) => {
            e.preventDefault();

            const postSection = document.getElementById("addpost");
            if (postSection) {
              postSection.scrollIntoView({ behavior: "smooth", block: "end" });
            }
          }}>
          Add post
        </Link>
        <Link
          href="#"
          className="text-lg font-semibold hover:text-blue-500"
          onClick={() => { localStorage.clear(); router.replace('/') }}>
          Logout
        </Link>
      </div>
    </div >
  );
}
