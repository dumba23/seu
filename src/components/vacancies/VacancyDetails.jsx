import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchVacancy } from "../../services/vacancy";
import { formatDate } from "../../utils/dateUtils";

import FB from "../../assets/images/vacancy-fb.svg";
import Twitter from "../../assets/images/vacancy-twitter.svg";
import Google from "../../assets/images/vacancy-google.svg";
import LinkImg from "../../assets/images/link.svg";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import CalendarIcon from "../../assets/images/calendar.svg";

import "./VacancyDetails.css";
import BreadcrumbsMobile from "../breadcrumbs/BreadcrumbsMobile";

export default function VacancyDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [vacancy, setVacancy] = useState({});
  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const callFetchVacancy = async () => {
      try {
        const res = await fetchVacancy(id);

        if (
          res.data.vacancy.visible === "both" ||
          res.data.vacancy.visible === i18n.language
        ) {
          setVacancy(res.data.vacancy);
        } else {
          window.location.replace("/");
        }
      } catch (err) {
        console.error(err);
      }
    };

    callFetchVacancy();
  }, []);

  useEffect(() => {
    const middleContainerHeight = middleContainerRef?.current?.clientHeight;
    if (middleContainerHeight > 88) {
      bottomContainerRef.current.style.paddingTop = "4rem";
    }
  }, [vacancy]);

  if (Object.keys(vacancy).length !== 0) {
    const startDate = formatDate(vacancy.start_date, i18n);
    const endDate = formatDate(vacancy.end_date, i18n);

    return (
      <div className="vacancy-details-container">
        <div className="vacancy-links-buttons">
          <Link to={vacancy.document} className="vacancy-link">
            <img
              src={LinkImg}
              style={{ width: "20px", height: "20px", marginRight: "0.5rem" }}
            />
            {t("additional_documentation")}
          </Link>
          <div className="vacancy-share-buttons">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${vacancy.fb}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="share-btn" style={{ marginRight: "0.2rem" }}>
                <img src={FB} style={{ marginRight: "1rem" }} />
                {t("share")}
              </button>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${vacancy.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="share-btn" style={{ marginRight: "0.2rem" }}>
                <img src={Twitter} style={{ marginRight: "1rem" }} />
                {t("share")}
              </button>
            </a>
            <a
              href={`https://plus.google.com/share?url=${vacancy.google}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="share-btn">
                <img src={Google} style={{ marginRight: "1rem" }} />
                {t("share")}
              </button>
            </a>
          </div>
        </div>
        <div className="vacancy-details-background-image" />
        <div className="vacancy-details-middle-container">
          <div
            className="vacancy-details-middle-content"
            ref={middleContainerRef}
          >
            <div className="vacancy-details-middle-content-wrapper">
              <div className="vacancy-details-card-date"></div>
              <h3>{vacancy.title[i18n.language]}</h3>
            </div>
          </div>
        </div>
        <div
          className="vacancy-details-bottom-container"
          ref={bottomContainerRef}
        >
          <Breadcrumbs
            data={[
              { title: t("home"), link: "/" },
              { title: t("vacancies"), link: "/vacancies" },
              { title: vacancy.title[i18n.language], link: "#" },
            ]}
          />
        </div>
        <div className="vacancy-details-content">
          <div className="vacancy-details-cards-container">
            <div className="vacancy-details-card">
              <div className="flex-col">
                <span className="vacancy-details-card-label">დეპარტამენტი</span>
                <span className="vacancy-details-card-value">
                  {vacancy.department[i18n.language]}
                </span>
              </div>
              <div className="flex-col">
                <span className="vacancy-details-card-label">
                  <img
                    src={CalendarIcon}
                    alt="calendar"
                    className="calendar-logo"
                  />
                  <div className="vacancy-details-date-label">
                    გამოცხადების თარიღი
                  </div>
                </span>
                <span className="vacancy-details-card-value date">
                  {startDate.day +
                    " " +
                    startDate.month +
                    ", " +
                    startDate.year}
                </span>
              </div>
              <div className="flex-col">
                <span className="vacancy-details-card-label">
                  <img
                    src={CalendarIcon}
                    alt="calendar"
                    className="calendar-logo"
                  />
                  <div className="vacancy-details-date-label">
                    დასრულების თარიღი
                  </div>
                </span>
                <span className="vacancy-details-card-value date">
                  {endDate.day + " " + endDate.month + ", " + endDate.year}
                </span>
              </div>
            </div>
            <div
              className="vacancy-details-paragraph"
              dangerouslySetInnerHTML={{
                __html: vacancy.content[i18n.language],
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
