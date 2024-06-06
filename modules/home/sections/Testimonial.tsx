import { CommonConstants } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import TestimonialCarousel from "../components/TestimonialCarousel";

function TestimonialSection() {
  const contentWidth = CommonConstants.dimensions.contentWidth;
  const contentWidthSm = CommonConstants.dimensions.contentWidthSmaller;

  return (
    <Box
      width={contentWidth}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="secondary"
        textAlign="center"
      >
        Testimonials
      </Typography>

      <Box width={contentWidthSm}>
        <TestimonialCarousel />
      </Box>
    </Box>
  );
}

export default TestimonialSection;
