import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchContent, getCustomContent } from "../../services/content";
import { useTranslation } from "react-i18next";
import FaqBox from "../content/FaqBox";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import QuotationMarkIcon from "../../assets/images/quotation-marks.svg";
import SeuImage from "../../assets/images/seu.png";
import ArrowRight from "../../assets/images/arrow-right-orange.svg";
import "./CustomContentPage.css";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";

export default function ContentPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState({});
  const [parent, setParent] = useState({});

  useEffect(() => {
    let customId = 0;
    const callFetchContent = async () => {
      const startIndex =
        location.pathname.indexOf("/custom/") + "/custom/".length;
      const slicedPart = location.pathname.substring(startIndex);

      try {
        const res = await fetchContent(slicedPart[0] !== 0 ? id : id.slice(1));

        if (
          res.data.content.visible === "both" ||
          res.data.content.visible === i18n.language
        ) {
          setContent(res.data.content);
          if (res.data?.content?.child_contents?.length > 0) {
            window.location.replace(
              res.data.content.child_contents[0].page_url
            );
          }

          if (res.data.content.custom_content_id) {
            callFetchCustom(res.data.content.custom_content_id);
          }
        } else {
          window.location.replace("/");
        }
      } catch (err) {
        console.error(err);
      }
    };
    callFetchContent();

    const callFetchCustom = async (id) => {
      try {
        const res = await getCustomContent(id);
        setParent(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    if (customId !== 0) {
      callFetchCustom();
    }
  }, [id, i18n.language]);

  let linksData = [];

  if (Object.keys(content).length !== 0) {
    linksData = [
      ...linksData,
      { title: content.title[i18n.language], link: content.page_url },
    ];
    if (content?.child_contents) {
      content?.child_contents.forEach((child) => {
        linksData = [
          ...linksData,
          { title: child.title[i18n.language], link: child.page_url },
        ];
      });
    }
  }

  if (parent && Object.keys(parent).length !== 0) {
    if (parent?.child_contents) {
      parent?.child_contents.forEach((child) => {
        if (!linksData.some((linkObj) => linkObj.link === child.page_url)) {
          linksData = [
            ...linksData,
            { title: child.title[i18n.language], link: child.page_url },
          ];
        }
      });
    }
  }

  if (
    Object.keys(content).length !== 0 &&
    content.type !== "type3" &&
    content.type !== "type4" &&
    content.type !== "type5" &&
    content.type !== "type6" &&
    content.type !== "type7" &&
    content.type !== "type8"
  ) {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        {content.type === "type1" && (
          <div className="rector-wrapper">
            <div className="rector-container">
              <img src={SeuImage} alt="seu" className="seu-background-image" />
              <div>
                <h3>{content.title[i18n.language]}</h3>
                <div className="rector-paragraph">
                  <img src={QuotationMarkIcon} alt="quotation-mark" />
                  <div style={{ marginLeft: "10px" }}>
                    {content.description[i18n.language]}
                    <div className="paragraph-underline" />
                  </div>
                </div>
              </div>
              <img
                src={import.meta.env.VITE_API_MEDIA_URL + content.image}
                alt="seu-rector"
                className="seu-rector"
                style={{
                  maxWidth: "556px",
                  maxHeight: "337px",
                  borderRadius: "1rem",
                }}
              />
            </div>
          </div>
        )}
        {content.type === "type2" && (
          <div className="rector-wrapper">
            <div className="rector-container type2">
              <div
                style={{
                  marginLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{content.title[i18n.language]}</h3>
              </div>
            </div>
          </div>
        )}
        {content.type === "type1" && (
          <div className="seu-rector-image-mobile">
            <img
              src={import.meta.env.VITE_API_MEDIA_URL + content.image}
              alt="seu-rector"
              className="seu-rector-mobile"
            />
          </div>
        )}

        <div className={`about-bottom-container ${content.type}`}>
          <div className={`about-empty-div ${content.type}`} />
          <div className="about-content">
            <div className="about-html-container">
              {content?.html[i18n.language] && (
                <div
                  className="about-html"
                  dangerouslySetInnerHTML={{
                    __html: content.html[i18n.language],
                  }}
                />
              )}
            </div>
            <div className="vacancy-page-links-container">
              {linksData.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`vacancy-page-link ${
                      item.link === content.page_url ? "active" : ""
                    }`}
                  >
                    {item.link === content.page_url && (
                      <div className="news-page-link-circle" />
                    )}
                    {item.title}
                    {item.link !== content.page_url && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (Object.keys(content).length !== 0 && content.type === "type3") {
    return (
      <div className="type3-container">
        <div className="type3-animated-container">
          <h1 className="type3-title">{content.title[i18n.language]}</h1>
          <div className="type-3-box">
            <div
              className="box-image"
              style={{
                backgroundImage: `url(${
                  import.meta.env.VITE_API_MEDIA_URL + content.image_1
                })`,
              }}
            >
              <h5>{content.title_1[i18n.language]}</h5>
              <Link to={content.link_1[i18n.language]}>{t("learn_more")}</Link>
            </div>
          </div>
          <div className="type-3-box">
            <div
              className="box-image"
              style={{
                backgroundImage: `url(${
                  import.meta.env.VITE_API_MEDIA_URL + content.image_2
                })`,
              }}
            >
              <h5>{content.title_2[i18n.language]}</h5>
              <Link to={content.link_2[i18n.language]}>{t("learn_more")}</Link>
            </div>
          </div>
          <div className="type-3-box">
            <div
              className="box-image"
              style={{
                backgroundImage: `url(${
                  import.meta.env.VITE_API_MEDIA_URL + content.image_3
                })`,
              }}
            >
              <h5>{content.title_3[i18n.language]}</h5>
              <Link to={content.link_3[i18n.language]}>{t("learn_more")}</Link>
            </div>
          </div>
          <div className="type-3-box">
            <div
              className="box-image"
              style={{
                backgroundImage: `url(${
                  import.meta.env.VITE_API_MEDIA_URL + content.image_4
                })`,
              }}
            >
              <h5>{content.title_4[i18n.language]}</h5>
              <Link to={content.link_4[i18n.language]}>{t("learn_more")}</Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (Object.keys(content).length !== 0 && content.type === "type4") {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        {content.type === "type4" && (
          <div className="rector-wrapper">
            <div className="rector-container type2">
              <div
                style={{
                  marginLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{content.title[i18n.language]}</h3>
              </div>
            </div>
          </div>
        )}
        <div className={`about-bottom-container ${content.type}`}>
          <div className={`about-empty-div ${content.type}`} />
          <div className="content-page-bottom-container">
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                { title: content.title[i18n.language], link: "#" },
              ]}
            />
            <BreadcrumbsMobile
              activeTitle={content.title[i18n.language]}
              data={linksData}
            />
          </div>
          <div className="vacancy-page-content">
            <div className="about-type4-html-container">
              {content.international_types.map((item, idx) => {
                if (item.title[i18n.language]) {
                  return (
                    <div className="type4-box" key={idx}>
                      <img
                        className="type4-img"
                        alt="logo"
                        src={import.meta.env.VITE_API_MEDIA_URL + item.image}
                      />
                      <h3> {item.title[i18n.language]}</h3>
                    </div>
                  );
                }
              })}
            </div>
            <div className="vacancy-page-links-container">
              {linksData.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`vacancy-page-link ${
                      item.link === content.page_url ? "active" : ""
                    }`}
                  >
                    {item.link === content.page_url && (
                      <div className="news-page-link-circle" />
                    )}
                    {item.title}
                    {item.link !== content.page_url && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (Object.keys(content).length !== 0 && content.type === "type5") {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        {content.type === "type5" && (
          <div className="rector-wrapper">
            <div className="rector-container type2">
              <div
                style={{
                  marginLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{content.title[i18n.language]}</h3>
              </div>
            </div>
          </div>
        )}
        <div className={`about-bottom-container ${content.type}`}>
          <div className={`about-empty-div ${content.type}`} />
          <div className="content-page-bottom-container">
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                { title: content.title[i18n.language], link: "#" },
              ]}
            />
            <BreadcrumbsMobile
              activeTitle={content.title[i18n.language]}
              data={linksData}
            />
          </div>
          <div className="vacancy-page-content">
            <div className="about-type5-html-container">
              {content.lecturer_types.map((item, idx) => {
                return (
                  <div className="type5-box" key={idx}>
                    <div
                      className="type5-img"
                      style={{
                        backgroundImage: `url(${
                          import.meta.env.VITE_API_MEDIA_URL + item.image
                        })`,
                      }}
                    />
                    <div className="type5-bottom">
                      <h3>{item.title[i18n.language]}</h3>
                      <p>{item.description[i18n.language]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="vacancy-page-links-container">
              {linksData.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`vacancy-page-link ${
                      item.link === content.page_url ? "active" : ""
                    }`}
                  >
                    {item.link === content.page_url && (
                      <div className="news-page-link-circle" />
                    )}
                    {item.title}
                    {item.link !== content.page_url && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (Object.keys(content).length !== 0 && content.type === "type6") {
    return (
      <div className="about-container">
        <div className="background-image" />
        {content.type === "type6" && (
          <div className="rector-container type2">
            <div
              style={{
                marginLeft: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3>{content.title[i18n.language]}</h3>
            </div>
          </div>
        )}
        <div className={`about-bottom-container ${content.type}`}>
          <div className={`about-empty-div ${content.type}`} />
          <div className="about-breadcrumbs-container">
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                { title: content.title[i18n.language], link: "#" },
              ]}
            />
          </div>
          <div className="about-content">
            <div className="about-type5-html-container about-type6-html-container">
              {content.personals.map((item, idx) => {
                if (item.title[i18n.language]) {
                  return (
                    <div
                      className="type5-box type6-box"
                      style={{ cursor: "pointer" }}
                      key={idx}
                      onClick={() => navigate("/personals/" + item.id)}
                    >
                      <div
                        className="type5-img type6-img"
                        style={{
                          backgroundImage: `url(${
                            import.meta.env.VITE_API_MEDIA_URL + item.image
                          })`,
                        }}
                      />
                      <div className="type5-bottom type6-bottom">
                        <div>
                          <h3>{item.title[i18n.language]}</h3>
                          <h4>{item.position[i18n.language]}</h4>
                        </div>
                        <p>{item.description[i18n.language]}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="about-links-container">
              {linksData.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`vacancy-page-link ${
                      item.link === content.page_url ? "active" : ""
                    }`}
                  >
                    {item.link === content.page_url && (
                      <div className="news-page-link-circle" />
                    )}
                    {item.title}
                    {item.link !== content.page_url && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (Object.keys(content).length !== 0 && content.type === "type7") {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        {content.type === "type7" && (
          <div className="rector-wrapper">
            <div className="rector-container type2">
              <div
                style={{
                  marginLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{content.title[i18n.language]}</h3>
              </div>
            </div>
          </div>
        )}
        <div className={`about-bottom-container ${content.type}`}>
          <div className={`about-empty-div ${content.type}`} />
          <div className="vacancy-page-bottom-container">
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                {
                  title: content?.custom_contents.title[i18n.language],
                  link: "#",
                },
                { title: content.title[i18n.language], link: "#" },
              ]}
            />
            <BreadcrumbsMobile
              activeTitle={content.title[i18n.language]}
              data={linksData}
            />
          </div>
          <div className="vacancy-page-content">
            <div
              className="about-type7-html-container"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {content?.programs.map((item, idx) => {
                if (
                  item.exam_page === i18n.language ||
                  item.exam_page === "both"
                ) {
                  return (
                    <div
                      key={idx}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <h1 className="program-name">
                        {item.title[i18n.language]}
                      </h1>
                      <div
                        className="type5-box type6-box type7-box"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/programs/" + item.id)}
                      >
                        <div
                          className="type5-img type6-img type7-img"
                          style={{
                            backgroundImage: `url(${
                              import.meta.env.VITE_API_MEDIA_URL + item.image
                            })`,
                          }}
                        />
                        <div className="type5-bottom type6-bottom type7-bottom">
                          <div>
                            {/* <h3>{item.title[i18n.language]}</h3> */}
                            <h4
                              style={{ marginTop: "0.5rem", fontSize: "16px" }}
                            >
                              {item.faculty[i18n.language]}
                            </h4>
                          </div>
                          <p>{item.description[i18n.language]}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="vacancy-page-links-container">
              {linksData.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`vacancy-page-link ${
                      item.link === content.page_url ? "active" : ""
                    }`}
                  >
                    {item.link === content.page_url && (
                      <div className="news-page-link-circle" />
                    )}
                    {item.title}
                    {item.link !== content.page_url && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (Object.keys(content).length !== 0 && content.type === "type8") {
    return (
      <div className="about-container">
        <div className="vacancy-page-background-image" />
        {content.type === "type8" && (
          <div className="rector-wrapper">
            <div className="rector-container type2">
              <div
                style={{
                  marginLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{content.title[i18n.language]}</h3>
              </div>
            </div>
          </div>
        )}
        <div className={`about-bottom-container ${content.type}`}>
          <div className={`about-empty-div ${content.type}`} />
          <div className="vacancy-page-bottom-container">
            <Breadcrumbs
              data={[
                { title: t("home"), link: "/" },
                content?.custom_contents?.title[i18n.language] && {
                  title: content.custom_contents.title[i18n.language],
                  link: "#",
                },
                { title: content.title[i18n.language], link: "#" },
              ].filter(Boolean)}
            />
            <BreadcrumbsMobile
              activeTitle={content.title[i18n.language]}
              data={linksData}
            />
          </div>
          <div className="vacancy-page-content">
            <div className="about-type8-html-container">
              {content.faq_types.map((item, idx) => {
                if (item.title[i18n.language]) {
                  return <FaqBox item={item} key={idx} />;
                }
              })}
            </div>
            <div className="vacancy-page-links-container">
              {linksData.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`vacancy-page-link ${
                      item.link === content.page_url ? "active" : ""
                    }`}
                  >
                    {item.link === content.page_url && (
                      <div className="news-page-link-circle" />
                    )}
                    {item.title}
                    {item.link !== content.page_url && (
                      <img
                        src={ArrowRight}
                        alt="arrow-right"
                        className="news-page-link-arrow"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
