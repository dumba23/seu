import axiosInstance from "../plugins/axios";

export const fetchNews = async (lang) => {
  return axiosInstance.get(`/api/news?lang=${lang}`);
};
