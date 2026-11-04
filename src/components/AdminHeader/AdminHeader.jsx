import "./AdminHeader.css";
import menuIcon from "../../assets/menu-black.svg";
import closeIcon from "../../assets/menu-close-black.svg";

function AdminHeader({ onOpenMenu, onClose }) {
  return (
    <header className="admin-header">
      <button
        className="admin-header__menu-button"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
      >
        <img src={menuIcon} alt="Menu button" />
      </button>
      <h1 className="admin-header__title">ADMIN PANEL</h1>
      <button
        className="admin-header__close-button"
        onClick={onClose}
        aria-label="Exit admin panel"
      >
        <img
          src={closeIcon}
          alt="Close menu"
          className="admin-header__close-icon"
        />
      </button>
    </header>
  );
}

export default AdminHeader;
