// src/components/profile/ProfileSkeleton.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse lg:w-[85%] xl:w-[65%] mt-8 flex flex-col justify-center items-start mx-auto w-full px-4">
      {/* Banner Skeleton */}
      <Skeleton className="w-full lg:h-[300px] h-[120px] rounded-t-xl" />

      <div className="lg:px-8 flex mt-4 items-center lg:flex-row flex-col justify-center lg:justify-normal mx-auto md:mx-0 w-full">
        {/* Profile image skeleton */}
        <Skeleton className="rounded-full lg:w-[200px] lg:h-[200px] w-24 h-24" />
        <div className="lg:ml-8 text-center lg:text-start space-y-3 mt-4 lg:mt-0">
          {/* Name skeleton */}
          <Skeleton className="w-40 h-8 mx-auto md:mx-0" />
          {/* Info skeleton */}
          <div className="flex justify-center md:justify-normal items-center gap-3">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
          {/* Bio skeleton - reduce width on small screens */}
          <Skeleton className="w-64 lg:w-80 h-4" />
          {/* Button skeleton */}
          <Skeleton className="w-32 h-10 inline-block" />
        </div>
      </div>

      <div className="mt-16 w-full">
        {/* Section title skeleton */}
        <Skeleton className="w-40 h-8 mb-10" />
        {/* Post skeleton items */}
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="mx-3 border-t border-slate-300 dark:border-slate-600 py-10 flex flex-col lg:flex-row justify-between items-center gap-x-4"
          >
            <div className="w-full space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-20 h-4" />
              </div>
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-6" />
              <div className="flex gap-6 items-center">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-24 h-4" />
              </div>
            </div>
            {/* Post image skeleton: smaller width on mobile, larger on lg */}
            <Skeleton className="rounded-lg w-[320px] h-[150px] lg:w-[400px] lg:h-[200px] mt-4 lg:mt-0" />
          </div>
        ))}
        <div className="border-t border-slate-300 dark:border-slate-600 mx-3"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
