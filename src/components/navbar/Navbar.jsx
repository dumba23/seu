import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import SearchIcon from "../../components/icons/SearchIcon";
import SeuLogo from "../../assets/images/logo.svg";
import SquareLink from "../links/SquareLink";
import TextLink from "../links/TextLink";
import TextLinkSmall from "../links/TextLinkSmall";
import TextLinkXS from "../links/TextLinkXS";
import InstagramIcon from "../../assets/images/instagram.svg";
import LinkedinIcon from "../../assets/images/linkedin.svg";
import YoutubeIcon from "../../assets/images/youtube.svg";
import FacebookIcon from "../../assets/images/fb.svg";
import CloseIcon from '../../assets/images/close.svg';

import "./Navbar.css";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const showNavbar = () => {
    setIsNavOpen(!isNavOpen);
    setIsSearchExpanded(false);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <header className={isNavOpen ? "collapsible" : ""}>
      {!isNavOpen && <img src={SeuLogo} alt="seu-logo" />}
      <nav className={isNavOpen ? "collapsible_nav" : "flex-col"}>
        <div className="nav-header">
          <img src={SeuLogo} alt="seu-logo" />
          <div>
            <div className="search-container">
              <input
                type="text"
                placeholder="ძებნა"
                className={`search-input ${
                  isSearchExpanded ? "expanded" : ""
                } ${isSearchExpanded && isNavOpen && "collapsed"}`}
              />
              <div
                className={`search-icon-container ${
                  isSearchExpanded ? "expanded" : ""
                } ${isNavOpen ? "collapsed" : ""}`}
                onClick={toggleSearch}
              >
                <SearchIcon color />
              </div>
            </div>
            <button className={`nav-lang-btn ${isNavOpen ? "expanded" : ""}`}>
              ENG
            </button>
          </div>
          <button
            className="nav-btn"
            onClick={showNavbar}
            style={{ display: isNavOpen ? "none" : "flex" }}
          >
            <span>მენიუ</span>
            <FaBars />
          </button>
        </div>
        <div className="nav-external-links">
          <SquareLink
            link={"https://emis1.seu.edu.ge/"}
            title="emis.seu.edu.ge"
          />
          <SquareLink link={"https://seu-bc.edu.ge/"} title="seu-bc.edu.ge" />
          <SquareLink link={"https://vectors.ge/"} title="vectors.ge" />
        </div>
        <div className="nav-links">
          <div className="nav-links-left">
            <TextLink title="უნივერსიტეტი" />
            <TextLink title="სწავლა" />
            <TextLink title="კვლევა" />
            <TextLink title="სტუდენტური ცხოვრება" />
            <TextLink title="კარიერული სერვისები" />
          </div>
          <div className="nav-links-right">
            <div>
              <TextLinkSmall title="SEU-ს შესახებ" />
              <TextLinkSmall title="ფაკულტეტები" />
              <TextLinkSmall title="ვაკანსიები" />
              <TextLinkSmall title="სიახლეები" />
              <TextLinkSmall title="დოკუმენტაცია" />
            </div>
            <div>
              <TextLinkSmall title="სტრუქტურა" />
              <TextLinkSmall title="ანონსები" />
              <TextLinkSmall title="საერთაშორისო ურთიერთობები" />
              <TextLinkSmall title="დიპლომის ფორმები" />
            </div>
          </div>
        </div>
        <div className="nav-links-bottom">
          <TextLinkXS title="საგანმანათლებლო პროგრამები" />
          <TextLinkXS title="საერთაშორისო ურთიერთობები" />
          <TextLinkXS title="ტრენინგ ცენტრი" />
          <TextLinkXS title="აბიტურიენტებისთვის" />
        </div>
        <div className="nav-info">
          <a className="nav-call" href="tel:+1-981-981-23-19">
            + 1 981 981-23-19
          </a>

          <button
            className="nav-btn-email"
            onClick={() => (window.location = "mailto:yourmail@domain.com")}
          >
            hellologoipsum.com
          </button>
          <div className="nav-icons">
            <img src={FacebookIcon} alt="facebook" />
            <img src={InstagramIcon} alt="instagram" />
            <img src={LinkedinIcon} alt="linkedin" />
            <img src={YoutubeIcon} alt="youtube" />
          </div>
        </div>
        <button
          className="nav-btn nav-close-btn equal-height-characters"
          onClick={showNavbar}
        >
          <div>დახურვა</div>
          <img alt="close" src={CloseIcon}/>
        </button>
      </nav>
      <div>
        <div className="search-container">
          <input
            type="text"
            placeholder="ძებნა"
            className={`search-input ${isSearchExpanded ? "expanded" : ""}`}
            style={{ display: isNavOpen ? "none" : "flex" }}
          />
          <div
            className={`search-icon-container ${
              isSearchExpanded ? "expanded" : ""
            }`}
            style={{ display: isNavOpen ? "none" : "flex" }}
            onClick={toggleSearch}
          >
            <SearchIcon />
          </div>
        </div>
        <button className="nav-lang-btn">ENG</button>
        <button
          className="nav-btn"
          onClick={showNavbar}
          style={{ display: isNavOpen ? "none" : "flex" }}
        >
          <div>მენიუ</div>
          <FaBars />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
