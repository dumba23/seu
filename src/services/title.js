import axiosInstance from "../plugins/axios";

export const fetchMainTitle = async () => {
  return axiosInstance.get("/api/main-title");
};
