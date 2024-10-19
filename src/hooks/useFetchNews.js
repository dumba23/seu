import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailure,
} from "../store/slices/newsSlice";
import { fetchNews } from "../services/news";
import { useTranslation } from "react-i18next";

const useFetchNews = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchNewsStart());
      try {
        const response = await fetchNews(i18n.language);
        dispatch(fetchNewsSuccess(response.data.news));
      } catch (error) {
        dispatch(fetchNewsFailure(error.message));
      }
    };

    if (location.pathname === "/" || location.pathname.includes("news")) {
      fetchData();
    }
  }, [dispatch, i18n.language, location.pathname]);

  return { data, loading, error };
};

export default useFetchNews;
