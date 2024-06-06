"use client";

import { userApi } from "@/clientApi/user";
import { handleHttpError } from "@/utils/helper";
import { Button, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");

  const handleChange = (otp: string) => {
    setOtp(otp);
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      userApi
        .activateOtp(otp)
        .then(() => {
          toast.success("Verify successfully");
          router.push("/verify-success");
        })
        .catch((error) => {
          handleHttpError({
            error: {
              ...error,
              message: "Verify failed",
            },
          });
        });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <Typography className="text-2xl">
        Hệ thống đã gửi mã xác nhận qua email{" "}
        <span className="text-primary">{email}</span>. Vui lòng kiểm tra và nhập
        mã để hoàn thành đăng ký.
      </Typography>

      <div className="grid grid-cols-1 gap-9 my-10">
        <Typography className="">Nhập mã xác nhận*</Typography>
        <div className="flex justify-center w-full">
          <MuiOtpInput
            className="fill-primary"
            autoFocus
            value={otp}
            onChange={handleChange}
            length={6}
            width={"100%"}
            maxWidth="500px"
          />
        </div>
      </div>

      <Button variant="contained" onClick={handleSubmit}>
        Continue
      </Button>
    </div>
  );
}

export default OtpForm;
