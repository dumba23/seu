import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./CategoryCard.css";

export default function CategoryCard({ data }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="category-card-container">
      <div className="category-card-top">
        <h2 className="category-card-title">{data.title[i18n.language]}</h2>
      </div>
      <div
        className="category-see-full"
        onClick={() => navigate(`/vacancies/${data.id}`)}
      >
        იხილე სრულად
      </div>
    </div>
  );
}
