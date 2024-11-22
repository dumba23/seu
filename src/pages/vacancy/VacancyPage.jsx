import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";
import ArrowRight from "../../assets/images/arrow-right-orange.svg";

import CategoryCard from "../../components/vacancies/CategoryCard";

import "./VacancyPage.css";

export default function VacancyPage() {
  const { t, i18n } = useTranslation();

  const menus = useSelector((state) => state.menus.data);
  const vacancies = useSelector((state) => state.vacancies.data);

  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);

  const submenuData = menus.reduce((acc, menu) => {
    if (acc) return acc;
    const foundSubmenu = menu.submenus.find(
      (submenu) => submenu.template.name === "ვაკანსიები"
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
  }, []);

  return (
    <div className="vacancy-page-container">
      <div className="vacancy-page-background-image">
        <h1 className="background-image-text">
          {menuData?.title[i18n.language]}
          <span className="circle" />
          <div className="element-with-border" />
        </h1>
      </div>
      <div className="vacancy-page-middle-container">
        <div className="vacancy-page-middle-content" ref={middleContainerRef}>
          <div style={{ marginLeft: "1rem" }}>{t("vacancies")}</div>
        </div>
      </div>
      <div className="vacancy-page-bottom-container" ref={bottomContainerRef}>
        <Breadcrumbs
          data={[
            { title: t("home"), link: "/" },
            { title: menuData?.title[i18n.language], link: "#" },
            { title: submenuData?.title[i18n.language], link: "" },
          ]}
        />
        <BreadcrumbsMobile activeTitle={t("vacancies")} data={linksData} />
      </div>
      <div className="vacancy-page-content">
        <div className="vacancy-page-cards-container">
          {vacancies.map((card, idx) => {
            if (card.visible === "both" || card.visible === i18n.language) {
              return <CategoryCard data={card} key={idx} />;
            }
          })}
        </div>
        <div className="vacancy-page-links-container">
          {linksData.map((item, idx) => {
            return (
              <Link
                key={idx}
                to={item.link + `?lang=${i18n.language}`}
                className={`vacancy-page-link ${
                  item.link === "/vacancies" ? "active" : ""
                }`}
              >
                {item.link === "/vacancies" && (
                  <div className="news-page-link-circle" />
                )}
                {item.title}
                {item.link !== "/vacancies" && (
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
  );
}
