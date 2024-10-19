import axiosInstance from "../plugins/axios";

export const fetchVacancies = async () => {
  return axiosInstance.get("/api/vacancies");
};

export const fetchVacancyCategory = async (id, lang, pageNumber) => {
  return axiosInstance.get(
    `/api/vacancies/${id}?lang=${lang}&page=${pageNumber}`
  );
};

export const fetchVacancy = async (id) => {
  return axiosInstance.get("/api/vacancy/" + id);
};
