import React from "react";
import { Link } from "react-router-dom";

import "./BreadcrumbsMobile.css";

export default function BreadcrumbsMobile({ data, activeTitle }) {
  const rearrangedData = data.sort((a, b) =>
    a.title === activeTitle.toLowerCase()
      ? -1
      : b.title === activeTitle.toLowerCase()
      ? 1
      : 0
  );

  return (
    <div className="breadcrumbs-mobile-container">
      {rearrangedData.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            <Link
              to={item.link}
              className={`breadcrumbs-mobile-content ${
                activeTitle === item.title ? "active" : ""
              }`}
            >
              <div className="breadcrumbs-mobile-title">{item.title}</div>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}
