"use client";
import HeroSection from "@/components/hero";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="h-[4000px]">
      <HeroSection />
      <div>
        <h1>Welcome, {session?.user?.name}</h1>
        <p>Email: {session?.user?.email}</p>
        <p>User ID: {session?.user?.id}</p>
      </div>
    </main>
  );
}
