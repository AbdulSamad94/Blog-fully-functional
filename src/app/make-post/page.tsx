"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const categories = [
  "Technology",
  "Social",
  "Education",
  "LifeStyle",
  "Business & Finance",
  "Creative Arts",
  "Gaming & Entertainment",
  "Food & Reciepes",
];

export default function CreatePostPage() {
  // The States

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // use session to get user data
  const { data: session } = useSession();

  //router to tp to other page
  const router = useRouter();

  //form handling
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (!title || !description || !image || !category) {
      alert("Please fill in all fields!");
      return;
    }

    //image upload to cloudinary the freakin time saver
    const uploadImage = async () => {
      if (!image) return null;

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "nextjs_blog_imgs");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dwd9h8qgy/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (res.ok) {
          return {
            id: data.public_id,
            url: data.secure_url,
          };
        } else {
          console.error("Cloudinary upload error:", data);
          throw new Error(data.error?.message || "Failed to upload image");
        }
      } catch (err) {
        console.error("Image upload failed:", err);
        throw new Error("Failed to upload image");
      }
    };

    //uploading data to mongodb
    try {
      const uploadedImage = await uploadImage();
      if (!uploadedImage) throw new Error("Image upload failed");

      const blog = {
        title,
        description,
        category,
        image: uploadedImage,
        userId: session?.user.id,
      };

      // Send data to API
      const response = await fetch("/api/uploadPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Post added successfully!");
        setIsLoading(false);
        router.push("/");
        router.refresh();
      } else {
        alert(`Error: ${data.message || "Failed to save post"}`);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setIsLoading(false);
    }
  };

  //to show the image below the upload image button

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-center">
          Create New Blog Post
        </h1>
        {/* Title */}
        <div>
          <p className="block text-lg font-medium">Title</p>
          <input
            id="title"
            type="text"
            value={title}
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title"
            className="mt-2 w-full rounded-md border border-gray-300 dark:border-opacity-20 focus:outline-blue-500 focus:outline focus:border-none shadow-sm h-14 py-4 px-8"
            required
          />
        </div>

        {/* Description */}
        <div>
          <p className="block text-lg font-medium">Description</p>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a brief description of your blog"
            rows={4}
            className="mt-2 w-full  rounded-md border border-gray-300 dark:border-opacity-20 focus:outline-blue-500 focus:outline focus:border-none h-52 shadow-sm py-4 px-8"
            required
          />
        </div>

        {/* Image */}
        <div>
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
        </div>

        {/* Blog Category */}
        <div>
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
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="rounded-md transition-all bg-blue-500 text-white py-2 px-4 font-semibold hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2"
          >
            q{isLoading ? "Loading..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
