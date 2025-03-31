// src/components/profile/ProfileHeader.tsx
import Image from "next/image";
import Link from "next/link";
import { PencilIcon } from "lucide-react";
import FollowButton from "@/components/Features/Follow";

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

interface ProfileHeaderProps {
  userData: UserData;
  isAuthor: boolean;
  isFollowing: boolean;
  currentUserId: string;
  userPosts: DataType[];
}

const ProfileHeader = ({
  userData,
  isAuthor,
  isFollowing,
  currentUserId,
  userPosts,
}: ProfileHeaderProps) => {
  return (
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
                className="hover:scale-105 flex gap-x-4 items-center bg-primary py-2 px-4 rounded-md text-white font-medium hover:bg-primary/50 transition-all"
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
  );
};

export default ProfileHeader;
