"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";

interface DataType {
  image: { id: string; url: string };
  _id: string;
  title: string;
  description: string;
  category: string;
  userId: { _id: string; name: string; email: string; image: string };
  createdAt: string;
}

const Page = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("All Blogs");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getData`, {
          cache: "no-store",
        });
        const result = await res.json();
        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error("Fetched data is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = useMemo(
    () => ["All Blogs", ...new Set(data.map((item) => item.category))],
    [data]
  );

  const filterProjects = data.filter((project) =>
    category === "All Blogs" ? true : project.category === category
  );

  return (
    <section className="my-10">
      <h1 className="text-4xl font-bold text-center">Blog Posts</h1>
      {isLoading ? (
        <div className="mt-10 flex justify-center items-center">
          <Skeleton className="md:w-[650px] w-full mx-4 h-14" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-start md:justify-center items-center mt-10 md:overflow-hidden overflow-x-auto mx-6"
        >
          <Tabs defaultValue="All Blogs">
            <TabsList className={`md:gap-8 bg-background w-full`}>
              {categories.map((cat, index) => (
                <TabsTrigger
                  key={index}
                  value={cat}
                  onClick={() => setCategory(cat)}
                  className={`${cat === "All Blogs" ? "font-medium" : "font-light"} text-start`}
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>
      )}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-20 place-self-center">
        {isLoading ? (
          Array(9)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="mx-auto md:w-[369px] w-[330px]">
                <Skeleton className="w-full h-[167px] rounded-lg" />
                <Skeleton className="mt-5 h-8 w-3/4" />
                <div className="my-5 flex items-center gap-x-4">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-20 h-4" />
                </div>
              </div>
            ))
        ) : filterProjects.length > 0 ? (
          filterProjects.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto ring-1 ring-slate-200 dark:ring-slate-50 dark:ring-opacity-10 px-3 py-3 rounded-lg cursor-pointer md:w-[390px] w-[330px] hover:scale-95 transition-all"
            >
              <Link href={`/blog/${item._id}`}>
                <Image
                  src={item.image.url}
                  alt="blog-img"
                  width={369}
                  height={167}
                  loading="lazy"
                  className="w-full h-[167px] rounded-lg"
                />
                <h1 className="mt-5 font-bold md:text-3xl text-2xl md:h-28">
                  {item.title}
                </h1>
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
              </Link>
            </motion.div>
          ))
        ) : (
          <p>No blogs available in this category.</p>
        )}
      </div>
    </section>
  );
};

export default Page;
