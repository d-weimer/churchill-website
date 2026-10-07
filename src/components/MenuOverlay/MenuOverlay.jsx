import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

import "./MenuOverlay.css";
import closeIcon from "../../assets/menu-close.svg";
import instagramIcon from "../../assets/instagram-white-icon.svg";
import youtubeIcon from "../../assets/youtube-white-icon.svg";
import bandcampIcon from "../../assets/bandcamp-white-icon.svg";
import soundcloudIcon from "../../assets/soundcloud-white-icon.svg";
import spotifyIcon from "../../assets/spotify-white-icon.svg";

export default function MenuOverlay({ isOpen, onClose }) {
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

      <section className="menu-overlay__social-ribbon">
        <a
          href="https://www.instagram.com/alpatrone"
          target="_blank"
          rel="noreferrer"
          className="menu-overlay__social-link"
        >
          <img
            className="menu-overlay__social-icon"
            src={instagramIcon}
            alt="Instagram"
          />
        </a>
        <a
          href="https://www.youtube.com/@ThomasChurchill3"
          target="_blank"
          rel="noreferrer"
          className="menu-overlay__social-link"
        >
          <img
            className="menu-overlay__social-icon"
            src={youtubeIcon}
            alt="Youtube"
          />
        </a>
        <a
          href="https://92510.bandcamp.com/"
          target="_blank"
          rel="noreferrer"
          className="menu-overlay__social-link"
        >
          <img
            className="menu-overlay__social-icon"
            src={bandcampIcon}
            alt="Bandcamp"
          />
        </a>
        <a
          href="https://soundcloud.com/al_patrone"
          target="_blank"
          rel="noreferrer"
          className="menu-overlay__social-link"
        >
          <img
            className="menu-overlay__social-icon"
            src={soundcloudIcon}
            alt="Soundcloud"
          />
        </a>
        <a
          href="https://open.spotify.com/show/2o1AXeBez5rTQbhX39Ulmk"
          target="_blank"
          rel="noreferrer"
          className="menu-overlay__social-link"
        >
          <img
            className="menu-overlay__social-icon"
            src={spotifyIcon}
            alt="Spotify"
          />
        </a>
      </section>
    </div>
  );
}
