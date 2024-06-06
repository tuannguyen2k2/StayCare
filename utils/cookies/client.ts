import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Cookies from "js-cookie";
import { CookiesConstant } from "../constants";

export const getAuthCookies = () => {
  return {
    accessToken: getCookie(CookiesConstant.accessToken),
    refreshToken: getCookie(CookiesConstant.refreshToken),
  };
};

export const setAuthCookies = async ({
  access_token,
  refresh_token,
  // role,
}: {
  access_token: string;
  refresh_token: string;
  // role: string;
}) => {
  console.log(access_token);
  Cookies.set(CookiesConstant.accessToken, access_token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  setCookie(CookiesConstant.refreshToken, refresh_token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
};

export const removeAuthCookies = () => {
  deleteCookie(CookiesConstant.accessToken);
  deleteCookie(CookiesConstant.refreshToken);
  deleteCookie(CookiesConstant.role);
  console.log("removing cookies");
};
