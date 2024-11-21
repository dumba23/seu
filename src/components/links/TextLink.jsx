import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ArrowRightIcon from "../../assets/images/arrow-right.svg";
import SquareIcon from "../../assets/images/square.svg";

import "./TextLink.css";

export default function TextLink({
  isMobile,
  title,
  menuId,
  active,
  changeActiveMenu,
  visible,
  currentLang,
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const to = {
    pathname: location.pathname,
    search: searchParams.toString(),
  };

  if (currentLang === visible || visible === "both") {
    if (isMobile) {
      return (
        <Link
          to={to}
          onClick={() => changeActiveMenu(active ? null : menuId)}
          className={`text-link ${
            active ? "text-link-active" : "text-link-reset"
          }`}
        >
          <img
            alt="square"
            src={SquareIcon}
            className={`${active ? "" : "img-hidden"}`}
          />
          <span>{title}</span>
          <img
            alt="arrow-right"
            src={ArrowRightIcon}
            style={active ? { transform: "translateX(0.5rem)" } : {}}
          />
        </Link>
      );
    } else {
      return (
        <Link
          to={to}
          onClick={() => changeActiveMenu(menuId)}
          className={`text-link text-link-${active && "active"}`}
        >
          <img alt="square" src={SquareIcon} />
          <span>{title}</span>
          <img
            alt="arrow-right"
            src={ArrowRightIcon}
            style={active ? { transform: "translateX(0.5rem)" } : {}}
          />
        </Link>
      );
    }
  }
}
