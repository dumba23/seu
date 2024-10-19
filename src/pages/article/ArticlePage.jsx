import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchArticles } from "../../services/gallery";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import ArrowRight from "../../assets/images/arrow-right-orange.svg";
import ArticleCard from "./ArticleCard";

import "./ArticlePage.css";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";

export default function ArticlePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  let linksData = [
    {
      link: "/videos",
      title: t("video_gallery"),
    },
    {
      link: "/photos",
      title: t("photo_gallery"),
    },
    {
      link: "/articles",
      title: t("article_title"),
    },
  ];

  useEffect(() => {
    const callFetchArticles = async () => {
      try {
        const res = await fetchArticles();
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    callFetchArticles();
  }, []);

  return (
    <div className="about-container">
      <div className="vacancy-page-background-image">
        <h1 className="background-image-text">{t("media")}</h1>
        <span className="circle" />
        <div className="element-with-border" />
      </div>
      <div className="vacancy-page-middle-container">
        <div className="vacancy-page-middle-content">
          <div className="vacancy-page-middle-content-wrapper">
            <div style={{ marginLeft: "1rem" }}>{t("article_title")}</div>
          </div>
        </div>
      </div>
      <div className="about-bottom-container">
        <div className="about-empty-div" />
        <div className="vacancy-page-bottom-container">
          <Breadcrumbs
            data={[
              { title: t("home"), link: "/" },
              { title: t("media"), link: "/videos" },
              { title: t("articles"), link: "/articles" },
            ]}
          />
          <BreadcrumbsMobile activeTitle={t("articles")} data={linksData} />
        </div>
        <div className="vacancy-page-content">
          <div className="article-page-cards-container">
            {articles?.map((card, idx) => {
              if (card.visible === "both" || card.visible === i18n.language) {
                return <ArticleCard data={card} key={idx} />;
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
                    item.link === "/articles" ? "active" : ""
                  }`}
                >
                  {item.link === "/articles" && (
                    <div className="news-page-link-circle" />
                  )}
                  {item.title}
                  {item.link !== "/articles" && (
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
