import { useState } from "react";

import "./AdminSocialLinks.css";

function AdminSocialLinks() {
  const [socials, setSocials] = useState({
    instagram: "",
    youtube: "",
    bandcamp: "",
    soundcloud: "",
    spotify: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving social links...", socials);
    alert("Social links updated successfully!");
  };

  return (
    <section className="social-links-form">
      <h3>Link Socials</h3>
      <form onSubmit={handleSubmit} className="social-links-form__body">
        <div className="social-links-form__field">
          <label htmlFor="social-instagram">Instagram URL</label>
          <input
            id="social-instagram"
            type="url"
            placeholder="https://www.instagram.com/..."
            value={socials.instagram}
            onChange={(e) =>
              setSocials({ ...socials, instagram: e.target.value })
            }
          />
        </div>
        <div className="social-links-form__field">
          <label htmlFor="social-youtube">YouTube URL</label>
          <input
            id="social-youtube"
            type="url"
            placeholder="https://www.youtube.com/..."
            value={socials.youtube}
            onChange={(e) =>
              setSocials({ ...socials, youtube: e.target.value })
            }
          />
        </div>
        <div className="social-links-form__field">
          <label htmlFor="social-bandcamp">Bandcamp URL</label>
          <input
            id="social-bandcamp"
            type="url"
            placeholder="https://yourband.bandcamp.com"
            value={socials.bandcamp}
            onChange={(e) =>
              setSocials({ ...socials, bandcamp: e.target.value })
            }
          />
        </div>
        <div className="social-links-form__field">
          <label htmlFor="social-soundcloud">SoundCloud URL</label>
          <input
            id="social-soundcloud"
            type="url"
            placeholder="https://soundcloud.com/..."
            value={socials.soundcloud}
            onChange={(e) =>
              setSocials({ ...socials, soundcloud: e.target.value })
            }
          />
        </div>
        <div className="social-links-form__field">
          <label htmlFor="social-spotify">Spotify URL</label>
          <input
            id="social-spotify"
            type="url"
            placeholder="https://open.spotify.com/..."
            value={socials.spotify}
            onChange={(e) =>
              setSocials({ ...socials, spotify: e.target.value })
            }
          />
        </div>
        <button type="submit" className="social-links-form__submit-btn">
          Save Social Links
        </button>
      </form>
    </section>
  );
}

export default AdminSocialLinks;
