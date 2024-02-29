import axiosInstance from '../plugins/axios'

export const fetchPage = async () => {
  return axiosInstance.get('/api/page')
}

