import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPartnersStart,
  fetchPartnersSuccess,
  fetchPartnersFailure,
} from "../store/slices/partnersSlice";
import { fetchPartners } from "../services/partners";

const useFetchPartners = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.partners);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPartnersStart());
      try {
        const response = await fetchPartners();
        dispatch(fetchPartnersSuccess(response.data));
      } catch (error) {
        dispatch(fetchPartnersFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  return { data, loading, error };
};

export default useFetchPartners;
