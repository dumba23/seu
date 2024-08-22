import React, { useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";

import "./Benefits.css";
import BenefitsSliderItem from "./BenefitsSliderItem";
import { useTranslation } from "react-i18next";

const responsive = {
  desktop1: {
    breakpoint: { max: 3000, min: 1980 },
    items: 7,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktop2: {
    breakpoint: { max: 1980, min: 1780 },
    items: 7,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktop3: {
    breakpoint: { max: 1780, min: 1500 },
    items: 6,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktop4: {
    breakpoint: { max: 1500, min: 1270 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktop5: {
    breakpoint: { max: 1270, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};
// const data = Array.from({ length: 10 }, (_, i) => ({
//   title: "პოლიგლოტი",
//   backgroundImg: i % 2 === 0 ? Lecturer : Lecturer2,
// }));

const BenefitsSlider = () => {
  const { i18n } = useTranslation();
  const stories = useSelector((state) => state.benefits.data.stories) || [];
  const [activeIndex, setActiveIndex] = useState(stories.length);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  const handlePlayerImageClick = (index) => {
    const { currentSlide, slidesToShow } = carouselRef.current.state;
    const targetSlide = index + slidesToShow;

    // if (currentSlide < slidesToShow && currentSlide !== 0) {
    //   carouselRef.current.goToSlide(targetSlide, true);
    //   setActiveIndex(targetSlide);
    // } else {
    //   carouselRef.current.goToSlide(index, true);
    //   setActiveIndex(index);
    // }

    setIsPaused(true);
  };

  const startCarousel = () => {
    setIsPaused(false);
  };

  const handleSlideChange = (_, state) => {
    setActiveIndex(state.currentSlide);
    // setActiveIndex(activeIndex + 1);
    // setIsPaused(true);
  };
  return (
    <div className="benefits-slider-container">
      <Carousel
        ref={carouselRef}
        className="benefits-slider"
        responsive={responsive}
        autoPlay={!isPaused}
        autoPlaySpeed={3000}
        swipeable={true}
        draggable={true}
        arrows={false}
        infinite={true}
        partialVisible={false}
        pauseOnHover={true}
        beforeChange={handleSlideChange}
        dotListClass="custom-dot-list-style"
      >
        {stories &&
          stories?.map((item, index) => {
            if (item.visible === "both" || item.visible === i18n.language)
              return (
                <BenefitsSliderItem
                  key={index}
                  item={item}
                  index={index}
                  handleClick={() => handlePlayerImageClick(index)}
                  startCarousel={startCarousel}
                  isActive={
                    index === activeIndex ||
                    index ===
                      activeIndex - carouselRef?.current?.state?.slidesToShow
                  }
                />
              );
          })}
      </Carousel>
    </div>
  );
};
export default BenefitsSlider;
