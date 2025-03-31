// src/components/post/MakePostForm.tsx
import Image from "next/image";
import { easeInOut, motion } from "motion/react";

interface MakePostFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  image: File | null;
  setImage: (image: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (imagePreview: string | null) => void;
  category: string;
  setCategory: (category: string) => void;
  categories: string[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const MakePostForm = ({
  title,
  setTitle,
  description,
  setDescription,
  imagePreview,
  category,
  setCategory,
  categories,
  handleImageChange,
  isLoading,
}: MakePostFormProps) => {
  return (
    <>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
      >
        <p className="block text-lg font-medium">Title</p>
        <input
          id="title"
          type="text"
          value={title}
          minLength={20}
          maxLength={50}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Enter your blog title"
          className={`mt-2 w-full rounded-md border ${
            title.length >= 30 ? "border-green-500" : "border-red-500"
          } focus:outline-none shadow-sm py-4 px-8`}
          required
        />
        <p
          className={`mt-2 text-sm ${
            title.length >= 30 ? "text-green-600" : "text-red-600"
          }`}
        >
          {title.length >= 30
            ? "Title is valid!"
            : "Title must be at least 30 characters."}
        </p>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
      >
        <p className="block text-lg font-medium">Description</p>
        <textarea
          id="description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          placeholder="Write a brief description of your blog"
          minLength={150}
          rows={4}
          className={`mt-2 w-full rounded-md border ${
            description.length >= 150 ? "border-green-500" : "border-red-500"
          } focus:outline-none shadow-sm py-4 px-8`}
          required
        />
        <p
          className={`mt-2 text-sm ${
            description.length >= 150 ? "text-green-600" : "text-red-600"
          }`}
        >
          {description.length >= 150
            ? "Description is valid!"
            : "Description must be at least 100 characters."}
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
      >
        <p className="block text-lg font-medium">Blog Image</p>
        <label
          htmlFor="image"
          className="my-6 text-base rounded-md py-2 px-4 bg-blue-500 text-white font-medium cursor-pointer inline-block"
        >
          Choose File
        </label>

        {/* Hidden File Input */}
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden" // Hides the default file input
          required
        />

        {imagePreview && (
          <div className="mt-4">
            <Image
              src={imagePreview}
              alt="Selected Preview"
              width={300}
              height={300}
              className="max-w-full h-auto rounded-md border-gray-300 border dark:border-opacity-20 shadow-md"
            />
          </div>
        )}
      </motion.div>

      {/* Blog Category */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
      >
        <p className="block text-lg font-medium">Blog Category</p>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-3 rounded-md py-3 px-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
      >
        <button
          type="submit"
          className="rounded-md transition-all bg-blue-500 text-white py-2 px-4 font-semibold hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2"
        >
          {isLoading ? "Loading..." : "Create Post"}
        </button>
      </motion.div>
    </>
  );
};

export default MakePostForm;
