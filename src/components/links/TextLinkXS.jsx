import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./TextLinkXS.css";

export default function TextLinkXS({ title, url }) {
  const { i18n } = useTranslation();
  return (
    <Link to={url + `?lang=${i18n.language}`} className="text-link-xs">
      <span>{title}</span>
    </Link>
  );
}
