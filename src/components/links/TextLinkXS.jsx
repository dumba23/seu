import { Link } from "react-router-dom";
import "./TextLinkXS.css";

export default function TextLinkXS({ title, url }) {
  return (
    <Link to={url} className="text-link-xs">
      <span>{title}</span>
    </Link>
  );
}
