"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  "Technology",
  "Social",
  "Education",
  "LifeStyle",
  "Business & Finance",
  "Creative Arts",
  "Gaming & Entertainment",
  "Food & Recipes",
];

export default function CreatePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/updatePost/${id}`
        );
        const data = await response.json();

        if (response.ok && data.success) {
          const post = data.result;

          if (post.userId !== session?.user.id) {
            toast.error("Unauthorized access.");
            setTimeout(() => {
              router.push("/");
            }, 2000);
            return;
          }

          setTitle(post.title);
          setDescription(post.description);
          setImagePreview(post.image.url);
          setCategory(post.category);
        } else {
          toast.error("Failed to fetch post data.");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
      }
    };

    fetchPostData();
  }, [id, session, router]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !description || !category) {
      toast.error("Please fill in all fields!");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare the updated post data
      let uploadedImage = null;

      if (image) {
        // If a new image is uploaded, upload it to Cloudinary
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "nextjs_blog_imgs");

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/dwd9h8qgy/image/upload`,
          { method: "POST", body: formData }
        );
        const uploadData = await uploadRes.json();

        if (uploadRes.ok) {
          uploadedImage = {
            id: uploadData.public_id,
            url: uploadData.secure_url,
          };
        } else {
          throw new Error("Failed to upload image.");
        }
      }

      // Construct the payload
      const updatedPost: Record<string, any> = {
        title,
        description,
        category,
        userId: session?.user.id,
      };

      // Include the image only if a new one is uploaded
      if (uploadedImage) {
        updatedPost.image = uploadedImage;
      }

      const response = await fetch(`/api/updatePost/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Post updated successfully!");
        setTimeout(() => {
          router.push(`/blog/${id}`);
        }, 2000);
      } else {
        toast.error(`Error: ${data.message || "Failed to update post"}`);
      }
    } catch (err) {
      console.error("Error updating post:", err);
      toast.error("An error occurred while updating the post.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!id || !session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full p-6 space-y-6">
          <h1 className="text-3xl font-semibold text-center">Edit Blog Post</h1>
          {/* Title */}
          <div>
            <p className="text-lg font-medium">Title</p>
            <input
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
          </div>

          {/* Description */}
          <div>
            <p className="text-lg font-medium">Description</p>
            <textarea
              value={description}
              minLength={150}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              placeholder="Enter blog description"
              rows={4}
              className={`mt-2 w-full rounded-md border ${
                description.length >= 150
                  ? "border-green-500"
                  : "border-red-500"
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
          </div>

          {/* Image */}
          <div>
            <p className="text-lg font-medium">Image</p>
            <label
              htmlFor="image"
              className="my-6 text-base rounded-md py-2 px-4 bg-blue-500 text-white font-medium cursor-pointer inline-block"
            >
              Choose File
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={300}
                height={200}
                className="mt-4 rounded-md shadow"
              />
            )}
          </div>

          {/* Category */}
          <div>
            <p className="text-lg font-medium">Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-3 rounded-md py-3 px-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="rounded-md transition-all bg-blue-500 text-white py-2 px-4 font-semibold hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-2"
          >
            {isLoading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
