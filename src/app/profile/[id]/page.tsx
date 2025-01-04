import Image from "next/image";

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

  return (
    <section className="flex justify-center items-center">
      <div className="w-[65%] mt-8">
        <div className="bg-background shadow">
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
              <div className="flex items-center mt-2 gap-x-4">
                <p className="text-gray-400">{user.userId.email}</p>
                <p className="text-gray-400">{"•"}</p>
                <p className="ml-2 text-gray-400">
                  {user.userId.followers.length} Followers
                </p>
              </div>
              <p className="text-gray-400 mt-2">{user.userId.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
