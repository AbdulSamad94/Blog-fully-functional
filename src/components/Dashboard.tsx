"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [logout, setLogout] = useState(false);
  if (session) {
    return (
      <>
        <div className="relative">
          <DropdownMenu>
            <Avatar>
              <DropdownMenuTrigger>
                <AvatarImage src={session.user?.image as string} />
              </DropdownMenuTrigger>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
