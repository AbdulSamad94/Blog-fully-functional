import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { Switch } from "./ui/switch";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const LinksData = [
  {
    name: "Home",
  },
  {
    name: "Blog",
  },
  {
    name: "Single Post",
  },
  {
    name: "Pages",
  },
  {
    name: "Contact",
  },
];

const Navbar = () => {
  return (
    <nav className="px-8 py-8">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-x-2 cursor-pointer">
          <Image src="/navbar/Union.png" alt="logo" width={36} height={36} />
          <p className="text-2xl poppins">
            Meta<span className="font-bold">Blog</span>
          </p>
        </Link>
        <div>
          <ul className="flex gap-x-16 text-sm">
            {LinksData.map((item, index) => (
              <li key={index}>
                <Link href={"/"}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex gap-x-8 items-center">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Switch />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
