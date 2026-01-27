import {
  LoginFormData,
  RegisterFormData,
  ResendVerificationData,
  VerifyEmailData,
} from "@repo/shared-types";
import axiosInstance from "../lib/axios";

export const signup = async (data: RegisterFormData) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginFormData) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const verifyEmail = async (data: VerifyEmailData) => {
  const response = await axiosInstance.post("/auth/verify-email", data);
  return response.data;
};

export const resendVerificationOtp = async (data: ResendVerificationData) => {
  const response = await axiosInstance.post(
    "/auth/resend-verification-otp",
    data,
  );
  return response.data;
};
