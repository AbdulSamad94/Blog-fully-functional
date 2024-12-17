"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

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
  const pathName = usePathname();

  return (
    <nav className="px-8 py-8">
      <div className={`${styling} flex gap-x-16 text-sm`}>
        {LinksData.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            key={index}
          >
            <Link
              className={`${
                pathName === item.link ? "text-blue-600" : ""
              } transition-all`}
              onClick={closeSheet}
              href={item.link}
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
