import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

export const savePost = async (postId: string) => {
  try {
    const response = await axiosInstance.post(`/saves/${postId}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Failed to save post");
  }
};

export const unsavePost = async (postId: string) => {
  try {
    const response = await axiosInstance.delete(`/saves/${postId}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Failed to unsave post");
  }
};

export const getUserSaves = async () => {
  const response = await axiosInstance.get("/saves/me");
  return response.data.data;
};
