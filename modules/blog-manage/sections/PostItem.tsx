import { NavigationButton } from '@/common/components/NavigationButton';
import { Post } from '@/interfaces/blog.interface';
import { Box, Typography } from '@mui/material';
import arrowUpRightImage from '@/public/images/arrow-up-right.png';
import { formatDate, getStringContent } from '@/utils/helper';

interface PostItemProps {
    data: Post;
    type: string;
}
function PostItem(props: PostItemProps) {
    const formatViewsString = (views: number) => {
        if(views === 0) return null;
        return ' • ' + views + ' view read'
    }
    return (
        <Box sx={{
            display: props.type == 'default' ? 'block' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: props.type == 'default' ? '450px' : props.type == 'medium' ? '50%' : '33%',
            padding: '8px',
            margin: '8px',
        
        }}>
            <Box sx={{
                width: props.type == 'default' ? '100%' : props.type == 'medium' ? '35%' : '25%',
                height: props.type == 'default' ? '65%' : '100%',
                backgroundImage: `url(${props.data.images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            </Box>
            <Box sx={{
                display: props.type == 'default' ? 'block' : 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: props.type == 'default' ? 'unset' : '100%',
                marginLeft: props.type == 'default' ? '0' : '12px',
            }}>
                <Box sx={{
                    display: props.type == 'default' ? 'flex' : 'block',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        fontSize: props.type == 'default' ? '30px' : '25px',
                        fontWeight: 600,
                        lineHeight: props.type == 'default' ? '32px' : '28px',
                        margin: props.type == 'default' ? '20px 0 10px' : '',
                        color: ' #1A1A1A',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '90%',
                    }}>{props.data.title}</Typography>
                    {props.type == 'default' && <NavigationButton data={`/blogs/${props.data.slug}`} icon={arrowUpRightImage} width={24} height={24} padding='0' />}
                </Box>
                
                <Typography sx={{
                    fontSize: props.type == 'default' ? '20px' : '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    margin: props.type == 'default' ? '10px 0 20px' : '',
                    color: ' #667085',
                    display: '-webkit-box',
                    WebkitLineClamp: props.type == 'default' ? 3 : props.type == 'medium' ? 2 : 1,
                    WebkitBoxOrient: 'vertical',
                    maxWidth: '100%',
                    overflow: 'hidden',
                }}>{getStringContent(props.data.content)}</Typography>
                <Typography sx={{
                    fontSize: props.type == 'default' ? '16px' : '14px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    color: ' #B6B6B6',
                }}>{formatDate(props.data.created_at, 'd MMM yyyy')}{formatViewsString(props.data.views)}</Typography>
            </Box>  
        </Box>
    );
}

export default PostItem;
