import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchPartnersStart,
  fetchPartnersSuccess,
  fetchPartnersFailure,
} from "../store/slices/partnersSlice";
import { fetchPartners } from "../services/partners";
import { useTranslation } from "react-i18next";

const useFetchPartners = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.partners);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPartnersStart());
      try {
        const response = await fetchPartners(i18n.language);
        dispatch(fetchPartnersSuccess(response.data));
      } catch (error) {
        dispatch(fetchPartnersFailure(error.message));
      }
    };

    if (location.pathname === "/" || location.pathname.includes("partners")) {
      fetchData();
    }
  }, [dispatch, i18n.language, location.pathname]);

  return { data, loading, error };
};

export default useFetchPartners;
