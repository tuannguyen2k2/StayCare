import ResetPasswordForm from "@/modules/auth/ResetPasswordForm";
import { CommonConstants } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import Image from "@/common/components/image";
import Link from "next/link";

function ResetPasswordPage() {
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

      <Typography color="primary" variant="h4" fontWeight="bold" mb={2}>
        Reset Password
      </Typography>

      <div className="w-150">
        <ResetPasswordForm />
      </div>
    </>
  );
}

export default ResetPasswordPage;
