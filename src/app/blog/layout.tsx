import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs Page",
  description:
    "Welcome to the all blogs page, here you can find all blogs that are created by categories",
};

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default BlogLayout;
