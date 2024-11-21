import axiosInstance from "../plugins/axios";

export const fetchAnnouncements = async (lang, pageNumber) => {
  return axiosInstance.get(
    `/api/announcements?lang=${lang}&page=${pageNumber}`
  );
};

export const fetchAnnouncment = async (id) => {
  return axiosInstance.get(`/api/announcements/${id}`);
};
