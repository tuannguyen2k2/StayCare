"use client";

import { ILoginForm } from "@/interfaces/auth.interface";
import { Controller, useForm } from "react-hook-form";
import { loginResolver } from "./resolver";
import { Button, OutlinedInput, Typography } from "@mui/material";
import Link from "next/link";
import { toast } from "react-toastify";
import { authApi } from "@/clientApi/auth";
import { handleHttpError } from "@/utils/helper";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
function LoginForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: loginResolver,
  });

  const onSubmit = handleSubmit(async (data) => {
    authApi
      .login(data)
      .then((res) => {
        Cookies.set("access_token", res.payload.access_token);
        toast.success("Login success");
        if (res.payload.role === "admin") {
          router.push("/blog-manage");
        } else {
          router.push("/home");
        }
      })
      .catch((error) => {
        handleHttpError({
          error: {
            ...error,
            message: "Login failed",
          },
          setError: setError,
        });
      });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-7">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <div className="col-span-2 flex flex-col gap-2">
              <Typography>Username</Typography>
              <OutlinedInput
                {...field}
                fullWidth
                size="small"
                error={!!errors.username}
              />
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className="col-span-2 flex flex-col gap-2">
              <div className="flex justify-between">
                <Typography>Password</Typography>
                <Typography
                  component={Link}
                  href="/forgot-password"
                  color="GrayText"
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </Typography>
              </div>
              <OutlinedInput
                {...field}
                type="password"
                fullWidth
                size="small"
                error={!!errors.password}
              />
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
            Log in
          </Button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
