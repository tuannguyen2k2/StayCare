import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";

export const signUpResolver = zodResolver(
  object({
    name: string().min(3, { message: "Name is too short" }),
    email: string().email({ message: "Invalid email" }),
    phone: string().min(10).max(10),
    icid: string().min(1, {
      message: "IC/ID is required",
    }),
    password: string().min(1, {
      message: "Password is required",
    }),
    confirmPassword: string().min(1, {
      message: "Confirm password is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
);

export const passwordResolver = zodResolver(
  object({
    old_password: string().min(1, {
      message: "Password is required",
    }),
    new_password: string().min(1, {
      message: "Password is required",
    }),
    confirmed_password: string().min(1, {
      message: "Confirm password is required",
    }),
  }).refine((data) => data.new_password === data.confirmed_password, {
    message: "Confirm password is not match",
    path: ["confirmed_password"],
  })
)

export const loginResolver = zodResolver(
  object({
    username: string().email(),
    password: string().min(1),
  })
);


export const profileResolver = zodResolver(
  object({
    name: string().min(3, { message: "Name is too short" }),
    email: string().email({ message: "Invalid email" }),
    phone: string().min(10).max(10),
  })
);

export const forgotPasswordResolver = zodResolver(
  object({
    email: string().email(),
  })
);

export const resetPasswordResolver = zodResolver(
  object({
    password: string().min(8),
    confirmPassword: string().min(8),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
);
