"use client";

import { useState, useEffect } from "react";
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
  const { data: session, status } = useSession(); // Getting session data
  interface UserData {
    id: string;
    image?: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data using session user ID
  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        const userId = session.user.id; // Get user ID from session

        try {
          const response = await fetch(`/api/users/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session]); // Run effect when session changes

  if (status === "loading") {
    return <Skeleton className="w-12 h-12 rounded-full" />; // Show skeleton while loading session
  }

  if (!session) {
    return <button onClick={() => signIn()}>Sign in</button>; // Show SignIn if no session
  }

  // Show Profile Data Once User Data is Loaded
  if (userData) {
    return (
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
            {!userData.image ? (
              <Skeleton className="w-12 h-12 rounded-full" />
            ) : (
              <Image
                src={userData.image} // User image if available
                alt="profile-img"
                width={50}
                height={50}
                className="rounded-full w-12 h-12"
              />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <User2 size={20} />
              <Link className="flex" href={`/profile/${session.user.id}`}>
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
    );
  }

  return null; // If no user data or session, return nothing
}
