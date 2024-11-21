import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/dateUtils";
import useFetchNews from "../../../hooks/useFetchNews";

import ArrowRight from "../../../assets/images/announcments-right-arrow.svg";
import ArrowLeft from "../../../assets/images/announcments-left-arrow.svg";

import "./News.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const responsive = {
  desktop1: {
    breakpoint: { max: 3000, min: 2300 },
    items: 8,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktop3: {
    breakpoint: { max: 2300, min: 1980 },
    items: 7,
    slidesToSlide: 1,
  },
  desktop2: {
    breakpoint: { max: 1980, min: 1650 },
    items: 6,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 1650, min: 1360 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1360, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2.5,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobileXs: {
    breakpoint: { max: 464, min: 0 },
    items: 2.5,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const NewsSlider = () => {
  const { t, i18n } = useTranslation();
  const news = useSelector((state) => state.news.data);
  const isMobile = window.innerWidth < 750;
  const navigate = useNavigate();

  useFetchNews();

  const CustomLeftArrow = ({ onClick }) => (
    <button onClick={onClick} className="news-button news-left-button">
      <img src={ArrowLeft} alt="Left Arrow" />
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button onClick={onClick} className="news-button news-right-button">
      <img src={ArrowRight} alt="Left Arrow" />
    </button>
  );

  return (
    <div className="news-slider-container">
      <Carousel
        className="news-slider"
        responsive={responsive}
        autoPlay={false}
        swipeable={isMobile ? false : true}
        draggable={isMobile ? false : true}
        arrows={true}
        infinite={isMobile ? false : true}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        slidesToSlide={1}
        partialVisible={false}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        dotListClass="custom-dot-list-style"
      >
        {news.data?.map((item, index) => {
          const formattedDate = formatDate(item.date, i18n);
          const backgroundImage =
            item.image_en !== null
              ? i18n.language === "en"
                ? import.meta.env.VITE_API_MEDIA_URL + item.image_en
                : import.meta.env.VITE_API_MEDIA_URL + item.image
              : import.meta.env.VITE_API_MEDIA_URL + item.image;

          if (item.visible === "both" || item.visible === i18n.language) {
            return (
              <div
                className="news-slider-item"
                key={index}
                onClick={() =>
                  navigate(
                    `/news/details/${item.id}` + `?lang=${i18n.language}`
                  )
                }
              >
                <div className="news-slider-item-top-content">
                  <div className="news-slider-overlay">
                    {formattedDate.day + " " + formattedDate.month}{" "}
                  </div>
                  <div className="news-slider-image-container">
                    <div
                      className="news-slider-image"
                      style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    {/* <img
                      src={
                        item.image_en !== null
                          ? i18n.language === "en"
                            ? import.meta.env.VITE_API_MEDIA_URL + item.image_en
                            : import.meta.env.VITE_API_MEDIA_URL + item.image
                          : import.meta.env.VITE_API_MEDIA_URL + item.image
                      }
                      alt="image"
                      className="news-slider-image"
                    /> */}
                  </div>
                  <div className="news-slider-description">
                    <h3>{item.title[i18n.language]}</h3>
                    <p>{item.description[i18n.language]}</p>
                  </div>
                </div>
                <div className="news-slider-read-more">
                  <div>{t("read_more")}</div>
                </div>
              </div>
            );
          }
        })}
      </Carousel>
    </div>
  );
};
export default NewsSlider;
