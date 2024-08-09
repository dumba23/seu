import { React } from "react";
import { useTranslation } from "react-i18next";

import LocationImage from "../../assets/images/location.svg";

import "./PartnersCard.css";

export default function PartnersCard({ data }) {
  const { i18n } = useTranslation();

  return (
    <div
      className="partners-card-container"
      onClick={() => window.location.replace(data.page_url)}
    >
      <div className="partners-card-top">
        <div className="partners-card-image-mobile-wrapper">
          <img
            src={import.meta.env.VITE_API_MEDIA_URL + data.logo}
            alt="partners"
            className="partners-card-image"
          />
        </div>
        <h3 className="partners-card-name-mobile">
          {data.name[i18n.language]}
        </h3>
      </div>

      <h3 className="partners-card-name-desktop">{data.name[i18n.language]}</h3>
      <div className="partners-card-location">
        <img
          src={LocationImage}
          alt="location"
          style={{ marginRight: "0.4rem" }}
          className="partners-card-location-image"
        />
        <span style={{ marginRight: "0.4rem" }}>
          {data.country.country[i18n.language]}
        </span>
        <img
          src={import.meta.env.VITE_API_MEDIA_URL + data.country.url}
          alt={data.country}
          className="partners-card-country"
        />
      </div>
    </div>
  );
}
