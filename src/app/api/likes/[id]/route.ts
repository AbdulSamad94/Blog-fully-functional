import connectToDatabase from "@/lib/database/db_connection";
import { Blog } from "@/lib/database/model/post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export const PUT = async (req: Request, { params }: RouteParams) => {
    try {
        await connectToDatabase();

        const { id } = await params;

        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json(
                { success: false, message: "Post not found." },
                { status: 404 }
            );
        }

        console.log("Current likes array:", blog.likes);
        console.log("User ID (ObjectId):", userObjectId);

        const hasLiked = blog.likes.some(
            (likeId: mongoose.Types.ObjectId) => likeId.equals(userObjectId)
        );

        if (hasLiked) {
            blog.likes = blog.likes.filter(
                (likeId: mongoose.Types.ObjectId) => !likeId.equals(userObjectId)
            );
            console.log("User unliked the post:", blog.likes);
        } else {

            blog.likes.push(userObjectId);
            console.log("User liked the post:", blog.likes);
        }

        await blog.save();

        console.log("Updated likes array after saving:", blog.likes);

        return NextResponse.json({
            success: true,
            message: hasLiked ? "Post unliked successfully." : "Post liked successfully.",
            likes: blog.likes,
        });
    } catch (error) {
        console.error("Error in PUT request:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update post.", error: error },
            { status: 500 }
        );
    }
};
