import mongoose, { Schema, Document, Types } from "mongoose";

interface IPost extends Document {
    title: string;
    content: string;
    author: string;
    images: string[];
    category: string[];
    views: number;
    likes: number;
    comments: Types.ObjectId[];
}

const PostSchema = new Schema<IPost>(
    {
        title: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
        images: { type: [String], default: [], required: true },
        category: { type: [String], default: [], required: true },
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    },
    { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;