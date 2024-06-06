import { ILoginForm } from "@/interfaces/auth.interface";
import { IProfile, ProfileFormType } from "@/interfaces/profile.interface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { loginResolver, profileResolver } from "../auth/resolver";
import {
  Box,
  Button,
  FormHelperText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { getServerAuthCookies } from "@/utils/cookies";
import { toast } from "react-toastify";
import { userApi } from "@/clientApi/user";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/accountSlice";

const ProfileForm = ({ data }: { data: IProfile }) => {
  const dispatch = useDispatch();
  const {
    control,
    setError,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ProfileFormType>({
    defaultValues: {
      full_name: data?.full_name,
      email: data?.email,
      phone: data?.phone,
      ic_code: data?.ic_code,
    },
    resolver: profileResolver,
  });
  const handleSubmit = async () => {
    userApi
      .updateProfile({
        body: {
          full_name: getValues().full_name,
          phone: getValues().phone,
          ic_code: getValues().ic_code,
        },
      })
      .then((value: any) => {
        dispatch(setUser(value.payload as IProfile));
        toast.success("Update profile success!");
      })
      .catch(() => {
        toast.error("Update profile error!");
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
        Account Information
      </Typography>
      <form>
        <div className="grid grid-cols-2 gap-7">
          <Controller
            name="full_name"
            control={control}
            render={({ field }) => (
              <div className="col-span-2 flex flex-col gap-2">
                <Typography>Full Name</Typography>
                <OutlinedInput
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.full_name}
                />
                {!!errors.full_name && (
                  <FormHelperText error={true}>
                    {errors.full_name?.message}
                  </FormHelperText>
                )}
              </div>
            )}
          />

          <Controller
            name="email"
            control={control}
            disabled
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
            name="ic_code"
            control={control}
            render={({ field }) => (
              <div className="col-span-2 flex flex-col gap-2">
                <Typography>IC/ID</Typography>
                <OutlinedInput
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.ic_code}
                />
                {!!errors.ic_code && (
                  <FormHelperText error={true}>
                    {errors.ic_code?.message}
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

export default ProfileForm;
