import axiosInstance from "../plugins/axios";

export const fetchArticles = async (page = 1, perPage = 30, lang) => {
  return axiosInstance.get(
    `/api/articles?page=${page}&per_page=${perPage}&lang=${lang}`
  );
};

export const fetchVideos = async (page = 1, perPage = 9, lang) => {
  return axiosInstance.get(
    `/api/videos?page=${page}&per_page=${perPage}&lang=${lang}`
  );
};

export const fetchPhotos = async (page = 1, perPage = 9, lang) => {
  return axiosInstance.get(
    `/api/photos?page=${page}&per_page=${perPage}&lang=${lang}`
  );
};

export const fetchPhoto = async (id) => {
  return axiosInstance.get("/api/photos/" + id);
};
