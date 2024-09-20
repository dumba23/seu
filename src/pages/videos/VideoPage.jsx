import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import ArrowRight from "../../assets/images/arrow-right-orange.svg";
import "./VideoPage.css";
import { fetchVideos } from "../../services/gallery";
import VideoModal from "./VideoModal";
import Pagination from "../../components/pagination/Pagination";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";

export default function VideoPage() {
  const { t, i18n } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 9;

  useEffect(() => {
    const callFetchVideos = async () => {
      try {
        const res = await fetchVideos(currentPage, perPage, i18n.language);
        setVideos(res?.data?.data);
        setTotalPages(res?.data?.last_page);
      } catch (err) {
        console.error(err);
      }
    };

    callFetchVideos();
  }, [currentPage, i18n.language]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <div className="about-container">
      <div className="vacancy-page-background-image" />
      <div className="vacancy-page-middle-container">
        <div className="vacancy-page-middle-content">
          <div className="vacancy-page-middle-content-wrapper">
            <div style={{ marginLeft: "1rem" }}>{t("video_gallery")}</div>
          </div>
        </div>
      </div>
      <div className="about-bottom-container">
        <div className="about-empty-div" />
        <div className="vacancy-page-bottom-container">
          <Breadcrumbs
            data={[
              { title: t("home"), link: "/" },
              { title: t("media_and_gallery"), link: "/videos" },
              { title: t("video_gallery"), link: "/videos" },
            ]}
          />
          <BreadcrumbsMobile
            activeTitle={t("video_gallery")}
            data={linksData}
          />
        </div>
        <div className="vacancy-page-content">
          <div className="video-page-container">
            <div className="videos-container">
              {videos?.map((video, idx) => {
                if (
                  video.visible === i18n.language ||
                  video.visible === "both"
                ) {
                  return <VideoModal data={video} key={idx} />;
                }
              })}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="vacancy-page-links-container">
            {linksData.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  to={item.link}
                  className={`vacancy-page-link ${
                    item.link === "/videos" ? "active" : ""
                  }`}
                >
                  {item.link === "/videos" && (
                    <div className="news-page-link-circle" />
                  )}
                  {item.title}
                  {item.link !== "/videos" && (
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
