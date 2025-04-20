import Image from "next/image";

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

export default PageCard;
