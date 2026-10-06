import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

function MainNavigation() {
  return (
    <>
      <section>
        <NavLink to="/writing">Writing</NavLink>
        <NavLink to="/voice-over-demos">Voice Over Demos</NavLink>
        <NavLink to="/reviews">Reviews</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/vauge-zone">Vague Zone</NavLink>
        <NavLink to="/al-patrone">Al Patrone</NavLink>
        <NavLink to="/blazewave">Blazewave</NavLink>
        <NavLink to="/sparklers">Sparklers</NavLink>
      </section>
    </>
  );
}

export default MainNavigation;
