import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./TextLinkSmall.css";

export default function TextLinkSmall({ title, url, currentLang, visible }) {
  const { i18n } = useTranslation();
  const finalUrl = `${url}${window.location.hash}`;

  if (currentLang === visible || visible === "both") {
    return (
      <Link
        to={finalUrl + `?lang=${i18n.language}`}
        className={`text-link-small ${
          window.location.pathname.includes(url) && url.length > 1
            ? "active"
            : ""
        }`}
      >
        <span>{title}</span>
      </Link>
    );
  }
}
