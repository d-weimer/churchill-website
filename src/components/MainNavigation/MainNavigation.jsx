import { useNavigate } from "react-router-dom";
import "./MainNavigation.css";

const NAV_ITEMS = [
  { label: "Writing", path: "/writing" },
  { label: "Voice", path: "/voice" },
  { label: "Film", path: "/film" },
  { label: "Music", path: "/music" },
  { label: "Gallery", path: "/gallery" },
];

export default function MainNavigation({
  activeIndex,
  onNavigate,
  onScrollDown,
}) {
  const navigate = useNavigate();

  return (
    <nav className="main-navigation">
      <div className="main-navigation__list">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.label}
            href={item.path}
            className={`main-navigation__link ${
              index === activeIndex ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(index);
              navigate(item.path);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="main-navigation__scroll-indicator" onClick={onScrollDown}>
        <span>↓</span>
      </div>
    </nav>
  );
}
