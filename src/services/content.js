import axiosInstance from "../plugins/axios";

export const fetchContent = async (id) => {
  return axiosInstance.get("/api/content/" + id);
};

export const getCustomContent = async (id) => {
  return axiosInstance.get("/api/custom/" + id);
};
