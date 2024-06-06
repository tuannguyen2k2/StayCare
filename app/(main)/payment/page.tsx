import PaymentForm from "@/modules/payments/components/PaymentForm";
import ReceiptForm from "@/modules/payments/components/ReceiptForm";
import { CommonConstants } from "@/utils/constants";
import { Box, Container, Typography } from "@mui/material";

function PaymentPage() {
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
        Payment
      </Typography>

      <Box className="grid grid-cols-3 gap-10">
        <Box className="col-span-2">
          <PaymentForm />
        </Box>

        <Box>
            <ReceiptForm />
        </Box>
      </Box>
    </Container>
  );
}

export default PaymentPage;
