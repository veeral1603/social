import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

export const searchUsers = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/users/search?query=${query}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Failed to search users");
  }
};
