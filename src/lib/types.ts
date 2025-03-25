export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    role: string;
    message: string;
    profilePict: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
}

export interface Post {
    _id: string;
    images: string[];
    title: string;
    content: string;
    author: string;
    category: string[];
    tags: string[];
    views: string;
    likes: string;
    comments: string;
    createdAt: Date;
}

export interface User {
    email: string;
    username: string;
    password: string;
    role: 'admin' | 'user';
    profilePict: string;
}