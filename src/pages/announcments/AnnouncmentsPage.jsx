import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { fetchAnnouncements } from "../../services/announcements";
import {
  fetchAnnouncementsFailure,
  fetchAnnouncementsStart,
  fetchAnnouncementsSuccess,
} from "../../store/slices/announcementsSlice";

import Pagination from "../../components/pagination/Pagination";
import ArrowRight from "../../assets/images/arrow-right-orange.svg";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import AnnouncmentsCard from "../../components/announcments/AnnouncmentsCard";

import "./AnnouncmentsPage.css";
import BreadcrumbsMobile from "../../components/breadcrumbs/BreadcrumbsMobile";

export default function AnnoucmentsPage() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const announcements = useSelector((state) => state.announcements.data);
  const menus = useSelector((state) => state.menus.data);
  const middleContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  const handlePageChange = (pageNumber) => {
    fetchData(i18n.language, pageNumber);
  };

  const fetchData = async (lang, pageNumber) => {
    dispatch(fetchAnnouncementsStart());
    try {
      const response = await fetchAnnouncements(lang, pageNumber);
      dispatch(fetchAnnouncementsSuccess(response.data.announcements));
    } catch (error) {
      dispatch(fetchAnnouncementsFailure(error.message));
    }
  };

  useEffect(() => {
    const middleContainerHeight = middleContainerRef?.current?.clientHeight;
    if (middleContainerHeight > 88) {
      bottomContainerRef.current.style.paddingTop = "4rem";
    }
  }, []);

  return (
    <div className="announcments-page-container">
      <div className="announcments-page-background-image">
        <h1 className="background-image-text">
          {menuData?.title[i18n.language] || ""}
          <span className="circle" />
          <div className="element-with-border" />
        </h1>
      </div>
      <div className="announcments-page-middle-container">
        <div
          className="announcments-page-middle-content"
          ref={middleContainerRef}
        >
          <div style={{ marginLeft: "1rem" }}>{t("announcements_title")}</div>
        </div>
      </div>
      <div
        className="announcments-page-bottom-container"
        ef={bottomContainerRef}
      >
        <Breadcrumbs
          data={[
            { title: t("home"), link: "/" },
            { title: menuData?.title[i18n.language], link: "#" },
            { title: submenuData?.title[i18n.language], link: "" },
          ]}
        />
        <BreadcrumbsMobile
          data={linksData}
          activeTitle={t("announcements_title")}
        />
      </div>
      <div className="announcments-page-content">
        <div className="announcments-page-cards-container">
          {announcements?.data?.map((card, idx) => {
            if (card.visible === "both" || card.visible === i18n.language) {
              return <AnnouncmentsCard data={card} key={idx} />;
            }
          })}

          <Pagination
            currentPage={announcements.current_page}
            totalPages={announcements.last_page}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="announcments-page-links-container">
          {linksData.length > 0 &&
            linksData.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  to={item.link}
                  className={`announcments-page-link ${
                    item.title === "ანონსები" ? "active" : ""
                  }`}
                >
                  {item.title === "ანონსები" && (
                    <div className="announcments-page-link-circle" />
                  )}
                  {item.title}
                  {item.title !== "ანონსები" && (
                    <img
                      src={ArrowRight}
                      alt="arrow-right"
                      className="announcments-page-link-arrow"
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
