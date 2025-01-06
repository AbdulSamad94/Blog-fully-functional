"use client";

import { format } from "date-fns";

import Image from "next/image";
import Link from "next/link";

import { Heart, Pencil, MessageCircleMore } from "lucide-react";

import { useSession } from "next-auth/react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Delete from "@/components/Features/Delete";

import { useState, useEffect } from "react";
import CommentsSection from "@/components/Features/Comment";

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

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const SkeletonLoader = () => (
  <section className="p-6 mt-8">
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-6 w-24 mb-7" />
      <Skeleton className="md:h-8 md:w-3/4 mb-4 w-full h-28" />
      <div className="flex justify-between items-center my-8">
        <div className="flex items-center gap-x-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="w-full h-48 rounded-xl mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-11/12 mb-2" />
      <Skeleton className="h-4 w-10/12" />
    </div>
  </section>
);

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/getData`
        );
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

  const handleLikeToggle = async () => {
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
    return <SkeletonLoader />;
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
    <section className="p-6 mt-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-7">
          <Button className="text-xs h-8 px-3">{blogData.category}</Button>
          {/* For Mobile */}
          {isAuthor && (
            <div className="flex md:hidden items-center gap-x-6">
              <Link href={`/updatePost/${blogData._id}`}>
                <Pencil
                  size={20}
                  className="text-green-500 transition-colors hover:text-green-800"
                />
              </Link>
              <Delete id={blogData._id} />
            </div>
          )}
        </div>
        <h1 className="text-3xl font-semibold mb-4">{blogData.title}</h1>
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center gap-x-4 flex-wrap gap-y-2">
            {/* Image */}
            <Link href={`/profile/${blogData.userId._id}`}>
              <Image
                src={blogData.userId.image}
                alt="profile"
                width={46}
                height={46}
                className="rounded-full"
              />
            </Link>
            <div>
              <div className="flex gap-x-3">
                <Link href={`/profile/${blogData.userId._id}`}>
                  <p className="text-accent-foreground md:text-sm text-xs font-medium">
                    {blogData.userId.name}
                  </p>
                </Link>
                {!isAuthor && (
                  <p
                    onClick={handleFollow}
                    className="md:text-sm text-xs text-blue-700 dark:text-blue-500 font-medium flex items-center gap-x-2 cursor-pointer text-center"
                  >
                    • {isFollowing ? "Following" : "Follow"}
                  </p>
                )}
              </div>
              <p className="text-accent-foreground text-xs mt-2">
                {format(new Date(blogData.createdAt), "MMMM dd, yyyy")}
              </p>
            </div>
          </div>
          {isAuthor && (
            <div className="md:flex hidden items-center gap-x-6">
              <Link href={`/updatePost/${blogData._id}`}>
                <Pencil
                  size={20}
                  className="text-green-500 transition-colors hover:text-green-800"
                />
              </Link>
              <Delete id={blogData._id} />
            </div>
          )}
        </div>
        <div className="flex justify-start">
          <div className="flex justify-center items-center mt-7 ml-1 gap-x-4">
            {/* Likes icon */}
            <div>
              <Heart
                size={20}
                onClick={handleLikeToggle}
                className={`${isLiked ? "text-red-500 fill-red-500" : ""} cursor-pointer`}
              />
              <p className={`text-xs mt-2 text-center`}>{likesCount}</p>
            </div>
            {/* Comments icon*/}
            <div>
              <MessageCircleMore
                onClick={() => scrollToSection("comment")}
                className="cursor-pointer text-green-600"
                size={20}
              />
              <p className="text-xs mt-2 text-center">{commentsCount}</p>
            </div>
          </div>
        </div>
        <Image
          src={blogData.image.url}
          alt={blogData.title}
          width={800}
          height={400}
          className="w-full h-auto mb-4 mt-4 rounded-xl dark:shadow-slate-600 shadow-black shadow"
        />
        <p className="dark:text-gray-300 whitespace-pre-wrap break-words mt-10">
          {blogData.description}
        </p>
      </motion.div>
      {/* CommentSection */}
      <div id="comment" className="mt-20">
        <CommentsSection postId={id} />
      </div>
    </section>
  );
};

export default Page;
