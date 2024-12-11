import Link from "next/link";
import Image from "next/image";

interface dataType {
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

//fetching blog data from the route
async function fetchBlogs(): Promise<dataType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
}

const LatestBlog = async () => {
  const data: dataType[] = await fetchBlogs();

  return (
    <section className="my-20 lg:px-20 px-2">
      <h1 className="text-2xl font-bold text-center lg:text-start">
        Latest Post
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-4 gap-6 mt-14">
        {data.slice(0, 9).map((item) => (
          <Link
            href={`/blog/${item._id}`}
            key={item._id}
            className="mx-auto ring-1 ring-slate-200 dark:ring-slate-50 dark:ring-opacity-10 px-3 py-3 rounded-lg cursor-pointer w-[369px]"
          >
            <div>
              <Image
                src={item.image.url}
                alt="blog-img"
                width={280}
                height={200}
                className="w-full h-[167px]"
              />
            </div>
            <h1 className="mt-5 font-bold md:text-3xl text-2xl ">
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
              <p className="text-accent-foreground text-sm font-medium">
                {item.userId.name}
              </p>
              <p className="text-accent-foreground text-sm ">
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(item.createdAt))}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 w-full">
        <Link
          href="/blog"
          className=" ring-1 ring-slate-200 dark:ring-slate-50 dark:ring-opacity-10 px-4 py-3 rounded-md dark:text-gray-300"
        >
          View All Posts
        </Link>
      </div>
    </section>
  );
};

export default LatestBlog;
