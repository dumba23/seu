import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowUp from "../../assets/images/general-info-arrow.svg";

const GeneralInfoDropdown = ({ info }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hasTitleInLanguage = info?.program_infos?.some(
    (info) => info.title[i18n.language]
  );

  return (
    <div className="general-info-dropdown">
      <button
        onClick={toggleDropdown}
        className={`dropdown-toggle ${isOpen ? "open" : ""}`}
      >
        {t("general_information")}
        <div className="arrow-border">
          <img src={ArrowUp} alt="arrow" />
        </div>
      </button>
      {isOpen && hasTitleInLanguage && (
        <div className={`mobile-general-info-program ${isOpen ? "open" : ""}`}>
          <div
            className={`mobile-border-for-program ${isOpen ? "open" : ""}`}
          />
          {info?.program_infos.map((program, idx) => {
            if (program.title[i18n.language]) {
              return (
                <React.Fragment key={idx}>
                  <div className="mobile-general-info-child">
                    <h4>{program.title[i18n.language]}:</h4>
                    <h6>{program.description[i18n.language]}</h6>
                  </div>
                  <div className="mobile-border-for-program" />
                </React.Fragment>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default GeneralInfoDropdown;
