import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

export const repostPost = async (postId: string) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/repost`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message ||
        "An error occurred while reposting the post.",
    );
  }
};

export const unrepostPost = async (postId: string) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}/repost`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message ||
        "An error occurred while unreposting the post.",
    );
  }
};
