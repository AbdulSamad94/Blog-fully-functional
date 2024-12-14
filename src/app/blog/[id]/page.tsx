import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import Delete from "@/components/Delete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <section>
        <h1>You must be logged in to view this page.</h1>
      </section>
    );
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getData`);

  if (!response.ok) {
    toast.error("Failed to fetch blog data");
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

  const isAuthor = blogData.userId._id === session.user?.id;

  return (
    <section className="p-6 mt-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-7">
          <Button className="text-xs">{blogData.category}</Button>
          {isAuthor && (
            <div className="flex md:hidden items-center gap-x-6">
              <Link href={`/updatePost/${blogData._id}`}>
                <Pencil
                  size={20}
                  className="text-green-500 transition-colors hover:text-green-800"
                />
              </Link>
              <Delete id={blogData._id} />
            </div>
          )}
        </div>
        <h1 className="text-3xl font-semibold mb-4">{blogData.title}</h1>
        <div className="flex justify-between items-center my-8 ">
          <div className="flex items-center gap-x-4">
            <Image
              src={blogData.userId.image}
              alt="profile"
              width={36}
              height={36}
              className="rounded-full"
            />
            <p className="text-accent-foreground md:text-sm text-xs font-medium">
              {blogData.userId.name}
            </p>
            <p className="text-accent-foreground md:text-sm text-xs ">
              {format(new Date(blogData.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
          {isAuthor && (
            <div className="md:flex hidden items-center gap-x-6">
              <Link href={`/updatePost/${blogData._id}`}>
                <Pencil
                  size={20}
                  className="text-green-500 transition-colors hover:text-green-800"
                />
              </Link>
              <Delete id={blogData._id} />
            </div>
          )}
        </div>
        <Image
          src={blogData.image.url}
          alt={blogData.title}
          width={800}
          height={400}
          className="w-full h-auto mb-4 mt-12 rounded-xl dark:shadow-slate-600 shadow-black shadow"
        />
        <p className="dark:text-gray-300 whitespace-pre-wrap mt-10">
          {blogData.description}
        </p>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Page;
