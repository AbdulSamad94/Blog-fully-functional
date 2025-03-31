// src/components/blog/BlogPostHeader.tsx
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Delete from "@/components/Features/Delete";
import { Button } from "@/components/ui/button";

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

interface BlogPostHeaderProps {
  blogData: DataType;
  isAuthor: boolean;
  isFollowing: boolean;
  handleFollow: () => Promise<void>;
}

const BlogPostHeader = ({
  blogData,
  isAuthor,
  isFollowing,
  handleFollow,
}: BlogPostHeaderProps) => {
  return (
    <>
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
    </>
  );
};

export default BlogPostHeader;
