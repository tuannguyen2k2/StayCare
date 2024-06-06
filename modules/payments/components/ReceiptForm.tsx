import { Box, Divider, Typography } from "@mui/material";

const ReceiptForm = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6" fontWeight="bold" color="secondary.main">
        Order Summary
      </Typography>

      <Divider className="my-3" />

      <Box display="flex" alignItems="center">
        <Box height={50} width={50} border={1} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          pl={5}
        >
          <Typography variant="h6" fontWeight="bold" color="secondary.main">
            Tripple Sharing Room
          </Typography>
          <Typography variant="body1" color="InfoText">
            Monthly
          </Typography>
        </Box>
      </Box>

      <Divider className="my-3" />

      <div className="flex flex-col gap-6"><Box display="flex" justifyContent="space-between">
        <Typography variant="body1" fontWeight="bold">
          Deposit
        </Typography>
        <Typography variant="body1" color="GrayText">
          $400.00
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" fontWeight="bold">
          Quantity
        </Typography>
        <Typography variant="body1" color="GrayText">
          2 months
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" fontWeight="bold">
          Refundable Deposit
        </Typography>
        <Typography variant="body1" color="GrayText">
          $100.00
        </Typography>
      </Box></div>

      <Divider className="my-3" />

      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" fontWeight="bold" color="secondary.main">
          Total
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="secondary.main">
          $400.00
        </Typography>
      </Box>
    </Box>
  );
};

export default ReceiptForm;
