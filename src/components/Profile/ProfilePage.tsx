// src/components/profile/ProfilePage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import ProfileSkeleton from "./ProfileSkeleton";

// Define your data interface
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

// Interface for User data
interface UserData {
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
}

const fetchUserData = async (): Promise<DataType[]> => {
  const response = await fetch(`/api/getData`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

const ProfilePage = () => {
  const { id } = useParams(); // Get the dynamic profile id
  const { data: session } = useSession();
  const [usersData, setUsersData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUsersData(data);

        // Look for user in the posts data
        const foundUser = data.find((item) => item.userId._id === id);

        if (foundUser) {
          // If user found in posts, use that data
          setUserData(foundUser.userId);
        } else {
          // If no posts found, we need to fetch user data directly
          // This would require a new API endpoint to get user by ID
          fetch(`/api/users/${id}`)
            .then((res) => {
              if (!res.ok && res.status === 404) {
                setNotFound(true);
                return null;
              }
              return res.json();
            })
            .then((userData) => {
              if (userData) {
                setUserData(userData);
              }
            })
            .catch((error) => {
              console.error("Failed to fetch user data:", error);
              setNotFound(true);
            });
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (notFound || !userData) {
    return (
      <h1 className="text-4xl mt-4 w-full h-[600px] flex justify-center items-center">
        User Not Found.
      </h1>
    );
  }

  const userPosts: DataType[] = usersData.filter((e) => e.userId._id === id);
  const currentUserId = session?.user?.id || "";
  const isFollowing = userData.followers.includes(currentUserId);
  const isAuthor = session?.user?.id === userData._id;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center px-4 py-6"
    >
      <div className="lg:w-[85%] xl:w-[65%] mt-8">
        <ProfileHeader
          userData={userData}
          isAuthor={isAuthor}
          isFollowing={isFollowing}
          currentUserId={currentUserId}
          userPosts={userPosts}
        />
        <ProfilePosts userPosts={userPosts} userData={userData} />
      </div>
    </motion.div>
  );
};

export default ProfilePage;
