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
import {
  getActiveSocialLinks,
  SOCIALS_UPDATED_EVENT,
} from "../../data/socialLinks";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState({
    siteTitle: "Thomas E. Churchill III",
    siteTagline: "",
    maintenanceMode: false,
  });
  const [activeSocials, setActiveSocials] = useState(getActiveSocialLinks);
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

  useEffect(() => {
    let isMounted = true;

    const syncSocials = async () => {
      const links = await fetchActiveSocialLinks();
      if (isMounted) {
        setActiveSocials(links);
      }
    };

    syncSocials();
    window.addEventListener(SOCIALS_UPDATED_EVENT, syncSocials);
    window.addEventListener(SETTINGS_UPDATED_EVENT, syncSocials);
    window.addEventListener("storage", syncSocials);

    return () => {
      isMounted = false;
      window.removeEventListener(SOCIALS_UPDATED_EVENT, syncSocials);
      window.removeEventListener(SETTINGS_UPDATED_EVENT, syncSocials);
      window.removeEventListener("storage", syncSocials);
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

      {activeSocials.length > 0 && (
        <section className="app__social-ribbon">
          {activeSocials.map((item) => (
            <a
              key={item.key}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="app__social-link"
            >
              <img
                className="app__social-icon"
                src={item.icon}
                alt={item.label}
              />
            </a>
          ))}
        </section>
      )}

      <Footer />
    </div>
  );
}

export default App;
