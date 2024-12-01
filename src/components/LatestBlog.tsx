import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

interface dataType {
  author: string;
  authorImage: string;
  title: string;
  dateCreated: string;
  blogImage: string;
  body: any[];
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
        }`
  );
  return (
    <section className="my-20 px-20">
      <h1 className="text-xl font-bold">Latest Post</h1>
      <div className="ml-auto place-self-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 mx-auto">
          {response.map((item, index) => (
            <div key={index} className="">
              <div>
                <Image
                  src={urlFor(item.blogImage).url()}
                  alt="blog-img"
                  width={280}
                  height={200}
                  className="w-[280px] h-[160px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
