import { PostFormData } from "@repo/shared-types";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";

export const createPost = async (data: PostFormData) => {
  try {
    const response = await axiosInstance.post("/posts", data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Failed to create post.");
  }
};

export const deletePost = async (postId: string) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Failed to delete post.");
  }
};

export const getPostById = async (postId: string) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data.data;
};

export const getCurrentUserPosts = async () => {
  const response = await axiosInstance.get("/posts/me");
  return response.data.data;
};

export const getPostsByUsername = async (username: string) => {
  const response = await axiosInstance.get(`/posts/user/@${username}`);
  return response.data.data;
};
