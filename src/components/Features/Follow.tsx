// src/components/Features/Follow.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface FollowButtonProps {
  targetUserId: string;
  currentUserId: string;
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

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
    setFollowersCount(initialFollowersCount);
  }, [initialIsFollowing, initialFollowersCount]);

  const handleFollow = async () => {
    try {
      const response = await fetch("/api/updateData", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: targetUserId,
        }),
      });

      if (!response.ok) throw new Error("Failed to update followers");

      const result = await response.json();
      const updatedFollowers = result.followers;
      const isFollowing = result.message.includes("Followed");
      setFollowersCount(updatedFollowers.length);
      setIsFollowing(isFollowing);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <Button
      onClick={handleFollow}
      className={`text-sm font-medium px-4 py-2 flex items-center gap-x-2 transition-all ${
        isFollowing
          ? "bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isFollowing && <Check size={16} />}
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
