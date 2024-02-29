import "./SquareLink.css";

export default function SquareLink({ link, title }) {
  return (
    <a className="square-link" href={link} target="__blank">
      {title}
    </a>
  );
}
