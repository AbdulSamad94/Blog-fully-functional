// src/components/post/MakePostSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const MakePostSkeleton = () => {
  return (
    <div className="flex justify-center items-center mt-16">
      <div className="w-full max-w-3xl">
        <Skeleton className="h-12 w-64 mb-10" />
        <Skeleton className="h-64 w-full mb-8 rounded-lg" />
        <Skeleton className="h-12 w-full mb-6" />
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  );
};

export default MakePostSkeleton;
