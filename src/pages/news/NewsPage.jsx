import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchNews } from "../../services/news";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  fetchNewsStart,
  fetchNewsFailure,
  fetchNewsSuccess,
} from "../../store/slices/newsSlice";

import Pagination from "../../components/pagination/Pagination";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import NewsCard from "../../components/news/NewsCard";

import ArrowRight from "../../assets/images/arrow-right-orange.svg";

import "./NewsPage.css";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.data);
  const menus = useSelector((state) => state.menus.data);
  const [currentPage, setCurrentPage] = useState(1);

  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(i18n.language, pageNumber);
  };

  const fetchData = async (lang, pageNumber) => {
    dispatch(fetchNewsStart());
    try {
      const response = await fetchNews(lang, pageNumber);
      dispatch(fetchNewsSuccess(response.data.news));
    } catch (error) {
      dispatch(fetchNewsFailure(error.message));
    }
  };

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
    <div className="news-page-container">
      <div className="news-page-background-image">
        <h1 className="background-image-text">
          {menuData?.title[i18n.language]}
          <span className="circle" />
          <div className="element-with-border" />
        </h1>
      </div>
      <div className="news-page-middle-container">
        <div className="news-page-middle-content" ref={middleContainerRef}>
          <div style={{ marginLeft: "1rem" }}>{t("news_title")}</div>
        </div>
      </div>
      <div className="news-page-bottom-container" ref={bottomContainerRef}>
        <Breadcrumbs
          data={[
            { title: t("home"), link: "/" },
            { title: menuData?.title[i18n.language], link: "#" },
            { title: submenuData?.title[i18n.language], link: "" },
          ]}
        />
        <BreadcrumbsMobile activeTitle={t("news_title")} data={linksData} />
      </div>
      <div className="news-page-content">
        <div className="news-page-cards-container">
          {news?.data?.map((card, idx) => {
            if (card.visible === "both" || card.visible === i18n.language) {
              return <NewsCard data={card} key={idx} />;
            }
          })}
          <Pagination
            currentPage={news.current_page}
            totalPages={news.last_page}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="news-page-links-container">
          {linksData.map((item, idx) => {
            return (
              <Link
                key={idx}
                to={item.link}
                className={`news-page-link ${
                  item.link === "/news" ? "active" : ""
                }`}
              >
                {item.link === "/news" && (
                  <div className="news-page-link-circle" />
                )}
                {item.title}
                {item.link !== "/news" && (
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
