import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

import "./CategoryCard.css";

export default function AnnouncmentsCard({ data }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const startDate = formatDate(data.start_date, i18n);
  const endDate = formatDate(data.end_date, i18n);

  return (
    <div
      className="category-page-card-container"
      onClick={() => navigate(`/vacancies/details/${data.id}`)}
    >
      <div className="category-page-card-top">
        <h2 className="category-page-card-title">
          {data.title[i18n.language]}
        </h2>
      </div>
      <div className="category-page-card-bottom">
        <div className="flex-col">
          <span className="category-page-card-label">დეპარტამენტი</span>
          <span className="category-page-card-value">
            {data.department[i18n.language]}
          </span>
        </div>
        <div className="flex-col">
          <span className="category-page-card-label">გამოცხადების თარიღი</span>
          <span className="category-page-card-value">
            {startDate.day + " " + startDate.month + ", " + startDate.year}
          </span>
        </div>
        <div className="flex-col">
          <span className="category-page-card-label">დასრულების თარიღი</span>
          <span className="category-page-card-value">
            {endDate.day + " " + endDate.month + ", " + endDate.year}
          </span>
        </div>
      </div>
    </div>
  );
}
