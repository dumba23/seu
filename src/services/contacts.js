import axiosInstance from "../plugins/axios";

export const fetchContacts = async () => {
  return axiosInstance.get("/api/contacts");
};
