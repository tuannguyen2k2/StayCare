"use client";
import defaultAvt from "@/public/images/defaultAvt.png";
import { userSelector } from "@/store/selector";
import { ThumbUpAltOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Input, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface Comment {
  id: number;
  like: number;
  name: string;
  content: string;
  user_id: number;
  post_id: number;
  created_at: string;
  parent_comment_id: number | null;
  child_comments: Comment[];
}

interface CommentProps {
  comment: Comment;
  onLike: (id: number) => void;
  onReply: (text: string, parent_comment_id: number | null) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onLike, onReply }) => {
  const [like, setLike] = useState(comment.like);
  const [replyText, setReplyText] = useState("");
  // State for managing the visibility of the reply input field
  const [showReplyInput, setShowReplyInput] = useState(false);

  const profile = useSelector(userSelector);
  // Handle the reply submission
  const handleReply = () => {
    if (replyText.trim()) {
      onReply(replyText, comment.id);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  const handleLike = () => {
    setLike(like + 1);
    onLike(comment.id);
  };

  useEffect(() => {
    if (comment.like !== like) setLike(comment.like);
  }, [comment.like]);

  return (
    <Box className="comment mt-10">
      <Box
        sx={{
          borderBottom: "1px solid #C5C5C5",
          pb: "32px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
            }}
          >
            {/* Avatar {defaultAvt && <img src={defaultAvt} alt="user" /> } */}
            <Image src={defaultAvt} alt="user" />
          </Box>
          <Box className="ms-8">
            <Typography>{comment.name}</Typography>
            <Typography>
              {formatDistanceToNow(new Date(comment.created_at), {
                addSuffix: true,
              })}
            </Typography>
          </Box>
        </Box>

        <Typography className="mt-4">{comment.content}</Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {profile && (
            <Button
              className="text-xl text-[#848484] font-medium me-8"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Reply
            </Button>
          )}

          <Box className="text-xl text-[#848484] font-medium">
            <IconButton onClick={() => handleLike()}>
              <ThumbUpAltOutlined
                sx={{
                  color: "#418CDF",
                }}
              />
            </IconButton>
            {comment.like > 0 ? comment.like : ""}
          </Box>
        </Box>

        {showReplyInput && (
          <Box>
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                my: "15px",
              }}
            >
              <Input
                minRows={2}
                onChange={(e) => setReplyText(e.target.value)}
                fullWidth
              />
            </Box>
            <Button
              className="text-xl text-[#848484] font-medium"
              onClick={handleReply}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>

      {comment.child_comments.length > 0 && (
        <Box className="replies ms-8" sx={{}}>
          {comment.child_comments.map((reply) => (
            <Box
              className="ms-8"
              sx={{
                borderLeft: "1px solid #C5C5C5",
                px: "20px",
                mt: "40px",
                pl: "80px",
              }}
              key={reply.id}
            >
              <Comment comment={reply} onLike={onLike} onReply={onReply} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Comment;
