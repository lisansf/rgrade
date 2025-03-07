export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    role: string;
    message: string;
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
    views: string;
    likes: string;
    comments: string;
    createdAt: Date;
}