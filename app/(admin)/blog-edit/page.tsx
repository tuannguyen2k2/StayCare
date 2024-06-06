import BlogForm from "@/modules/blog-manage/components/BlogForm";
import { CommonConstants } from "@/utils/constants";
import { Box, Typography } from "@mui/material";

function BlogEditPage() {
  return (
    <Box
      width="80%"
      py={CommonConstants.spacing.verticalPadding}
      px={CommonConstants.spacing.horizontalPadding}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="secondary"
        textAlign="center"
        mb={CommonConstants.spacing.verticalPadding}
      >
        Blog Edit
      </Typography>

      <BlogForm type="edit"/>
    </Box>
  );
}

export default BlogEditPage;