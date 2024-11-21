import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateUtils";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import ArrowRight from "../../assets/images/arrow-right-orange.svg";

import "./AnnouncmentDetail.css";
import { useTranslation } from "react-i18next";
import { fetchAnnouncment } from "../../services/announcements";
import BreadcrumbsMobile from "../breadcrumbs/BreadcrumbsMobile";

export default function AnnouncmentsDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const announcements = useSelector((state) => state.announcements.data);
  const menus = useSelector((state) => state.menus.data);
  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);
  const [data, setData] = useState([]);

  const submenuData = menus.reduce((acc, menu) => {
    if (acc) return acc;
    const foundSubmenu = menu.submenus.find(
      (submenu) => submenu.template.name === "ანონსები"
    );
    return foundSubmenu || acc;
  }, null);

  const menuData = menus.find(
    (menu) => menu.id === Number(submenuData?.menu_id)
  );

  let linksData = [];

  if (menuData) {
    menuData.submenus.forEach((submenu) => {
      let pageLink =
        submenu.contents.length > 0
          ? submenu.contents[0].page_url
          : submenu.page_url
          ? submenu.page_url
          : submenu.template.page_url;
      linksData = [
        ...linksData,
        { title: submenu.title[i18n.language], link: pageLink },
      ];
    });
  }

  const announcementData =
    announcements?.data?.filter((item) => item.id == id) || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    handleFetchAnnouncment();
  }, [i18n.language]);

  const handleFetchAnnouncment = async () => {
    try {
      const response = await fetchAnnouncment(id);
      if (
        response.data[0]?.visible === i18n.language ||
        response.data[0]?.visible === "both"
      ) {
        setData(response.data);
      } else {
        navigate(`/announcments?lang=${i18n.language}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const middleContainerHeight = middleContainerRef?.current?.clientHeight;
    if (middleContainerHeight > 88) {
      bottomContainerRef.current.style.paddingTop = "4rem";
    }
  }, [announcementData]);

  if (data.length !== 0) {
    const formattedDate = formatDate(data[0].date, i18n);

    return (
      <div className="announcment-details-container">
        <div className="announcment-details-background-image">
          <h1 className="background-image-text">
            {submenuData?.title[i18n.language] || ""}
            <span className="circle" />
            <div className="element-with-border" />
          </h1>
        </div>
        <div className="announcment-details-middle-container">
          <div
            className="announcment-details-middle-content"
            ref={middleContainerRef}
          >
            <div className="announcment-details-middle-content-wrapper">
              <div className="announcments-card-date">
                <div className="announcments-card-date-top">
                  <span className="announcments-card-date-top-day">
                    {formattedDate.day}
                  </span>
                  <span className="announcments-card-date-top-year">
                    {formattedDate.year}
                  </span>
                </div>
                <span className="announcments-card-date-month">
                  {formattedDate.month}
                </span>
              </div>
              <h3>{data[0].title[i18n.language]}</h3>
            </div>
          </div>
        </div>
        <div
          className="announcment-details-bottom-container"
          ref={bottomContainerRef}
        >
          <Breadcrumbs
            data={[
              { title: t("home"), link: "/" },
              { title: menuData?.title[i18n.language], link: "#" },
              {
                title: submenuData?.title[i18n.language],
                link: "/announcments",
              },
              { title: data[0]?.title[i18n.language], link: "" },
            ]}
          />
          <BreadcrumbsMobile
            data={linksData}
            activeTitle={t("announcements_title")}
          />
        </div>
        <div className="announcment-details-content">
          <div className="announcment-details-cards-container">
            <div
              className="announcment-details-paragraph"
              dangerouslySetInnerHTML={{
                __html: data[0].content[i18n.language],
              }}
            />
          </div>
          <div className="announcment-details-links-container">
            {linksData.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  to={item.link + `?lang=${i18n.language}`}
                  className={`announcment-details-link ${
                    item.title === "ანონსები" ? "active" : ""
                  }`}
                >
                  {item.title === "ანონსები" && (
                    <div className="announcment-details-link-circle" />
                  )}
                  {item.title}
                  {item.title !== "ანონსები" && (
                    <img
                      src={ArrowRight}
                      alt="arrow-right"
                      className="announcment-details-link-arrow"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
