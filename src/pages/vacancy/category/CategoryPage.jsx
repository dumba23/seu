import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchVacancyCategory } from "../../../services/vacancy";

import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import CategoryCard from "../../../components/category/CategoryCard";

import ArrowRight from "../../../assets/images/arrow-right-orange.svg";

import "./CategoryPage.css";
import BreadcrumbsMobile from "../../../components/breadcrumbs/BreadcrumbsMobile";

export default function CategoryPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [vacancy, setVacancy] = useState([]);
  const menus = useSelector((state) => state.menus.data);
  const vacancies = useSelector((state) => state.vacancies.data) || [];

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

  let linksData = [
    {
      title: "ვაკანსიები",
      link: "/vacancies",
    },
  ];

  if (vacancies.length > 0) {
    vacancies.forEach((vac) => {
      linksData = [
        ...linksData,
        { title: vac.title[i18n.language], link: "/vacancies/" + vac.id },
      ];
    });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const callFetchVacanies = async () => {
      try {
        const res = await fetchVacancyCategory(id);

        setVacancy(res.data.vacancy);
      } catch (err) {
        console.error(err);
      }
    };

    callFetchVacanies();
  }, [id]);

  useEffect(() => {
    const middleContainerHeight = middleContainerRef?.current?.clientHeight;
    if (middleContainerHeight > 88) {
      bottomContainerRef.current.style.paddingTop = "4rem";
    }
  }, []);

  if (Object.keys(vacancy).length > 0)
    return (
      <div className="category-page-container">
        <div className="category-page-background-image" />
        <div className="category-page-middle-container">
          <div
            className="category-page-middle-content"
            ref={middleContainerRef}
          >
            <div style={{ marginLeft: "1rem" }}>ვაკანსიები</div>
          </div>
        </div>
        <div
          className="category-page-bottom-container"
          ref={bottomContainerRef}
        >
          <Breadcrumbs
            data={[
              { title: t("home"), link: "/" },
              { title: t("vacancies"), link: "/vacancies" },
              {
                title: vacancy.title[i18n.language],
                link: "/vacancies/" + vacancy.id,
              },
            ]}
          />
          <BreadcrumbsMobile activeTitle={t("vacancies")} data={linksData} />
        </div>
        <div className="category-page-content">
          <div className="category-page-cards-container">
            {vacancy.vacancies &&
              vacancy.vacancies.map((card, idx) => {
                if (card.visible === "both" || card.visible === i18n.language) {
                  return <CategoryCard data={card} key={idx} />;
                }
              })}
          </div>
          <div className="category-page-links-container">
            {linksData.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  to={item.link}
                  className={`category-page-link ${
                    item.link == "/vacancies/" + vacancy.id ? "active" : ""
                  }`}
                >
                  {item.link == "/vacancies/" + vacancy.id && (
                    <div className="news-page-link-circle" />
                  )}
                  {item.title}
                  {item.link == "/vacancies/" + vacancy.id && (
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
