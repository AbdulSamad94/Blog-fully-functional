import connectToDatabase from "@/lib/database/db_connection";
import { Blog } from "@/lib/database/model/post";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export const DELETE = async (req: Request, { params }: RouteParams) => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }
    try {
        const { id: postId } = await params;
        await connectToDatabase();

        const originalPost = await Blog.findById(postId);
        if (!originalPost) {
            return NextResponse.json(
                { success: false, message: "Post not found." },
                { status: 404 }
            );
        }

        const currentUserId = session.user.id;

        if (originalPost.userId.toString() !== currentUserId) {
            return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 403 });
        }

        const deleteResult = await Blog.deleteOne({ _id: postId });

        if (deleteResult.deletedCount === 0) {
            return NextResponse.json(
                { success: false, message: "Post not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Post deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete post.", error },
            { status: 500 }
        );
    }
};
