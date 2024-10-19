import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ArrowRight from "../../../assets/images/announcments-right-arrow.svg";
import ArrowLeft from "../../../assets/images/announcments-left-arrow.svg";

import "./Partners.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktopSm: {
    breakpoint: { max: 1370, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2.5,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobileXs: {
    breakpoint: { max: 464, min: 370 },
    items: 2.5,
    slidesToSlide: 1,
  },
};

const PartnersSlider = ({ stories, lang }) => {
  const carouselRef = useRef(null);
  const { i18n } = useTranslation();
  const isMobile = window.innerWidth < 750;

  const handleLeftButtonClick = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  const handleRightButtonClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <div className="partners-slider-container">
      <Carousel
        ref={carouselRef}
        className="partners-slider"
        responsive={responsive}
        autoPlay={isMobile ? false : true}
        swipeable={isMobile ? false : true}
        draggable={isMobile ? false : true}
        arrows={false}
        infinite={isMobile ? false : true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
        containerClass="custom-carousel-container"
      >
        {stories.map((item, index) => {
          if (item.visible === "both" || item.visible === i18n.language)
            return (
              <div
                className="partners-slider-item"
                key={index}
                onClick={() => window.location.replace(item.page_url)}
              >
                <div className="slider-item-content">
                  <div className="partners-image-container">
                    <img
                      src={import.meta.env.VITE_API_MEDIA_URL + item.logo}
                      alt="poligloti"
                    />
                  </div>
                  <div className="partners-slider-description">
                    <h3>{item.name[lang]}</h3>
                  </div>
                  <img
                    className="country-image"
                    src={import.meta.env.VITE_API_MEDIA_URL + item.country.url}
                    alt="geo"
                  />
                </div>
              </div>
            );
        })}
      </Carousel>
      <button className="partners-left-button" onClick={handleLeftButtonClick}>
        <img src={ArrowLeft} alt="Left Arrow" />
      </button>
      <button
        className="partners-right-button"
        onClick={handleRightButtonClick}
      >
        <img src={ArrowRight} alt="Right Arrow" />
      </button>
    </div>
  );
};
export default PartnersSlider;
