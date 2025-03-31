// src/components/blog/BlogPostContent.tsx
interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  return (
    <p className="dark:text-gray-300 whitespace-pre-wrap break-words mt-10">
      {content}
    </p>
  );
};

export default BlogPostContent;
