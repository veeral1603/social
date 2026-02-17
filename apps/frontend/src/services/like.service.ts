import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

export const likePost = async (postId: string) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/like`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message ||
        "An error occurred while liking the post.",
    );
  }
};

export const unlikePost = async (postId: string) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}/like`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message ||
        "An error occurred while unliking the post.",
    );
  }
};
