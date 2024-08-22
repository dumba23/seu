import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PlayerImage from "../../../assets/images/player.svg";
import "./Benefits.css";

export default function BenefitsSliderItem({
  item,
  index,
  handleClick,
  startCarousel,
  isActive,
}) {
  const { i18n } = useTranslation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(5000); // Default duration for images
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    if (videoRef.current && isVideo(item.url)) {
      const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration * 1000);

        captureVideoFrame(1);
      };
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
        }
      };
    }
  }, [item.url]);

  const captureVideoFrame = (timeInSeconds) => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Seek video to the desired time
      videoRef.current.currentTime = timeInSeconds;

      // Once the seek operation is complete, draw the frame
      videoRef.current.onseeked = () => {
        // Set canvas dimensions to match video
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        // Draw the video frame to the canvas
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert canvas to an image URL
        const dataURL = canvas.toDataURL("image/jpeg");

        // Set the captured frame as the poster
        setPoster(dataURL);
      };
    }
  };

  const startProgress = () => {
    handleClick();
    let elapsedTime = 0;

    const interval = setInterval(() => {
      elapsedTime += 50; // Update progress every 50 milliseconds
      const percentage = Math.min(100, (elapsedTime / duration) * 100);
      setProgress(percentage);

      if (percentage >= 100) {
        startCarousel();
        clearInterval(interval);
        setProgress(0);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    }, 50);

    if (isVideo(item.url) && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleImageClick = () => {
    handleClick();
    startProgress();
  };

  const isVideo = (url) => {
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
    return videoExtensions.some((ext) => url.endsWith(ext));
  };

  return (
    <div
      className={`benefits-slider-item ${isActive ? "active" : ""}`}
      key={index}
    >
      {isVideo(item.url) ? (
        <>
          <video
            src={`${import.meta.env.VITE_API_MEDIA_URL + item.url}`}
            className="benefits-media"
            controls={false}
            muted
            ref={videoRef}
            loop
            preload="metadata"
            poster={poster}
          >
            <source
              src={`${import.meta.env.VITE_API_MEDIA_URL + item.url}`}
              type="video/mp4"
            />
          </video>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </>
      ) : (
        <img
          src={`${import.meta.env.VITE_API_MEDIA_URL + item.url}`}
          className="benefits-media"
          alt="media"
        />
      )}
      {progress > 0 && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
      )}
      {progress === 0 && <div className="benefits-slider-item-overlay" />}
      <div
        className={`benefits-slider-top ${
          progress > 0 ? "progress-active" : ""
        }`}
      >
        <div
          className="benefits-avatar"
          style={{
            backgroundImage: `url(${
              import.meta.env.VITE_API_MEDIA_URL + item.avatar_url
            })`,
          }}
        />
        <div className="benefits-lecturer-info">
          <h5>{item.position[i18n.language]}</h5>
          <h4>{item.name[i18n.language]}</h4>
        </div>
      </div>
      {progress === 0 && (
        <img
          src={PlayerImage}
          alt="play"
          className="benefits-player-icon"
          onClick={handleImageClick}
        />
      )}
    </div>
  );
}
