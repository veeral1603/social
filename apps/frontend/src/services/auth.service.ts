import {
  LoginFormData,
  RegisterFormData,
  VerifyEmailData,
} from "@repo/shared-types";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";

export const signup = async (data: RegisterFormData) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Logout failed");
  }
};

export const login = async (data: LoginFormData) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Login failed");
  }
};

export const verifyEmail = async (data: VerifyEmailData) => {
  try {
    const response = await axiosInstance.post("/auth/verify-email", data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Verification failed");
  }
};

export const resendVerificationOtp = async () => {
  try {
    const response = await axiosInstance.get("/auth/resend-verification-otp");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Resend request failed");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`/auth/me`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message || "Fetch current user failed",
    );
  }
};
