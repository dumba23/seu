import React from "react";
import { useNavigate } from "react-router-dom";

import NewsSlider from "./NewsSlider";

import "./News.css";
import { useTranslation } from "react-i18next";

export default function News() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="news-container" style={{ position: "relative " }}>
      <div>
        <div className="news-button-container">
          <h1 className="news-title">{t("news_title")}</h1>
          <div className="news-flex-row">
            <button
              onClick={() => navigate("/news" + `?lang=${i18n.language}`)}
              className="news-button all"
              style={{
                position: "absolute",
                right: "1.5rem",
                marginRight: "0",
                zIndex: "3",
              }}
            >
              {t("all_news")}
            </button>
          </div>
        </div>

        <NewsSlider />
      </div>
    </div>
  );
}
