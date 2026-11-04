import "./Header.css";
import HeaderNavigation from "../HeaderNavigation/HeaderNavigation";

function Header({ onToggleMenu, isMenuOpen }) {
  return (
    <>
      <section>
        <HeaderNavigation onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />
      </section>
    </>
  );
}

export default Header;
