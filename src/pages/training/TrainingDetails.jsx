import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchTraining } from "../../services/training";
import { formatDate } from "../../utils/dateUtils";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import CalendarIcon from "../../assets/images/calendar.svg";

export default function TrainingDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [training, setTraining] = useState({});
  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const callFetchVacancy = async () => {
      try {
        const res = await fetchTraining(id);

        if (res.data.visible === "both" || res.data.visible === i18n.language) {
          setTraining(res.data);
        } else {
          window.location.replace("/");
        }
      } catch (err) {
        console.error(err);
      }
    };

    callFetchVacancy();
  }, [id]);

  useEffect(() => {
    const middleContainerHeight = middleContainerRef?.current?.clientHeight;
    if (middleContainerHeight > 88) {
      bottomContainerRef.current.style.paddingTop = "4rem";
    }
  }, [id]);

  if (Object.keys(training).length !== 0) {
    const startDate = formatDate(training.start_date[i18n.language], i18n);
    const endDate = formatDate(training.end_date[i18n.language], i18n);

    return (
      <div className="vacancy-details-container">
        <div className="vacancy-details-background-image" />
        <div className="vacancy-details-middle-container">
          <div
            className="vacancy-details-middle-content"
            ref={middleContainerRef}
          >
            <div className="vacancy-details-middle-content-wrapper">
              <div className="vacancy-details-card-date"></div>
              <h3>{training.title[i18n.language]}</h3>
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
              { title: t("trainings"), link: "/trainings" },
              { title: training.title[i18n.language], link: "#" },
            ]}
          />
        </div>
        <div className="vacancy-details-content">
          <div className="vacancy-details-cards-container">
            <div className="training-details-card">
              <div className="flex-col">
                <span className="vacancy-details-card-label">
                  {t("training_period")}
                </span>
                <span className="vacancy-details-card-value">
                  {training.meets[i18n.language]}
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
                    {t("start_period")}
                  </div>
                </span>
                <span className="vacancy-details-card-value vacancy-details-date-label">
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
                    {t("end_period")}
                  </div>
                </span>
                <span className="vacancy-details-card-value vacancy-details-date-label">
                  {endDate.day + " " + endDate.month + ", " + endDate.year}
                </span>
              </div>
              <div className="flex-col">
                <span className="vacancy-details-card-label">
                  <div>{t("price")}</div>
                </span>
                <span className="vacancy-details-card-value">
                  {training.price[i18n.language]}
                </span>
              </div>
              <Link
                to={training.registration_link[i18n.language]}
                type="submit"
                className="training-link"
              >
                {t("register")}
              </Link>
            </div>
            <div
              className="vacancy-details-paragraph"
              dangerouslySetInnerHTML={{
                __html: training.content[i18n.language],
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
