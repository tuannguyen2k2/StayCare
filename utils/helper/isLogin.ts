import { hasCookie } from "cookies-next";
import { CookiesConstant } from "../constants";
import Cookies from "js-cookie";
import { getAllCookies } from "../cookies";
export const isLogin = async () => {
  const cookies = await getAllCookies();
  console.log(!!cookies.find((cookie) => cookie.name === CookiesConstant.accessToken));
  return !!cookies.find((cookie) => cookie.name === CookiesConstant.accessToken);
};