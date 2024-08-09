import React from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/dateUtils";

export default function ArticleCard({ data }) {
  const { i18n } = useTranslation();

  const formattedDate = formatDate(data?.article_at, i18n);
  const description = data?.description ? data.description[i18n.language] : "";
  const title = data?.title ? data.title[i18n.language] : "";

  return (
    <div
      className="article-card-container"
      onClick={() =>
        window.open(
          i18n.language === "ka" ? data?.page_url : data?.page_url_en,
          "_blank"
        )
      }
    >
      <div className="article-card-top">
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
        <h2 className="announcments-card-title">{description}</h2>
      </div>
      <h5 style={{ color: "#29334F", fontWeight: "400" }}>{title}</h5>
    </div>
  );
}
