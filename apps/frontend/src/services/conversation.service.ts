import axiosInstance from "../lib/axios";

export const getUserConversations = async () => {
  const response = await axiosInstance.get("/conversation");
  return response.data.data;
};
