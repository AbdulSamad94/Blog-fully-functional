// src/components/post/MakePost.tsx
"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { easeInOut, motion } from "motion/react";
import "react-toastify/dist/ReactToastify.css";

import MakePostForm from "./MakePostForm";

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

const MakePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // use session to get user data
  const { data: session, status } = useSession();

  //router to tp to other page
  const router = useRouter();

  //form handling
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (!title || !description || !image || !category) {
      toast.error("Please fill in all fields!");
      return;
    }

    //image upload to cloudinary the freakin JOD
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
          toast.error(data.error?.message || "Failed to upload image");
        }
      } catch (err) {
        console.error("Image upload failed:", err);
        toast.error("Failed to upload image");
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
        toast.success("Post added successfully!");
        setIsLoading(false);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(`Error: ${data.message || "Failed to save post"}`);
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

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center mt-20 text-4xl text-red-600 font-semibold">
        Sign In to make post!
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-semibold text-center">
            Create New Blog Post
          </h1>
        </motion.div>
        <MakePostForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          category={category}
          setCategory={setCategory}
          categories={categories}
          handleImageChange={handleImageChange}
          isLoading={isLoading}
        />
      </form>
      <ToastContainer />
    </div>
  );
};

export default MakePost;
