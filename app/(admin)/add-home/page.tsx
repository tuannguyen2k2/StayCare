import AddHouse from "@/common/components/add-house";
import { CommonConstants } from "@/utils/constants";
import { Container, Typography } from "@mui/material";
import React from "react";

export default function AddHome() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: CommonConstants.spacing.verticalPadding,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="secondary"
        textAlign="center"
        mb={CommonConstants.spacing.verticalPadding}
      >
        Trang thêm nhà
      </Typography>
      <AddHouse />
    </Container>
  );
}
