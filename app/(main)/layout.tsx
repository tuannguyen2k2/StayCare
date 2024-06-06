"use client";
import AppFooter from "@/common/components/footer";
import AppHeader from "@/common/components/header";
import { setUser } from "@/store/slice/accountSlice";
import { CommonConstants } from "@/utils/constants";
import { getAllCookies, getServerAuthCookies } from "@/utils/cookies";
import { Box } from "@mui/material";
import { getCookie } from "cookies-next";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
async function MainLayout({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const getProfile = async () => {
    const cookies = await getServerAuthCookies();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${cookies.accessToken?.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      dispatch(setUser(data.data));
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      getProfile();
    }
  }, []);
  return (
    <>
      <AppHeader />
      <Box height={CommonConstants.dimensions.appBarHeight} />
      <Box
        display="flex"
        flexDirection="column"
        minHeight={`calc(100vh - ${CommonConstants.dimensions.appBarHeight}px - ${CommonConstants.dimensions.footerHeight}px)`}
      >
        {children}
      </Box>
      <AppFooter />
    </>
  );
}

export default MainLayout;
