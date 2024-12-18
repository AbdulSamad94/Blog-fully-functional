import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/database/db_connection";
import { Blog } from "@/lib/database/model/post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export const POST = async (req: Request, { params }: RouteParams) => {
    const { id } = await params;

    try {
        await connectToDatabase();

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized " }, { status: 401 });
        }

        const { comment } = await req.json();

        if (!comment || typeof comment !== "string" || comment.trim() === "") {
            return NextResponse.json({ error: "Invalid comment" }, { status: 400 });
        }

        const post = await Blog.findById(id).populate("comments.user", "name image");

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const newComment = {
            user: session.user.id,
            text: comment,
        };

        post.comments.push(newComment);
        await post.save();

        await post.populate("comments.user", "name image");
        return NextResponse.json({
            success: true,
            comments: post.comments,
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}


export const GET = async (req: Request, { params }: RouteParams) => {
    const { id } = await params;

    try {
        await connectToDatabase();

        const post = await Blog.findById(id).populate("comments.user", "name image");

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, comments: post.comments });

    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: RouteParams
) {
    const { id } = await params;

    try {
        await connectToDatabase();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { commentId } = await req.json();

        if (!commentId) {
            return NextResponse.json({ error: "Comment ID not provided" }, { status: 400 });
        }

        const post = await Blog.findById(id);
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const commentIndex = post.comments.findIndex(
            (comment: any) =>
                comment._id.toString() === commentId &&
                comment.user.toString() === session.user.id
        );

        if (commentIndex === -1) {
            return NextResponse.json({ error: "Comment not found or unauthorized" }, { status: 403 });
        }

        // Remove the comment
        post.comments.splice(commentIndex, 1);
        await post.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
