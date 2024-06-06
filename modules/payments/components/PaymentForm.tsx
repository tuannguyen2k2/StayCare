"use client";

import { ICardDetails } from "@/interfaces/payment.interface";
import { CreditCard } from "@mui/icons-material";
import {
  Box,
  FormControlLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
  Checkbox,
  Button,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CardListItem from "./CardListItem";

const mockCards: ICardDetails[] = [
  {
    cardNumber: "1234 5678 9101 1121",
    bankName: "Bank of America",
    nameOnCard: "John Doe",
    expiryDate: "12/25",
    cvv: "123",
  },
  {
    cardNumber: "1234 5678 9101 1122",
    bankName: "Bank of America",
    nameOnCard: "John Doe",
    expiryDate: "12/25",
    cvv: "123",
  },
  {
    cardNumber: "1234 5678 9101 1123",
    bankName: "Bank of America",
    nameOnCard: "John Doe",
    expiryDate: "12/25",
    cvv: "123",
  },
];

const PaymentForm = () => {
  const [paymentType, setPaymentType] = useState(0);
  const [selectedCard, setSelectedCard] = useState<string>(
    mockCards[0].cardNumber
  );
  const [saveDetails, setSaveDetails] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePaymentTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentType(+event.target.value);
  };

  const handleSaveDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSaveDetails(event.target.checked);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit} className="p-10 bg-slate-50 rounded-md">
      <div className="grid grid-cols-2 gap-7">
        <Typography
          variant="h6"
          fontWeight="bold"
          color="secondary.main"
          className="col-span-2"
        >
          Payment Method:
        </Typography>

        <Box display="flex" alignItems="center" className="col-span-2">
          <RadioGroup
            row
            value={paymentType}
            onChange={handlePaymentTypeChange}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="Credit Card"
            />

            <FormControlLabel value={1} control={<Radio />} label="Paynow" />

            <FormControlLabel value={2} control={<Radio />} label="MoMo" />
          </RadioGroup>
        </Box>

        <div className="col-span-2">
          <Box border={1} borderRadius={2} borderColor="divider">
            <Box display="flex" alignItems="center" p={1}>
              <CreditCard
                fontSize="small"
                sx={{
                  mr: 1,
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                Regitered Cards
              </Typography>
            </Box>

            <Divider />

            <Box
              display="flex"
              flexDirection="column"
              px={2}
              className="divide-y-0.5 divide-x-0 divide-solid divide-gray-200"
            >
              {mockCards.map((card, index) => (
                <CardListItem
                  key={index}
                  selected={selectedCard === card.cardNumber}
                  onClick={() => setSelectedCard(card.cardNumber)}
                  {...card}
                />
              ))}
            </Box>
          </Box>
        </div>

        <>
          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <div className="col-span-2 flex flex-col gap-2">
                <Typography>Card Number</Typography>
                <OutlinedInput
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.cardNumber}
                />
              </div>
            )}
          />

          <Controller
            name="nameOnCard"
            control={control}
            render={({ field }) => (
              <div className="col-span-2 flex flex-col gap-2">
                <Typography>Name on Card</Typography>
                <OutlinedInput
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.nameOnCard}
                />
              </div>
            )}
          />

          <Controller
            name="expiryDate"
            control={control}
            render={({ field }) => (
              <div className="col-span-1 flex flex-col gap-2">
                <Typography>Expiry Date</Typography>
                <OutlinedInput
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.expiryDate}
                />
              </div>
            )}
          />

          <Controller
            name="cvv"
            control={control}
            render={({ field }) => (
              <div className="col-span-1 flex flex-col gap-2">
                <Typography>CVV</Typography>
                <OutlinedInput
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.cvv}
                />
              </div>
            )}
          />
        </>

        <FormControlLabel
          control={
            <Checkbox
              checked={saveDetails}
              onChange={handleSaveDetailsChange}
            />
          }
          label="Save card details"
          className="col-span-2"
        />

        <div className="col-span-2">
          <Button type="submit" variant="contained" fullWidth>
            Pay
          </Button>
        </div>

        <Typography color="GrayText" className="col-span-2">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </Typography>
      </div>
    </form>
  );
};

export default PaymentForm;
