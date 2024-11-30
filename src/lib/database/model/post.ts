import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
})

export const Post = mongoose.models.posts || mongoose.model('posts', PostModel)