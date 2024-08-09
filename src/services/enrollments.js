import axiosInstance from "../plugins/axios";

export const fetchEnrollments = async () => {
  return axiosInstance.get("/api/enrollments");
};
