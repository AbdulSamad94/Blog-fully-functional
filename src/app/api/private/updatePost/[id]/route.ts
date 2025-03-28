import connectToDatabase from "@/lib/database/db_connection";
import { Blog } from "@/lib/database/model/post";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export const PUT = async (req: Request, { params }: RouteParams) => {
  try {
    await connectToDatabase();

    const { id: postId } = await params;
    const payload = await req.json();

    const updatedPost = await Blog.findOneAndUpdate({ _id: postId }, payload, {
      new: true,
    });

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, result: updatedPost });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update post.", error },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request, { params }: RouteParams) => {
  try {
    const { id: postId } = await params;

    await connectToDatabase();

    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, result: blogPost });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch post.", error },
      { status: 500 }
    );
  }
};
