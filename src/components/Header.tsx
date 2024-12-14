"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import ThemeTogller from "./themeToggler";
import { Menu, SquarePen } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "./ui/sheet";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const closeSheet = () => setIsOpen(false);
  return (
    <header className="flex justify-between items-center md:mx-auto mx-3 py-4 max-w-[1200px]">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-x-2 cursor-pointer">
          <div className="dark:bg-dark-logo bg-light-logo h-10 w-10 bg-center bg-no-repeat"></div>
          <p className="text-2xl poppins">
            Meta<span className="font-bold">Blog</span>
          </p>
        </Link>
      </div>
      <div className="hidden md:flex">
        <Navbar />
      </div>
      <div>
        <div>
          <div className="flex gap-x-8 items-center">
            <div className="hidden md:flex items-center gap-x-4">
              {session?.user && (
                <Link
                  href="/make-post"
                  className="flex items-center justify-center"
                >
                  Create post <SquarePen size={20} className="ml-3" />
                </Link>
              )}
              <Dashboard />
            </div>
            <ThemeTogller />
            <div className="md:hidden flex items-center">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                  <Menu className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent>
                  <SheetTitle>
                    <SheetHeader>
                      <Dashboard />
                    </SheetHeader>
                  </SheetTitle>
                  {session?.user && (
                    <Link
                      href="/make-post"
                      className="flex items-center justify-center mt-3"
                    >
                      Create post <SquarePen size={20} className="ml-3" />
                    </Link>
                  )}
                  <Navbar
                    styling="flex-col gap-y-14 mt-10 text-base"
                    closeSheet={closeSheet}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
