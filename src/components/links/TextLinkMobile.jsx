import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import LinkIcon from "../../assets/images/mobile-link.svg";
import "./TextLinkMobile.css";

export default function TextLinkMobile({ title, url, currentLang, visible }) {
  const { i18n } = useTranslation();
  const finalUrl = `${url}${window.location.hash}`;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const to = {
    pathname: location.pathname,
    search: searchParams.toString(),
  };

  if (currentLang === visible || visible === "both") {
    return (
      <Link
        to={finalUrl !== "/" ? finalUrl + `?lang=${i18n.language}` : to}
        className={`text-link-mobile ${
          window.location.pathname.includes(url) && url.length > 1
            ? "active"
            : ""
        }`}
      >
        <span>{title}</span>
        <img src={LinkIcon} alt="link" className="mobile-link-icon" />
      </Link>
    );
  }
}
