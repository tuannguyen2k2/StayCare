import { formatDate } from "@/utils/helper";
import { useFetch } from "@/utils/useFetch";
import { Box, Typography } from "@mui/material";
import CommentSection from "../sections/CommentSection";
interface responseDataDetails {
  id: number;
  title: string;
  content: string;
  images: string[];
  created_at: string;
  author_name: string;
  comments: never[];
}

const BlogDetails: React.FC<{ slug: string }> = async ({ slug }) => {
  const response = await useFetch<responseDataDetails>({
    url: `/posts/${slug}`,
  });
  return (
    <Box>
      <Typography className="text-6xl text-black-2 font-semibold mb-10 ">
        {response.data?.title}
      </Typography>
      <Box
        className="mb-20"
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <Typography className="text-black-0 font-semibold mr-2">
          {response.data?.author_name}
        </Typography>
        <Typography className="text-black-1">
          {" "}
          {response.data?.created_at &&
            " - " + formatDate(response.data?.created_at, "dd/MM/yyyy")}
        </Typography>
      </Box>
      <Box className="mb-20">
        <div
          dangerouslySetInnerHTML={{ __html: response.data?.content || "" }}
        />
      </Box>
      <CommentSection slug={slug} />
    </Box>
  );
};
export default BlogDetails;
