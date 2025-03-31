// src/components/profile/PostCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PostType {
  image: {
    id: string;
    url: string;
  };
  _id: string;
  title: string;
  category: string;
}

interface PostCardProps {
  post: PostType;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <div className="relative w-full h-48">
        <Image
          src={post.image.url}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <Button className="text-xs h-8 px-3 mb-2">{post.category}</Button>
        <h4 className="font-semibold mb-2">{post.title}</h4>
        <Link href={`/blog/${post._id}`}>
          <Button className="w-full">Read More</Button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
