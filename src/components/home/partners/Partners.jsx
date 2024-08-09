import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PartnersSlider from "./PartnersSlider";

import BackgroundImg from "../../../assets/images/seu-partners-background.png";
import { useTranslation } from "react-i18next";

import "./Partners.css";

export default function Partners() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const partners = useSelector((state) => state.partners.data);

  return (
    <div className="partners-container">
      <div className="partners-overview-container">
        <h1 className="partners-title">{t("partners_title")}</h1>
        <h3 className="partners-description">
          {partners && partners.title && partners.title[0].title[i18n.language]}
        </h3>
        <PartnersSlider
          stories={partners.cards !== undefined ? partners.cards : []}
          lang={i18n.language}
        />
        <button
          className="partners-button"
          onClick={() => navigate("/partners")}
        >
          {t("all_partners")}
        </button>
        <img src={BackgroundImg} className="partners-img" alt="seu" />
      </div>
    </div>
  );
}
