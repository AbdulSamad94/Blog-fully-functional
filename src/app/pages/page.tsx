"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface User {
  _id: string;
  Bannerimage: {
    url: string;
    id: string;
  };
  name: string;
  image: string;
  email: string;
  bio: string;
  followers: string[];
}

// Main Pages component
const PagesPage: React.FC = () => {
  const [pages, setPages] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const users = await response.json();
        setPages(users);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
        {pages.map((item) => (
          <PageCard key={item._id} user={item} />
        ))}
      </div>
    </div>
  );
};

interface PageCardProps {
  user: User;
}

const PageCard: React.FC<PageCardProps> = ({ user }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-background/10 border border-slate-500">
      <div className="relative">
        <Image
          src={user.Bannerimage.url}
          alt={user.name}
          width={500}
          height={200}
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-0 left-4 -mb-12">
          <Image
            src={user.image}
            alt={`${user.name} Profile`}
            width={100}
            height={100}
            className="w-24 h-24 rounded-full border object-cover"
          />
        </div>
      </div>
      <div className="p-4 pt-8 flex justify-center items-center w-full flex-col">
        <h3 className="font-semibold text-lg">{user.name}</h3>
        <p className="text-gray-600 text-sm">{user.bio}</p>
        {/* Add more details here if needed */}
      </div>
      <div className="p-4 flex justify-between items-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mx-auto w-full">
          Follow
        </button>
      </div>
    </div>
  );
};

export default PagesPage;
