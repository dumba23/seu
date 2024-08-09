import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBenefitsStart,
  fetchBenefitsSuccess,
  fetchBenefitsFailure,
} from "../store/slices/benefitsSlice";
import { fetchBenefits } from "../services/benefits";

const useFetchBenefits = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.benefits);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchBenefitsStart());
      try {
        const response = await fetchBenefits();
        dispatch(fetchBenefitsSuccess(response.data));
      } catch (error) {
        dispatch(fetchBenefitsFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  return { data, loading, error };
};

export default useFetchBenefits;
