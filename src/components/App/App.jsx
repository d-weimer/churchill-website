import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import MenuOverlay from "../MenuOverlay/MenuOverlay";
import Footer from "../Footer/Footer";

import Writing from "../Writing/Writing";
import Voice from "../Voice/Voice";
import Film from "../Film/Film";
import Music from "../Music/Music";
import Gallery from "../Gallery/Gallery";

import AdminPanel from "../AdminPanel/AdminPanel";
import { settingsApi } from "../../data/settingsData";
import { SETTINGS_UPDATED_EVENT } from "../AdminSettings/AdminSettings";

import instagramIcon from "../../assets/instagram-white-icon.svg";
import youtubeIcon from "../../assets/youtube-white-icon.svg";
import bandcampIcon from "../../assets/bandcamp-white-icon.svg";
import soundcloudIcon from "../../assets/soundcloud-white-icon.svg";
import spotifyIcon from "../../assets/spotify-white-icon.svg";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState({
    siteTitle: "Thomas E. Churchill III",
    siteTagline: "",
    maintenanceMode: false,
  });
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const syncSettings = async () => {
      const data = await settingsApi.getSettings();
      if (!isMounted) return;

      const title =
        typeof data?.siteTitle === "string" && data.siteTitle.trim()
          ? data.siteTitle.trim()
          : "Thomas E. Churchill III";
      const tagline =
        typeof data?.siteTagline === "string" ? data.siteTagline.trim() : "";
      const maintenance = Boolean(data?.maintenanceMode);

      document.title = title;
      setSiteConfig({
        siteTitle: title,
        siteTagline: tagline,
        maintenanceMode: maintenance,
      });
    };

    syncSettings();
    window.addEventListener(SETTINGS_UPDATED_EVENT, syncSettings);
    window.addEventListener("storage", syncSettings);

    return () => {
      isMounted = false;
      window.removeEventListener(SETTINGS_UPDATED_EVENT, syncSettings);
      window.removeEventListener("storage", syncSettings);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    );
  }

  if (siteConfig.maintenanceMode) {
    return (
      <div className="app app--maintenance">
        <div className="app__maintenance-card">
          <h1 className="app__maintenance-title">{siteConfig.siteTitle}</h1>
          {siteConfig.siteTagline && (
            <p className="app__maintenance-tagline">{siteConfig.siteTagline}</p>
          )}
          <p className="app__maintenance-message">
            We are currently performing scheduled maintenance. Please check back
            soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header onToggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <MenuOverlay isOpen={isMenuOpen} onClose={toggleMenu} />

      <section className="app__main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/film" element={<Film />} />
          <Route path="/music" element={<Music />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </section>

      <section className="app__social-ribbon">
        <a
          href="https://www.instagram.com/alpatrone"
          target="_blank"
          rel="noreferrer"
          className="app__social-link"
        >
          <img
            className="app__social-icon"
            src={instagramIcon}
            alt="Instagram"
          />
        </a>
        <a
          href="https://www.youtube.com/@ThomasChurchill3"
          target="_blank"
          rel="noreferrer"
          className="app__social-link"
        >
          <img className="app__social-icon" src={youtubeIcon} alt="Youtube" />
        </a>
        <a
          href="https://92510.bandcamp.com/"
          target="_blank"
          rel="noreferrer"
          className="app__social-link"
        >
          <img className="app__social-icon" src={bandcampIcon} alt="Bandcamp" />
        </a>
        <a
          href="https://soundcloud.com/al_patrone"
          target="_blank"
          rel="noreferrer"
          className="app__social-link"
        >
          <img
            className="app__social-icon"
            src={soundcloudIcon}
            alt="Soundcloud"
          />
        </a>
        <a
          href="https://open.spotify.com/show/2o1AXeBez5rTQbhX39Ulmk"
          target="_blank"
          rel="noreferrer"
          className="app__social-link"
        >
          <img className="app__social-icon" src={spotifyIcon} alt="Spotify" />
        </a>
      </section>

      <Footer />
    </div>
  );
}

export default App;
