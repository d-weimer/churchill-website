import "./AdminSideBar.css";

function AdminSideBar({ activeSection, onSelectSection }) {
  const navItems = [
    { id: "account", label: "Account" },
    { id: "posts", label: "Posts" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside className="admin-sidebar">
      <nav className="admin-sidebar__navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`admin-sidebar__link ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => onSelectSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSideBar;
