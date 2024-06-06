/* eslint-disable react/no-unescaped-entities */
"use client";
import { Post } from "@/interfaces/blog.interface";
import { CommonConstants } from "@/utils/constants";
import { getStringContent } from "@/utils/helper";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const Blog = () => {
  const [dataPost, setDataPost] = useState<Post[]>([]);
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts?page=1&limit=2` || "",
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setDataPost(data.data);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
  return (
    <Box
      display={"flex"}
      width={CommonConstants.dimensions.contentWidth}
      mb={"70px"}
    >
      <Box mr={"100px"}>
        <Typography fontSize={26} fontWeight={700} mb={"20px"}>
          Thinking of renting ?
        </Typography>
        <Typography fontSize={20} fontWeight={400}>
          Sing Stay&Care provides the latest property for rent, news, area
          guides alongside regular tips and home improvement ideas. Get to know
          what's worked well for our tenants.
        </Typography>
        <Button
          sx={{
            color: "white",
            bgcolor: "#F7961D",
            p: "10px 20px",
            borderRadius: "30px",
            mt: "40px",
            "&:hover": { bgcolor: "#F7961D" },
          }}
        >
          VIEW MORE CASE STUDIES
        </Button>
      </Box>
      <Box display={"flex"} gap={"40px"} width={"50%"}>
        {dataPost.map((post) => {
          return (
            <Box key={post.id}>
              <Box width={300} height={200} mb={"20px"}>
                <Image
                  src={post.images[0]}
                  alt="blog"
                  width={300}
                  height={200}
                  style={{ borderRadius: "16px" }}
                />
              </Box>
              <Typography fontSize={24} fontWeight={500}>
                {post.title}
              </Typography>
              <Typography
                fontSize={14}
                fontWeight={500}
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {getStringContent(post.content)}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Blog;
