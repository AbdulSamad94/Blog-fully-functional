"use client";
import { ObjectId } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface dataType {
  _id: ObjectId;
  title: string;
  description: string;
  image: object;
  category: string;
  userId: ObjectId;
  createdAt: string;
}

const LatestBlog = () => {
  const [data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    const handleData = async () => {
      const response = await fetch("/api/getData");
      const data = await response.json();
      setData(data);
    };
    handleData();
  }, []);

  return (
    <section className="my-20 lg:px-20 px-2">
      <h1 className="text-2xl font-bold text-center lg:text-start">
        Latest Post
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-4 gap-6 mt-14">
        {data.map((item, index) => (
          <Link
            href={`/blog/${item.category}`}
            key={index}
            className="mx-auto ring-1 ring-slate-200 dark:ring-slate-50 dark:ring-opacity-10 px-3 py-3 rounded-lg cursor-pointer"
          >
            <div>
              {/* <Image
                src={item.blogImage.url}
                alt="blog-img"
                width={280}
                height={200}
                className="w-full h-[200px]"
              /> */}
            </div>
            <h1 className="mt-5 font-bold md:text-3xl text-2xl ">
              {item.title}
            </h1>
            <div className="my-5 flex items-center gap-x-4">
              {/* <Image
                src={urlFor(item.authorImage).url()}
                alt="author-pic"
                width={36}
                height={36}
                className="w-auto h-auto"
              /> */}
              <p className="text-accent-foreground text-sm font-medium">
                {item.title}
              </p>
              <p className="text-accent-foreground text-sm ">
                {/* {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(item.dateCreated))} */}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestBlog;
