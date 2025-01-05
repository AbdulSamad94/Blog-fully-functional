"use client";

import { useState } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

interface FollowButtonProps {
  targetUserId: string;
  currentUserId: string | undefined;
  isFollowing: boolean;
  followersCount: number;
}

const FollowButton = ({
  targetUserId,
  currentUserId,
  isFollowing: initialIsFollowing,
  followersCount: initialFollowersCount,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followersCount, setFollowersCount] = useState(initialFollowersCount);

  const handleFollow = async () => {
    if (!currentUserId) {
      toast.error("You must be logged in to follow users.");
      return;
    }

    try {
      const response = await fetch("/api/updateData", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId }),
      });

      if (!response.ok) throw new Error("Failed to update followers");

      const result = await response.json();

      setIsFollowing(result.isFollowing);
      setFollowersCount(result.followers.length);
    } catch (error) {
      console.error("Error following user:", error);
      toast.error("Failed to update follow status.");
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`flex items-center gap-x-2 font-semibold px-4 py-2 text-sm text-center rounded-lg ${isFollowing ? "bg-blue-600 text-white" : "dark:bg-slate-900 dark:bg-opacity-45 bg-slate-200 text-blue-500"}`}
    >
      <Plus size={15} className={`${isFollowing ? "hidden" : "block"}`} />{" "}
      {isFollowing ? `Following` : `Follow`}
    </button>
  );
};

export default FollowButton;
