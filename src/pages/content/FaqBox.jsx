import { useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowRightBlack from "../../assets/images/training-arrow.svg";

export default function FaqBox(data) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`type8-box ${isOpen ? "open" : ""}`}>
      <div className="type8-question" onClick={toggleOpen}>
        {data.item.title[i18n.language]}
        <img
          src={ArrowRightBlack}
          alt="arrow"
          onClick={toggleOpen}
          className={`training-arrow ${isOpen ? "open" : ""}`}
        />
      </div>

      <div
        className={`type8-html ${isOpen ? "open" : ""}`}
        dangerouslySetInnerHTML={{
          __html: data.item.html[i18n.language],
        }}
      />
    </div>
  );
}
