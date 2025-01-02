import connectToDatabase from "@/lib/database/db_connection";
import { User } from "@/lib/database/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const PUT = async (req: Request) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the session
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

    // Find the target user
    const targetUser = await User.findById(targetUserObjectId);
    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "Target user not found." },
        { status: 404 }
      );
    }

    // Check if the current user is already following the target user
    const isFollowing = targetUser.followers.some(
      (followerId: mongoose.Types.ObjectId) => followerId.equals(currentUserId)
    );

    if (isFollowing) {
      // Unfollow: Remove currentUserId from targetUser's followers
      targetUser.followers = targetUser.followers.filter(
        (followerId: mongoose.Types.ObjectId) =>
          !followerId.equals(currentUserId)
      );
    } else {
      // Follow: Add currentUserId to targetUser's followers
      targetUser.followers.push(currentUserId);
    }

    await targetUser.save();

    return NextResponse.json({
      success: true,
      message: isFollowing
        ? "Unfollowed successfully."
        : "Followed successfully.",
      followers: targetUser.followers,
    });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update followers.", error: error },
      { status: 500 }
    );
  }
};
