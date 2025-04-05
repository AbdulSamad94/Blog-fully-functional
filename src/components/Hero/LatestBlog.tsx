"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface DataType {
  image: {
    url: string;
  };
  _id: string;
  title: string;
  userId: {
    _id: string;
    name: string;
    image: string;
  };
  createdAt: string;
}

const LatestBlog = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/getData`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await res.json();
      if (Array.isArray(result)) {
        setData(result);
        setError(null);
      } else {
        throw new Error("Fetched data is not an array");
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError("An error occurred while fetching data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderSkeletons = useMemo(
    () =>
      Array(9)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex flex-col h-full">
            <Skeleton className="w-full aspect-[5/3] rounded-lg" />{" "}
            {/* Image Skeleton with fixed aspect ratio */}
            <Skeleton className="mt-4 h-6 w-3/4" /> {/* Title Skeleton */}
            <div className="mt-3 mb-4 flex items-center gap-x-3">
              <Skeleton className="w-8 h-8 rounded-full" />{" "}
              {/* Author Image Skeleton */}
              <Skeleton className="w-20 h-4" /> {/* Author Name Skeleton */}
              <Skeleton className="w-24 h-4 ml-auto" /> {/* Date Skeleton */}
            </div>
          </div>
        )),
    []
  );

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center md:text-start mb-8 md:mb-12">
        Latest Posts
      </h2>

      {error && (
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 mb-8">
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-md hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {isLoading
          ? renderSkeletons
          : data.slice(0, 9).map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col h-full ring-1 ring-slate-200 dark:ring-slate-700/30 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <Link
                  href={`/blog/${item._id}`}
                  className="flex flex-col h-full"
                >
                  <div className="relative w-full aspect-[5/3] overflow-hidden">
                    <Image
                      src={item.image.url || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      priority={index < 3}
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="font-bold text-lg sm:text-xl line-clamp-2 mb-3 flex-grow">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-x-3 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={item.userId.image || "/placeholder.svg"}
                          alt={`${item.userId.name}'s profile picture`}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-accent-foreground truncate max-w-[100px]">
                        {item.userId.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
                        {new Intl.DateTimeFormat("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(item.createdAt))}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>

      {!isLoading && !error && data.length > 9 && (
        <div className="flex justify-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md ring-1 ring-slate-200 dark:ring-slate-700/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
          >
            View All Posts
          </Link>
        </div>
      )}
    </section>
  );
};

export default LatestBlog;
