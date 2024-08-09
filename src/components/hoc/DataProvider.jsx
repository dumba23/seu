import React from "react";
import useFetchPartners from "../../hooks/useFetchPartners";
import useFetchBenefits from "../../hooks/useFetchBenefits";
import useFetchAnnouncements from "../../hooks/useFetchAnnouncements";
import useFetchNews from "../../hooks/useFetchNews";
import useFetchEnrollments from "../../hooks/useFetchEnrollments";
import useFetchLinks from "../../hooks/useFetchLinks";
import useFetchVacancies from "../../hooks/useFetchVacancies";

const DataProvider = ({ children }) => {
  useFetchPartners();
  useFetchBenefits();
  useFetchAnnouncements();
  useFetchNews();
  useFetchEnrollments();
  useFetchLinks();
  useFetchVacancies();

  return <>{children}</>;
};

export default DataProvider;
