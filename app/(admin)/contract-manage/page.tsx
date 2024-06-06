import ContractListSection from "@/modules/contract-manage/sections/ContractListSection";
import ContractTableSection from "@/modules/contract-manage/sections/ContractTableSection";
import { CommonConstants } from "@/utils/constants";
import { Container, Typography } from "@mui/material";

function ContractManagePage() {
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
        Contract Management
      </Typography>

      <ContractTableSection />

      {/* <ContractListSection /> */}
    </Container>
  );
}

export default ContractManagePage;
