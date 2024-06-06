import { ISignUpForm, ISignUpResponse } from "@/interfaces/auth.interface";
import { ChangePasswordType, ProfileFormType } from "@/interfaces/profile.interface";
import http from "@/utils/http";

export const userApi = {
  register: (body: ISignUpForm) =>
    http.post<ISignUpResponse>(
      `/users/sign-up?role=personality`,
      JSON.stringify({
        full_name: body.name,
        email: body.email,
        ic_code: body.icid,
        role_id: 1,
        phone: body.phone,
        password: body.password,
        confirmed_password: body.confirmPassword,
      })
    ),
  registerAdmin: (body: ISignUpForm) =>
    http.post<ISignUpResponse>(
      "/users/sign-up?role=admin",
      JSON.stringify({
        full_name: body.name,
        email: body.email,
        ic_code: body.icid,
        role_id: 2,
        phone: body.phone,
        password: body.password,
        confirmed_password: body.confirmPassword,
      })
    ),
  activateOtp: (otp: string) =>
    http.post("/users/otp-activation", JSON.stringify({ otp: otp })),
  forgotPassword: (email: string) =>
    http.post("/users/email-otp", JSON.stringify({ email: email })),
  changePassword: ({ body }: { body: ChangePasswordType }) =>
    http.put("/users/password", JSON.stringify(body)),
  passwordOtp: (otp: string) =>
    http.post("/users/password-otp", JSON.stringify({ otp: otp })),
  resetPassword: ({
    body: body,
  }: {
    body: { new_password: string; confirmed_password: string; otp: string };
  }) => http.put("/users/reset-password", JSON.stringify(body)),
  getProfile: () => http.get("/users/profile", {}),
  updateProfile: ({ body }: { body: ProfileFormType }) =>
    http.put("/users/profile", JSON.stringify(body)),
};
