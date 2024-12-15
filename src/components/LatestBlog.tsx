"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion"; // Import framer-motion

interface DataType {
  image: {
    id: string;
    url: string;
  };
  _id: string;
  title: string;
  description: string;
  category: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  createdAt: string;
}

const LatestBlog = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getData`, {
        cache: "no-store",
      });
      const result = await res.json();
      setData(result);
      setIsLoading(false); // Set loading state to false once data is fetched
    };
    fetchData();
  }, []);

  return (
    <section className="my-20 lg:px-20 px-2">
      <h1 className="text-2xl font-bold text-center lg:text-start">
        Latest Post
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-4 gap-6 mt-14">
        {isLoading
          ? Array(9)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-full h-[167px]" />{" "}
                  {/* Image Skeleton */}
                  <Skeleton className="mt-5 h-6 w-3/4" /> {/* Title Skeleton */}
                  <div className="my-5 flex items-center gap-x-4">
                    <Skeleton className="w-6 h-6 rounded-full" />{" "}
                    {/* Author Image Skeleton */}
                    <Skeleton className="w-24 h-4" />{" "}
                    {/* Author Name Skeleton */}
                    <Skeleton className="w-24 h-4" /> {/* Date Skeleton */}
                  </div>
                </div>
              ))
          : // Display actual data once loaded
            data.slice(0, 9).map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }} // Adjust duration as needed
                className="mx-auto ring-1 ring-slate-200 dark:ring-slate-50 dark:ring-opacity-10 px-3 py-3 rounded-lg"
              >
                <Link href={`/blog/${item._id}`}>
                  <div>
                    <Image
                      src={item.image.url}
                      alt="blog-img"
                      width={280}
                      height={200}
                      className="w-full h-[167px]"
                    />
                  </div>
                  <h1 className="mt-5 font-bold md:text-3xl text-2xl">
                    {item.title}
                  </h1>
                  <div className="my-5 flex items-center gap-x-4">
                    <Image
                      src={item.userId.image}
                      alt="author-pic"
                      width={26}
                      height={26}
                      className="rounded-full"
                    />
                    <p className="text-accent-foreground md:text-sm text-xs font-medium">
                      {item.userId.name}
                    </p>
                    <p className="text-accent-foreground md:text-sm text-xs">
                      {new Intl.DateTimeFormat("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(item.createdAt))}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>
      <div className="flex justify-center items-center mt-8 w-full">
        <Link
          href="/blog"
          className="ring-1 ring-slate-200 dark:ring-slate-50 dark:ring-opacity-10 px-4 py-3 rounded-md dark:text-gray-300"
        >
          View All Posts
        </Link>
      </div>
    </section>
  );
};

export default LatestBlog;
