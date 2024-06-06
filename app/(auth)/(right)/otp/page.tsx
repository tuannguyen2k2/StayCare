import { Box } from "@mui/material";
import Image from "@/common/components/image";
import Link from "next/link";
import { CommonConstants } from "@/utils/constants";
import PasswordOtpForm from "@/modules/auth/PasswordOtpForm";

function OtpPage() {
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
        <PasswordOtpForm />
      </div>
    </>
  );
}

export default OtpPage;
