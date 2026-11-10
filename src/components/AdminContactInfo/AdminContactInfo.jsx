import { useState } from "react";

import "./AdminContactInfo.css";

function AdminContactInfo() {
  const [credentials, setCredentials] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving credentials...", credentials);
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
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
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
            value={credentials.currentPassword}
            onChange={(e) =>
              setCredentials({
                ...credentials,
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
            value={credentials.newPassword}
            onChange={(e) =>
              setCredentials({ ...credentials, newPassword: e.target.value })
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
