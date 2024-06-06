"use client";
import { userApi } from "@/clientApi/user";
import { IProfile } from "@/interfaces/profile.interface";
import PasswordForm from "@/modules/profile/PasswordForm";
import ProfileForm from "@/modules/profile/ProfileForm";
import { userSelector } from "@/store/selector";
import { CommonConstants } from "@/utils/constants";
import { getServerAuthCookies } from "@/utils/cookies";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button, Icon, Typography } from "@mui/material";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProfilePage() {
  const [activeButton, setActiveButton] = useState(0);
  const router = useRouter();
  const profile = useSelector(userSelector);

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      gap={"40px"}
      alignSelf={"center"}
      width={CommonConstants.dimensions.contentWidth - 600}
      justifyContent="center"
      py={CommonConstants.spacing.verticalPadding}
    >
      <Box
        component={"button"}
        display={"flex"}
        alignItems={"center"}
        sx={{
          color: "#F7961D",
          bgcolor: "transparent",
          border: 0,
          width: "fit-content",
          cursor: "pointer",
        }}
        onClick={() => router.back()}
      >
        <Icon
          component={ArrowBackIosIcon}
          fontSize={"inherit"}
          sx={{ color: "#F7961D", mb: "1px" }}
        />
        Back
      </Box>
      {activeButton === 0 && profile && <ProfileForm data={profile} />}
      {activeButton === 1 && <PasswordForm />}
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button
          sx={{
            color: activeButton === 0 ? "white" : "#7E7E7E",
            bgcolor: activeButton === 0 ? "#F7961D" : "white",
            "&:hover": {
              bgcolor: activeButton === 0 ? "#F7961D" : "white",
            },
          }}
          onClick={() => setActiveButton(0)}
        >
          Change Information
        </Button>
        <Button
          sx={{
            color: activeButton === 1 ? "white" : "#7E7E7E",
            bgcolor: activeButton === 1 ? "#F7961D" : "white",
            "&:hover": {
              bgcolor: activeButton === 1 ? "#F7961D" : "white",
            },
          }}
          onClick={() => setActiveButton(1)}
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
}

export default ProfilePage;
