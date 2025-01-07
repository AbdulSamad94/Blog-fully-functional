"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

interface DataType {
  image: {
    id: string;
    url: string;
  };
  _id: string;
  title: string;
  description: string;
  category: string;
  likes: string[];
  comments: string[];
  userId: {
    _id: string;
    name: string;
    email: string;
    image: string;
    followers: string[];
    Bannerimage: {
      id: string;
      url: string;
    };
    bio: string;
  };
  createdAt: string;
}

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

const Page = ({ params }: RouteParams) => {
  const [id, setId] = useState<string>("");
  const [userData, setUserData] = useState<DataType | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const { id } = await params;
        setId(id);
      } catch (error) {
        console.error("Failed to resolve params:", error);
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/getData`,
          {
            cache: "no-store",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch data from API");

        const data: DataType[] = await response.json();
        const userData = data.find((e) => e.userId._id === id);

        setUserData(userData || null);
        setImage(userData?.userId.image || null);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserData();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // If no file is selected, do nothing (preserve the previous image)
  };

  return (
    <section className="flex justify-center items-center">
      <div className="lg:w-[85%] xl:w-[65%] mt-16">
        <h1 className="text-4xl font-bold tracking-wide">Edit Profile</h1>
        <div className="flex justify-center items-center mt-10">
          <div className="relative">
            {isLoading ? (
              // Show Skeleton while loading
              <Skeleton className="w-[120px] h-[120px] rounded-full" />
            ) : (
              // Show Image when loaded
              <div className="relative group">
                {image && (
                  <Image
                    src={image}
                    alt="User profile image"
                    width={120}
                    height={120}
                    className="rounded-full outline-gray-200 outline-offset-0 outline w-[120px] h-[120px] relative"
                  />
                )}
                {/* Overlay with "Upload Image" text */}
                <label
                  htmlFor="image"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 rounded-full cursor-pointer transition-all duration-300 group-hover:bg-opacity-50"
                >
                  <span className="text-white text-sm font-medium opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    Upload Image
                  </span>
                </label>
              </div>
            )}
            {/* Hidden File Input */}
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
