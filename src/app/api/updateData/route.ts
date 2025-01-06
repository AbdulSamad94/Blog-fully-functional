import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/database/db_connection";
import { User } from "@/lib/database/model/User";

export async function PUT(req: Request) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { targetUserId } = await req.json();

    if (!targetUserId) {
      return NextResponse.json(
        { success: false, message: "Target user ID is required." },
        { status: 400 }
      );
    }

    const currentUserId = new mongoose.Types.ObjectId(session.user.id);
    const targetUserObjectId = new mongoose.Types.ObjectId(targetUserId);

    const targetUser = await User.findById(targetUserObjectId);
    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "Target user not found." },
        { status: 404 }
      );
    }

    const isFollowing = targetUser.followers.some(
      (followerId: mongoose.Types.ObjectId) => followerId.equals(currentUserId)
    );

    if (isFollowing) {
      targetUser.followers = targetUser.followers.filter(
        (followerId: mongoose.Types.ObjectId) =>
          !followerId.equals(currentUserId)
      );
    } else {
      targetUser.followers.push(currentUserId);
    }

    await targetUser.save();

    return NextResponse.json({
      success: true,
      message: isFollowing
        ? "Unfollowed successfully."
        : "Followed successfully.",
      followers: targetUser.followers,
      isFollowing: !isFollowing,
    });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update followers.", error: error },
      { status: 500 }
    );
  }
}
