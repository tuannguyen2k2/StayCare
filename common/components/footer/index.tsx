import { CommonConstants } from "@/utils/constants";
import { Box, Button, Input, Typography } from "@mui/material";
import { SocialIcon } from "react-social-icons";

function AppFooter() {
  return (
    <Box
      height={CommonConstants.dimensions.footerHeight}
      bgcolor="secondary.main"
      display="flex"
      justifyContent="center"
    >
      <Box
        width={CommonConstants.dimensions.contentWidth}
        display="flex"
        color="white"
        justifyContent="space-between"
        py={5}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography variant="h6" textTransform="uppercase" letterSpacing={2}>
            SingStay&Care
          </Typography>
          <Box>
            <Typography variant="body2">
              497 Evergreen Rd. Roseville, CA 95673
            </Typography>
            <Typography variant="body2">+65 86565538</Typography>
            <Typography variant="body2">support@singstaycare.com</Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography>About Us</Typography>
          <Typography>Contact</Typography>
          <Typography>Terms & Conditions</Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <div className="flex items-center">
            <SocialIcon
              url="https://www.facebook.com/"
              bgColor="none"
              style={{
                height: 40,
                width: 40,
              }}
            />
            <Typography>Facebook</Typography>
          </div>
          <div className="flex items-center">
            <SocialIcon
              url="https://www.whatsapp.com/"
              bgColor="none"
              style={{
                height: 40,
                width: 40,
              }}
            />
            <Typography>WhatsApp</Typography>
          </div>
          <div className="flex items-center">
            <SocialIcon
              url="mailto:me@me.com"
              network="email"
              bgColor="none"
              style={{
                height: 40,
                width: 40,
              }}
            />
            <Typography>Email</Typography>
          </div>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={2}
        >
          <Typography>Subscribe to our newsletter</Typography>
          <Box border={3} borderRadius={1} borderColor="primary.main" pl={2}>
            <Input
              disableUnderline
              placeholder="Enter your email address"
              inputProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                borderRadius: 0,
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              OK
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AppFooter;
