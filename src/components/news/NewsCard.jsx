import { React } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./NewsCard.css";

export default function NewsCard({ data }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className="news-card-container"
      onClick={() =>
        navigate(`/news/details/${data.id}` + `?lang=${i18n.language}`)
      }
    >
      <div className="news-card-image-container">
        <img
          src={
            data.image_en !== null
              ? i18n.language === "en"
                ? import.meta.env.VITE_API_MEDIA_URL + data.image_en
                : import.meta.env.VITE_API_MEDIA_URL + data.image
              : import.meta.env.VITE_API_MEDIA_URL + data.image
          }
          alt="news"
          className="news-card-image"
        />
      </div>

      <div className="news-card-content">
        <div className="news-card-top">
          <h2 className="news-card-title">{data.title[i18n.language]}</h2>
        </div>
        <p className="news-card-description">
          {data.description[i18n.language]}
        </p>
      </div>
      <div className="news-card-date">{data.date}</div>
    </div>
  );
}
