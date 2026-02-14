import axiosInstance from "../lib/axios";

export const getUserConversations = async () => {
  const response = await axiosInstance.get("/conversations");
  return response.data.data;
};
