import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import Image from "@/common/components/image";
import { CommonConstants } from "@/utils/constants";

function VerifySuccessPage() {
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

      <div className="w-96 h-full flex items-center justify-center">
        <div className="flex flex-col gap-4 -translate-y-2/4">
          <Typography className="text-2xl uppercase text-center text-primary">
            Verify successfully
          </Typography>
          <Button component={Link} href="/login" variant="contained">
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default VerifySuccessPage;
