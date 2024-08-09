import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVacanciesStart,
  fetchVacanciesSuccess,
  fetchVacanciessFailure,
} from "../store/slices/vacanciesSlice";
import { fetchVacancies } from "../services/vacancy";

const useFetchVacancies = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.vacancies);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchVacanciesStart());
      try {
        const response = await fetchVacancies();
        dispatch(fetchVacanciesSuccess(response.data.vacancies));
      } catch (error) {
        dispatch(fetchVacanciessFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  return { data, loading, error };
};

export default useFetchVacancies;
