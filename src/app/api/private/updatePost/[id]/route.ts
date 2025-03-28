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

export const PUT = async (req: Request, { params }: RouteParams) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

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

    // Get the user ID from the session
    const currentUserId = session.user.id;

    // Ensure that the user updating the post is the original poster
    if (originalPost.userId.toString() !== currentUserId) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 403 });
    }

    // Update the post (exclude userId from payload to prevent modification)
    const { userId, ...updateData } = payload;
    const updatedPost = await Blog.findOneAndUpdate({ _id: postId }, updateData, { new: true });

    return NextResponse.json({ success: true, result: updatedPost });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update post.", error },
      { status: 500 }
    );
  }
};

// The GET route is fine as it is (assuming it's intended to be public)
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
