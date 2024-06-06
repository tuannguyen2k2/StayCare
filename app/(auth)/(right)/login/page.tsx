import LoginForm from "@/modules/auth/LoginForm";
import { CommonConstants } from "@/utils/constants";
import { Box } from "@mui/material";
import Image from "@/common/components/image";
import Link from "next/link";

function LoginPage() {
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

      <div className="w-150 translate-y-2/4">
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
