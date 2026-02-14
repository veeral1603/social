import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

export const followUser = async (profileId: string) => {
  try {
    console.log("Attempting to follow user with profile ID:", profileId);
    const response = await axiosInstance.post(`/follows/${profileId}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Failed to follow user.");
  }
};

export const unfollowUser = async (profileId: string) => {
  try {
    const response = await axiosInstance.delete(`/follows/${profileId}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Failed to unfollow user.");
  }
};
