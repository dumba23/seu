import React, { useState, useEffect } from "react";
import "./PhotoModal.css"; // Import a CSS file to style the modal

export default function PhotoModal({ photos, initialIndex, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviewClick = (index) => {
    setCurrentIndex(index);
  };

  if (!isOpen) return null;

  return (
    <div className="photo-modal-overlay" onClick={onClose}>
      <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="photo-modal-content">
          <button className="arrow-button" onClick={handlePrevious}>
            &larr;
          </button>
          <img
            src={`${
              import.meta.env.VITE_API_MEDIA_URL + photos[currentIndex]?.image
            }`}
            alt="current"
            className="main-photo"
          />
          <button className="arrow-button" onClick={handleNext}>
            &rarr;
          </button>
        </div>
        <div className="photo-preview-container">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={`${import.meta.env.VITE_API_MEDIA_URL + photo.image}`}
              alt={`preview ${index}`}
              className={`photo-preview ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => handlePreviewClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
