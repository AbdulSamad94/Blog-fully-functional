"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isLoading: boolean;
}

export default function BlogFilter({
  categories,
  activeCategory,
  onCategoryChange,
  isLoading,
}: BlogFilterProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-8">
        <Skeleton className="w-full max-w-3xl h-12 rounded-lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center items-center my-8"
    >
      <div className="w-full max-w-4xl overflow-x-auto scrollbar-hide pb-2">
        <Tabs
          defaultValue={activeCategory}
          value={activeCategory}
          className="w-full"
        >
          <TabsList className="bg-background h-auto p-1 flex flex-nowrap min-w-max">
            {categories.map((category, index) => (
              <TabsTrigger
                key={index}
                value={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 whitespace-nowrap text-sm ${
                  activeCategory === category
                    ? "font-medium"
                    : "font-normal text-muted-foreground"
                }`}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </motion.div>
  );
}
