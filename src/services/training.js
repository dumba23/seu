import axiosInstance from "../plugins/axios";

export const fetchTraininigs = async () => {
  return axiosInstance.get("/api/trainings");
};

export const fetchTraining = async (id) => {
  return axiosInstance.get("/api/trainings/" + id);
};
