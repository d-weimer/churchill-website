import { useEffect, useState } from "react";
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
import {
  CREDENTIALS_UPDATED_EVENT,
  getStoredAdminCredentials,
} from "../AdminContactInfo/AdminContactInfo";

const AUTH_SESSION_KEY = "tec_admin_authenticated";
const SESSION_EMAIL_KEY = "tec_admin_session_email";

function readAuthSession() {
  try {
    return window.sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function readSessionEmail() {
  try {
    const saved = window.sessionStorage.getItem(SESSION_EMAIL_KEY);
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch {
    // Ignore storage errors in restricted browsing modes
  }
  return getStoredAdminCredentials().email;
}

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(readAuthSession);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeEmail, setActiveEmail] = useState(readSessionEmail);

  const [activeSection, setActiveSection] = useState("account");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const syncActiveEmail = () => {
      const latestEmail = getStoredAdminCredentials().email;
      setActiveEmail((prev) => {
        if (!isAuthenticated) {
          return latestEmail;
        }
        try {
          const sessionEmail = window.sessionStorage.getItem(SESSION_EMAIL_KEY);
          return sessionEmail && sessionEmail.trim()
            ? sessionEmail.trim()
            : latestEmail;
        } catch {
          return prev || latestEmail;
        }
      });
    };

    window.addEventListener(CREDENTIALS_UPDATED_EVENT, syncActiveEmail);
    window.addEventListener("storage", syncActiveEmail);
    return () => {
      window.removeEventListener(CREDENTIALS_UPDATED_EVENT, syncActiveEmail);
      window.removeEventListener("storage", syncActiveEmail);
    };
  }, [isAuthenticated]);

  const handleCloseAdmin = () => {
    navigate("/");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setAuthError("Please enter both your email and password.");
      return;
    }

    const activeCredentials = getStoredAdminCredentials();

    if (
      trimmedEmail.toLowerCase() !== activeCredentials.email.toLowerCase() ||
      trimmedPassword !== activeCredentials.password
    ) {
      setAuthError("Invalid email or password.");
      return;
    }

    try {
      window.sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      window.sessionStorage.setItem(SESSION_EMAIL_KEY, trimmedEmail);
    } catch {
      // Ignore storage errors in restricted browsing modes
    }

    setActiveEmail(trimmedEmail);
    setAuthError("");
    setPassword("");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    try {
      window.sessionStorage.removeItem(AUTH_SESSION_KEY);
      window.sessionStorage.removeItem(SESSION_EMAIL_KEY);
    } catch {
      // Ignore storage errors
    }
    setIsAuthenticated(false);
    setActiveEmail(getStoredAdminCredentials().email);
    setPassword("");
    setActiveSection("account");
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-panel admin-panel--login">
        <div className="admin-login-card">
          <p className="admin-login-card__eyebrow">ADMIN PANEL</p>
          <h1 className="admin-login-card__title">Admin Sign In</h1>
          <p className="admin-login-card__subtitle">
            Sign in to manage account details, posts, and site settings.
          </p>

          <form onSubmit={handleLoginSubmit} className="admin-login-form">
            <div className="admin-login-form__field">
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="admin-login-form__field">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {authError && (
              <p className="admin-login-form__error" role="alert">
                {authError}
              </p>
            )}

            <div className="admin-login-form__actions">
              <button type="submit" className="admin-login-form__submit">
                Log In
              </button>
              <button
                type="button"
                className="admin-login-form__back"
                onClick={handleCloseAdmin}
              >
                Back to Site
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
          <div className="admin-panel__session-bar">
            <span className="admin-panel__session-status">
              Signed in as {activeEmail}
            </span>
            <button
              type="button"
              className="admin-panel__logout-btn"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>

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
