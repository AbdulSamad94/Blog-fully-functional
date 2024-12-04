import { client } from "@/sanity/lib/client";

interface dataType {
  author: string;
  authorImage: string;
  title: string;
  dateCreated: string;
  blogImage: string;
  slugCreated: string;
  body: any[];
}

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "blog"]{
      "slugCreated": slug.current
    }`
  );

  return slugs.map((slug: { slugCreated: string }) => ({
    id: slug.slugCreated,
  }));
}

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const data: dataType | null = await client.fetch(
    `*[_type == "blog" && slug.current == $id][0]{
      author,
      authorImage,
      title,
      dateCreated,
      blogImage,
      body,
      "slugCreated": slug.current
    }`,
    { id }
  );

  if (!data) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <div>{data.author}</div>
      <div>{data.title}</div>
      <div>{new Date(data.dateCreated).toLocaleDateString()}</div>
    </div>
  );
};

export default Page;
