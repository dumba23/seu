import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchPrograms } from "../../services/program";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import ArrowRight from "../../assets/images/arrow-right.svg";
import Pdf from "../../assets/images/pdf.svg";

import "./ProgramDetails.css";
import { fetchFile } from "../../services/exam";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";

export default function ProgramExams() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [info, setInfo] = useState([]);
  const [isProgram, setIsProgram] = useState(false);

  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const getProgramInfo = async () => {
      let isProgramTemp = false;

      try {
        const res = await fetchPrograms(id);

        setInfo(res.data);

        res?.data?.program_exams.forEach((exam) => {
          if (exam[`pdf_${i18n.language}`]) {
            setIsProgram(true);
            isProgramTemp = true;
          } else {
            setIsProgram(false);
            isProgramTemp = false;
          }
        });
      } catch (err) {
        console.error(err);
      } finally {
        if (!isProgramTemp) {
          navigate(`/programs/${id}` + `?lang=${i18n.language}`);
        }
      }
    };

    getProgramInfo();
  }, [id, i18n.language]);

  useEffect(() => {
    const middleContainerHeight = middleContainerRef?.current?.clientHeight;
    const windowWidth = window.outerWidth;
    if (middleContainerHeight > 88 && windowWidth > 475) {
      bottomContainerRef.current.style.paddingTop = "4rem";
    }
  }, [id]);

  const downloadFile = async (examId, language, filename) => {
    try {
      const response = await fetchFile(examId, language);

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("File download error:", error);
    }
  };

  if (info.length !== 0) {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image">
          <h1 className="background-image-text">
            {t("programs")}
            <span className="circle" />
            <div className="element-with-border" />
          </h1>
        </div>
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
                  title: t("faculty"),
                  link: info?.child_content?.custom_contents.page_url,
                },
                {
                  title: info?.child_content?.title[i18n.language],
                  link: info?.child_content?.page_url,
                },
                ...(isProgram ? [{ title: t("exam_topics"), link: "" }] : []),
              ]}
            />
            <BreadcrumbsMobile
              data={[
                {
                  title: info.title[i18n.language],
                  link: "/programs/" + info.id,
                },
                ...(isProgram ? [{ title: t("exam_topics"), link: "" }] : []),
              ]}
              activeTitle={t("exam_topics")}
            />
          </div>
          <div className="about-content">
            <div
              className="about-html-container"
              style={{ flexDirection: "column" }}
            >
              {info.program_exams.map((exam, idx) => {
                if (exam.title[i18n.language]) {
                  return (
                    <div key={idx} style={{ marginBottom: "1rem" }}>
                      <button
                        className="pdf-doc"
                        onClick={() =>
                          downloadFile(
                            `${exam.id}`,
                            i18n.language,
                            exam.title[i18n.language]
                          )
                        }
                      >
                        <img src={Pdf} alt="document" />
                        <div>{exam.title[i18n.language]}</div>
                      </button>
                    </div>
                  );
                }
              })}
            </div>
            <div className="vacancy-page-links-container">
              {info.program_exams && (
                <>
                  <Link
                    to={`/programs/${info.id}` + `?lang=${i18n.language}`}
                    className={`vacancy-page-link`}
                  >
                    {info.title[i18n.language]}
                  </Link>
                  {isProgram && (
                    <Link
                      to={info.exam_page + `?lang=${i18n.language}`}
                      className={`vacancy-page-link active`}
                    >
                      <div className="news-page-link-circle" />
                      {t("exam_topics")}
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
