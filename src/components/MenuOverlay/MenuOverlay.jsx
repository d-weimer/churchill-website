import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import "./MenuOverlay.css";
import closeIcon from "../../assets/menu-close.svg";
import {
  getActiveSocialLinks,
  SOCIALS_UPDATED_EVENT,
} from "../../data/socialLinks";

export default function MenuOverlay({ isOpen, onClose }) {
  const [activeSocials, setActiveSocials] = useState(getActiveSocialLinks);

  useEffect(() => {
    const syncSocials = () => {
      setActiveSocials(getActiveSocialLinks());
    };

    syncSocials();
    window.addEventListener(SOCIALS_UPDATED_EVENT, syncSocials);
    window.addEventListener("storage", syncSocials);

    return () => {
      window.removeEventListener(SOCIALS_UPDATED_EVENT, syncSocials);
      window.removeEventListener("storage", syncSocials);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body--menu-open");
    } else {
      document.body.classList.remove("body--menu-open");
    }

    return () => {
      document.body.classList.remove("body--menu-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="menu-overlay">
      <div className="menu-overlay__header">
        <button
          className="menu-overlay__close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <img
            src={closeIcon}
            alt="Close menu"
            className="menu-overlay__close-icon"
          />
        </button>

        <Link to="/" className="menu-overlay__logo" onClick={onClose}>
          TEC III
        </Link>
      </div>

      <nav className="menu-overlay__navigation">
        <NavLink to="/writing" className="menu-overlay__link" onClick={onClose}>
          Writing
        </NavLink>
        <NavLink to="/voice" className="menu-overlay__link" onClick={onClose}>
          Voice
        </NavLink>
        <NavLink to="/film" className="menu-overlay__link" onClick={onClose}>
          Film
        </NavLink>
        <NavLink to="/music" className="menu-overlay__link" onClick={onClose}>
          Music
        </NavLink>
        <NavLink to="/gallery" className="menu-overlay__link" onClick={onClose}>
          Gallery
        </NavLink>
      </nav>

      {activeSocials.length > 0 && (
        <section className="menu-overlay__social-ribbon">
          {activeSocials.map((item) => (
            <a
              key={item.key}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="menu-overlay__social-link"
            >
              <img
                className="menu-overlay__social-icon"
                src={item.icon}
                alt={item.label}
              />
            </a>
          ))}
        </section>
      )}
    </div>
  );
}
