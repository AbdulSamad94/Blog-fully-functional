// src/components/blog/BlogPostImage.tsx
import Image from "next/image";

interface BlogPostImageProps {
  imageUrl: string;
  title: string;
}

const BlogPostImage = ({ imageUrl, title }: BlogPostImageProps) => {
  return (
    <Image
      src={imageUrl}
      alt={title}
      width={800}
      height={400}
      className="w-full h-auto mb-4 mt-4 rounded-xl dark:shadow-slate-600 shadow-black shadow"
    />
  );
};

export default BlogPostImage;
