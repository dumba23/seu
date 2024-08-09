import axiosInstance from "../plugins/axios";

export const fetchBenefits = async () => {
  return axiosInstance.get("/api/benefits");
};
