import axiosInstance from "../lib/axios";

export const getFeed = async () => {
  const response = await axiosInstance.get("/feed");
  return response.data.data;
};
