import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnnouncementsStart,
  fetchAnnouncementsSuccess,
  fetchAnnouncementsFailure,
} from "../store/slices/announcementsSlice";
import { fetchAnnouncements } from "../services/announcements";

const useFetchAnnouncements = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.announcements);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchAnnouncementsStart());
      try {
        const response = await fetchAnnouncements();
        dispatch(fetchAnnouncementsSuccess(response.data.announcements));
      } catch (error) {
        dispatch(fetchAnnouncementsFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  return { data, loading, error };
};

export default useFetchAnnouncements;
