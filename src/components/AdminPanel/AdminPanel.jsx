import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminPanel.css";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import AdminMenuOverlay from "../AdminMenuOverlay/AdminMenuOverlay";
import AdminFooter from "../AdminFooter/AdminFooter";
import AdminContactModal from "../AdminContactModal/AdminContactModal";
import AdminAccount from "../AdminAccount/AdminAccount";
import AdminPosts from "../AdminPosts/AdminPosts";
import AdminSettings from "../AdminSettings/AdminSettings";

function AdminPanel() {
  const [activeSection, setActiveSection] = useState("account");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const navigate = useNavigate();

  const handleCloseAdmin = () => {
    navigate("/");
  };

  return (
    <div className="admin-panel">
      <AdminHeader
        onOpenMenu={() => setIsMenuOpen(true)}
        onClose={handleCloseAdmin}
      />

      <AdminMenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      <div className="admin-panel__body">
        <AdminSideBar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        <main className="admin-panel__workspace">
          {activeSection === "account" && <AdminAccount />}
          {activeSection === "posts" && <AdminPosts />}
          {activeSection === "settings" && <AdminSettings />}
        </main>
      </div>

      <AdminFooter onOpenContact={() => setIsContactOpen(true)} />

      <AdminContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default AdminPanel;
