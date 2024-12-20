import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Post",
  description:
    "Welcome to the Mkae post page, here you can make your blog post",
};

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default BlogLayout;
