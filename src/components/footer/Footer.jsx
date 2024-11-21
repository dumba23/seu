import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { subscribeEmail } from "../../services/subscription";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FooterImage from "../../assets/images/seu-footer-image.svg";
import SeuLogo from "../../assets/images/logo.svg";
import InstaLogo from "../../assets/images/instagram.svg";
import FBLogo from "../../assets/images/fb.svg";
import LinkedinLogo from "../../assets/images/linkedin.svg";
import YoutubeLogo from "../../assets/images/youtube.svg";
import ArrowUp from "../../assets/images/scroll-up-arrow.svg";

import "./Footer.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState("");

  const links = useSelector((state) => state.links.data.links) || [];
  const contacts = useSelector((state) => state.links.data.socials) || [];
  const menus = useSelector((state) => state.menus.data);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await subscribeEmail({ email: event.target.email.value });
      setMessage(res.data.message);
      toast.success(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        {links.length > 0 && (
          <div className="footer-submenu-container">
            <div className="home-submenu">
              {links.map((link, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <Link
                      to={link.page_url + `?lang=${i18n.language}`}
                      className="submenu-item"
                      key={idx}
                    >
                      {link.title[i18n.language]}
                    </Link>
                    {idx !== links.length - 1 && (
                      <div className="submenu-border" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
        <div className="footer-subscription-container">
          <div className="footer-subscription-text">
            <h3>{t("subscribe_news")}</h3>
            <h5>{t("subscribe_text")}</h5>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                name="email"
                placeholder={t("enter_email")}
                className="footer-subscription-input"
              />
              <button type="submit" className="footer-subscription-button">
                {t("subscribe")}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-subscription-border-container">
        <div className="footer-subscription-border" />
      </div>
      <img src={FooterImage} alt="seu" className="footer-image" />
      <div className="footer-links">
        <div className="footer-links-right">
          <img src={SeuLogo} alt="seu" className="footer-seu-logo" />
          {contacts.length > 0 && (
            <div className="footer-contacts">
              <a
                className="nav-call"
                href={`tel:${contacts[0].phone}`}
                style={{ marginBottom: "0.5rem" }}
              >
                {contacts[0].phone}
              </a>
              <button
                className="nav-btn-email"
                onClick={() =>
                  (window.location = `mailto:${contacts[0].email}`)
                }
                style={{ fontSize: "14px" }}
              >
                {contacts[0].email}
              </button>
            </div>
          )}
        </div>
        {menus &&
          menus.map((menu, index) => {
            if (menu.visible === "both" || menu.visible === i18n.language)
              return (
                <div key={index} className="footer-category">
                  <h4 className="footer-links-title">
                    {menu.title[i18n.language]}
                  </h4>
                  <ul className="footer-links-pages">
                    {menu.submenus.map((submenu, idx) => {
                      if (
                        submenu.visible === "both" ||
                        submenu.visible === i18n.language
                      )
                        return (
                          <li
                            key={idx}
                            onClick={() =>
                              window.location.replace(
                                submenu.contents.length > 0
                                  ? submenu.contents[0].page_url
                                  : submenu.page_url
                                  ? submenu.page_url
                                  : submenu.template.page_url
                              )
                            }
                          >
                            <div className="footer-links-circle" />
                            <span>{submenu.title[i18n.language]}</span>
                          </li>
                        );
                    })}
                  </ul>
                </div>
              );
          })}
      </div>
      <div className="footer-socials">
        {contacts.length > 0 && (
          <div className="footer-socials">
            <Link
              to={contacts[0].facebook}
              target="__blank"
              className="footer-socials-item"
            >
              <h6>Facebook</h6>
              <img src={FBLogo} alt="facebook" />
            </Link>
            <Link
              to={contacts[0].instagram}
              target="__blank"
              className="footer-socials-item"
            >
              <h6>Instagram</h6>
              <img src={InstaLogo} alt="instagram" />
            </Link>
            <Link
              to={contacts[0].linkedin}
              target="__blank"
              className="footer-socials-item"
            >
              <h6>Linkedin</h6>
              <img src={LinkedinLogo} alt="linkedin" />
            </Link>
            <Link
              to={contacts[0].youtube}
              target="__blank"
              className="footer-socials-item"
            >
              <h6>Youtube</h6>
              <img src={YoutubeLogo} alt="youtube" />
            </Link>
          </div>
        )}
      </div>
      <div className="footer-links-end">
        <img src={SeuLogo} alt="seu" className="footer-seu-logo" />
        {contacts.length > 0 && (
          <div className="footer-contacts">
            <a
              className="nav-call"
              href={`tel:${contacts[0].phone}`}
              style={{ marginBottom: "0.5rem" }}
            >
              {contacts[0].phone}
            </a>
            <button
              className="nav-btn-email"
              onClick={() => (window.location = `mailto:${contacts[0].email}`)}
              style={{ fontSize: "14px" }}
            >
              {contacts[0].email}
            </button>
          </div>
        )}
      </div>
      <div className="footer-end">
        <h6>© 2023 — Copyright</h6>
        <div className="footer-scroll-container" onClick={handleScrollUp}>
          <img src={ArrowUp} alt="scroll up" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
