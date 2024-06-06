"use client";

// import { clientAuthToken } from "@/utils/http";
import { useState } from "react";
import { setAuthCookies } from "../cookies";

export default function AuthProvider({
  children,
  initialAccessToken = {
    accessToken: "",
    refreshToken: "",
  },
}: {
  children: React.ReactNode;
  initialAccessToken?: {
    accessToken?: string;
    refreshToken?: string;
  };
}) {
  useState(() => {
    if (typeof window !== "undefined") {
      if (initialAccessToken.accessToken && initialAccessToken.refreshToken) {
        // setAuthCookies({
        //   access_token: initialAccessToken.accessToken,
        //   refresh_token: initialAccessToken.refreshToken,
        // });
      }
    }
  });

  return <>{children}</>;
}
