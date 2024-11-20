import React from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import ThemeTogller from "./themeToggler";

const Header = () => {
  return (
    <header className="flex justify-between items-center mx-10 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-x-2 cursor-pointer">
          <div className="dark:bg-dark-logo bg-light-logo h-10 w-10 bg-center bg-no-repeat"></div>
          <p className="text-2xl poppins">
            Meta<span className="font-bold">Blog</span>
          </p>
        </Link>
      </div>
      <div>
        <Navbar />
      </div>
      <div>
        {" "}
        <div>
          <div className="flex gap-x-8 items-center">
            <Dashboard />
            <ThemeTogller />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
