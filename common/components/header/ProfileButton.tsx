"use client";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect } from "react";
import {
  getServerAuthCookies,
  removeAuthCookies,
  removeServerAuthCookies,
} from "@/utils/cookies";
import { IProfile } from "@/interfaces/profile.interface";
import { useRouter } from "next-nprogress-bar";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slice/accountSlice";
import { userSelector } from "@/store/selector";
const ProfileButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const profile = useSelector(userSelector);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getProfile = async () => {
    const cookies = await getServerAuthCookies();
    console.log(cookies.accessToken);
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
    getProfile();
  }, []);

  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={"6px"}>
        <IconButton onClick={handleClick}>
          <AccountCircleIcon fontSize="medium" />
        </IconButton>
        <Typography>{profile?.full_name}</Typography>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            router.push("/profile");
            setAnchorEl(null);
          }}
        >
          My Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            removeServerAuthCookies().then(() => {
              router.replace("/login");
            });
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileButton;
