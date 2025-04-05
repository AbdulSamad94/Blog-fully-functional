"use client";

import { useState, useEffect, useMemo } from "react";
import BlogFilter from "@/components/blog/blog-filter";
import BlogGrid from "@/components/blog/blog-grid";
import PageHeader from "@/components/blog/page-header";

interface DataType {
  image: { id: string; url: string };
  _id: string;
  title: string;
  description: string;
  category: string;
  userId: { _id: string; name: string; email: string; image: string };
  createdAt: string;
}

export default function BlogPage() {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("All Blogs");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/getData`, {
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const result = await res.json();
        if (Array.isArray(result)) {
          setData(result);
          setError(null);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = useMemo(
    () => ["All Blogs", ...new Set(data.map((item) => item.category))],
    [data]
  );

  const filteredPosts = useMemo(
    () =>
      data.filter((post) =>
        category === "All Blogs" ? true : post.category === category
      ),
    [data, category]
  );

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <PageHeader title="Blog Posts" />

      <BlogFilter
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
        isLoading={isLoading}
      />

      {error ? (
        <div className="mt-10 text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
          <p>{error}</p>
          <button
            onClick={() => {
              setIsLoading(true);
              setError(null);
              // Re-fetch data
              fetch(`/api/getData`, {
                cache: "no-store",
                credentials: "include",
              })
                .then((res) => res.json())
                .then((result) => {
                  if (Array.isArray(result)) {
                    setData(result);
                    setError(null);
                  }
                })
                .catch((err) => {
                  setError(
                    "Failed to load blog posts. Please try again later."
                  );
                })
                .finally(() => setIsLoading(false));
            }}
            className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-md hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <BlogGrid posts={filteredPosts} isLoading={isLoading} />
      )}
    </section>
  );
}
