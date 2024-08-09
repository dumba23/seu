import axiosInstance from "../plugins/axios";

export const fetchFile = async (id, language) => {
  return axiosInstance.get(`/api/download-exam/${id}/${language}`, {
    responseType: "blob", // Ensure the response is in blob format
  });
};
