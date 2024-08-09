import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../../utils/dateUtils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ArrowRight from "../../../assets/images/announcments-right-arrow.svg";
import ArrowLeft from "../../../assets/images/announcments-left-arrow.svg";

import "./Announcments.css";

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
    breakpoint: { max: 464, min: 375 },
    items: 3,
    slidesToSlide: 1,
  },
};

const AnnouncmentSlider = () => {
  const { t, i18n } = useTranslation();
  const announcements = useSelector((state) => state.announcements.data);

  const CustomLeftArrow = ({ onClick }) => (
    <button
      className="announcments-button announcments-left-button"
      onClick={onClick}
    >
      <img src={ArrowLeft} alt="Left Arrow" />
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="announcments-button announcments-right-button"
    >
      <img src={ArrowRight} alt="Right Arrow" />
    </button>
  );

  const navigate = useNavigate();

  return (
    <div className="announcments-slider-container">
      <Carousel
        className="announcments-slider"
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={true}
        arrows={true}
        infinite={true}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        partialVisible={true}
        dotListClass="custom-dot-list-style"
      >
        {announcements.map((item, index) => {
          const formattedDate = formatDate(item.date, i18n);

          return (
            <div
              className="announcments-slider-item"
              key={index}
              onClick={() => navigate(`/announcments/details/${item.id}`)}
            >
              <div className="slider-item-top-content">
                <div className="announcments-slider-overlay">{item.time}</div>
                <div>
                  <div>
                    <span className="announcments-day">
                      {formattedDate.day}
                    </span>
                    <span className="announcments-year">
                      {formattedDate.year}
                    </span>
                  </div>
                  <div className="announcments-month">
                    {formattedDate.month}
                  </div>
                </div>
                <div className="announcments-slider-description">
                  <h3>{item.title[i18n.language]}</h3>
                  <p>{item.description[i18n.language]}</p>
                </div>
              </div>
              <div className="announcments-slider-read-more">
                <div>{t("read_more")}</div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default AnnouncmentSlider;
