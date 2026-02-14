import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";
import { sleep } from "../lib/utils";

export const checkUsenameAvailability = async (username: string) => {
  try {
    const response = await axiosInstance.get(
      `/profiles/check-username?username=${username}`,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message || "Failed to check username availability.",
    );
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/profiles/me");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message || "Failed to get user profile.",
    );
  }
};

export const getUserProfileByUsername = async (username: string) => {
  await sleep(1000);
  const response = await axiosInstance.get(`/profiles/@${username}`);
  return response.data.data;
};

export const updateProfile = async (formData: FormData) => {
  try {
    const response = await axiosInstance.patch("/profiles/me", formData);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message || "Failed to update profile.",
    );
  }
};
