"use client"

import { Box, Button, Divider, Pagination, Typography } from '@mui/material';
import PostItem from './PostItem';
import { useEffect, useState } from 'react';
import { BaseResponse } from '@/interfaces/response.interface';
import { Post } from '@/interfaces/blog.interface';
import { blogApi } from '@/clientApi/blog';

interface BlogData {
    title: string;
    images: string;
    content: string;
    author_name: string;
}

const LatestPost: React.FC = () => {
    const ITEMS_PER_PAGE = 12;
    const [page, setPage] = useState<number>(1);
    const [metaData, setMetaData] = useState<Record<string, any> | null>(null);
    const [listPost, setListPost] = useState<Post[]>([])

    useEffect(()=>{
        getList(`?page=${page}&limit=${ITEMS_PER_PAGE}`); 
    },[])

    useEffect(()=>{
        getList(`?page=${page}&limit=${ITEMS_PER_PAGE}`); 
    },[page])

    const getList = (params:string) => {
        blogApi.getListPost({ params: params }).then((data) => {
            let dataResponse: BaseResponse<any> = data.payload as BaseResponse<any>;
            setListPost(dataResponse.data);
            setMetaData(dataResponse.metadata);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    console.log('listpost', listPost)

    return (
        <Box >
            <Typography
                variant="h4"
                className=" text-[#1A1A1A] font-semibold"
                sx={{
                    fontSize: '35px',
                    lineHeight: '32px',
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
                Latest posts
            </Typography>

            <Divider style={{borderBottomWidth: 'medium', borderColor:'#D9D9D9'}} />

            <Box sx={{ 
                display: {
                    xs: 'block',  // Màn hình rất nhỏ (extra-small)
                    sm: 'block',  // Màn hình nhỏ (small)
                    md: 'flex',   // Màn hình trung bình (medium) trở lên
                },
                width: '100%', 
                flexWrap: 'wrap', marginTop: '60px' 
            }}>
                {listPost.length>0 && listPost.map((post, index) => (
                    <Box sx={{
                        width: {
                            xs: '100%', // Màn hình rất nhỏ (extra-small)
                            sm: '100%', // Màn hình nhỏ (small)
                            md: '33%',  // Màn hình trung bình (medium)
                            lg: '33%',  // Màn hình lớn (large)
                            xl: '33%',  // Màn hình rất lớn (extra-large)
                          },
                        marginBottom: '70px'
                    }}>
                        <PostItem
                            key={index+'LatestPost'}
                            data={post }
                            type={'default'}
                        />
                    </Box>
                ))}
            </Box>

            <Divider className='mt-12 mb-16' style={{borderBottomWidth: 'medium', borderColor:'#D9D9D9'}} />

            {metaData && metaData.total_page>1 && (
                <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    mt={2}
                    mb={16}
                    width="100%" 
                >
                    <Button
                        variant="text"
                        onClick={() => setPage(metaData?.prev_page)}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Pagination
                        count={metaData?.total_page}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        siblingCount={1}
                        boundaryCount={1}
                        hidePrevButton
                        hideNextButton
                        shape='rounded'
                        variant='outlined'
                    />
                    <Button
                        variant="text"
                        onClick={() => setPage(metaData?.next_page)}
                        disabled={page === metaData?.total_page}
                    >
                        Next
                    </Button>
                </Box>
            )}
            
        </Box>
    )
}

export default LatestPost;