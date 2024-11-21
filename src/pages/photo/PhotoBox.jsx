import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PhotoBox({ data }) {
  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const coverPhoto = data.photos.find((photo) => photo.cover === 1);
  return (
    <div
      className="video-box"
      onClick={() => navigate("/photos/" + data.id + `?lang=${i18n.language}`)}
    >
      <div
        className="video-cover"
        style={{
          backgroundImage: `url(${
            import.meta.env.VITE_API_MEDIA_URL + coverPhoto?.image
          })`,
        }}
      />

      <h3>{data.description[i18n.language]}</h3>
    </div>
  );
}
