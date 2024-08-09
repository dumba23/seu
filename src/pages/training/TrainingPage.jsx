import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import ArrowRight from "../../assets/images/arrow-right-orange.svg";

import "./TrainingPage.css";
import { fetchTraininigs } from "../../services/training";
import TrainingCard from "./TrainingCard";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";

export default function TrainingPage() {
  const { t, i18n } = useTranslation();

  const menus = useSelector((state) => state.menus.data);
  const [data, setData] = useState([]);

  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);

  const submenuData = menus.reduce((acc, menu) => {
    if (acc) return acc;
    const foundSubmenu = menu.submenus.find(
      (submenu) => submenu.template.name === "ტრენინგები"
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
    window.scrollTo({ top: 0, behavior: "smooth" });

    const callFetchTrainings = async () => {
      try {
        const res = await fetchTraininigs();
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    callFetchTrainings();
  }, []);

  useEffect(() => {
    const middleContainerHeight = middleContainerRef?.current?.clientHeight;
    if (middleContainerHeight > 88) {
      bottomContainerRef.current.style.paddingTop = "4rem";
    }
  }, []);

  return (
    <div className="vacancy-page-container">
      <div className="vacancy-page-background-image" />
      <div className="vacancy-page-middle-container">
        <div className="vacancy-page-middle-content" ref={middleContainerRef}>
          <div style={{ marginLeft: "1rem" }}>{t("trainings")}</div>
        </div>
      </div>
      <div className="vacancy-page-bottom-container" ref={bottomContainerRef}>
        <Breadcrumbs
          data={[
            { title: t("home"), link: "/" },
            { title: t("trainings"), link: "/trainings" },
          ]}
        />
        <BreadcrumbsMobile
          activeTitle={t("training_center")}
          data={linksData}
        />
      </div>
      <div className="vacancy-page-content">
        <div className="training-page-cards-container">
          {data?.map((card, idx) => {
            if (card.visible === "both" || card.visible === i18n.language) {
              return <TrainingCard data={card} key={idx} />;
            }
          })}
        </div>
        <div className="training-page-links-container">
          {linksData.map((item, idx) => {
            return (
              <Link
                key={idx}
                to={item.link}
                className={`vacancy-page-link ${
                  item.link === "/trainings" ? "active" : ""
                }`}
              >
                {item.link === "/trainings" && (
                  <div className="news-page-link-circle" />
                )}
                {item.title}
                {item.link !== "/trainings" && (
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
