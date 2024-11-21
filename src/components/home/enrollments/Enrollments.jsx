import React, { useState, useEffect, useRef } from "react";

import Image from "../../../assets/images/enroll.png";
import QuotationMarksImage from "../../../assets/images/enrollments-quotation-marks.svg";
import ScrollDown from "../../../assets/images/enrollments-scroll-down.svg";
import ArrowRight from "../../../assets/images/enrollments-arrow-right.svg";

import "./Enrollments.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Enrollments() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showColumn4, setShowColumn4] = useState(true);
  const { t, i18n } = useTranslation();
  const enrollmentsSliders =
    useSelector((state) => state.enrollments.data.sliders) || [];
  const enrollmentsContent =
    useSelector((state) => state.enrollments.data.content) || [];

  const filteredSliders = enrollmentsSliders.map((innerArray) =>
    innerArray.filter(
      (slider) => slider.visible === "both" || slider.visible === i18n.language
    )
  );

  const columnRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;

      setIsSmallScreen(width <= 1000);
      setShowColumn4(width > 1350);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const columns =
      columnRef?.current?.querySelectorAll(".enrollments-column") || [];

    columns.forEach((column, index) => {
      const originalChildren = Array.from(column.children);

      originalChildren.forEach((child) => {
        const originalClone = child.cloneNode(true);
        originalClone.classList.add("cloned");
        const duplicatedClone = child.cloneNode(true);
        duplicatedClone.classList.add("cloned");
        column.appendChild(originalClone);
        column.appendChild(duplicatedClone);
      });

      const isOdd = index % 2 === 0;
      let currentPosition = isOdd ? 0 : -column.scrollHeight / 2;

      const moveColumn = () => {
        currentPosition += isOdd ? -1 : 1;
        column.style.transform = `translateY(${currentPosition}px)`;

        const resetPoint = column.scrollHeight / 2;
        if (isOdd && Math.abs(currentPosition) >= resetPoint) {
          currentPosition = 0;
        } else if (!isOdd && currentPosition >= resetPoint) {
          currentPosition = -resetPoint;
        }
      };

      let intervalId = setInterval(moveColumn, 30);

      const stopAnimation = () => clearInterval(intervalId);
      const startAnimation = () => (intervalId = setInterval(moveColumn, 30));

      if (isSmallScreen) {
        column.addEventListener("click", () => {
          if (intervalId) {
            stopAnimation();
            intervalId = null;
          } else {
            startAnimation();
          }
        });
      } else {
        column.addEventListener("mouseenter", stopAnimation);
        column.addEventListener("mouseleave", () => {
          clearInterval(intervalId);
          intervalId = setInterval(moveColumn, 30);
        });
      }

      const calculateCenterPosition = (hoveredCard) => {
        const columnRect = column.getBoundingClientRect();
        const hoveredCardRect = hoveredCard.getBoundingClientRect();
        const cardTopRelativeToColumn = hoveredCardRect.top - columnRect.top;
        const columnHeight = column.clientHeight;
        const hoveredCardHeight = hoveredCard.clientHeight;

        return -(
          cardTopRelativeToColumn +
          hoveredCardHeight / 2 -
          columnHeight / 2
        );
      };

      const moveColumnToCenterCard = (hoveredCard) => {
        const centerPosition = calculateCenterPosition(hoveredCard);
        currentPosition = centerPosition;
        column.style.transition = "transform .5s linear";
        column.style.transform = `translateY(${centerPosition}px)`;
      };

      if (!isSmallScreen && showColumn4) {
        column
          .querySelectorAll(".enrollments-animated-container")
          .forEach((card) => {
            card.addEventListener("mouseenter", () =>
              moveColumnToCenterCard(card)
            );
            card.addEventListener("mouseleave", startAnimation);
          });
      }

      return () => clearInterval(intervalId);
    });
  }, [enrollmentsSliders]);

  useEffect(() => {
    const columns =
      columnRef?.current?.querySelectorAll(".enrollments-column") || [];

    columns.forEach((column) => {
      // Remove previously cloned elements
      Array.from(column.children).forEach((child) => {
        if (child.classList.contains("cloned")) {
          column.removeChild(child);
        }
      });

      // Re-create cloned elements with the updated language content
      const originalChildren = Array.from(column.children);
      originalChildren.forEach((child) => {
        const originalClone = child.cloneNode(true);
        originalClone.classList.add("cloned");
        const duplicatedClone = child.cloneNode(true);
        duplicatedClone.classList.add("cloned");

        column.appendChild(originalClone);
        column.appendChild(duplicatedClone);
      });
    });
  }, [i18n.language]);

  const scrollToEnrollments = () => {
    const announcmentsComponent = document.getElementById("announcments");
    const offset = announcmentsComponent.offsetTop - 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  if (enrollmentsContent.length !== 0 && filteredSliders.length !== 0) {
    return (
      <div className="enrollments-container">
        <div className="enrollments-content">
          <div
            className="enrollments-content-left"
            style={{
              backgroundImage: isSmallScreen ? `url(${Image})` : "none",
            }}
          >
            <div className="enrollments-content-left-overlay" />
            <h1 className="enrollments-title">{t("enrollment_title")}</h1>
            <h3
              className="enrollments-description"
              dangerouslySetInnerHTML={{
                __html: enrollmentsContent[0].content[i18n.language],
              }}
            ></h3>
            <div className="enrollments-buttons">
              <button
                className="enrollments-button-scroll"
                onClick={scrollToEnrollments}
              >
                <div className="enrollments-scroll-container">
                  <img src={ScrollDown} alt="scroll" />
                </div>
                <div>{t("scroll_down")}</div>
              </button>
              <button
                className="enrollments-button-explore"
                onClick={() =>
                  window.location.replace("https://seu.edu.ge/76#menuId=2")
                }
              >
                <div style={{ marginRight: ".5rem" }}>{t("learn_more")}</div>
                <img src={ArrowRight} alt="enter" />
              </button>
            </div>
          </div>
          <div className="enrollments-content-divider" />
          <div className="enrollments-content-right">
            <img src={Image} alt="photo" className="enrollments-main-photo" />
          </div>
        </div>
        <div className="enrollments-grid-container">
          <div className="enrollments-animted" ref={columnRef}>
            {filteredSliders.map((column, columnIndex) => {
              if (columnIndex == 4 && !showColumn4) {
                return null;
              }
              if (
                (columnIndex == 2 || columnIndex == 3 || columnIndex == 4) &&
                isSmallScreen
              ) {
                return null;
              }
              return (
                <div
                  className="enrollments-column"
                  key={columnIndex}
                  id={`column-${columnIndex}`}
                >
                  {column.map((item, itemIndex) => (
                    <div
                      className="enrollments-animated-container"
                      key={itemIndex}
                    >
                      <img
                        src={import.meta.env.VITE_API_MEDIA_URL + item.image}
                        alt="image"
                        className="enrollments-animated-img"
                      />
                      <h3 className="enrollments-animated-author">
                        {item.title[i18n.language]}
                      </h3>
                      <h5 className="enrollments-animated-degree">
                        {item.sub_title[i18n.language]}
                      </h5>
                      <div className="enrollments-animated-paragraph">
                        <img src={QuotationMarksImage} alt="quotation marks" />
                        <p
                          className="enrollments-animated-paragraph-description"
                          dangerouslySetInnerHTML={{
                            __html: item.content[i18n.language],
                          }}
                        ></p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
