import { useEffect, useState } from "react";

import "./AdminContactInfo.css";

export const CREDENTIALS_STORAGE_KEY = "tec_admin_credentials";
export const CREDENTIALS_UPDATED_EVENT = "tec_admin_credentials_updated";

const DEFAULT_TEST_EMAIL = (
  import.meta.env.VITE_ADMIN_USER || "thomas@example.com"
).trim();
const DEFAULT_TEST_PASS = (
  import.meta.env.VITE_ADMIN_PASS || "TestPass123!"
).trim();

export function getStoredAdminCredentials() {
  try {
    const raw = window.localStorage.getItem(CREDENTIALS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const email =
          typeof parsed.email === "string" && parsed.email.trim()
            ? parsed.email.trim()
            : DEFAULT_TEST_EMAIL;
        const password =
          typeof parsed.password === "string" && parsed.password.trim()
            ? parsed.password
            : DEFAULT_TEST_PASS;
        return { email, password };
      }
    }
  } catch {
    // Fall back to default test credentials if storage is unavailable
  }

  return {
    email: DEFAULT_TEST_EMAIL,
    password: DEFAULT_TEST_PASS,
  };
}

function AdminContactInfo() {
  const [formState, setFormState] = useState(() => ({
    email: getStoredAdminCredentials().email,
    currentPassword: "",
    newPassword: "",
  }));

  useEffect(() => {
    const syncEmail = () => {
      const stored = getStoredAdminCredentials();
      setFormState((prev) => ({
        ...prev,
        email: stored.email,
      }));
    };

    window.addEventListener(CREDENTIALS_UPDATED_EVENT, syncEmail);
    window.addEventListener("storage", syncEmail);
    return () => {
      window.removeEventListener(CREDENTIALS_UPDATED_EVENT, syncEmail);
      window.removeEventListener("storage", syncEmail);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = formState.email.trim();
    const enteredCurrentPassword = formState.currentPassword;
    const trimmedNewPassword = formState.newPassword.trim();

    if (!trimmedEmail) {
      alert("Please enter a valid login email.");
      return;
    }

    const activeCredentials = getStoredAdminCredentials();

    if (enteredCurrentPassword !== activeCredentials.password) {
      alert("Current password is incorrect.");
      return;
    }

    const updatedCredentials = {
      email: trimmedEmail,
      password: trimmedNewPassword || activeCredentials.password,
    };

    try {
      window.localStorage.setItem(
        CREDENTIALS_STORAGE_KEY,
        JSON.stringify(updatedCredentials),
      );
      window.dispatchEvent(
        new CustomEvent(CREDENTIALS_UPDATED_EVENT, {
          detail: { email: updatedCredentials.email },
        }),
      );
    } catch {
      alert("Unable to save credentials in browser storage.");
      return;
    }

    setFormState({
      email: updatedCredentials.email,
      currentPassword: "",
      newPassword: "",
    });

    alert("Login credentials updated successfully!");
  };

  return (
    <section className="contact-info-form">
      <h3>Change Contact Information</h3>
      <form onSubmit={handleSubmit} className="contact-info-form__body">
        <div className="contact-info-form__field">
          <label htmlFor="admin-email">Login Email</label>
          <input
            id="admin-email"
            type="email"
            placeholder="Enter email"
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            required
          />
        </div>
        <div className="contact-info-form__field">
          <label htmlFor="current-password">Current Password</label>
          <input
            id="current-password"
            type="password"
            placeholder="••••••••"
            value={formState.currentPassword}
            onChange={(e) =>
              setFormState({
                ...formState,
                currentPassword: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="contact-info-form__field">
          <label htmlFor="new-password">New Password (Optional)</label>
          <input
            id="new-password"
            type="password"
            placeholder="Leave blank to keep current"
            value={formState.newPassword}
            onChange={(e) =>
              setFormState({ ...formState, newPassword: e.target.value })
            }
          />
        </div>
        <button type="submit" className="contact-info-form__submit-btn">
          Save Credentials
        </button>
      </form>
    </section>
  );
}

export default AdminContactInfo;
