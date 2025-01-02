import { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    followers?: number;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    followers: { type: Number, default: 0 }
},
    {
        timestamps: true,
        collection: 'users'
    }
);

export const User = models.User || model<IUser>('User', userSchema);