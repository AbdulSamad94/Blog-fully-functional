import connectToDatabase from "@/lib/database/db_connection";
import { Blog } from "@/lib/database/model/post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{
        id: string;
    }>; // Simplified interface for route parameters
}

export const PUT = async (req: Request, { params }: RouteParams) => {
    try {
        // Connect to the database
        await connectToDatabase();

        // Extract the blog ID from params
        const { id } = await params;

        // Get the current session
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = session.user.id; // Assumes `id` is part of the session user object

        // Find the blog post by ID
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json(
                { success: false, message: "Post not found." },
                { status: 404 }
            );
        }

        // Check if the user has already liked the post
        const hasLiked = blog.likes.includes(userId);

        if (hasLiked) {
            // Remove the user from the likes array (unlike)
            blog.likes = blog.likes.filter((likeId: string) => likeId !== userId);
        } else {
            // Add the user to the likes array (like)
            blog.likes.push(userId);
        }

        // Make sure the blog is updated correctly
        const updatedBlog = await blog.save();

        return NextResponse.json({
            success: true,
            message: hasLiked ? "Post unliked successfully." : "Post liked successfully.",
            likes: updatedBlog.likes, // Return the updated likes list
        });
    } catch (error) {
        console.error("Error in PUT request:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update post.", error: error },
            { status: 500 }
        );
    }
};
