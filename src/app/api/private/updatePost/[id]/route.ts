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

    // Validate payload (title, description, category are required)
    if (!payload.title || !payload.description || !payload.category) {
      return NextResponse.json(
        { success: false, message: "Title, description, and category are required." },
        { status: 400 }
      );
    }

    // Fetch the original post
    const originalPost = await Blog.findById(postId);
    if (!originalPost) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 }
      );
    }

    // Ensure that the user updating the post is the original poster (add authorization check if needed)
    if (originalPost.userId !== payload.userId) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 403 });
    }

    // Update the post
    const updatedPost = await Blog.findOneAndUpdate({ _id: postId }, payload, { new: true });

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
