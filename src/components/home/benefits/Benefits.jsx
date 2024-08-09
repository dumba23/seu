import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AnimatedNumber from "./AnimatedNumber";
import "./Benefits.css";

import BenefitsSlider from "./BenefitsSlider";

export default function Benefits() {
  const { t, i18n } = useTranslation();
  const statistics = useSelector((state) => state.benefits.data.statistics);
  const benefitsDataRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.5 }
    );

    if (benefitsDataRef.current) {
      observer.observe(benefitsDataRef.current);
    }

    return () => {
      if (benefitsDataRef.current) {
        observer.unobserve(benefitsDataRef.current);
      }
    };
  }, []);

  return (
    <div className="benefits-container" id="benefits">
      <div className="benefits-title-container">
        <div className="benefits-line-left-title" style={{ width: "auto" }}>
          <div className="benefits-dot" />
        </div>
        <h1 className="benefits-title">{t("benefits_title")}</h1>
        <div className="benefits-line-right-title" style={{ width: "auto" }}>
          <div className="benefits-dot" />
        </div>
      </div>
      <BenefitsSlider />
      <div className="benefits-data" ref={benefitsDataRef}>
        <div className="benefits-line-left">
          <div className="benefits-dot" />
        </div>
        {statistics?.map((stat, idx) => {
          return (
            <React.Fragment key={idx}>
              <div className="benefits-flex-col" style={{ marginLeft: "2rem" }}>
                <span className="benefits-data-count">
                  <AnimatedNumber text={stat.value} />
                </span>
                <span className="benefits-data-title">
                  {stat.name[i18n.language]}
                </span>
              </div>
              {idx !== statistics.length - 1 && (
                <div className="benefits-border" />
              )}
            </React.Fragment>
          );
        })}

        <div className="benefits-line-right">
          <div className="benefits-dot" />
        </div>
      </div>
    </div>
  );
}
