import { useState, useEffect } from "react";
import { fetchPage } from "../../services/page";

import RectorImage from "../../assets/images/rector.png";
import QuotationMarkIcon from "../../assets/images/quotation-marks.svg";
import SeuImage from "../../assets/images/seu.png";

import "./AboutPage.css";

export default function AboutPage() {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const fetchPageInfo = async () => {
      try {
        const response = await fetchPage();
        const { data } = response;
        if(data) { 
          setPageData(data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchPageInfo();
  }, [])

  const { content_components } = pageData;

  const getImageUrl = () => {
    const firstImageComponent = content_components?.find((component) => component.type === 'image');
    return firstImageComponent?.content;
  }


  console.log(getImageUrl())
  return (
    <div className="about-container">
      <div className="background-image">
        <h1>SEU-ს შესახებ</h1>
        <span className="circle" />
        <div className="element-with-border" />
      </div>
      <div className="rector-container">
        <img src={SeuImage} alt="seu" className="seu-background-image" />
        <div>
          <h3>{pageData?.title}</h3>
          <div className="rector-paragraph">
            <img src={QuotationMarkIcon} alt="quotation-mark" />
            <div>
              {
                content_components?.map((component, index) => {
                  if (component.type === "paragraph") {
                    return (
                      <p key={index}>{component.content}</p>
                    );
                  }
                })
              }
              <div className="paragraph-underline" />
            </div>
          </div>
        </div>
        <img src={import.meta.env.VITE_API_BASE_URL + getImageUrl()} alt="seu-rector" />
      </div>
    </div>
  );
}
