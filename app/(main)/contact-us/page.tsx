import ContactForm from "@/modules/contact-us/ContactForm";
import { CommonConstants } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import { SocialIcon } from "react-social-icons";

function ContactUsPage() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        height={400}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="bg-secondary"
      >
        <Typography variant="h2" color="white">
          Contact Us
        </Typography>
      </Box>

      <Box
        width={CommonConstants.dimensions.contentWidth}
        display="flex"
        flexDirection="column"
        px={CommonConstants.spacing.horizontalPadding}
        py={20}
      >
        <Typography variant="h4" fontWeight="bold" color="secondary.main">
          We are here for you
        </Typography>

        <Typography variant="body1" color="secondary.main">
          Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora
        </Typography>

        <Box py={10} className="grid grid-cols-2">
          <Box display="flex" flexDirection="column" gap={3} py={3}>
            <Typography fontWeight="bold" color="secondary.main">
              Location:{" "}
              <span className="font-normal">
                497 Evergreen Rd. Roseville, CA 95673
              </span>
            </Typography>

            <Typography fontWeight="bold" color="secondary.main">
              Phone:{" "}
              <span className="font-normal">+65 86565538 (WhatsApp)</span>
            </Typography>

            <Typography fontWeight="bold" color="secondary.main">
              Email:{" "}
              <span className="font-normal"> support@singstaycare.com </span>
            </Typography>

            <Typography fontWeight="bold" color="secondary.main">
              Facebook:{" "}
              <span className="font-normal"> Sing Stay & Care Hostel </span>
            </Typography>

            <div className="flex gap-10 mt-10">
              <SocialIcon url="https://www.whatsapp.com/" />
              <SocialIcon url="mailto:me@me.com" network="email" />
              <SocialIcon url="https://www.facebook.com/" />
            </div>
          </Box>

          <ContactForm />
        </Box>
      </Box>
    </Box>
  );
}

export default ContactUsPage;
