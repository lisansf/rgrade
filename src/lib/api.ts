import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, Post } from "@/lib/types";

// * Fungsi untuk Login ke API
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse | null> {
    try {
        const res = await fetch('/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return await res.json();
    } catch (err) {
        console.error("Error logging in: ", err);
        return { message: err instanceof Error ? err.message : "Unknown error" } as LoginResponse;
    }
}

// * Fungsi untuk Register ke API
export async function RegisterUser(credentials: RegisterRequest): Promise<RegisterResponse | null> {
    try {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials), // 🔹 Kirim data dalam format JSON
        });

        const errorData = await res.json();
        if (!res.ok) {
            throw new Error(errorData.message || "Gagal melakukan registrasi");
        }

        return await res.json();
    } catch (err) {
        console.error("Register error:", err);
        return { message: err instanceof Error ? err.message : "Unknown error" } as RegisterResponse;
    }
}

// * ✅ Ambil post berdasarkan kategori
export async function fetchPostsByCategory(category?: string): Promise<Post[]> {
    try {
        const res = await fetch(`/api/post/${category}`, { cache: "no-store" });

        if (!res.ok) throw new Error(`Gagal mengambil data kategori ${category}`);

        return await res.json();
    } catch (err) {
        if (err instanceof Error) console.error("Error fetching posts by category: ", err.message)
        return [];
    }
}

// * ✅ Add posts
export async function addPost(images: string[], title: string, content: string, category: string[], author: string) {
    try {
        const res = await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ images, title, content, category, author }),
        });

        return res.json();
    } catch (err) {
        console.error("Error fetching posts:", err instanceof Error ? err.message : err);
    }
}

// * ✅ Fetch semua posts
export async function fetchPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`/api/post`, { cache: "no-store" });

        if (!res.ok) throw new Error(`Gagal mengambil data`);

        return await res.json();
    } catch (err) {
        console.error("Error fetching posts:", err instanceof Error ? err.message : err);
        return [];
    }
}

// * ✅ Hapus post berdasarkan ID
export async function deletePost(postId: string): Promise<boolean> {
    try {
        const res = await fetch(`/api/post?id=${postId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to delete post");

        return true; // ✅ Jika berhasil
    } catch (err) {
        console.error("Error deleting post:", err);
        return false; // ❌ Jika gagal
    }
}

// * Search API
export async function searchPosts(query: string): Promise<Post[]> {
    try {
        const res = await fetch(`/api/post?s=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch posts");

        return await res.json();
    } catch (err) {
        console.error("Error search posts: ", err instanceof Error ? err.message : err)
        return [];
    }
}