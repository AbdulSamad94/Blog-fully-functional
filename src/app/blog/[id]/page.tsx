// src/app/blog/[id]/page.tsx
import BlogPostDetail from "@/components/blog/BlogPostDetail";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  return <BlogPostDetail params={params} />;
};

export default Page;
