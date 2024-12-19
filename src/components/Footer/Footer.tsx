import Link from "next/link";
import { Input } from "../ui/input";

const links = [
  {
    title: "Quick Links",
    a1: {
      name: "Home",
      link: "/",
    },
    a2: "About",
    a3: {
      name: "Blog",
      link: "/blog",
    },
    a4: "Archeived",
    a5: "Author",
    a6: {
      name: "Contact",
      link: "/contact",
    },
  },
  {
    title: "Category",
    a1: {
      name: "LifeStyle",
      link: "/",
    },
    a2: "Technology",
    a3: {
      name: "Travel",
      link: "/",
    },
    a4: "Buisness",
    a5: "Economy",
    a6: {
      name: "Sports",
      link: "/",
    },
  },
];
const Footer = () => {
  return (
    <footer className="mt-20 flex justify-center py-20 bg-slate-100 dark:bg-slate-950/35 border-t-2 border-t-slate-200 border-opacity-10">
      <div className="flex justify-center items-center mx-auto relative 2xl:w-[1300px] lg:w-[1200px] flex-col">
        <div className="grid gird-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-self-center px-3">
          <div>
            <h2 className="font-medium text-lg">About</h2>
            <p className="mt-3 text-sm dark:text-gray-400 text-slate-700">
              Hi! I my name is Abdul Samad, and i am a passionate Mern Stack
              Developer with expertise in Next.js, React.js, MongoDB,
              Express.js, TailwindCSS etc, if you dont know about these
              technologies, Contact me for more info.
            </p>
            <p className="mt-4 text-sm dark:text-gray-400 text-slate-700">
              <span className="font-medium dark:text-white text-slate-900">
                Email :
              </span>{" "}
              abdulsamadsiddiqui2000@gmail.com
            </p>
            <p className="text-sm dark:text-gray-400 text-slate-700">
              <span className="font-medium dark:text-white text-slate-900">
                Phone :
              </span>{" "}
              +92 3132959809
            </p>
          </div>
          <div className="flex gap-20">
            {links.map((item, index) => (
              <div key={index}>
                <h2 className="text-lg font-medium mb-4">{item.title}</h2>
                <div className=" dark:text-slate-300 flex flex-col gap-2">
                  <Link className="hover:underline" href={item.a1.link}>
                    {item.a1.name}
                  </Link>
                  <p className="hover:underline cursor-pointer">{item.a2}</p>
                  <Link className="hover:underline" href={item.a3.link}>
                    {item.a3.name}
                  </Link>
                  <p className="hover:underline cursor-pointer">{item.a4}</p>
                  <p className="hover:underline cursor-pointer">{item.a5}</p>
                  <Link className="hover:underline" href={item.a6.link}>
                    {item.a6.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="dark:bg-customDarkBlue bg-white sm:w-[392px] sm:h-[254px] rounded-md flex flex-col justify-center items-center py-10 sm:py-0">
              <h2 className="text-xl font-semibold">Weekly Newsletter</h2>
              <p className="dark:text-slate-300 mt-2">
                Get blog articles and offers via email
              </p>
              <div className="px-9 w-full">
                <Input
                  placeholder="Your Email"
                  className="mt-6 bg-background h-10 "
                />
                <button className="bg-blue-500 w-full h-10 rounded-md mt-2 text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full dark:bg-slate-600 bg-slate-300 rounded-full h-[1px] my-16"></div>
        <div className="flex items-center w-full justify-between flex-col sm:flex-row gap-10">
          <div>
            <Link href="/" className="flex items-center gap-x-2 cursor-pointer">
              <div className="dark:bg-dark-logo bg-light-logo h-10 w-10 bg-center bg-no-repeat"></div>
              <div>
                <p className="text-xl poppins">
                  Meta<span className="font-bold">Blog</span>
                </p>
                <p className="text-sm font-light">
                  @AbdulSamad 2025. All Right Reserved
                </p>
              </div>
            </Link>
          </div>
          <div className="flex space-x-5 font-light">
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
