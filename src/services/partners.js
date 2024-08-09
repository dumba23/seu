import axiosInstance from "../plugins/axios";

export const fetchPartners = async () => {
  return axiosInstance.get("/api/partners");
};
