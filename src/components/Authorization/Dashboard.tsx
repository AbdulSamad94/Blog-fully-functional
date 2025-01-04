"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { motion } from "motion/react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="w-12 h-12 rounded-full" />;
  }
  if (session) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
          }}
          className="relative"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-center items-center outline-none mx-auto mt-4 md:mt-0">
              <Image
                src={session.user?.image as string}
                alt="profile-img"
                width={50}
                height={50}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <User2 size={20} />
                <Link className="flex" href={`/profile/${session.user.id}`}>
                  {" "}
                  View Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut size={20} /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
