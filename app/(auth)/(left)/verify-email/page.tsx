"use client";

import Image from "@/common/components/image";
import OtpForm from "@/modules/auth/OtpForm";
import { CommonConstants } from "@/utils/constants";
import { Box } from "@mui/material";
import Link from "next/link";

function VerifyEmailPage() {
  return (
    <>
      <Box
        my={0}
        sx={{
          cursor: "pointer",
        }}
        component={Link}
        href="/"
      >
        <Image
          src={CommonConstants.images.appLogo}
          alt="app logo"
          height={300}
          width={300}
          priority
        />
      </Box>

      <div className="w-96">
        <OtpForm />
      </div>
    </>
  );
}

export default VerifyEmailPage;
