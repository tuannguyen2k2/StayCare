import SignUpForm from "@/modules/auth/SignUpForm";
import { CommonConstants } from "@/utils/constants";
import { Box } from "@mui/material";
import Image from "@/common/components/image";
import Link from "next/link";

function SignUpPage() {
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

      <div className="w-150">
        <SignUpForm />
      </div>
    </>
  );
}

export default SignUpPage;
