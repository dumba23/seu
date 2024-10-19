import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/dateUtils";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import ArrowRight from "../../assets/images/arrow-right-orange.svg";

import "./NewsDetails.css";
import BreadcrumbsMobile from "../breadcrumbs/BreadcrumbsMobile";

export default function NewsDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const news = useSelector((state) => state.news.data);
  const newData = news?.data?.filter((item) => item.id == id) || [];

  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);

  const menus = useSelector((state) => state.menus.data);

  const submenuData = menus.reduce((acc, menu) => {
    if (acc) return acc;
    const foundSubmenu = menu.submenus.find(
      (submenu) => submenu.template.name === "სიახლეები"
    );
    return foundSubmenu || acc;
  }, null);

  const menuData = menus.find(
    (menu) => menu.id === Number(submenuData?.menu_id)
  );

  let linksData = [];

  if (menuData) {
    menuData.submenus.forEach((submenu) => {
      let pageLink =
        submenu.contents.length > 0
          ? submenu.contents[0].page_url
          : submenu.page_url
          ? submenu.page_url
          : submenu.template.page_url;
      linksData = [
        ...linksData,
        { title: submenu.title[i18n.language], link: pageLink },
      ];
    });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const middleContainerHeight = middleContainerRef?.current?.clientHeight;
    if (middleContainerHeight > 88) {
      bottomContainerRef.current.style.paddingTop = "4rem";
    }
  }, [newData]);

  if (newData.length !== 0) {
    const formattedDate = formatDate(newData[0].date, i18n);

    return (
      <div className="news-details-container">
        <div className="news-details-background-image">
          <h1 className="background-image-text">
            {t("news_title")}
            <span className="circle" />
            <div className="element-with-border" />
          </h1>
        </div>
        <div className="news-details-middle-container">
          <div className="news-details-middle-content" ref={middleContainerRef}>
            <div className="news-details-middle-content-wrapper">
              <h3>{newData[0].title[i18n.language]}</h3>
              <h6>
                {formattedDate.day +
                  " " +
                  formattedDate.month +
                  ", " +
                  formattedDate.year}
              </h6>
            </div>
          </div>
        </div>
        <div className="news-details-bottom-container" ref={bottomContainerRef}>
          <Breadcrumbs
            data={[
              { title: t("home"), link: "/" },
              { title: menuData?.title[i18n.language], link: "#" },
              { title: t("news_title"), link: "/news" },
              {
                title: newData[0]?.title[i18n.language],
                link: "#",
              },
            ]}
          />
          <BreadcrumbsMobile activeTitle={t("news_title")} data={linksData} />
        </div>
        <div className="news-details-content">
          <div className="news-details-cards-container">
            <div
              className="news-details-paragraph"
              dangerouslySetInnerHTML={{
                __html: newData[0].content[i18n.language],
              }}
            />
          </div>
          <div className="news-details-links-container">
            {linksData.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  to={item.link}
                  className={`news-details-link ${
                    item.link.includes("news") ? "active" : ""
                  }`}
                >
                  {item.link.includes("news") && (
                    <div className="news-details-link-circle" />
                  )}
                  {item.title}
                  {!item.link.includes("news") && (
                    <img
                      src={ArrowRight}
                      alt="arrow-right"
                      className="news-details-link-arrow"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
