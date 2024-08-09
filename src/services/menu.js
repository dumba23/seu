import axiosInstance from "../plugins/axios";

export const fetchMenus = async () => {
  return axiosInstance.get("/api/menus");
};
