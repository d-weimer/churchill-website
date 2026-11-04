import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminPanel.css";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import AdminMenuOverlay from "../AdminMenuOverlay/AdminMenuOverlay";
import AdminFooter from "../AdminFooter/AdminFooter";
import AdminContactModal from "../AdminContactModal/AdminContactModal";

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
          {activeSection === "account" && (
            <div>
              <h2>Account Workspace</h2>
              {/* Account form components will plug in here */}
            </div>
          )}
          {activeSection === "posts" && (
            <div>
              <h2>Posts Workspace</h2>
              {/* Post creation & post list components will plug in here */}
            </div>
          )}
          {activeSection === "settings" && (
            <div>
              <h2>Settings Workspace</h2>
              {/* Background video settings components will plug in here */}
            </div>
          )}
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
