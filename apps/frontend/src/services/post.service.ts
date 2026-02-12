import { PostFormData } from "@repo/shared-types";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";

export const createPost = async (data: PostFormData) => {
  try {
    const response = await axiosInstance.post("/post", data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Failed to create post.");
  }
};

export const deletePost = async (postId: string) => {
  try {
    const response = await axiosInstance.delete(`/post/${postId}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Failed to delete post.");
  }
};
