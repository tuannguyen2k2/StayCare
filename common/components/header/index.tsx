"use client";
import { userSelector } from "@/store/selector";
import { CommonConstants } from "@/utils/constants";
import { PersonAddAlt1Outlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Typography
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { NavRoutes } from "../../models/NavRoutes";
import { NavLink } from "../nav-link";
import ProfileButton from "./ProfileButton";
function AppHeader() {
  const profile = useSelector(userSelector);
  console.log(profile);
  const router = useRouter();
  return (
    <AppBar
      elevation={0}
      position="fixed"
      color="default"
      sx={{
        height: CommonConstants.dimensions.appBarHeight,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        px: CommonConstants.spacing.horizontalPadding,
        zIndex: 500,
      }}
    >
      <Box
        component={"button"}
        bgcolor="primary.main"
        height="100%"
        display="flex"
        alignItems="center"
        p={1}
        border={0}
        borderRadius="0 0 20px 20px"
        onClick={() => router.push("/home")}
        sx={{ cursor: "pointer" }}
      >
        <Typography color="white">SingStay&Care</Typography>
      </Box>

      <div className="flex gap-11">
        {NavRoutes.map((route) => (
          <NavLink key={route.to} props={route} href={route.to} />
        ))}
        {!profile ? (
          <Link
            href={"/login"}
            style={{ display: "flex", alignItems: "center" }}
          >
            <PersonAddAlt1Outlined style={{ marginBottom: "4px" }} />
          </Link>
        ) : (
          <ProfileButton />
        )}
      </div>
    </AppBar>
  );
}

export default AppHeader;
