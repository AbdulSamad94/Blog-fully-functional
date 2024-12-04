"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, SquarePen } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Link
          href="/make-post"
          className="flex items-center justify-center mr-8"
        >
          Create post <SquarePen size={20} className="ml-3" />
        </Link>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-center items-center outline-none">
              <Image
                src={session.user?.image as string}
                alt="profile-img"
                width={50}
                height={50}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Sign out <LogOut size={20} className="ml-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
