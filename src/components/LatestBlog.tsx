import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface dataType {
  author: string;
  authorImage: string;
  title: string;
  dateCreated: string;
  blogImage: string;
  slugCreated: string;
}

const LatestBlog = async () => {
  const response: dataType[] = await client.fetch(
    `*[ _type == "blog"] | order(dateCreated desc) {
          author,
          authorImage,
          title,
          dateCreated,
          blogImage,
          body,
          "slugCreated" : slug.current
        }`
  );
  return (
    <section className="my-20 lg:px-20 px-2">
      <h1 className="text-2xl font-bold text-center lg:text-start">
        Latest Post
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-4 gap-6 mt-14">
        {response.map((item, index) => (
          <Link
            href={`/blog/${item.slugCreated}`}
            key={index}
            className="mx-auto ring-1 ring-slate-200 dark:ring-slate-50 dark:ring-opacity-10 px-3 py-3 rounded-lg cursor-pointer"
          >
            <div>
              <Image
                src={urlFor(item.blogImage).url()}
                alt="blog-img"
                width={280}
                height={200}
                className="w-full h-[200px]"
              />
            </div>
            <h1 className="mt-5 font-bold md:text-3xl text-2xl ">
              {item.title}
            </h1>
            <div className="my-5 flex items-center gap-x-4">
              <Image
                src={urlFor(item.authorImage).url()}
                alt="author-pic"
                width={36}
                height={36}
                className="w-auto h-auto"
              />
              <p className="text-accent-foreground text-sm font-medium">
                {item.author}
              </p>
              <p className="text-accent-foreground text-sm ">
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(item.dateCreated))}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestBlog;
