// src/components/blog/BlogPostDetail.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";

import CommentsSection from "@/components/Features/Comment";
import BlogPostHeader from "./BlogPostHeader";
import BlogPostActions from "./BlogPostActions";
import BlogPostImage from "./BlogPostImage";
import BlogPostContent from "./BlogPostContent";
import BlogPostSkeleton from "./BlogPostSkeleton";

interface DataType {
  image: {
    id: string;
    url: string;
  };
  _id: string;
  title: string;
  description: string;
  category: string;
  likes: string[];
  comments: string[];
  userId: {
    _id: string;
    name: string;
    email: string;
    image: string;
    followers: string[];
  };
  createdAt: string;
}

const BlogPostDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { data: session, status } = useSession();
  const [blogData, setBlogData] = useState<DataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState<string>("");
  const [isLiked, setLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    async function resolveParams() {
      const resolved = await params;
      setId(resolved.id);
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/getData`);
        if (!response.ok) throw new Error("Failed to fetch data from API");

        const allData: DataType[] = await response.json();
        const blogData = allData.find((item) => item._id === id);
        setBlogData(blogData || null);

        if (blogData && session?.user) {
          setLikesCount(blogData.likes.length);
          setLiked(blogData.likes.includes(session.user.id as string));
          setIsFollowing(
            blogData.userId.followers.includes(session.user.id as string)
          );
          setFollowersCount(blogData.userId.followers.length);
          setCommentsCount(blogData.comments.length);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, session]);

  const handleLikeToggle: () => Promise<void> = async () => {
    if (!blogData || !session?.user) return;

    try {
      const response = await fetch(`/api/likes/${blogData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        const updatedLikes = result.likes;

        setLiked(updatedLikes.includes(session?.user.id));
        setLikesCount(updatedLikes.length);
      } else {
        console.error("Failed to toggle like");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await fetch("/api/updateData", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: blogData?.userId._id,
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

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (!blogData) {
    return (
      <section>
        <h1 className="text-center text-3xl font-semibold">
          Blog post not found.
        </h1>
      </section>
    );
  }

  if (status === "unauthenticated") {
    return (
      <h1 className="text-center text-3xl font-semibold my-48">
        You must be logged in to view this page.
      </h1>
    );
  }

  const isAuthor = blogData.userId._id === session?.user?.id;

  return (
    <section className="p-6 mt-8 max-w-4xl mx-auto py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <BlogPostHeader
          blogData={blogData}
          isAuthor={isAuthor}
          isFollowing={isFollowing}
          handleFollow={handleFollow}
        />
        <BlogPostActions
          isLiked={isLiked}
          likesCount={likesCount}
          commentsCount={commentsCount}
          handleLikeToggle={handleLikeToggle}
        />
        <BlogPostImage imageUrl={blogData.image.url} title={blogData.title} />
        <BlogPostContent content={blogData.description} />
      </motion.div>
      {/* CommentSection */}
      <div id="comment" className="mt-20">
        <CommentsSection postId={id} />
      </div>
    </section>
  );
};

export default BlogPostDetail;
