'use client'
import { Box, Button, Typography } from '@mui/material';
import Comment from '../components/Comment';
import { useEffect, useState } from 'react';
import { blogApi } from '@/clientApi/blog';
import { BaseResponse } from '@/interfaces/response.interface';
import { IComment, BlogPost } from '@/interfaces/blog.interface';

const CommentSection = ({slug}: {slug:string}) => {
    const [ commentData, setCommentData ] = useState<string>('')
    const [comments, setComments] = useState<IComment[]|[]>([])
    const [data, setData] = useState<BlogPost|null>(null)

    const getCommentPost = (slug:string) => {
        blogApi.getPostDetails({ slug: slug }).then((data) => {
          let dataResponse: BaseResponse<BlogPost> = data.payload as BaseResponse<BlogPost>;
          setData(dataResponse.data)
          setComments(dataResponse.data?.comments)
        }).catch((error) => {
          console.error(error);
        });
      }
    
    const handleLike = async (id:number) => {
        if(!data) return
        const param = { id: id }
        const res = await blogApi.likeComment(param)
        if(res.ok) {
            getCommentPost(slug)
        }

    }

    const handleReply = async ( text: string, parent_comment_id:number|null ) => {
        handleComment( text, parent_comment_id)
    }

    const handleComment = async ( text: string, parent_comment_id?:number|null) => {
        if(!data) return
        const body = {
            post_id: data.id,
            data: { 
                content: text, 
                parent_comment_id: parent_comment_id || null
            }
        }
        const res = await blogApi.postComment(body)
        if(res.ok) {
            if(parent_comment_id===null) {
                setCommentData('')
            }
            getCommentPost(slug)
        }
    }

    useEffect(()=>{
        getCommentPost(slug)
    },[])

    return (
        <Box className='bg-[#F7F7F7] p-12 rounded mb-20'>
            {comments.length > 0 && (
                <Typography className='total-comment font-light text-[#000000] text-5xl'> 
                    {comments.length} {comments.length > 1 ? 'Comments' : 'Comment'}    
                </Typography>
            )}  
            <Box className="comments">
                {comments.map((comment) => (
                    <Comment 
                        key={comment.id} 
                        comment={comment} 
                        onLike={(id)=>handleLike(id)} 
                        onReply={( text, parent_comment_id)=>handleReply(text, parent_comment_id)} 
                    />
                ))}
            </Box>

            <Box>
                <textarea 
                    placeholder='Write your comment about Kevin’s blog...'
                    className='w-full h-40 p-4 rounded mt-12 bg-[#EBECF0]'
                    value={commentData}
                    onChange={(e)=>{setCommentData(e.target.value)}}
                />
                {commentData!=='' && (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}>
                            <Button className='text-primary' onClick={()=>handleComment(commentData,null)}>Send</Button>
                        </Box>
                    )
                }
                
            </Box>
        </Box> 

    )
}

export default CommentSection  