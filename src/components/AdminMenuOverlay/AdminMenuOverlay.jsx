import "./AdminMenuOverlay.css";
import closeIcon from "../../assets/menu-close-black.svg";

function AdminMenuOverlay({ isOpen, onClose, activeSection, onSelectSection }) {
  if (!isOpen) return null;

  const navItems = [
    { id: "account", label: "Account" },
    { id: "posts", label: "Posts" },
    { id: "settings", label: "Settings" },
  ];

  const handleSelect = (id) => {
    onSelectSection(id);
    onClose();
  };

  return (
    <div className="admin-menu-overlay">
      <button
        className="admin-menu-overlay__close-button"
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        <img
          src={closeIcon}
          alt="Close menu"
          className="admin-menu-overlay__close-icon"
        />
      </button>
      <nav className="admin-menu-overlay__navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`admin-menu-overlay__link ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => handleSelect(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default AdminMenuOverlay;
