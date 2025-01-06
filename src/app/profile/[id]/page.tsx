import Image from "next/image";
import FollowButton from "@/components/ui/Follow";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
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

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

const fetchUserData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getData`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
};

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const data = await fetchUserData();

  const user: DataType = data.find((item: DataType) => item.userId._id === id);
  const userPosts: DataType[] = data.filter(
    (e: DataType) => e.userId._id === id
  );

  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id;

  // Check if the current user is following the target user
  const isFollowing = user.userId.followers.includes(currentUserId || "");

  if (!user) {
    return (
      <h1 className="text-4xl mt-4 w-full h-[600px] flex justify-center items-center">
        User Not Found.
      </h1>
    );
  }

  const isAuthor = session?.user.id === user.userId._id;
  return (
    <section className="flex justify-center items-center">
      <div className="lg:w-[85%] xl:w-[65%] mt-8">
        <div className="bg-background shadow-lg pb-8">
          <Image
            src={user.userId.Bannerimage.url}
            alt=""
            width={400}
            height={400}
            className="lg:w-full lg:h-[300px] h-[120px] lg:rounded-tr-xl lg:rounded-tl-xl"
          />
          <div className="lg:px-8 flex mt-4 items-center lg:flex-row flex-col">
            <Image
              src={user.userId.image}
              alt="profile-img"
              width={200}
              height={200}
              className="rounded-full shadow lg:w-[200px] lg:h-auto w-24 h-24"
            />
            <div className="lg:ml-8 text-center lg:text-start">
              <h1 className="lg:text-3xl text-2xl font-semibold mt-4 lg:mt-0">
                {user.userId.name}
              </h1>
              <div className="flex lg:flex-row flex-col items-center mt-2 gap-2 text-sm lg:text-base text-slate-500 dark:text-gray-400">
                <p>{user.userId.email}</p>
                <p className="hidden lg:block">{"•"}</p>
                <p>{user.userId.followers.length} Followers</p>
                <p className="hidden lg:block">{"•"}</p>
                <p>{userPosts.length} Posts</p>
              </div>
              <p className="text-slate-500 dark:text-gray-400 mt-2 text-sm lg:text-base">
                {user.userId.bio}
              </p>
              <div className="mt-3 flex justify-center lg:justify-normal items-centers">
                {!isAuthor && (
                  <FollowButton
                    targetUserId={user.userId._id}
                    currentUserId={currentUserId}
                    isFollowing={isFollowing}
                    followersCount={user.userId.followers.length}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h1 className="text-3xl font-semibold mb-10">Posts</h1>
          {userPosts.map((item, index) => (
            <Link
              href={`/blog/${item._id}`}
              className="mx-3 border-t border-slate-300 dark:border-slate-600 py-10 flex flex-col lg:flex-row justify-between items-center gap-x-4"
              key={index}
            >
              <div className="lg:w-[70%]">
                <div className="flex items-center gap-x-4">
                  <Image
                    src={user.userId.image}
                    alt={user.userId.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="font-semibold">{user.userId.name}</p>
                </div>
                <h1 className="mt-4 text-3xl font-semibold">{item.title}</h1>
                <p className="mt-3 dark:text-gray-400 whitespace-break-spaces break-words">
                  {item.description.substring(0, 150)} .....
                </p>
                <div className="mt-4 flex gap-x-6 items-center text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    about{" "}
                    {formatDistanceToNow(new Date(user.createdAt), {
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
          ))}
          <div className="border-t border-slate-300 dark:border-slate-600 mx-3"></div>
        </div>
      </div>
    </section>
  );
};

export const metadata = {
  title: "Profile Page",
  description: "Welcome to the Profile page of the Blog website",
};

export default page;
