import "./HeaderNavigation.css";
import menu from "../../assets/menu-white.svg";

export default function HeaderNavigation() {
  return (
    <header className="header-navigation">
      <button className="menu-button">
        <img src={menu} alt="Menu button" />
      </button>
    </header>
  );
}
