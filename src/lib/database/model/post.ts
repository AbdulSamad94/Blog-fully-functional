import mongoose from "mongoose";

interface BlogDocument extends mongoose.Document {
    title: string;
    description: string;
    image: string;
    userId: mongoose.Types.ObjectId | null;
    createdAt: Date;
    category: string
    likes: mongoose.Schema.Types.ObjectId
    comments: string
}

const BlogSchema = new mongoose.Schema<BlogDocument>(
    {
        title: {
            type: String,
            trim: true,
            min: 4,
        },
        description: {
            type: String,
            min: 20,
        },
        image: {
            id: {
                type: String
            },
            url: {
                type: String
            },
        },
        category: {
            type: String,
            enum: ["Technology", "Social", "Education", "LifeStyle", "Business & Finance", "Creative Arts", "Gaming & Entertainment", "Food & Reciepes"]
        },

        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: []
        },

        comments: [
            {
                user: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                },
                text: {
                    type: String,

                }
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }, { timestamps: true, collection: "posts" }
);
export const Blog = mongoose.models.posts || mongoose.model('posts', BlogSchema)