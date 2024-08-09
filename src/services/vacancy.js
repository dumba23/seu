import axiosInstance from "../plugins/axios";

export const fetchVacancies = async () => {
  return axiosInstance.get("/api/vacancies");
};

export const fetchVacancyCategory = async (id) => {
  return axiosInstance.get("/api/vacancies/" + id);
};

export const fetchVacancy = async (id) => {
  return axiosInstance.get("/api/vacancy/" + id);
};
