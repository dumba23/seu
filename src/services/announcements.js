import axiosInstance from "../plugins/axios";

export const fetchAnnouncements = async () => {
  return axiosInstance.get("/api/announcements");
};
