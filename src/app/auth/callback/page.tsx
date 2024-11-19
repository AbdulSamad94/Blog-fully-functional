"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AuthCallbackPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );
      if (error) {
        console.error("Error during authentication callback:", error);
      } else {
        console.log("Authentication successful:", data);
        // Redirect the user to the desired page after successful authentication
        router.push("/");
      }
    };

    handleAuth();
  }, [supabase, router]);

  return <div>Loading...</div>;
};

export default AuthCallbackPage;
