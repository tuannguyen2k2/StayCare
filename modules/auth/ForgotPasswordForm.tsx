"use client";
import {
  Button,
  FormHelperText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { forgotPasswordResolver } from "./resolver";
import { IForgotPasswordForm } from "@/interfaces/auth.interface";
import Link from "next/link";
import { userApi } from "@/clientApi/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function ForgotPasswordForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordForm>({
    resolver: forgotPasswordResolver,
  });

  const onSubmit = handleSubmit((data) => {
    userApi
      .forgotPassword(data.email)
      .then(() => {
        toast.success("Please check your email to reset password");
        router.push(`/otp?email=${encodeURIComponent(data.email)}`);
      })
      .catch(() => {
        toast.error("Email not found");
      });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-7">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className="col-span-2 flex flex-col gap-2">
              <div className="flex justify-between">
                <Typography>Email</Typography>
                <Typography
                  component={Link}
                  href="/login"
                  color="GrayText"
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  Try login again?
                </Typography>
              </div>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.email}
              />
              {errors.email && (
                <FormHelperText error>{errors.email.message}</FormHelperText>
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

export default ForgotPasswordForm;
