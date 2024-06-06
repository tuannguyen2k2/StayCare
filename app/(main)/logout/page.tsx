"use client";

import { removeServerAuthCookies } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    console.log("logout");
    removeServerAuthCookies().then(() => {
      router.replace("/login");
    });
  }, [router]);
  // return (  );
}

export default LogoutPage;
