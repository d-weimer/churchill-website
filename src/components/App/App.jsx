import { useState } from "react";

import "./App.css";
import HeaderNavigation from "../HeaderNavigation/HeaderNavigation";
import MainNavigation from "../MainNavigation/MainNavigation";
import MenuOverlay from "../MenuOverlay/MenuOverlay";
import Footer from "../Footer/Footer";
import instagramIcon from "../../assets/instagram-white-icon.svg";
import youtubeIcon from "../../assets/youtube-white-icon.svg";
import bandcampIcon from "../../assets/bandcamp-white-icon.svg";
import soundcloudIcon from "../../assets/soundcloud-white-icon.svg";
import spotifyIcon from "../../assets/spotify-white-icon.svg";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="app">
      <HeaderNavigation onToggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <MenuOverlay isOpen={isMenuOpen} onClose={toggleMenu} />

      <section className="app__main">
        <MainNavigation />
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
          className="app__ssocial-link"
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
