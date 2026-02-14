import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

export const sendMessage = async (receiverId: string, content: string) => {
  try {
    const response = await axiosInstance.post("/messages", {
      receiverId,
      content,
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || "Failed to send message.");
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    const response = await axiosInstance.delete(`/messages/${messageId}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message || "Failed to delete message.",
    );
  }
};
