"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

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

const Page = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getData`, {
        cache: "no-store",
      });
      const result = await res.json();
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="my-10">
      <div>
        <h1 className="text-4xl font-bold text-center">All Blog posts</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-20 place-self-center">
        {isLoading
          ? Array(9)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="mx-auto md:w-[369px] w-[330px]">
                  {/* Skeleton for Image */}
                  <Skeleton className="w-full h-[167px] rounded-lg" />
                  {/* Skeleton for Title */}
                  <Skeleton className="mt-5 h-8 w-3/4" />
                  {/* Skeleton for Author Section */}
                  <div className="my-5 flex items-center gap-x-4">
                    {/* Skeleton for Author Image */}
                    <Skeleton className="w-8 h-8 rounded-full" />
                    {/* Skeleton for Author Name */}
                    <Skeleton className="w-20 h-4" />
                    {/* Skeleton for Date */}
                    <Skeleton className="w-20 h-4" />
                  </div>
                </div>
              ))
          : data.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto ring-1 ring-slate-200 dark:ring-slate-50 dark:ring-opacity-10 px-3 py-3 rounded-lg cursor-pointer md:w-[390px] w-[330px]"
              >
                <Link href={`/blog/${item._id}`}>
                  <div>
                    <Image
                      src={item.image.url}
                      alt="blog-img"
                      width={369}
                      height={167}
                      className="w-full h-[167px] rounded-lg"
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
            ))}
      </div>
    </section>
  );
};

export default Page;
