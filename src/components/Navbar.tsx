"use client";

import Link from "next/link";

const LinksData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blogs",
    link: "/blog",
  },
  {
    name: "Pages",
    link: "/pages",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const Navbar = ({
  styling,
  closeSheet,
}: {
  styling?: string;
  closeSheet?: () => void;
}) => {
  return (
    <nav className="px-8 py-8">
      <div className={`${styling} flex gap-x-16 text-sm`}>
        {LinksData.map((item, index) => (
          <Link key={index} onClick={closeSheet} href={item.link}>
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
