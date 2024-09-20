import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchPrograms } from "../../services/program";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";
import ArrowRight from "../../assets/images/arrow-right.svg";

import "./ProgramDetails.css";
import ProgramDropdown from "./ProgramDropdown";

export default function PersonalDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [info, setInfo] = useState([]);

  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const getProgramInfo = async () => {
      try {
        const res = await fetchPrograms(id);

        setInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getProgramInfo();
  }, []);

  useEffect(() => {
    const middleContainerHeight = middleContainerRef?.current?.clientHeight;
    const windowWidth = window.outerWidth;
    if (middleContainerHeight > 88 && windowWidth > 475) {
      bottomContainerRef.current.style.paddingTop = "4rem";
    }
  }, [id]);

  if (info.length !== 0) {
    const hasTitleInLanguage = info?.program_infos?.some(
      (info) => info.title[i18n.language]
    );

    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        <div className="rector-wrapper">
          <div className="rector-container type2" ref={middleContainerRef}>
            <div
              style={{
                marginLeft: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3>
                {info.faculty[i18n.language]}, {info.title[i18n.language]}
              </h3>
            </div>
          </div>
        </div>
        <div className={`about-bottom-container ${info.type}`}>
          <div className={`about-empty-div ${info.type}`} />
          <div
            className="program-details-bottom-container"
            ref={bottomContainerRef}
          >
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                {
                  title:
                    info?.child_content?.custom_contents.title[i18n.language],
                  link: info?.child_content?.custom_contents.page_url,
                },
                {
                  title: info?.child_content?.title[i18n.language],
                  link: info?.child_content?.page_url,
                },
                { title: info.title[i18n.language], link: "" },
              ]}
            />
            <BreadcrumbsMobile
              activeTitle={info.title[i18n.language]}
              data={[
                {
                  title: info.title[i18n.language],
                  link: "",
                },
                info.program_exams.length > 0 && {
                  title: t("exam_topics"),
                  link: "/programs/exam/" + info.id,
                },
              ]}
            />
          </div>
          <div className="program-details-dropdown">
            <ProgramDropdown info={info} />
          </div>
          <div className="vacancy-page-content">
            <div className="about-type8-html-container">
              <div
                className="about-html"
                dangerouslySetInnerHTML={{
                  __html: info.html[i18n.language],
                }}
              />
            </div>
            <div className="vacancy-page-links-container">
              {info.program_exams && (
                <>
                  <Link to="#" className={`vacancy-page-link active`}>
                    <div className="news-page-link-circle" />
                    {info.title[i18n.language]}
                    <img
                      src={ArrowRight}
                      alt="arrow-right"
                      className="news-page-link-arrow"
                    />
                  </Link>
                  {info.program_exams.length > 0 && (
                    <Link
                      to={`/programs/exam/${info.id}`}
                      className={`vacancy-page-link`}
                    >
                      {t("exam_topics")}
                    </Link>
                  )}
                </>
              )}
              {hasTitleInLanguage && (
                <div className="general-info-program">
                  <h1>{t("general_information")}</h1>
                  <div className="border-for-program" />
                  {info?.program_infos.map((program, idx) => {
                    if (program.title[i18n.language]) {
                      return (
                        <React.Fragment key={idx}>
                          <div className="general-info-child">
                            <h4>{program.title[i18n.language]}:</h4>
                            <h6>{program.description[i18n.language]}</h6>
                          </div>
                          <div className="border-for-program" />
                        </React.Fragment>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
