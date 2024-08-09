import axiosInstance from "../plugins/axios";

export const fetchVideo = async () => {
  return axiosInstance.get("/api/video");
};
