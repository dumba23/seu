import axiosInstance from "../plugins/axios";

export const fetchForm = async (id) => {
  return axiosInstance.get("/api/forms/" + id);
};

export const storeForm = async (data) => {
  return await axiosInstance.post("/api/submit", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
