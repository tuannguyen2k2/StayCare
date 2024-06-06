"use client";
import { ISignUpForm } from "@/interfaces/auth.interface";
import {
  Button,
  FormHelperText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { signUpResolver } from "./resolver";
import { userApi } from "@/clientApi/user";
import { toast } from "react-toastify";
import { handleHttpError } from "@/utils/helper";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({ resolver: signUpResolver });

  const onSubmit = handleSubmit(async (data) => {
    await trigger();
    if (isValid) {
      userApi
        .register(data)
        .then(() => {
          toast.success("Sign up success");
          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
        })
        .catch((error) => {
          handleHttpError({
            error: {
              ...error,
              message: "Sign up failed",
            },
            setError: setError,
          });
        });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-7">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="col-span-2 flex flex-col gap-2">
              <Typography>Name</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.name}
              />
              {!!errors.name && (
                <FormHelperText error={true}>
                  {errors.name?.message}
                </FormHelperText>
              )}
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className="col-span-1 flex flex-col gap-2">
              <Typography>Email</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.email}
              />
              {!!errors.email && (
                <FormHelperText error={true}>
                  {errors.email?.message}
                </FormHelperText>
              )}
            </div>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div className="col-span-1 flex flex-col gap-2">
              <Typography>Phone</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.phone}
              />
              {!!errors.phone && (
                <FormHelperText error={true}>
                  {errors.phone?.message}
                </FormHelperText>
              )}
            </div>
          )}
        />

        <Controller
          name="icid"
          control={control}
          render={({ field }) => (
            <div className="col-span-2 flex flex-col gap-2">
              <Typography>IC/ID</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.icid}
              />
              {!!errors.icid && (
                <FormHelperText error={true}>
                  {errors.icid?.message}
                </FormHelperText>
              )}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className="col-span-2 flex flex-col gap-2">
              <Typography>Password</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                type="password"
                size="small"
                error={!!errors.password}
              />
              {!!errors.password && (
                <FormHelperText error={true}>
                  {errors.password?.message}
                </FormHelperText>
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
                type="password"
                error={!!errors.confirmPassword}
              />
              {!!errors.confirmPassword && (
                <FormHelperText error={true}>
                  {errors.confirmPassword?.message}
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
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
