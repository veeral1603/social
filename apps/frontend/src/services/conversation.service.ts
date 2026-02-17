import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

export const getUserConversations = async () => {
  const response = await axiosInstance.get("/conversations/me");
  return response.data.data;
};

export const getConversation = async (participantId: string) => {
  try {
    const response = await axiosInstance.get(`/conversations/${participantId}`);
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message || "Failed to get conversation",
    );
  }
};

export const getConversationMessages = async (
  conversationId: string,
  cursor?: string | undefined,
) => {
  try {
    const response = await axiosInstance.get(
      `/conversations/${conversationId}/messages?${cursor ? `cursor=${cursor}` : ""}`,
    );
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(
      error.response?.data.message || "Failed to get conversation messages",
    );
  }
};
