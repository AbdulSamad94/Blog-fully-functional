"use client";

import React, { useState, useEffect } from "react";
import PageCard from "@/components/pages/PagesCard";

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

export default PagesPage;
