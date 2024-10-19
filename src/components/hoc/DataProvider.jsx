import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetchPartners from "../../hooks/useFetchPartners";
import useFetchBenefits from "../../hooks/useFetchBenefits";
import useFetchAnnouncements from "../../hooks/useFetchAnnouncements";
import useFetchNews from "../../hooks/useFetchNews";
import useFetchEnrollments from "../../hooks/useFetchEnrollments";
import useFetchLinks from "../../hooks/useFetchLinks";
import useFetchVacancies from "../../hooks/useFetchVacancies";
import { useTranslation } from "react-i18next";

const DataProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  useFetchPartners();
  useFetchBenefits();
  useFetchAnnouncements();
  useFetchNews();
  useFetchEnrollments();
  useFetchLinks();
  useFetchVacancies();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lang = params.get("lang") || "ka";

    if (lang === "en" || lang === "ka") {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    }
  }, []);

  return <>{children}</>;
};

export default DataProvider;
