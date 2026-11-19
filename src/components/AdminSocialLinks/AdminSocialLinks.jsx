import { useEffect, useState } from "react";

import "./AdminSocialLinks.css";
import { postsApi } from "../../data/postsData";

const SOCIALS_STORAGE_KEY = "tec_admin_socials";

const INITIAL_SOCIALS = {
  instagram: "",
  youtube: "",
  bandcamp: "",
  soundcloud: "",
  spotify: "",
};

function readSavedSocials() {
  try {
    const raw = window.localStorage.getItem(SOCIALS_STORAGE_KEY);
    if (!raw) return { ...INITIAL_SOCIALS };
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_SOCIALS,
      ...(parsed && typeof parsed === "object" ? parsed : {}),
    };
  } catch {
    return { ...INITIAL_SOCIALS };
  }
}

function AdminSocialLinks() {
  const [socials, setSocials] = useState(readSavedSocials);

  useEffect(() => {
    setSocials(readSavedSocials());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalized = {
      instagram: (socials.instagram || "").trim(),
      youtube: (socials.youtube || "").trim(),
      bandcamp: (socials.bandcamp || "").trim(),
      soundcloud: (socials.soundcloud || "").trim(),
      spotify: (socials.spotify || "").trim(),
    };

    window.localStorage.setItem(
      SOCIALS_STORAGE_KEY,
      JSON.stringify(normalized),
    );
    setSocials(normalized);

    await postsApi.syncFromSocialLinks(normalized);
    console.log("Saved social links:", normalized);
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
