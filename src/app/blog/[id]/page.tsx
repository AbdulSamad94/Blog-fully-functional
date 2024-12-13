import Image from "next/image";

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

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getData`);

  if (!response.ok) {
    throw new Error("Failed to fetch blog data");
  }

  const data: DataType[] = await response.json();
  const blogData = data.find((item) => item._id === id);

  if (!blogData) {
    return (
      <section>
        <h1>Blog post not found</h1>
      </section>
    );
  }

  return (
    <section className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{blogData.title}</h1>
        <Image
          src={blogData.image.url}
          alt={blogData.title}
          width={800}
          height={400}
          className="w-full h-auto mb-4"
        />
        <p className="dark:text-gray-300 whitespace-pre-wrap">
          {blogData.description}
        </p>
        <div className="flex items-center mt-6">
          <Image
            src={blogData.userId.image}
            alt={blogData.userId.name}
            width={40}
            height={40}
            className="rounded-full mr-4"
          />
          <div>
            <p className="text-sm font-medium">{blogData.userId.name}</p>
            <p className="text-xs text-gray-500">
              {new Intl.DateTimeFormat("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(blogData.createdAt))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
