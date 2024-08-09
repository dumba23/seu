import axiosInstance from "../plugins/axios";

export const subscribeEmail = async (data) => {
  return axiosInstance.post("/api/subscribe", data);
};
