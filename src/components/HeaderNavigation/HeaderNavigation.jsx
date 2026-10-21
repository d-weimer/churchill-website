import "./HeaderNavigation.css";
import menuIcon from "../../assets/menu-white.svg";

export default function HeaderNavigation({ onToggleMenu, isMenuOpen }) {
  return (
    <header className="header-navigation">
      <button className="header-navigation__menu-button" onClick={onToggleMenu}>
        <img src={menuIcon} alt="Menu button" />
      </button>
      <a href="/churchill-website/" className="header-navigation__logo">
        TEC III
      </a>
    </header>
  );
}
