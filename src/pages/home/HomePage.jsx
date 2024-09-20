import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchLockScreen } from "../../services/home";

import Benefits from "../../components/home/benefits/Benefits";
import Partners from "../../components/home/partners/Partners";
import Enrollments from "../../components/home/enrollments/Enrollments";
import Announcments from "../../components/home/announcments/Announcments";
import News from "../../components/home/news/News";

import ScrollImg from "../../assets/images/scroll.svg";
import ScrollDownImg from "../../assets/images/scroll-down.svg";
import "./HomePage.css";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const links = useSelector((state) => state.links.data.links) || [];

  useEffect(() => {
    const callFetchLockScreen = async () => {
      try {
        const res = await fetchLockScreen();
        setVideo(res.data.video);
        setTitle(...res.data.title);
      } catch (err) {
        console.error(err);
      }
    };

    callFetchLockScreen();
  }, []);

  const scrollToBenefits = () => {
    const benefitsComponent = document.getElementById("benefits");
    benefitsComponent.scrollIntoView({ behavior: "smooth" });
  };

  const isVideo = (url) => {
    const videoExtensions = ["mp4", "webm", "ogg"];
    const extension = url.split(".").pop().toLowerCase();
    return videoExtensions.includes(extension);
  };

  return (
    <div>
      <div className="video-background" id="video-background">
        {
          video !== null &&
            (isVideo(video.url) ? (
              <video autoPlay loop muted playsInline>
                <source
                  src={`${import.meta.env.VITE_API_MEDIA_URL}${video.url}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={`${import.meta.env.VITE_API_MEDIA_URL}${video.url}`}
                alt="Media content"
                className="video-image"
              />
            ))
          // <video autoPlay loop muted playsInline>
          //   <source
          //     src={import.meta.env.VITE_API_MEDIA_URL + video?.url}
          //     type="video/mp4"
          //   />
          //   Your browser does not support the video tag.
          // </video>
        }
        {links.length > 0 && (
          <div className="home-submenu-container">
            <div className="home-submenu">
              {links.map((link, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <Link
                      to={
                        i18n.language === "ka" && link.page_url !== null
                          ? link.page_url
                          : link.page_url_en !== null
                          ? link.page_url_en
                          : ""
                      }
                      className="submenu-item"
                      key={idx}
                    >
                      {link.title[i18n.language]}
                    </Link>
                    {idx !== links.length - 1 && (
                      <div className="submenu-border" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
        {title?.title && (
          <div
            className="main-title"
            dangerouslySetInnerHTML={{ __html: title?.title[i18n.language] }}
          />
        )}
        <div className="overlay" />
        <button className="explore-button" onClick={scrollToBenefits}>
          <img src={ScrollImg} />
          <p>{t("explore_more")}</p>
          <img src={ScrollDownImg} />
        </button>
      </div>
      <Benefits />
      <Partners />
      <Enrollments />
      <Announcments />
      <News />
    </div>
  );
}
