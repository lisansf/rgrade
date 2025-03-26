import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, Post, User } from "@/lib/types";

// * Ambil data pengguna berdasarkan username
export async function getUserProfile(username: string): Promise<User | null> {
    try {
        const res = await fetch(`/api/user?username=${username}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error("Error fetching user profile:", err);
        return null;
    }
}

// * Update profil pengguna
export async function updateProfile(email: string, updatedData: Partial<User>): Promise<User | null> {
    try {
        const res = await fetch("/api/user", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, ...updatedData }),
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error("Error updating profile:", err);
        return null;
    }
}

// * Hapus akun pengguna
export async function deleteUser(email: string): Promise<{ message: string } | null> {
    try {
        const res = await fetch("/api/user", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error("Error deleting user:", err);
        return null;
    }
}

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

        return await errorData;
    } catch (err) {
        console.error("Register error:", err);
        return { message: err instanceof Error ? err.message : "Unknown error" } as RegisterResponse;
    }
}

// * ✅ Ambil post berdasarkan kategori
export async function fetchPostsByCategory(category: string): Promise<Post[]> {
    try {
        const res = await fetch(`/api/post?category=${encodeURIComponent(category)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store", // ✅ Hindari cache
        });

        if (!res.ok) throw new Error("Failed to fetch posts");

        return await res.json();
    } catch (err) {
        console.error("Error fetching posts:", err instanceof Error ? err.message : err);
        return [];
    }
}

// * ✅ Add posts
export async function addPost(images: string[], title: string, content: string, category: string[], author: string, tags: string[]) {
    try {
        const res = await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ images, title, content, category, author, tags }),
        });

        return res.json();
    } catch (err) {
        console.error("Error fetching posts:", err instanceof Error ? err.message : err);
    }
}

// ✅ Ambil post berdasarkan ID
export async function getPostById(id: string) {
    try {
        const res = await fetch(`/api/post/${id}`, { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch post");
        return await res.json();
    } catch (err) {
        console.error("Error fetching post by ID:", err);
        return null;
    }
}

// * ✅ Fetch semua posts
export async function getPosts(): Promise<Post[]> {
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

// ✅ Update post berdasarkan ID
export async function updatePost(id: string, updatedPost: Partial<Post>) {
    try {
        const res = await fetch(`/api/post/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPost),
        });

        if (!res.ok) throw new Error("Failed to update post");
        return await res.json();
    } catch (err) {
        console.error("Error updating post:", err);
        return null;
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