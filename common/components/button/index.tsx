"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function CommonButton({
  url,
  titleName,
  iconImg,
}: {
  url: string;
  titleName: string;
  iconImg: string;
}) {
  const navigate = useRouter();
  return (
    <>
      <Button
        onClick={() => navigate.push(url)}
        sx={{
          borderRadius: "8px",
          padding: "12px 20px",
        }}
        variant="contained"
        startIcon={<Image src={iconImg} alt="icon" width={16} height={16} />}
      >
        {titleName}
      </Button>
    </>
  );
}
