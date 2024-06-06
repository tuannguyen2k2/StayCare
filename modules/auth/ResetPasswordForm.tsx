"use client";

import { INewPasswordForm } from "@/interfaces/auth.interface";
import {
  Button,
  FormHelperText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { resetPasswordResolver } from "./resolver";
import { userApi } from "@/clientApi/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<INewPasswordForm>({
    resolver: resetPasswordResolver,
  });

  const onSubmit = handleSubmit((data) => {
    const searchParamsOTP = new URLSearchParams(window.location.search).get("otp");
    if (!searchParamsOTP) {
      toast.error("Enought information to reset password (OTP)");
      return
    }
    const body = {otp: searchParamsOTP,new_password:data.password,confirmed_password:data.confirmPassword };
    userApi
      .resetPassword({body:body})
      .then(() => {
        toast.success("Reset password successfully");
        router.push("/login");
      })
      .catch(() => {
        toast.error("Reset password failed");
      });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-7">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className="col-span-2 flex flex-col gap-2">
              <Typography>Password</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.password}
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </div>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <div className="col-span-2 flex flex-col gap-2">
              <Typography>Confirm Password</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <FormHelperText error>
                  {errors.confirmPassword.message}
                </FormHelperText>
              )}
            </div>
          )}
        />
        <div className="col-span-2">
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1,
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
