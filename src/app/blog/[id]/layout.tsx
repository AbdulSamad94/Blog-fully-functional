import { Metadata } from "next";

interface DataType {
  _id: string;
  title: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getData`);
  const blogData: DataType[] = await res.json();

  const data = blogData.find((e) => e._id === id);

  if (!data) {
    throw new Error("Blog data not found");
  }

  return {
    title: data.title,
    description: data.description.substring(0, 150),
  };
}

const BlogPostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default BlogPostLayout;
