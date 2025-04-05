"use client";

import { motion } from "framer-motion";
import BlogCard from "./blog-card";
import BlogCardSkeleton from "./blog-card-skeleton";

interface BlogPost {
  _id: string;
  title: string;
  image: { url: string };
  userId: { _id: string; name: string; image: string };
  createdAt: string;
  category: string;
}

interface BlogGridProps {
  posts: BlogPost[];
  isLoading: boolean;
}

export default function BlogGrid({ posts, isLoading }: BlogGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <h3 className="text-xl font-medium mb-2">No posts found</h3>
        <p className="text-muted-foreground">
          There are no blog posts available in this category.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
      {posts.map((post, index) => (
        <BlogCard key={post._id} post={post} index={index} />
      ))}
    </div>
  );
}
