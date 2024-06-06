'use client';

import { blogApi } from "@/clientApi/blog";
import { DeleteRounded, EditOutlined, Visibility } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Action = ({id,slug, onAction}:{id:number,slug:string, onAction:(fetch:boolean)=>void}) =>{
  const Router = useRouter();

    const [isOpen, setIsOpen] = useState(false)  
  
    const handleEdit = () => {
      Router.push(`/blog-edit?slug=${slug}`)
    }
    const handleView = () => {
      Router.push(`/blogs/${slug}`)
    }
    const handleDelete = () => {
      blogApi.deletePost({id}).then(res=>{
        onAction(true)
      })
      
    }
    const handleOpen = () => { 
      setIsOpen(!isOpen)
    }
  
    return (
      <Box sx={{
            position: 'relative',
            width: '35px',
            height: '35px',
            cursor: 'pointer',
        }}
        onClick={()=>handleOpen()}
        >
        <Typography>...</Typography>
        {isOpen && (
          <Box sx={{
            width: '155px',
            position: 'absolute',
            top: '-55px',
            left: '115px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            color: '#585757',
            boxShadow: '0px 2px 12.2px 0px #00000040',
            padding: '10px',
          }}>
            <Box width={'100%'}  onClick={()=>handleEdit()}>
              <Box sx={{
                width: '80px',
                display:'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 'auto'
              }}>
                <IconButton
                  size="small"
                >
                  <EditOutlined />
                </IconButton>
                <Typography>Edit</Typography>
              </Box>
            </Box>
  
            <Box width={'100%'} onClick={()=>handleView()}>
              <Box sx={{
                width: '80px',
                display:'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 'auto'
              }}>
                <IconButton
                  size="small"
                >
                  <Visibility />
                </IconButton>
                <Typography>View</Typography>
              </Box>
            </Box>
  
           <Box width={'100%'}  onClick={()=>handleDelete()}>
            <Box sx={{
                width: '80px',
                display:'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 'auto'
              }}>
                <IconButton
                  size="small"
                >
                  <DeleteRounded />
                </IconButton>
                <Typography>Delete</Typography>
              </Box>
           </Box>
  
          </Box>
        )}
       
      </Box>
    )  
      
  }
export default Action;