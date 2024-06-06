import { CommonConstants } from "@/utils/constants";
import { Box, Button, Typography } from "@mui/material";
import Image from "@/common/components/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

function RightSideLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full h-full bg-white">
      <div className="flex flex-col h-full max-h-screen grow items-center">
        {children}
      </div>
      <Box maxHeight="100%" width={600} position="relative" alignItems="center">
        <Image
          src={CommonConstants.images.login}
          alt="Log in banner"
          fill
          style={{
            maxWidth: "100%",
            objectFit: "cover",
          }}
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center gap-5 text-center">
          <Typography color="white" fontWeight="bold" variant="h4">
            Welcome back
          </Typography>

          <Typography color="white" variant="body1">
            Please sign in to use our services
          </Typography>

          <Button
            component={Link}
            href="/sign-up"
            variant="contained"
            sx={{
              py: 2,
              px: 4,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            Sign up
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default RightSideLayout;
