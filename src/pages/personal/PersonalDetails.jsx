import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchPersonals } from "../../services/personal";
import Linkedin from "../../assets/images/personal-linkedin.svg";

import "./PersonalDetails.css";

export default function PersonalDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const getPersonalInfo = async () => {
      try {
        const res = await fetchPersonals(id);

        setInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getPersonalInfo();
  }, [id]);

  useEffect(() => {
    if (i18n.language && info.title && !info.title[i18n.language]) {
      navigate("/");
    }
  }, [i18n.language, info]);

  if (info.length !== 0) {
    return (
      <div className="news-details-container">
        <div className="news-details-background-image" />
        <div className="news-details-middle-container">
          <div className="personal-middle-content">
            <img
              src={import.meta.env.VITE_API_MEDIA_URL + info.image}
              className="personal-image"
            />
            <div className="personal-right-box">
              <h3>{info.title[i18n.language]}</h3>
              <h5>{info.position[i18n.language]}</h5>
              <p>{info.description[i18n.language]}</p>
              <Link to={info.linkedin} className="personal-linkedin">
                <img src={Linkedin} />
                <span>Linkedin</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="grey-row" />
      </div>
    );
  }
}