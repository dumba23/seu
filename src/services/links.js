import axiosInstance from "../plugins/axios";

export const fetchLinks = async () => {
  return axiosInstance.get("/api/links");
};
