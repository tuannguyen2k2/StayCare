"use client";
import Image from "@/common/components/image";
import { AdminNavRoutes, AdminNavBlogRoute } from "@/common/models/NavRoutes";
import { CommonConstants } from "@/utils/constants";
import { Box, Icon, Typography } from "@mui/material";
import { SideBarNavLink } from "../nav-link";
import { GroupRounded } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const SideBar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const isActive = pathName === "/blog-create" || pathName === "/blog-manage";
  return (
    <Box
      width={CommonConstants.dimensions.sidebarWidth}
      display="flex"
      flexDirection="column"
      gap={2}
      px={5}
    >
      <div
        className="py-10 flex justify-center cursor-pointer"
        onClick={() => router.push("/home")}
      >
        <Image
          src={CommonConstants.images.appLogo}
          alt="app logo"
          height={150}
          width={150}
          priority
        />
      </div>

      {AdminNavRoutes.map((route) => (
        <SideBarNavLink key={route.to} props={route} href={route.to} />
      ))}

      <Box className="px-4">
        <Box
          className="py-4"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon className={clsx(isActive ? "text-primary " : "text-base")}>
            <GroupRounded />
          </Icon>
          <Typography
            className={clsx(
              "font-medium ml-2",
              isActive ? "text-primary " : "text-base"
            )}
          >
            Blog
          </Typography>
        </Box>

        <Box className="p-4">
          {AdminNavBlogRoute.map((route, index) => (
            <Box className="mb-4" key={index}>
              <SideBarNavLink key={route.to} props={route} href={route.to} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
