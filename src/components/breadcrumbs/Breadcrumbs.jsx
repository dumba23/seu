import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import ArrowRight from "../../assets/images/breadcrumbs-arrow.svg";

import "./Breadcrumbs.css";

export default function Breadcrumbs({ data }) {
  const { i18n } = useTranslation();
  return (
    <div className="breadcrumbs-container">
      {data.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            <Link
              to={item.link + `?lang=${i18n.language}`}
              className={`breadcrumbs-content ${
                idx === data.length - 1 ? "active" : ""
              }`}
            >
              <div className="breadcrumbs-title">{item.title}</div>
            </Link>
            {idx !== data.length - 1 && (
              <img
                src={ArrowRight}
                alt="arrow-right"
                className="breadcrumbs-arrow"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
