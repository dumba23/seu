import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/dateUtils";

import ArrowRight from "../../../assets/images/announcments-right-arrow.svg";
import ArrowLeft from "../../../assets/images/announcments-left-arrow.svg";

import "./News.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

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
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobileXs: {
    breakpoint: { max: 464, min: 370 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const NewsSlider = () => {
  const { t, i18n } = useTranslation();
  const news = useSelector((state) => state.news.data);

  const navigate = useNavigate();

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
        swipeable={true}
        draggable={true}
        arrows={true}
        infinite={true}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        slidesToSlide={1}
        partialVisible={false}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        dotListClass="custom-dot-list-style"
      >
        {news.map((item, index) => {
          const formattedDate = formatDate(item.date, i18n);
          return (
            <div
              className="news-slider-item"
              key={index}
              onClick={() => navigate(`/news/details/${item.id}`)}
            >
              <div className="news-slider-item-top-content">
                <div className="news-slider-overlay">
                  {formattedDate.day + " " + formattedDate.month}{" "}
                </div>
                <div className="news-slider-image-container">
                  <img
                    src={import.meta.env.VITE_API_MEDIA_URL + item.image}
                    alt="image"
                    className="news-slider-image"
                  />
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
        })}
      </Carousel>
    </div>
  );
};
export default NewsSlider;