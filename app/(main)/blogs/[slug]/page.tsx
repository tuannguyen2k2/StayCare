
import BlogDetails from '@/modules/blog-manage/components/BlogDetails';

import { CommonConstants } from '@/utils/constants';
import { Box, Typography } from '@mui/material'; 


const BlogDetailsPage: React.FC<{ params: {slug: string} }> = async (props) => {

    return (
        <Box  sx={{
            px: CommonConstants.spacing.horizontalPadding,
            mt: CommonConstants.spacing.verticalPadding
        }}>
            
            <BlogDetails slug={props.params.slug}/>
            {/* <Box className='bg-[#F7F7F7] p-12 rounded mb-20' sx={{

            }}>
                <Typography className='total-comment font-light text-[#000000] text-5xl'>
                    {comments.length} {comments.length > 1 ? 'Comments' : 'Comment'}
                </Typography>
                <Box className="comments">
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} onLike={handleLike} onReply={handleReply} />
                    ))}
                    <textarea 
                        placeholder='Write your comment about Kevin’s blog...'
                        className='w-full h-40 p-4 rounded mt-12 bg-[#EBECF0]'
                    />
                </Box>
            </Box> */}
        </Box>
    );
};

export default BlogDetailsPage;
