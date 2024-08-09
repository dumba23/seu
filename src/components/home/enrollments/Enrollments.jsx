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
  const { t, i18n } = useTranslation();
  const enrollmentsSliders =
    useSelector((state) => state.enrollments.data.sliders) || [];
  const enrollmentsContent =
    useSelector((state) => state.enrollments.data.content) || [];

  const columnRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 475);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const columns =
      columnRef?.current?.querySelectorAll(".enrollments-column") || [];

    columns.forEach((column) => {
      const originalChildren = Array.from(column.children);
      const clonedChildren = originalChildren.map((child) =>
        child.cloneNode(true)
      );

      const childHeight = originalChildren[0]?.offsetHeight;
      const height =
        childHeight * originalChildren.length +
        26 * (originalChildren.length + 1);

      clonedChildren.forEach((clonedChild) => {
        column.appendChild(clonedChild);
      });

      let currentPositionOdd = 0;
      let currentPositionEven = -height;
      const moveColumn = () => {
        if (column.id[column.id.length - 1] % 2) {
          currentPositionOdd--;
          if (currentPositionOdd <= -height) {
            currentPositionOdd = 0;
          }
          column.style.transition = "transform linear";
          column.style.transform = `translateY(${currentPositionOdd}px)`;
        } else {
          currentPositionEven++;
          if (currentPositionEven >= height - 1224) {
            currentPositionEven = -height;
          }
          column.style.transition = "transform linear";
          column.style.transform = `translateY(${currentPositionEven}px)`;
        }
      };

      let intervalId = setInterval(moveColumn, 40);

      column.addEventListener("mouseenter", () => clearInterval(intervalId));
      column.addEventListener("mouseleave", () => {
        clearInterval(intervalId);
        intervalId = setInterval(moveColumn, 30);
      });

      const calculateCenterPosition = (hoveredCard) => {
        const columnRect = column.getBoundingClientRect();
        const hoveredCardRect = hoveredCard.getBoundingClientRect();
        const cardTopRelativeToColumn = hoveredCardRect.top - columnRect.top;
        const cardBottomRelativeToColumn =
          hoveredCardRect.bottom - columnRect.top;
        const columnHeight = column.clientHeight;
        const hoveredCardHeight = hoveredCard.clientHeight;

        // Calculate the position to center the hovered card
        return -(
          cardTopRelativeToColumn +
          hoveredCardHeight / 2 -
          columnHeight / 2
        );
      };

      // Function to move the column to center the hovered card
      const moveColumnToCenterCard = (hoveredCard) => {
        const centerPosition = calculateCenterPosition(hoveredCard);
        if (column.id[column.id.length - 1] % 2) {
          currentPositionOdd = centerPosition;
        } else {
          currentPositionEven = centerPosition;
        }
        column.style.transition = "transform .5s linear";
        column.style.transform = `translateY(${centerPosition}px)`;
      };

      // Add event listeners to each card
      column
        .querySelectorAll(".enrollments-animated-container")
        .forEach((card) => {
          card.addEventListener("mouseenter", () => {
            moveColumnToCenterCard(card);
          });

          card.addEventListener("mouseleave", () => {
            // Restore the column to its original position when the mouse leaves the card
            moveColumnToCenterCard(null);
          });
        });

      return () => clearInterval(intervalId);
    });
  }, [enrollmentsSliders]);

  const scrollToEnrollments = () => {
    const announcmentsComponent = document.getElementById("announcments");
    const offset = announcmentsComponent.offsetTop - 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  if (enrollmentsContent.length !== 0 && enrollmentsSliders.length !== 0) {
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
              <button className="enrollments-button-explore">
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
            {enrollmentsSliders.map((column, columnIndex) => (
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
            ))}
          </div>
        </div>
      </div>
    );
  }
}
