import { useState } from "react";

import "./AdminContactModal.css";
import closeIcon from "../../assets/menu-close-black.svg";

function AdminContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Developer support email payload:", formData);
    alert("Message sent to developer!");
    setFormData({ name: "", email: "", message: "" });
    onClose();
  };

  return (
    <div className="admin-contact-modal__overlay" onClick={onClose}>
      <div
        className="admin-contact-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="admin-contact-modal__close-button" onClick={onClose}>
          <img
            src={closeIcon}
            alt="Close menu"
            className="admin-menu-overlay__close-icon"
          />
        </button>
        <h3>Contact Developer</h3>
        <form onSubmit={handleSubmit}>
          <div className="admin-contact-modal__field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="admin-contact-modal__field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="admin-contact-modal__field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>
          <button type="submit" className="admin-contact-modal__submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminContactModal;
