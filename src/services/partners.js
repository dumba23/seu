import axiosInstance from "../plugins/axios";

export const fetchPartners = async (lang, pageNumber = 1) => {
  return axiosInstance.get(
    `/api/partners?lang=${lang}&page=${pageNumber}&per_page=12`
  );
};
