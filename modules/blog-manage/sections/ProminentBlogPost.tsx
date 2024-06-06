'use server'
import { Box, Typography, Divider } from '@mui/material';
import http from '@/utils/http';
import { BaseResponse } from '@/interfaces/response.interface';
import { Post } from '@/interfaces/blog.interface';
import { formatDate, getStringContent } from '@/utils/helper';
import { NavigationButton } from '@/common/components/NavigationButton';
import arrowUpRightImage from '@/public/images/arrow-up-right.png';

async function ProminentBlogPost() {
    const getDataProminent = async (body: { params:string }) => {
        return await http.get<BaseResponse<Post[]> >(`/posts/prominent?${body.params}`, {
        }) 
    }
    const dataProminent: BaseResponse<Post[]> = (await getDataProminent({params: 'limit=6'})).payload as BaseResponse<Post[]> || [];
    console.log("Dmmm: " +dataProminent);
    function splitArray(data: Post[]) {
        if (data.length < 3) {
            throw new Error('Array must have at least 6 elements');
        }
    
        const array1 = data.slice(0, 1);
        const array2 = data.slice(1, 3);
        const array3 = data.slice(3, 6);
    
        return [array1, array2, array3];
    }

    if(dataProminent.data.length <= 0) {
        return null 
    }

    const [array1, array2, array3] = splitArray(dataProminent.data);

    const PostItem = ({ data, type, key}: {data: Post, type: string , key: string}) => {
        return (
            <Box key={key} sx={{
                display: type == 'default' ? 'block' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: type == 'default' ? '450px' : type == 'medium' ? '200px' : '140px',
                padding: '8px',
                margin: '8px',
            
            }}>
                <Box sx={{
                    width: type == 'default' ? '100%' : type == 'medium' ? '35% !important' : '25% !important',
                    height: type == 'default' ? '65%' : '100%',
                    backgroundImage: `url(${data.images[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                </Box>
                <Box sx={{
                    width: type == 'default' ? '100%' : type == 'medium' ? '65% !important' : '75% !important',
                    display: type == 'default' ? 'block' : 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    height: type == 'default' ? 'unset' : '100%',
                    marginLeft: type == 'default' ? '0' : '12px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Typography sx={{
                            fontSize: type == 'default' ? '30px' : '25px',
                            fontWeight: 600,
                            lineHeight: type == 'default' ? '32px' : '28px',
                            margin: type == 'default' ? '20px 0 10px' : '',
                            color: ' #1A1A1A',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '90%',
                        }}>{data.title}</Typography>
                        {
                        // type == 'default' && 
                        <NavigationButton data={`/blogs/${data.slug}`} icon={arrowUpRightImage} width={24} height={24} padding='0' />
                        }
                    </Box>
                    
                    <Typography sx={{
                        fontSize: type == 'default' ? '20px' : '16px',
                        fontWeight: 400,
                        lineHeight: '24px',
                        margin: type == 'default' ? '10px 0 20px' : '',
                        color: ' #667085',
                        display: '-webkit-box',
                        WebkitLineClamp: type == 'default' ? 2 : type == 'medium' ? 2 : 1,
                        WebkitBoxOrient: 'vertical',
                        maxWidth: '100%',
                        overflow: 'hidden',
                    }}>{getStringContent(data.content)}</Typography>
                    <Typography sx={{
                        fontSize: type == 'default' ? '16px' : '14px',
                        fontWeight: 600,
                        lineHeight: '20px',
                        color: ' #B6B6B6',
                    }}>{formatDate(data.created_at, 'd MMM yyyy')}</Typography>
                </Box>  
            </Box>
        );
    }

    return (
        <Box>
            <Typography
                variant="h4"
                sx={{
                    fontSize: '35px',
                    fontWeight: 600,
                    lineHeight: '32px',
                    color: '#1A1A1A',
                    margin: '70px 0 40px',
                    width: 'max-content',
                    position: 'relative',
                    '&::after' : {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        bottom: '-42px',
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#000000',
                        
                    }
                }}
            >
                Prominent blog posts
            </Typography>
            <Divider style={{borderBottomWidth: 'medium', borderColor:'#D9D9D9'}} />

            <Box 
                sx={{ display:'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: '1',
                height: '450px',
                marginTop: '60px'
            }}>
                <Box className="Box-1" sx={{ display:'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    flex: '1',
                    height: '100%',
                    width: '33.3%'
                }}>
                    {array1.map((post, index) => <PostItem key={`prominent1+${index}`} data={post} type='default'  />)}
                </Box>
                <Box className="Box-2" sx={{ display:'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    flex: '1',
                    height: '100%',
                    width: '33.3%'
                }}>
                    {array2.map((post, index) => <PostItem key={`prominent2+${index}`} data={post} type='medium'  />)}
                </Box>
                <Box className="Box-3" sx={{ display:'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    flex: '1',
                    height: '100%',
                    width: '33.3%'
                }}>
                    {array3.map((post, index) =>  <PostItem key={`prominent3+${index}`} data={post} type='mini'  />)}

                </Box>
            </Box>
            
        </Box>
    );
}

export default ProminentBlogPost;
