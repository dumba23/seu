import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ArrowRightIcon from "../../assets/images/arrow-right.svg";
import SquareIcon from "../../assets/images/square.svg";

import "./TextLink.css";

export default function TextLink({
  title,
  menuId,
  active,
  changeActiveMenu,
  visible,
  currentLang,
}) {
  const navigate = useNavigate();

  if (currentLang === visible || visible === "both") {
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
