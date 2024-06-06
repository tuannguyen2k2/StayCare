import { ChangePasswordType } from "@/interfaces/profile.interface";
import {
  Box,
  Button,
  FormHelperText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { loginResolver, passwordResolver } from "../auth/resolver";
import { getServerAuthCookies } from "@/utils/cookies";
import { toast } from "react-toastify";
import { userApi } from "@/clientApi/user";

const PasswordForm = () => {
  const {
    control,
    getValues,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    resolver: passwordResolver,
  });
  const handleSubmit = async () => {
    userApi
      .changePassword({
        body: {
          old_password: getValues().old_password,
          new_password: getValues().new_password,
          confirmed_password: getValues().confirmed_password,
        },
      })
      .then(() => {
        toast.success("Update password success!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Update password error!");
      });
  };
  return (
    <>
      <Typography
        variant="h4"
        color="primary"
        fontWeight={600}
        textAlign={"center"}
      >
        Change Password
      </Typography>
      <form>
        <div className="grid grid-cols-2 gap-7">
          <Controller
            name="old_password"
            control={control}
            render={({ field }) => (
              <div className="col-span-2 flex flex-col gap-2">
                <Typography>Old Password</Typography>
                <OutlinedInput
                  {...field}
                  fullWidth
                  type="password"
                  size="small"
                  error={!!errors.old_password}
                />
                {!!errors.old_password && (
                  <FormHelperText error={true}>
                    {errors.old_password?.message}
                  </FormHelperText>
                )}
              </div>
            )}
          />

          <Controller
            name="new_password"
            control={control}
            render={({ field }) => (
              <div className="col-span-2 flex flex-col gap-2">
                <Typography>New Password</Typography>
                <OutlinedInput
                  {...field}
                  type="password"
                  fullWidth
                  size="small"
                  error={!!errors.new_password}
                />
                {!!errors.new_password && (
                  <FormHelperText error={true}>
                    {errors.new_password?.message}
                  </FormHelperText>
                )}
              </div>
            )}
          />

          <Controller
            name="confirmed_password"
            control={control}
            render={({ field }) => (
              <div className="col-span-2 flex flex-col gap-2">
                <Typography>Confirm Password</Typography>
                <OutlinedInput
                  {...field}
                  type="password"
                  fullWidth
                  size="small"
                  error={!!errors.confirmed_password}
                />
                {!!errors.confirmed_password && (
                  <FormHelperText error={true}>
                    {errors.confirmed_password?.message}
                  </FormHelperText>
                )}
              </div>
            )}
          />
        </div>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          mt={"30px"}
        >
          <Button
            onClick={handleSubmit}
            sx={{
              bgcolor: "#F7961D",
              color: "white",
              "&:hover": {
                bgcolor: "#F7961D",
              },
            }}
          >
            Save changes
          </Button>
        </Box>
      </form>
    </>
  );
};

export default PasswordForm;
