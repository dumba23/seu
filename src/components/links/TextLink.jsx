import ArrowRightIcon from "../../assets/images/arrow-right.svg";
import SquareIcon from "../../assets/images/square.svg";

import "./TextLink.css";

export default function TextLink({ title }) {
  return (
    <a href="#" className="text-link">
      <img alt="square" src={SquareIcon} />
      <span>{title}</span>
      <img alt="arrow-right" src={ArrowRightIcon} />
    </a>
  );
}
