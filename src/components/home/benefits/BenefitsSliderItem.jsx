import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PlayerImage from "../../../assets/images/player.svg";
import "./Benefits.css";

export default function BenefitsSliderItem({
  item,
  handleClick,
  startCarousel,
}) {
  const { i18n } = useTranslation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(5000); // Default duration for images
  const [poster, setPoster] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current && isVideo(item.url)) {
      const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration * 1000);

        captureVideoFrame(1);
      };
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoRef.current.addEventListener("play", () => setIsPlaying(true));
      videoRef.current.addEventListener("pause", () => setIsPlaying(false));

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          videoRef.current.removeEventListener("play", () =>
            setIsPlaying(true)
          );
          videoRef.current.removeEventListener("pause", () =>
            setIsPlaying(false)
          );
        }
      };
    }
  }, []);

  const captureVideoFrame = (timeInSeconds) => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      videoRef.current.currentTime = timeInSeconds;

      videoRef.current.onseeked = () => {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL("image/jpeg");

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

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div className="benefits-slider-item">
      {isVideo(item.url) ? (
        <>
          <video
            crossOrigin="anonymous"
            src={`${import.meta.env.VITE_API_MEDIA_URL + item.url}`}
            className="benefits-media"
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
          {isPlaying && (
            <div className="controls">
              <button onClick={handleMute}>
                {videoRef.current?.muted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="svg"
                  >
                    <path
                      fill="#fff"
                      d="M3 9v6h4l5 5V4L7 9H3zm12 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="svg"
                  >
                    <path
                      fill="#fff"
                      d="M3 9v6h4l5 5V4L7 9H3zm9-3v6a3 0 0 0 0 0-6z"
                    />
                    <path
                      fill="#fff"
                      d="M21 12c0 1.667-.556 3.214-1.5 4.5l1.415 1.415C22.323 15.354 23 13.814 23 12s-.677-3.354-1.085-4.915l-1.415 1.415C20.444 8.786 21 10.333 21 12z"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
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
