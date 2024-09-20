import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnnouncementsSuccess } from "../store/slices/announcementsSlice";
import { fetchBenefitsSuccess } from "../store/slices/benefitsSlice";
import { fetchLinksSuccess } from "../store/slices/linksSlice";
import { fetchEnrollmentsSuccess } from "../store/slices/enrollmentsSlice";
import { fetchNewsSuccess } from "../store/slices/newsSlice";
import { fetchPartnersSuccess } from "../store/slices/partnersSlice";
import { fetchVacanciesSuccess } from "../store/slices/vacanciesSlice";
import { fetchMenusSuccess } from "../store/slices/menusSlice";
import { fetchHome } from "../services/home";
import { useTranslation } from "react-i18next";

const useFetchHome = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.announcements);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHome();

        dispatch(fetchAnnouncementsSuccess(response.data.announcements));
        dispatch(fetchBenefitsSuccess(response.data.benefits));
        dispatch(fetchLinksSuccess(response.data.links));
        dispatch(fetchEnrollmentsSuccess(response.data.enrollments));
        dispatch(fetchNewsSuccess(response.data.news));
        dispatch(fetchPartnersSuccess(response.data.partners));
        dispatch(fetchVacanciesSuccess(response.data.vacancies));
        dispatch(fetchMenusSuccess(response.data.menus));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return { data, loading, error };
};

export default useFetchHome;
