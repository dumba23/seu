import "./TextLinkSmall.css";

export default function TextLinkSmall({ title }) {
  return (
    <a href="#" className="text-link-small">
      <span>{title}</span>
    </a>
  );
}
