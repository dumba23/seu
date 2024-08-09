import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEnrollmentsStart,
  fetchEnrollmentsSuccess,
  fetchEnrollmentsFailure,
} from "../store/slices/enrollmentsSlice";
import { fetchEnrollments } from "../services/enrollments";

const useFetchEnrollments = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.benefits);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchEnrollmentsStart());
      try {
        const response = await fetchEnrollments();
        dispatch(fetchEnrollmentsSuccess(response.data));
      } catch (error) {
        dispatch(fetchEnrollmentsFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  return { data, loading, error };
};

export default useFetchEnrollments;
