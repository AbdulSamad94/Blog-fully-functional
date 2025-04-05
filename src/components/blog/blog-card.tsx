"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogPost {
  _id: string;
  title: string;
  image: { url: string };
  userId: { _id: string; name: string; image: string };
  createdAt: string;
  category: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-slate-300 dark:hover:ring-slate-700 px-3 py-3 rounded-lg w-full transition-all duration-200 hover:shadow-md"
    >
      <Link href={`/blog/${post._id}`} className="block h-full">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={post.image.url || "/placeholder.svg"}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority={index < 4}
          />
        </div>

        <h2 className="mt-4 font-bold text-xl line-clamp-2 min-h-[3.5rem]">
          {post.title}
        </h2>

        <div className="mt-4 flex items-center gap-x-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={post.userId.image || "/placeholder.svg"}
              alt={`${post.userId.name}'s profile picture`}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col xs:flex-row gap-y-1 gap-x-3 flex-wrap">
            <p className="text-sm font-medium truncate max-w-[120px]">
              {post.userId.name}
            </p>

            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {new Intl.DateTimeFormat("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(post.createdAt))}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
