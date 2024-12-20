import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Post",
  description:
    "Welcome to the Update post page, here you can update your blog post",
};

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default BlogLayout;
