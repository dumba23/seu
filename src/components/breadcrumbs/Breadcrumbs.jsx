import React from "react";
import { Link } from "react-router-dom";

import ArrowRight from "../../assets/images/breadcrumbs-arrow.svg";

import "./Breadcrumbs.css";

export default function Breadcrumbs({ data }) {
  return (
    <div className="breadcrumbs-container">
      {data.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            <Link
              to={item.link}
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
