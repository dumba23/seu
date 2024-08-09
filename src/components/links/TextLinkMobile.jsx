import { Link } from "react-router-dom";
import LinkIcon from "../../assets/images/mobile-link.svg";
import "./TextLinkMobile.css";

export default function TextLinkMobile({ title, url, currentLang, visible }) {
  const finalUrl = `${url}${window.location.hash}`;

  if (currentLang === visible || visible === "both") {
    return (
      <Link
        to={finalUrl}
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
