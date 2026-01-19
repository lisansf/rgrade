import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    role: 'admin' | 'user';
    profilePict: string;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    profilePict: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/6522/6522516.png' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;