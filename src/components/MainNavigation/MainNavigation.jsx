import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

function MainNavigation() {
  return (
    <nav className="main-navigation">
      <div className="main-navigation__list">
        <NavLink to="/writing" className="main-navigation__link">
          Writing
        </NavLink>
        <NavLink to="/voice" className="main-navigation__link">
          Voice
        </NavLink>
        <NavLink to="/film" className="main-navigation__link">
          Film
        </NavLink>
        <NavLink to="/music" className="main-navigation__link">
          Music
        </NavLink>
        <NavLink to="/gallery" className="main-navigation__link">
          Gallery
        </NavLink>
      </div>

      <div className="main-navigation__scroll-indicator">
        <span>↓</span>
      </div>
    </nav>
  );
}

export default MainNavigation;
