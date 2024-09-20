import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

export default function VideoModal({ data }) {
  const { i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url?.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(data.video_url);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/0.jpg`
    : "";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="video-box" onClick={openModal}>
        <div
          className="video-cover"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        />

        <h3>{data.description[i18n.language]}</h3>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <button className="close-button" onClick={closeModal}>
            ×
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
