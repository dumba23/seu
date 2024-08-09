import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPhoto } from "../../services/gallery";
import { useTranslation } from "react-i18next";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import PhotoModal from "./PhotoModal";
import ArrowRight from "../../assets/images/arrow-right-orange.svg";
import "./PhotoPage.css";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";

export default function PhotoDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [photo, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    const callFetchVideos = async () => {
      try {
        const res = await fetchPhoto(id);
        setPhotos(res.data.find((item) => item.id == id));
      } catch (err) {
        console.error(err);
      }
    };

    callFetchVideos();
  }, [id]);

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

  const handleOpenModal = (index) => {
    setInitialIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (photo.id)
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        <div className="vacancy-page-middle-container">
          <div className="vacancy-page-middle-content">
            <div className="vacancy-page-middle-content-wrapper">
              <div style={{ marginLeft: "1rem" }}>
                {photo?.description[i18n.language]}
              </div>
            </div>
          </div>
        </div>
        <div className={`about-bottom-container `}>
          <div className={`about-empty-div`} />
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
                {photo?.photos?.map((photo, idx) => {
                  return (
                    <div
                      style={{
                        backgroundImage: `url(${
                          import.meta.env.VITE_API_MEDIA_URL + photo.image
                        })`,
                      }}
                      key={idx}
                      alt="photo"
                      className="photo-box"
                      onClick={() => handleOpenModal(idx)}
                    />
                  );
                })}
              </div>
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
        <PhotoModal
          photos={photo?.photos || []}
          isOpen={isModalOpen}
          initialIndex={initialIndex}
          onClose={handleCloseModal}
        />
      </div>
    );
}
