import CommonButton from "@/common/components/button";
import { CommonConstants } from "@/utils/constants";
import { Button, Container, Typography } from "@mui/material";

export default function ManageHouse() {
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
        House List
      </Typography>
      <div className="flex justify-end mb-8">
        <CommonButton
          url="/add-home"
          titleName="Add House"
          iconImg="/images/icons/plus.svg"
        />
      </div>
    </Container>
  );
}
