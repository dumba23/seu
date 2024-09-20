import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPhotos } from "../../services/gallery";
import VideoModal from "../videos/VideoModal";
import Pagination from "../../components/pagination/Pagination";

import { useTranslation } from "react-i18next";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import ArrowRight from "../../assets/images/arrow-right-orange.svg";
import "./PhotoPage.css";
import PhotoBox from "./PhotoBox";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";

export default function PhotoPage() {
  const { t, i18n } = useTranslation();
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 9;

  useEffect(() => {
    const callFetchVideos = async () => {
      try {
        const res = await fetchPhotos(currentPage, perPage, i18n.language);
        setPhotos(res.data.data);
        setTotalPages(res.data.last_page);
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
            <div style={{ marginLeft: "1rem" }}>{t("photo_gallery")}</div>
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
              { title: t("photo_gallery"), link: "/photos" },
            ]}
          />
          <BreadcrumbsMobile
            activeTitle={t("photo_gallery")}
            data={linksData}
          />
        </div>
        <div className="vacancy-page-content">
          <div className="video-page-container">
            <div className="videos-container">
              {photos?.map((photo, idx) => {
                if (
                  photo.visible === i18n.language ||
                  photo.visible === "both"
                ) {
                  return <PhotoBox data={photo} key={idx} />;
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
                    item.link === "/photos" ? "active" : ""
                  }`}
                >
                  {item.link === "/photos" && (
                    <div className="news-page-link-circle" />
                  )}
                  {item.title}
                  {item.link !== "/photos" && (
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
