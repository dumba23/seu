import axiosInstance from "../plugins/axios";

export const fetchPersonals = async (id) => {
  return axiosInstance.get("/api/personal/" + id);
};
