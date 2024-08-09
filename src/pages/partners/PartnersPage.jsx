import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";
import PartnersCard from "../../components/partners/PartnersCard";

import ArrowRight from "../../assets/images/arrow-right-orange.svg";

import "./PartnersPage.css";

export default function PartnersPage() {
  const { t, i18n } = useTranslation();
  const partnersCardsData = useSelector((state) => state.partners.data);
  const menus = useSelector((state) => state.menus.data);

  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);

  const submenuData = menus.reduce((acc, menu) => {
    if (acc) return acc;
    const foundSubmenu = menu.submenus.find(
      (submenu) => submenu.template.name === "პარტნიორები"
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
          : submenu.template.page_url;
      linksData = [
        ...linksData,
        { title: submenu.title[i18n.language], link: pageLink },
      ];
    });
  }

  useEffect(() => {
    const middleContainerHeight = middleContainerRef?.current?.clientHeight;
    if (middleContainerHeight > 88) {
      bottomContainerRef.current.style.paddingTop = "4rem";
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="partners-page-container">
      <div className="partners-page-background-image" />
      <div className="partners-page-middle-container">
        <div className="partners-page-middle-content" ref={middleContainerRef}>
          <div style={{ marginLeft: "1rem" }}>
            {t("international_partners")}
          </div>
        </div>
      </div>
      <div className="partners-page-bottom-container" ref={bottomContainerRef}>
        <Breadcrumbs
          data={[
            { title: t("home"), link: "/" },
            { title: t("international_partners"), link: "#" },
          ]}
        />
        <BreadcrumbsMobile
          data={linksData}
          activeTitle={t("international_partners")}
        />
      </div>
      <div className="partners-page-content">
        <div className="partners-page-cards-container">
          {partnersCardsData &&
            partnersCardsData.cards &&
            partnersCardsData.cards.map((card, idx) => {
              if (card.visible === "both" || card.visible === i18n.language) {
                return <PartnersCard data={card} key={idx} />;
              }
            })}
        </div>
        <div className="partners-page-links-container">
          {linksData.map((item, idx) => {
            return (
              <Link
                key={idx}
                to={item.link}
                className={`partners-page-link ${
                  item.link === "/partners" ? "active" : ""
                }`}
              >
                {item.link === "/partners" && (
                  <div className="partners-page-link-circle" />
                )}
                {item.title}
                {item.title !== "/partners" && (
                  <img
                    src={ArrowRight}
                    alt="arrow-right"
                    className="partners-page-link-arrow"
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
