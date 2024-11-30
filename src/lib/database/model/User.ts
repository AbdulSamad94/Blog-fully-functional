import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
}, { timestamps: true });

export const User = models.User || model<IUser>('User', userSchema);