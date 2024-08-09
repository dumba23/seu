import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailure,
} from "../store/slices/newsSlice";
import { fetchNews } from "../services/news";

const useFetchNews = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchNewsStart());
      try {
        const response = await fetchNews();
        dispatch(fetchNewsSuccess(response.data.news));
      } catch (error) {
        dispatch(fetchNewsFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  return { data, loading, error };
};

export default useFetchNews;
