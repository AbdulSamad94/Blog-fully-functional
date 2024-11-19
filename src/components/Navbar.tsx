"use client";

import Image from "next/image";
import Link from "next/link";
import { Switch } from "./ui/switch";

const LinksData = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Single Post", href: "/post" },
  { name: "Pages", href: "/pages" },
  { name: "Contact", href: "/contact" },
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
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex gap-x-8 items-center">
            <Switch />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
