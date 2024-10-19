import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLinksStart,
  fetchLinksSuccess,
  fetchLinksFailure,
} from "../store/slices/linksSlice";
import { fetchLinks } from "../services/links";

const useFetchLinks = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.links);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchLinksStart());
      try {
        const response = await fetchLinks();
        dispatch(fetchLinksSuccess(response.data));
      } catch (error) {
        dispatch(fetchLinksFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  return { data, loading, error };
};

export default useFetchLinks;
