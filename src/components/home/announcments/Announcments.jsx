import React from "react";
import { useNavigate } from "react-router-dom";

import AnnouncmentSlider from "./AnnouncmentSlider";

import "./Announcments.css";
import { useTranslation } from "react-i18next";

export default function Announcments() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="announcments-container" id="announcments">
      <div className="slanted-rectangle" />
      <h1 className="announcments-title">{t("announcements_title")}</h1>

      <div>
        {/* <div className="announcments-button-container"> */}
        <button
          className="announcments-button all"
          onClick={() => navigate("/announcments")}
        >
          {t("all_announcements")}
        </button>
        {/* </div> */}

        <AnnouncmentSlider />
      </div>
    </div>
  );
}
