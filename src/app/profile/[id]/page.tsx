import Image from "next/image";
import FollowButton from "@/components/ui/Follow";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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
  const userPosts = data.filter((e: DataType) => e.userId._id === id);

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
      <div className="w-[65%] mt-8">
        <div className="bg-background shadow-lg pb-8">
          <Image
            src={user.userId.Bannerimage.url}
            alt=""
            width={400}
            height={400}
            className="w-full h-[300px] rounded-tr-xl rounded-tl-xl"
          />
          <div className="px-8 flex mt-4 items-center">
            <Image
              src={user.userId.image}
              alt="profile-img"
              width={200}
              height={200}
              className="rounded-full"
            />
            <div className="ml-8">
              <h1 className="text-3xl font-semibold">{user.userId.name}</h1>
              <div className="flex items-center mt-2 gap-x-2 text-slate-500 dark:text-gray-400">
                <p>{user.userId.email}</p>
                <p>{"•"}</p>
                <p>{user.userId.followers.length} Followers</p>
                <p>{"•"}</p>
                <p>{userPosts.length} Posts</p>
              </div>
              <p className="text-slate-500 dark:text-gray-400 mt-2">
                {user.userId.bio}
              </p>
              <div className="mt-3">
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
        <div>
          <h1>Posts</h1>
        </div>
      </div>
    </section>
  );
};

export default page;
