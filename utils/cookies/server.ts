"use server";
import { cookies } from "next/headers";
import { CookiesConstant } from "../constants";

export async function getServerAuthCookies() {
  const cookieStore = cookies();
  return {
    accessToken: cookieStore.get(CookiesConstant.accessToken),
    refreshToken: cookieStore.get(CookiesConstant.refreshToken),
  };
}

export async function getAllCookies() {
  const cookieStore = cookies();
  return cookieStore.getAll();
}

export async function setServerAuthCookies({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) {
  console.log("inside set cookies");
  const cookieStore = cookies();
  cookieStore.set(CookiesConstant.accessToken, access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  cookieStore.set(CookiesConstant.refreshToken, refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
}

export async function resetServerAccessCookies(access_token: string) {
  const cookieStore = cookies();
  cookieStore.set(CookiesConstant.accessToken, access_token);
}

export async function removeServerAuthCookies() {
  const cookieStore = cookies();
  console.log("removing cookies");
  cookieStore.delete(CookiesConstant.accessToken);
  cookieStore.delete(CookiesConstant.refreshToken);
}
