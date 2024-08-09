import axiosInstance from "../plugins/axios";

export const fetchNews = async () => {
  return axiosInstance.get("/api/news");
};
