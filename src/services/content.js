import axiosInstance from "../plugins/axios";

export const fetchContent = async (id, lang, page, perPage) => {
  return axiosInstance.get(
    `/api/content/${id}?lang=${lang}&page=${page}&perPage=${perPage}`
  );
};

export const getCustomContent = async (id) => {
  return axiosInstance.get("/api/custom/" + id);
};
