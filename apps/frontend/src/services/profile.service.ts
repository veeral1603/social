import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

export const checkUsenameAvailability = async (username: string) => {
  try {
    const response = await axiosInstance.get(
      `/profile/check-username?username=${username}`,
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
    const response = await axiosInstance.get("/profile/me");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message || "Failed to get user profile.",
    );
  }
};
