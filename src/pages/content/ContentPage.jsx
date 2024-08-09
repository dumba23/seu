import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import QuotationMarkIcon from "../../assets/images/quotation-marks.svg";
import SeuImage from "../../assets/images/seu.png";
import ArrowRight from "../../assets/images/arrow-right-orange.svg";

import "./ContentPage.css";
import FaqBox from "./FaqBox";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";

export default function ContentPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const menus = useSelector((state) => state.menus.data);
  const submenuData = menus.reduce((acc, menu) => {
    if (acc) return acc;
    const foundSubmenu = menu.submenus.find((submenu) =>
      submenu.contents.some((content) => content.id === Number(id))
    );
    return foundSubmenu || acc;
  }, null);

  if (!submenuData) {
    return <div className="vacancy-page-background-image"></div>;
  }

  const menuData = menus.find((menu) => menu.id === submenuData?.menu_id);

  const contentData = submenuData.contents.find(
    (content) => content.id === Number(id)
  );

  if (contentData.visible !== "both" && contentData.visible !== i18n.language) {
    navigate("/");
    return null;
  }

  const { contents } = submenuData;

  let linksData = [];

  if (Object.keys(contentData).length !== 0) {
    linksData = [
      ...linksData,
      { title: contentData.title[i18n.language], link: contentData.page_url },
    ];
    if (submenuData?.contents.length > 0) {
      linksData = [];
      submenuData?.contents.forEach((child) => {
        if (child.visible === "both" || child.visible == i18n.language) {
          linksData = [
            ...linksData,
            { title: child.title[i18n.language], link: child.page_url },
          ];
        }
      });
    }
  }

  if (
    contentData.type !== "type4" &&
    contentData.type !== "type5" &&
    contentData.type !== "type6" &&
    contentData.type !== "type8"
  ) {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        {contentData.type === "type1" && (
          <div className="rector-wrapper">
            <div className="rector-container">
              <img src={SeuImage} alt="seu" className="seu-background-image" />
              <div>
                <h3>{contentData.title[i18n.language]}</h3>
                <div className="rector-paragraph">
                  <img src={QuotationMarkIcon} alt="quotation-mark" />
                  <div style={{ marginLeft: "10px" }}>
                    {contentData.description[i18n.language]}
                    <div className="paragraph-underline" />
                  </div>
                </div>
              </div>

              <img
                src={import.meta.env.VITE_API_MEDIA_URL + contentData.image}
                alt="seu-rector"
                className="seu-rector"
                style={{
                  maxWidth: "556px",
                  maxHeight: "337px",
                  borderRadius: "1rem",
                }}
              />
            </div>
          </div>
        )}
        {contentData.type === "type2" && (
          <div className="rector-wrapper">
            <div className="rector-container type2">
              <div
                style={{
                  marginLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{contentData.title[i18n.language]}</h3>
              </div>
            </div>
          </div>
        )}
        <div className={`about-bottom-container ${contentData.type}`}>
          <div className={`about-empty-div ${contentData.type}`} />
          <div className="content-page-bottom-container">
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                { title: menuData.title[i18n.language], link: "#" },
                { title: submenuData.title[i18n.language], link: "" },
                { title: contentData.title[i18n.language], link: "" },
              ]}
            />
            <BreadcrumbsMobile
              data={linksData}
              activeTitle={contentData.title[i18n.language]}
            />
          </div>
          {contentData.type === "type1" && (
            <div className="seu-rector-image-mobile">
              <img
                src={import.meta.env.VITE_API_MEDIA_URL + contentData.image}
                alt="seu-rector"
                className="seu-rector-mobile"
              />
            </div>
          )}
          <div className="vacancy-page-content">
            <div className="about-html-container">
              <div
                className="about-html"
                dangerouslySetInnerHTML={{
                  __html: contentData.html[i18n.language],
                }}
              />
            </div>
            <div className="vacancy-page-links-container">
              {contents.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.page_url}
                    className={`announcment-details-link ${
                      item.id === contentData.id ? "active" : ""
                    }`}
                  >
                    {item.id === contentData.id && (
                      <div className="announcment-details-link-circle" />
                    )}
                    {item.title[i18n.language]}
                    {item.id !== contentData.id && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="announcment-details-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (contentData.type === "type4") {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        <div className="rector-wrapper">
          <div className="rector-container type2">
            <div
              style={{
                marginLeft: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3>{contentData.title[i18n.language]}</h3>
            </div>
          </div>
        </div>
        <div className={`about-bottom-container ${contentData.type}`}>
          <div className={`about-empty-div ${contentData.type}`} />
          <div className="content-page-bottom-container">
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                { title: contentData.title[i18n.language], link: "#" },
              ]}
            />
            <BreadcrumbsMobile
              activeTitle={contentData.title[i18n.language]}
              data={linksData}
            />
          </div>
          <div className="vacancy-page-content">
            <div className="about-type4-html-container">
              {contentData.international_types.map((item, idx) => {
                if (item.title[i18n.language]) {
                  return (
                    <div className="type4-box" key={idx}>
                      <img
                        className="type4-img"
                        alt="logo"
                        src={import.meta.env.VITE_API_MEDIA_URL + item.image}
                      />
                      <h3> {item.title[i18n.language]}</h3>
                    </div>
                  );
                }
              })}
            </div>
            <div className="vacancy-page-links-container">
              {linksData.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`vacancy-page-link ${
                      item.link === contentData.page_url ? "active" : ""
                    }`}
                  >
                    {item.link === contentData.page_url && (
                      <div className="news-page-link-circle" />
                    )}
                    {item.title}
                    {item.link !== contentData.page_url && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (contentData.type === "type5") {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        {contentData.type === "type5" && (
          <div className="rector-wrapper">
            <div className="rector-container type2">
              <div
                style={{
                  marginLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{contentData.title[i18n.language]}</h3>
              </div>
            </div>
          </div>
        )}
        <div className={`about-bottom-container ${contentData.type}`}>
          <div className={`about-empty-div ${contentData.type}`} />
          <div className="content-page-bottom-container">
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                { title: contentData.title[i18n.language], link: "#" },
              ]}
            />
            <BreadcrumbsMobile
              activeTitle={contentData.title[i18n.language]}
              data={linksData}
            />
          </div>
          <div className="vacancy-page-content">
            <div className="about-type5-html-container">
              {contentData.lecturer_types.map((item, idx) => {
                if (item.title[i18n.language]) {
                  return (
                    <div className="type5-box" key={idx}>
                      <div
                        className="type5-img"
                        style={{
                          backgroundImage: `url(${
                            import.meta.env.VITE_API_MEDIA_URL + item.image
                          })`,
                        }}
                      />
                      <div className="type5-bottom">
                        <h3>{item.title[i18n.language]}</h3>
                        <p>{item.description[i18n.language]}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="vacancy-page-links-container">
              {linksData.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`vacancy-page-link ${
                      item.link === contentData.page_url ? "active" : ""
                    }`}
                  >
                    {item.link === contentData.page_url && (
                      <div className="news-page-link-circle" />
                    )}
                    {item.title}
                    {item.link !== contentData.page_url && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (
    Object.keys(contentData).length !== 0 &&
    contentData.type === "type6"
  ) {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        {contentData.type === "type6" && (
          <div className="rector-wrapper">
            <div className="rector-container type2">
              <div
                style={{
                  marginLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{contentData.title[i18n.language]}</h3>
              </div>
            </div>
          </div>
        )}
        <div className={`about-bottom-container ${contentData.type}`}>
          <div className={`about-empty-div ${contentData.type}`} />
          <div className="content-page-bottom-container">
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                { title: contentData.title[i18n.language], link: "#" },
              ]}
            />
            <BreadcrumbsMobile
              activeTitle={contentData.title[i18n.language]}
              data={linksData}
            />
          </div>
          <div className="vacancy-page-content">
            <div className="about-type6-html-container">
              {contentData.personals.map((item, idx) => {
                if (item.title[i18n.language]) {
                  return (
                    <div
                      className="type5-box type6-box"
                      style={{ cursor: "pointer" }}
                      key={idx}
                      onClick={() => navigate("/personals/" + item.id)}
                    >
                      <div
                        className="type5-img type6-img"
                        style={{
                          backgroundImage: `url(${
                            import.meta.env.VITE_API_MEDIA_URL + item.image
                          })`,
                        }}
                      />
                      <div className="type5-bottom type6-bottom">
                        <div>
                          <h3>{item.title[i18n.language]}</h3>
                          <h4>{item.position[i18n.language]}</h4>
                        </div>
                        <p>{item.description[i18n.language]}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="vacancy-page-links-container">
              {linksData.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`vacancy-page-link ${
                      item.link === contentData.page_url ? "active" : ""
                    }`}
                  >
                    {item.link === contentData.page_url && (
                      <div className="news-page-link-circle" />
                    )}
                    {item.title}
                    {item.link !== contentData.page_url && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (
    Object.keys(contentData).length !== 0 &&
    contentData.type === "type8"
  ) {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        {contentData.type === "type8" && (
          <div className="rector-wrapper">
            <div className="rector-container type2">
              <div
                style={{
                  marginLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{contentData.title[i18n.language]}</h3>
              </div>
            </div>
          </div>
        )}
        <div className={`about-bottom-container ${contentData.type}`}>
          <div className={`about-empty-div ${contentData.type}`} />
          <div className="content-page-bottom-container">
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                { title: contentData.title[i18n.language], link: "#" },
              ]}
            />
            <BreadcrumbsMobile
              activeTitle={contentData.title[i18n.language]}
              data={linksData}
            />
          </div>
          <div className="vacancy-page-content">
            <div className="about-type8-html-container">
              {contentData.faq_types.map((item, idx) => {
                if (item.title[i18n.language]) {
                  return <FaqBox item={item} key={idx} />;
                }
              })}
            </div>
            <div className="vacancy-page-links-container">
              {linksData.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`vacancy-page-link ${
                      item.link === contentData.page_url ? "active" : ""
                    }`}
                  >
                    {item.link === contentData.page_url && (
                      <div className="news-page-link-circle" />
                    )}
                    {item.title}
                    {item.link !== contentData.page_url && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
