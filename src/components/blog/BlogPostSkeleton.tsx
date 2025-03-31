// src/components/blog/BlogPostSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const BlogPostSkeleton = () => (
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

export default BlogPostSkeleton;
