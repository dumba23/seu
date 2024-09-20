import axiosInstance from "../plugins/axios";

export const fetchHome = async () => {
  return axiosInstance.get("/api/home");
};

export const fetchLockScreen = async () => {
  return axiosInstance.get("/api/lock-screen");
};
