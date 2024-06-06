import { ICardDetails } from "@/interfaces/payment.interface";
import {
  CheckCircle,
  CheckCircleOutline,
  CreditCard,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface ICardListItemProps extends ICardDetails {
  selected: boolean;
  onClick: () => void;
}

const CardListItem = (props: ICardListItemProps) => {
  return (
    <Box
      display="flex"
      py={2}
      sx={{
        cursor: "pointer",
        "&:hover": {
          bgcolor: "grey.100",
        },
      }}
      onClick={props.onClick}
    >
      <Box display="flex" flexDirection="column" mr={1}>
        {props.selected ? (
          <CheckCircle color="success" fontSize="small" />
        ) : (
          <CheckCircleOutline fontSize="small" />
        )}
        <CreditCard fontSize="small" />
      </Box>

      <Box className="grid grid-cols-4 grow">
        <Box display="flex" flexDirection="column">
          <Typography variant="body2" fontWeight="bold">
            Bank
          </Typography>
          <Typography variant="body2">{props.bankName}</Typography>
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography variant="body2" fontWeight="bold">
            Last 4 Digits
          </Typography>
          <Typography variant="body2">{props.cvv}</Typography>
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography variant="body2" fontWeight="bold">
            Name on Card
          </Typography>
          <Typography variant="body2">{props.nameOnCard}</Typography>
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography variant="body2" fontWeight="bold">
            Expriration Date
          </Typography>
          <Typography variant="body2">{props.expiryDate}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CardListItem;
