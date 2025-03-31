// src/components/profile/ProfilePosts.tsx
import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircleMore } from "lucide-react";
import Link from "next/link";

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

interface ProfilePostsProps {
  userPosts: DataType[];
  userData: UserData;
}

const ProfilePosts = ({ userPosts, userData }: ProfilePostsProps) => {
  return (
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
        className={`${
          userPosts.length > 0 ? "" : "hidden"
        } border-t border-slate-300 dark:border-slate-600 mx-3`}
      ></div>
    </div>
  );
};

export default ProfilePosts;
