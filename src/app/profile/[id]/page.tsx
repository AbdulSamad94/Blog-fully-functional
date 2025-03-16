"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import FollowButton from "@/components/Features/Follow";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircleMore, PencilIcon } from "lucide-react";
import Link from "next/link";
import SkeletonProfile from "@/components/Profile/Skeleton";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

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

export default function ProfilePage() {
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
    return <SkeletonProfile />;
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
        <div className="bg-background shadow-lg pb-8">
          <Image
            src={userData.Bannerimage.url}
            alt="Banner"
            width={400}
            height={400}
            className="lg:w-full lg:h-[300px] h-[120px] rounded-tr-xl rounded-tl-xl"
          />
          <div className="lg:px-8 flex mt-4 items-center lg:flex-row flex-col">
            <Image
              src={userData.image}
              alt="profile-img"
              width={200}
              height={200}
              className="rounded-full shadow lg:w-[200px] lg:h-[200px] w-24 h-24"
            />
            <div className="lg:ml-8 text-center lg:text-start mt-4 lg:mt-0">
              <h1 className="lg:text-3xl text-2xl font-semibold">
                {userData.name}
              </h1>
              <div className="flex lg:flex-row flex-col items-center mt-2 gap-2 text-sm lg:text-base text-slate-500 dark:text-gray-400">
                <p>{userData.email}</p>
                <p className="hidden lg:block">{"•"}</p>
                <p>{userData.followers.length} Followers</p>
                <p className="hidden lg:block">{"•"}</p>
                <p>{userPosts.length} Posts</p>
              </div>
              <p className="text-slate-500 dark:text-gray-400 mt-2 text-sm lg:text-base">
                {userData.bio}
              </p>
              <div className="mt-3 flex justify-center lg:justify-between items-center">
                {!isAuthor && (
                  <FollowButton
                    targetUserId={userData._id}
                    currentUserId={currentUserId}
                    isFollowing={isFollowing}
                    followersCount={userData.followers.length}
                  />
                )}
                {isAuthor && (
                  <Link
                    className="flex gap-x-4 items-center bg-primary py-2 px-4 rounded-md text-white font-medium hover:bg-primary/50 transition-all"
                    href={`/edit-profile/${userData._id}`}
                  >
                    Edit Profile{" "}
                    <PencilIcon
                      size={20}
                      className="flex justify-end text-green-500"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h1 className="text-3xl font-semibold mb-10">Posts</h1>
          {userPosts.length > 0 ? (
            userPosts.map((item, index) => (
              <Link
                key={index}
                href={`/blog/${item._id}`}
                className="mx-3 border-t border-slate-300 dark:border-slate-600 py-10 flex flex-col lg:flex-row justify-between items-center gap-x-4"
              >
                <div className="lg:w-[70%]">
                  <div className="flex items-center gap-x-4">
                    <Image
                      src={userData.image}
                      alt={userData.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <p className="font-semibold">{userData.name}</p>
                  </div>
                  <h1 className="mt-4 text-3xl font-semibold">{item.title}</h1>
                  <p className="mt-3 dark:text-gray-400 whitespace-break-spaces break-all">
                    {item.description.substring(0, 150)} .....
                  </p>
                  <div className="mt-4 flex gap-x-6 items-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      about{" "}
                      {formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                    <p className="flex gap-x-2 items-center">
                      <Heart size={16} /> {item.likes.length}
                    </p>
                    <p className="flex gap-x-2 items-center">
                      <MessageCircleMore size={16} /> {item.comments.length}
                    </p>
                  </div>
                </div>
                <div className="mt-8 lg:mt-0">
                  <Image
                    src={item.image.url}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="rounded-lg shadow-sm shadow-black lg:w-[400px] lg:h-[200px] w-[320px] h-[150px]"
                  />
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-10 mx-3">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No posts yet.
              </p>
            </div>
          )}
          <div
            className={`${userPosts.length > 0 ? "" : "hidden"} border-t border-slate-300 dark:border-slate-600 mx-3`}
          ></div>
        </div>
      </div>
    </motion.div>
  );
}
