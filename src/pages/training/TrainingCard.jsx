import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function TrainingCard({ data }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className="training-card-container"
      onClick={() => navigate(`/trainings/${data.id}`)}
    >
      <div className="training-card-left-horizontal" />
      <div className="training-card-top">
        <h2 className="training-card-title">{data.title[i18n.language]}</h2>
      </div>
      <div className="training-card-bottom">
        <div className="training-card-row">
          <h6>{t("start_period")}</h6>
          <h6>{data.start_date[i18n.language]}</h6>
        </div>
        <div className="training-card-row">
          <h6>{t("training_period")}</h6>
          <h6>{data.meets[i18n.language]}</h6>
        </div>
        <div className="training-card-row">
          <h6>{t("end_period")}</h6>
          <h6>{data.end_date[i18n.language]}</h6>
        </div>
      </div>
    </div>
  );
}
