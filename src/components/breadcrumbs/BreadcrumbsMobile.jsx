import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "./BreadcrumbsMobile.css";

export default function BreadcrumbsMobile({ data, activeTitle }) {
  const { i18n } = useTranslation();
  const [rearrangedData, setRearrangedData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setRearrangedData(
        data.sort((a, b) =>
          a.title === activeTitle?.toLowerCase()
            ? -1
            : b.title === activeTitle?.toLowerCase()
            ? 1
            : 0
        )
      );
    }

    return () => {
      setRearrangedData([]);
    };
  }, [data, activeTitle]);

  return (
    <div className="breadcrumbs-mobile-container">
      {rearrangedData.map((item, idx) => {
        if (Object.keys(item).length > 0) {
          return (
            <React.Fragment key={idx}>
              <Link
                to={item.link + `?lang=${i18n.language}`}
                className={`breadcrumbs-mobile-content ${
                  activeTitle === item.title ? "active" : ""
                }`}
              >
                <div className="breadcrumbs-mobile-title">{item.title}</div>
              </Link>
            </React.Fragment>
          );
        }
      })}
    </div>
  );
}
