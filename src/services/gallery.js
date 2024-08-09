import axiosInstance from "../plugins/axios";

export const fetchArticles = async () => {
  return axiosInstance.get("/api/articles");
};

export const fetchVideos = async (page = 1, perPage = 9) => {
  return axiosInstance.get(`/api/videos?page=${page}&per_page=${perPage}`);
};

export const fetchPhotos = async (page = 1, perPage = 9) => {
  return axiosInstance.get(`/api/photos?page=${page}&per_page=${perPage}`);
};

export const fetchPhoto = async (id) => {
  return axiosInstance.get("/api/photos/" + id);
};
