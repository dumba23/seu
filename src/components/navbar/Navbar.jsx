import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenusStart,
  fetchMenusFailure,
  fetchMenusSuccess,
} from "../../store/slices/menusSlice";

import { fetchMenus } from "../../services/menu";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import TextLink from "../links/TextLink";
import TextLinkSmall from "../links/TextLinkSmall";
import TextLinkXS from "../links/TextLinkXS";
import TextLinkMobile from "../links/TextLinkMobile";

import SearchIcon from "../../components/icons/SearchIcon";
import SeuLogo from "../../assets/images/logo.svg";
import SquareLink from "../links/SquareLink";
import SeuLogoSecond from "../../assets/images/seu-logo-second.svg";
import InstagramIcon from "../../assets/images/instagram.svg";
import LinkedinIcon from "../../assets/images/linkedin.svg";
import YoutubeIcon from "../../assets/images/youtube.svg";
import FacebookIcon from "../../assets/images/fb.svg";
import CloseIcon from "../../assets/images/close.svg";
import MobileTel from "../../assets/images/mobile-tel.svg";
import MobileEmail from "../../assets/images/mobile-email.svg";

import "./Navbar.css";

function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const menus = useSelector((state) => state.menus);
  const [activeMenu, setActiveMenu] = useState(menus?.data[0] || []);
  const links = useSelector((state) => state.links.data.links) || [];
  const contacts = useSelector((state) => state.links.data.socials) || [];
  const hashWithoutHashSymbol = location.hash.slice(1);
  const hashParams = new URLSearchParams(hashWithoutHashSymbol);
  const menuId = hashParams.get("menuId");
  const navRef = useRef(null);
  const [isHeightExceed, setIsHeightExceed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!menuId) {
      const url = location.pathname + location.search + `#menuId=${1}`;

      navigate(url);
    }
  }, []);

  useEffect(() => {
    setIsNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsNavOpen(false);
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const startIndex =
      location.pathname.indexOf("/custom/") + "/custom/".length;
    const slicedPart = location.pathname.substring(startIndex);

    if (location.pathname.includes("custom") && slicedPart[0] == 0) {
      setIsHeightExceed(true);
      document.querySelector(".nav-container").style.backgroundColor = "#fff";
    }

    if (location.pathname.includes("register")) {
      setIsHeightExceed(true);
      document.querySelector(".nav-container").style.backgroundColor = "#fff";
    }

    const handleScroll = () => {
      const navContainer = document.querySelector(".nav-container");

      const scrollDistance = window.scrollY;
      const windowWidth = window.innerWidth;

      const changeColorHeight = window.innerHeight;
      if (scrollDistance >= changeColorHeight) {
        setIsHeightExceed(true);
        navContainer.style.backgroundColor = "#fff";
      } else if (location.pathname.includes("custom") && slicedPart[0] == 0) {
        setIsHeightExceed(true);
        navContainer.style.backgroundColor = "#fff";
      } else if (location.pathname.includes("register")) {
        setIsHeightExceed(true);
        navContainer.style.backgroundColor = "#fff";
      } else if (
        windowWidth < 475 &&
        location.pathname !== "/" &&
        scrollDistance >= "30"
      ) {
        setIsHeightExceed(true);
        navContainer.style.backgroundColor = "#fff";
      } else if (location.pathname !== "/" && scrollDistance >= "280") {
        setIsHeightExceed(true);
        navContainer.style.backgroundColor = "#fff";
      } else {
        setIsHeightExceed(false);
        navContainer.style.backgroundColor = "transparent";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (menus.data.length > 0 && activeMenu.length === 0 && menuId) {
      setActiveMenu(menus.data.find((menu) => menu.id == menuId));
    } else if (menus.data.length > 0 && activeMenu.length === 0) {
      setActiveMenu(menus.data[0]);
    }
  }, [menus.data]);

  const changeActiveMenu = (id) => {
    const menu = menus?.data.find((menu) => menu.id == id);

    setActiveMenu(menu);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const showNavbar = () => {
    setIsNavOpen(!isNavOpen);
    setIsSearchExpanded(false);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <header className={isNavOpen ? "collapsible" : ""} ref={navRef}>
      <div className="nav-container">
        {!isNavOpen && (
          <img
            src={isHeightExceed ? SeuLogoSecond : SeuLogo}
            alt="seu-logo"
            className="nav-logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        )}
        <nav className={isNavOpen ? "collapsible_nav" : "flex-col"}>
          <div className="nav-header">
            <img
              src={SeuLogo}
              alt="seu-logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
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
              {i18n.language && i18n.language === "en" ? (
                <button
                  className={`nav-lang-btn ${isNavOpen ? "expanded" : ""}`}
                  onClick={() => changeLanguage("ka")}
                >
                  KA
                </button>
              ) : (
                <button
                  className={`nav-lang-btn ${isNavOpen ? "expanded" : ""}`}
                  onClick={() => changeLanguage("en")}
                >
                  ENG
                </button>
              )}
            </div>
            <button
              className="nav-btn"
              onClick={showNavbar}
              style={{ display: isNavOpen ? "none" : "flex" }}
            >
              <span>{t("menu")}</span>
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
          <div className="mobile-search-container">
            <input
              type="text"
              placeholder="ძებნა"
              className={`mobile-search-input ${
                isSearchExpanded ? "expanded" : ""
              }`}
              style={{ backgroundColor: "#efefef" }}
            />
            {i18n.language && i18n.language === "en" ? (
              <button
                className={`mobile-nav-lang-btn ${isNavOpen ? "expanded" : ""}`}
                onClick={() => changeLanguage("ka")}
                style={
                  isHeightExceed
                    ? {
                        border: "1px solid #383E4D",
                        color: "#383E4D",
                      }
                    : {}
                }
              >
                {t("ka")}
              </button>
            ) : (
              <button
                className={`mobile-nav-lang-btn ${isNavOpen ? "expanded" : ""}`}
                onClick={() => changeLanguage("en")}
                style={
                  isHeightExceed
                    ? {
                        border: "1px solid #383E4D",
                        color: "#383E4D",
                      }
                    : {}
                }
              >
                {t("eng")}
              </button>
            )}
          </div>
          <div className="nav-links">
            <div className="nav-links-left">
              {menus?.data.map((menu) => {
                return (
                  <React.Fragment key={menu.id}>
                    <TextLink
                      key={menu.id}
                      visible={menu.visible}
                      currentLang={i18n.language}
                      title={menu.title[i18n.language]}
                      menuId={menu.id}
                      active={menu.id == menuId}
                      activeMenu={activeMenu}
                      changeActiveMenu={changeActiveMenu}
                    />
                    <div
                      className={`text-link-mobile-wrapper ${
                        activeMenu?.id === menu.id ? "expand" : ""
                      }`}
                    >
                      {activeMenu?.submenus &&
                        activeMenu.id === menu.id &&
                        (activeMenu.visible === i18n.language ||
                          activeMenu.visible === "both") &&
                        activeMenu.submenus.map((submenu) => {
                          return (
                            <TextLinkMobile
                              visible={submenu.visible}
                              currentLang={i18n.language}
                              key={submenu.id}
                              title={submenu.title[i18n.language]}
                              url={
                                submenu.contents.length > 0
                                  ? submenu.contents[0].page_url
                                  : submenu.page_url
                                  ? i18n.language === "ka" &&
                                    submenu.page_url.length > 2
                                    ? submenu.page_url
                                    : submenu.page_url_en.length > 2
                                    ? submenu.page_url_en
                                    : submenu.template.page_url
                                  : submenu.template.page_url
                              }
                            />
                          );
                        })}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="nav-links-right">
              {activeMenu?.submenus &&
                (activeMenu.visible === i18n.language ||
                  activeMenu.visible === "both") &&
                activeMenu.submenus.map((submenu) => {
                  return (
                    <TextLinkSmall
                      visible={submenu.visible}
                      currentLang={i18n.language}
                      key={submenu.id}
                      title={submenu.title[i18n.language]}
                      url={
                        submenu.contents.length > 0
                          ? submenu.contents[0].page_url
                          : submenu.page_url
                          ? i18n.language === "ka" &&
                            submenu.page_url.length > 2
                            ? submenu.page_url
                            : submenu.page_url_en.length > 2
                            ? submenu.page_url_en
                            : submenu.template.page_url
                          : submenu.template.page_url
                      }
                    />
                  );
                })}
            </div>
          </div>
          <div className="nav-links-bottom">
            {links &&
              links.map((link) => {
                return (
                  <TextLinkXS
                    key={link.id}
                    url={
                      i18n.language === "ka" ? link.page_url : link.page_url_en
                    }
                    title={link.title[i18n.language]}
                  />
                );
              })}
          </div>
          <div className="flex-col mobile-info-container">
            <a className="mobile-info-email" href={`tel:${contacts[0]?.phone}`}>
              <img
                src={MobileTel}
                style={{ width: "18px", marginRight: "1rem" }}
              />
              {contacts[0]?.phone}
            </a>
            <button
              className="mobile-info-tel"
              onClick={() => (window.location = `mailto:${contacts[0]?.email}`)}
            >
              <img
                src={MobileEmail}
                style={{ width: "18px", marginRight: "1rem" }}
              />
              {contacts[0]?.email}
            </button>
          </div>
          <div className="mobile-socials">
            <Link
              to={contacts[0]?.facebook}
              target="__blank"
              className="mobile-social"
            >
              Facebook
              <img
                src={FacebookIcon}
                alt="facebook"
                className="mobile-socials-icon"
              />
            </Link>
            <Link
              to={contacts[0]?.instagram}
              target="__blank"
              className="mobile-social"
            >
              Instagram
              <img
                src={InstagramIcon}
                alt="instagram"
                className="mobile-socials-icon"
              />
            </Link>
            <Link
              to={contacts[0]?.linkedin}
              target="__blank"
              className="mobile-social"
            >
              Linkedin
              <img
                src={LinkedinIcon}
                alt="linkedin"
                className="mobile-socials-icon"
              />
            </Link>
            <Link
              to={contacts[0]?.youtube}
              target="__blank"
              className="mobile-social"
            >
              Youtube
              <img
                src={YoutubeIcon}
                alt="youtube"
                className="mobile-socials-icon"
              />
            </Link>
          </div>
          {contacts.length > 0 && (
            <div className="nav-info">
              <a className="nav-call" href={`tel:${contacts[0]?.phone}`}>
                {contacts[0]?.phone}
              </a>

              <button
                className="nav-btn-email"
                onClick={() =>
                  (window.location = `mailto:${contacts[0]?.email}`)
                }
              >
                {contacts[0]?.email}
              </button>
              <div className="nav-icons">
                <Link to={contacts[0].facebook} target="__blank">
                  <img src={FacebookIcon} alt="facebook" />
                </Link>
                <Link to={contacts[0].instagram} target="__blank">
                  <img src={InstagramIcon} alt="instagram" />
                </Link>
                <Link to={contacts[0].linkedin} target="__blank">
                  <img src={LinkedinIcon} alt="linkedin" />
                </Link>
                <Link to={contacts[0].youtube} target="__blank">
                  <img src={YoutubeIcon} alt="youtube" />
                </Link>
              </div>
            </div>
          )}
          <button
            className="nav-btn nav-close-btn equal-height-characters"
            onClick={showNavbar}
          >
            <div style={{ textTransform: "uppercase" }}>{t("close")}</div>
            <img alt="close" src={CloseIcon} />
          </button>
        </nav>
        <div>
          <div
            className="search-container"
            style={isNavOpen ? { display: "none" } : {}}
          >
            <input
              type="text"
              placeholder="ძებნა"
              className={`search-input ${isSearchExpanded ? "expanded" : ""}`}
              style={
                ({ display: isNavOpen ? "none" : "flex" },
                isSearchExpanded && isHeightExceed
                  ? { backgroundColor: "#efefef" }
                  : {})
              }
            />
            <div
              className={`search-icon-container  ${
                isSearchExpanded ? "expanded" : ""
              }`}
              style={{
                display: isNavOpen ? "none" : "flex",
                border: isSearchExpanded
                  ? !isHeightExceed
                    ? "1px solid transparent"
                    : "1px solid transparent"
                  : isHeightExceed
                  ? "1px solid #383E4D"
                  : "1px solid #FFF",
              }}
              onClick={toggleSearch}
            >
              <SearchIcon color={isHeightExceed && "#383E4D"} />
            </div>
          </div>
          {i18n.language && i18n.language === "en" ? (
            <button
              className={`nav-lang-btn ${isNavOpen ? "expanded" : ""}`}
              onClick={() => changeLanguage("ka")}
              style={
                isHeightExceed
                  ? {
                      border: "1px solid #383E4D",
                      color: "#383E4D",
                    }
                  : {}
              }
            >
              {t("ka")}
            </button>
          ) : (
            <button
              className={`nav-lang-btn ${isNavOpen ? "expanded" : ""}`}
              onClick={() => changeLanguage("en")}
              style={
                isHeightExceed
                  ? {
                      border: "1px solid #383E4D",
                      color: "#383E4D",
                    }
                  : {}
              }
            >
              {t("eng")}
            </button>
          )}
          <button
            className="nav-btn"
            onClick={showNavbar}
            style={
              ({ display: isNavOpen ? "none" : "flex" },
              isHeightExceed
                ? {
                    color: "#383E4D",
                  }
                : {})
            }
          >
            <div style={{ textTransform: "uppercase" }}>{t("menu")}</div>
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
