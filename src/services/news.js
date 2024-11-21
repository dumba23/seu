import axiosInstance from "../plugins/axios";

export const fetchNews = async (lang, page = 1) => {
  return axiosInstance.get(`/api/news?lang=${lang}&page=${page}&per_page=10`);
};

export const fetchNew = async (id) => {
  return axiosInstance.get(`/api/news/${id}`);
};
