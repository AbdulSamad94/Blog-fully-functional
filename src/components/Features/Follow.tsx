"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Plus, Check } from "lucide-react";

import "react-toastify/dist/ReactToastify.css";

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
    <>
      <button
        onClick={handleFollow}
        className={`flex items-center gap-2 font-semibold text-sm rounded-full transition-all duration-300 px-6 py-2 
      ${
        isFollowing
          ? "bg-blue-600 dark:bg-blue-800 text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-900 transform hover:scale-105"
          : "bg-white dark:bg-slate-800 border border-blue-500 text-blue-500 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transform hover:scale-105"
      }`}
      >
        {isFollowing ? <Check size={16} /> : <Plus size={16} />}
        {isFollowing ? "Following" : "Follow"}
      </button>
      <ToastContainer />
    </>
  );
};

export default FollowButton;
