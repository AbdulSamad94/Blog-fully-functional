import Link from "next/link";

const LinksData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blog",
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

interface StylingComponents {
  styling?: string;
}
const Navbar = ({ styling }: StylingComponents) => {
  return (
    <nav className="px-8 py-8">
      <div>
        <ul className={`${styling} flex gap-x-16 text-sm`}>
          {LinksData.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
