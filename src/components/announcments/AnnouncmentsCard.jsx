import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

import "./AnnouncmentsCard.css";

export default function AnnouncmentsCard({ data }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const formattedDate = formatDate(data.date, i18n);
  return (
    <div
      className="announcments-card-container"
      onClick={() =>
        navigate(`/announcments/details/${data.id}` + `?lang=${i18n.language}`)
      }
    >
      <div className="announcments-card-top">
        <div className="announcments-card-date">
          <div className="announcments-card-date-top">
            <span className="announcments-card-date-top-day">
              {formattedDate.day}
            </span>
            <span className="announcments-card-date-top-year">
              {formattedDate.year}
            </span>
          </div>
          <span className="announcments-card-date-month">
            {formattedDate.month}
          </span>
        </div>
        <h2 className="announcments-card-title">{data.title[i18n.language]}</h2>
      </div>
      <p className="announcments-card-description">
        {data.description[i18n.language]}
      </p>
    </div>
  );
}
