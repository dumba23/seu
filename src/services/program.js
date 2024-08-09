import axiosInstance from "../plugins/axios";

export const fetchPrograms = async (id) => {
  return axiosInstance.get("/api/program/" + id);
};
