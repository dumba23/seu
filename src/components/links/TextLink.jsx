import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  if (currentLang === visible || visible === "both") {
    if (isMobile) {
      return (
        <Link
          onDoubleClick={() => navigate("/")}
          to={`${active ? "#" : "#menuId=" + menuId}`}
          onClick={() => changeActiveMenu(active ? [] : menuId)}
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
          onDoubleClick={() => navigate("/")}
          to={`#menuId=${menuId}`}
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
