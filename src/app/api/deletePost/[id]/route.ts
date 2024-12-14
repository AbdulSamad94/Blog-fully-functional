import connectToDatabase from "@/lib/database/db_connection";
import { Blog } from "@/lib/database/model/post";
import { NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

// Corrected DELETE handler for Next.js 15 with Promised params
export const DELETE = async (req: Request, { params }: RouteParams) => {
    try {
        // Wait for params to resolve
        const { id } = await params;

        await connectToDatabase();

        const deleteResult = await Blog.deleteOne({ _id: id });

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
