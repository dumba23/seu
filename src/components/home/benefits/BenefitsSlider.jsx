import React, { useState, useRef, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./Benefits.css";
import BenefitsSliderItem from "./BenefitsSliderItem";

const responsive = {
  desktop1: { breakpoint: { max: 3000, min: 1980 }, items: 7 },
  desktop2: { breakpoint: { max: 1980, min: 1780 }, items: 7 },
  desktop3: { breakpoint: { max: 1780, min: 1500 }, items: 6 },
  desktop4: { breakpoint: { max: 1500, min: 1270 }, items: 5 },
  desktop5: { breakpoint: { max: 1270, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 767, min: 0 }, items: 2.5 },
};

const BenefitsSlider = () => {
  const { i18n } = useTranslation();
  const stories = useSelector((state) => state.benefits.data.stories) || [];
  const [activeIndex, setActiveIndex] = useState(stories.length);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const isMobile = window.innerWidth < 750;

  const handlePlayerImageClick = (index) => {
    setIsPaused(true);
  };

  const startCarousel = () => {
    setIsPaused(false);
  };

  const handleSlideChange = (_, state) => {
    setActiveIndex(state.currentSlide);
  };

  return (
    <div className="benefits-slider-container">
      <Carousel
        ref={carouselRef}
        className="benefits-slider"
        responsive={responsive}
        swipeable={isMobile ? false : true}
        draggable={isMobile ? false : true}
        arrows={false}
        infinite={isMobile ? false : true}
        partialVisible={true}
        pauseOnHover={false}
        beforeChange={handleSlideChange}
        dotListClass="custom-dot-list-style"
      >
        {stories?.map((item, index) => {
          if (item.visible === "both" || item.visible === i18n.language)
            return (
              <BenefitsSliderItem
                key={index}
                item={item}
                handleClick={() => handlePlayerImageClick(index)}
                startCarousel={startCarousel}
              />
            );
        })}
      </Carousel>
    </div>
  );
};

export default BenefitsSlider;
