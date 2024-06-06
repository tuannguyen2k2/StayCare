
import BlogTableSection from "@/modules/blog-manage/sections/BlogTableSection";
import { CommonConstants } from "@/utils/constants";
import { Container, Typography } from "@mui/material";

function BlogManagePage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: CommonConstants.spacing.verticalPadding,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="secondary"
        textAlign="center"
        mb={CommonConstants.spacing.verticalPadding}
      >
        Blog list
      </Typography>

      <BlogTableSection />

    </Container>
  );
}

export default BlogManagePage;
