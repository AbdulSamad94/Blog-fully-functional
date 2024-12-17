"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
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
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getData`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        console.log("Fetched Data:", result);
        setData(result);
      } catch (err) {
        setError("An error occurred while fetching data.");
        router.refresh();
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderSkeletons = useMemo(
    () =>
      Array(9)
        .fill(0)
        .map((_, index) => (
          <div key={index}>
            <Skeleton className="w-full h-[167px]" /> {/* Image Skeleton */}
            <Skeleton className="mt-5 h-6 w-3/4" /> {/* Title Skeleton */}
            <div className="my-5 flex items-center gap-x-4">
              <Skeleton className="w-6 h-6 rounded-full" />{" "}
              {/* Author Image Skeleton */}
              <Skeleton className="w-24 h-4" /> {/* Author Name Skeleton */}
              <Skeleton className="w-24 h-4" /> {/* Date Skeleton */}
            </div>
          </div>
        )),
    []
  );

  return (
    <section className="my-20 lg:px-20 px-2">
      <h1 className="text-2xl font-bold text-center lg:text-start">
        Latest Post
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-4 gap-6 mt-14">
        {isLoading ? (
          renderSkeletons
        ) : error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : data.length > 0 ? (
          data.slice(0, 9).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto ring-1 ring-slate-200 dark:ring-slate-50 dark:ring-opacity-10 px-3 py-3 rounded-lg"
            >
              <Link href={`/blog/${item._id}`}>
                <div>
                  <Image
                    src={item.image.url}
                    alt={item.title}
                    width={280}
                    height={200}
                    className="w-full h-[167px]"
                  />
                </div>
                <div className="flex justify-between flex-col">
                  <h1 className="mt-5 font-bold md:text-3xl text-2xl md:h-28">
                    {item.title}
                  </h1>
                  <div className="flex items-end">
                    <div className="my-5 flex items-center gap-x-4">
                      <Image
                        src={item.userId.image}
                        alt="author-pic"
                        width={32}
                        height={32}
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
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          renderSkeletons
        )}
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
