"use client";
import { IPayment, IPaymentUpdate } from "@/interfaces/payment.interface";
import PersonIcon from "@mui/icons-material/Person";
import { AttachMoney, Loyalty, Paid } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
interface IPaymentCardProps {
  payment: IPaymentUpdate;
}
const PaymentCard = (props: IPaymentCardProps) => {
  const [count, setCount] = useState(1);
  const [day, setDay] = useState(dayjs().format("YYYY-MM-DD"));

  const router = useRouter();
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 3,
        p: 3,
      }}
    >
      <Typography variant="h6">{props.payment.rent_time_title}</Typography>
      <Box width="100%" className="grid grid-cols-2">
        <Box
          display="flex"
          flexDirection="column"
          p={1}
          borderRight={1}
          borderBottom={1}
          borderColor="divider"
        >
          <Box display="flex" alignItems="center">
            <Paid fontSize="small" />
            <Typography variant="body1" fontWeight="bold">
              Price
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="primary.main"
            className="text-4xl font-bold mt-6"
          >{`S$${props.payment.price}`}</Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          p={1}
          borderBottom={1}
          borderColor="divider"
        >
          <Box display="flex" alignItems="center">
            <AttachMoney fontSize="small" />
            <Typography variant="body1" fontWeight="bold">
              Refundable Deposit
            </Typography>
          </Box>
          <Typography variant="body1" color="GrayText" className="mt-6">
            {`${props?.payment?.deposit} months` ?? "Not refundable"}
          </Typography>
        </Box>
        {/* <div className="flex gap-2 w-full col-span-2">
          {props?.payment?.benefits && (
            <Box
              display="flex"
              flexDirection="column"
              p={1}
              sx={{ width: "50%" }}
            >
              <Box display="flex" alignItems="center">
                <Loyalty fontSize="small" />
                <Typography variant="body1" fontWeight="bold">
                  Benefits
                </Typography>
              </Box>
              <ol className="list-disc text-gray-400 my-2">
                {props?.payment?.benefits?.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ol>
            </Box>
          )}

          {props?.payment?.admin_fee && (
            <Box
              display="flex"
              flexDirection="column"
              p={1}
              sx={{ width: "50%" }}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="body1" fontWeight="bold">
                  Admin fee
                </Typography>
              </Box>
              <Typography
                variant="body1"
                color="GrayText"
                className="pl-6 my-2"
              >
                {props?.payment?.admin_fee}
              </Typography>
            </Box>
          )}
        </div> */}

        <div className="flex flex-col my-8 w-full gap-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="w-full">
              <DatePicker
                label="Thời gian đặt phòng"
                sx={{ width: "380px" }}
                value={dayjs(day)}
                onChange={(newValue) => {
                  setDay(dayjs(newValue).format("YYYY-MM-DD"));
                }}
              />
            </div>
            <div className="w-[380px] h-14 border border-solid border-[#ccc] rounded-md flex justify-between px-3 items-center">
              <div className="flex gap-6 items-center">
                <PersonIcon />
                <span className="text-black">Number of person</span>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    if (count > 0) {
                      setCount((prev) => prev - 1);
                    } else {
                      setCount(0);
                    }
                  }}
                  className="w-10 h-10 rounded-full border border-solid border-[#F7961D] bg-white text-base cursor-pointer"
                >
                  -
                </button>
                <span className="text-[22px]">{count}</span>
                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="w-10 h-10 rounded-full border border-solid border-[#F7961D] bg-white text-base cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </LocalizationProvider>
        </div>

        <Button
          onClick={() =>
            router.push(
              `/tenant-information/${props.payment.id}?count_number=${count}&date=${day}`
            )
          }
          className="col-span-2"
          variant="contained"
          sx={{
            py: 1,
          }}
        >
          Choose
        </Button>

        <Divider className="col-span-2 my-5" />
      </Box>
    </Paper>
  );
};

export default PaymentCard;
