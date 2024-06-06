import ForgotPasswordForm from "@/modules/auth/ForgotPasswordForm";
import { CommonConstants } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import Image from "@/common/components/image";
import Link from "next/link";

function ForgotPasswordPage() {
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

      <div className="w-150 flex flex-col mb-10">
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Forgot Password?
        </Typography>

        <Typography variant="body1" mb={2}>
          Enter your email address to reset your password
        </Typography>
      </div>

      <div className="w-150">
        <ForgotPasswordForm />
      </div>
    </>
  );
}

export default ForgotPasswordPage;
