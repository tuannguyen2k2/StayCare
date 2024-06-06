"use server"
import { CommonConstants } from "@/utils/constants";
import { Box, Typography, Button } from '@mui/material';
import ProminentBlogPost from "@/modules/blog-manage/sections/ProminentBlogPost";
import LatestPost from "@/modules/blog-manage/sections/LatestPost"
import http from "@/utils/http";
import { BaseResponse } from "@/interfaces/response.interface";
import { Post } from "@/interfaces/blog.interface";
import { NavigationButton } from "@/common/components/NavigationButton";
import arrowImage from '@/public/images/arrow-right.png';
import { getStringContent } from "@/utils/helper";

const BlogsPage = async () => {

  const getNewestPost = async () => {
    return await http.get(`posts/newest?page=1&limit=1`, {
      headers: {
        "Content-Type": "application/json", 
      },
    }) 
  }
  const newest: BaseResponse<Post[]> = (await getNewestPost()).payload as BaseResponse<Post[]>;

  if (newest.data.length<=0 || newest.data[0] == undefined) {
    return <>No blogs yet</>
  }

  return (
    <Box sx={{
      px: CommonConstants.spacing.horizontalPadding,
      mt: CommonConstants.spacing.verticalPadding
    }}>
      <Box
        sx={{
          backgroundImage: `url(${newest.data[0].images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '698px',
          color: 'white',
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          px: CommonConstants.spacing.horizontalPadding,
          py: CommonConstants.spacing.verticalPadding,
          borderRadius: '16px',
        }}
      >
        <Box sx={{ maxWidth: '1060px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 500, lineHeight: '40px' }} gutterBottom>
            Featured
          </Typography>
          <Typography sx={{ fontSize: '40px', fontWeight: 600, lineHeight: '40px' }} gutterBottom>
            {newest.data[0].title}
          </Typography>
          <Typography sx={{ 
            fontSize: '20px', 
            fontWeight: 400, 
            lineHeight: '40px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {getStringContent(newest.data[0].content)}
          </Typography>
        </Box>
        <NavigationButton data={`/blogs/${newest.data[0].slug}`} icon={arrowImage} />
      </Box>
      <ProminentBlogPost />
      <LatestPost />
    </Box>
  );
}

export default BlogsPage;
