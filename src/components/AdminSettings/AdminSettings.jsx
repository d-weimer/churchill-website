import { useState, useEffect } from "react";

import "./AdminSettings.css";
import { settingsApi } from "../../data/settingsData";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteTitle: "",
    siteTagline: "",
    postsPerPage: "10",
    enableComments: true,
    maintenanceMode: false,
    writingVideoUrl: "",
    voiceVideoUrl: "",
    filmVideoUrl: "",
    musicVideoUrl: "",
    galleryVideoUrl: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await settingsApi.getSettings();
    setSettings(data);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await settingsApi.saveSettings(settings);
    if (res.success) {
      alert(res.message);
    }
  };

  if (isLoading) {
    return <div className="admin-settings">Loading settings...</div>;
  }

  return (
    <div className="admin-settings">
      <div className="admin-settings__header-row">
        <h2>Settings Workspace</h2>
      </div>

      <form onSubmit={handleSubmit} className="admin-settings__form">
        <section className="admin-settings__section">
          <h3>General Site Configuration</h3>

          <div className="admin-settings__field">
            <label htmlFor="siteTitle">Site Title</label>
            <input
              type="text"
              id="siteTitle"
              name="siteTitle"
              value={settings.siteTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-settings__field">
            <label htmlFor="siteTagline">Site Tagline</label>
            <input
              type="text"
              id="siteTagline"
              name="siteTagline"
              value={settings.siteTagline}
              onChange={handleChange}
            />
          </div>

          <div className="admin-settings__field">
            <label htmlFor="postsPerPage">Posts Displayed Per Page</label>
            <select
              id="postsPerPage"
              name="postsPerPage"
              value={settings.postsPerPage}
              onChange={handleChange}
            >
              <option value="5">5 Posts</option>
              <option value="10">10 Posts</option>
              <option value="20">20 Posts</option>
              <option value="50">50 Posts</option>
            </select>
          </div>
        </section>

        <section className="admin-settings__section">
          <h3>Background Video URLs (Main Page)</h3>

          <div className="admin-settings__field">
            <label htmlFor="writingVideoUrl">
              Writing Background Video URL
            </label>
            <input
              type="text"
              id="writingVideoUrl"
              name="writingVideoUrl"
              placeholder="Enter video URL..."
              value={settings.writingVideoUrl}
              onChange={handleChange}
            />
          </div>

          <div className="admin-settings__field">
            <label htmlFor="voiceVideoUrl">Voice Background Video URL</label>
            <input
              type="text"
              id="voiceVideoUrl"
              name="voiceVideoUrl"
              placeholder="Enter video URL..."
              value={settings.voiceVideoUrl}
              onChange={handleChange}
            />
          </div>

          <div className="admin-settings__field">
            <label htmlFor="filmVideoUrl">Film Background Video URL</label>
            <input
              type="text"
              id="filmVideoUrl"
              name="filmVideoUrl"
              placeholder="Enter video URL..."
              value={settings.filmVideoUrl}
              onChange={handleChange}
            />
          </div>

          <div className="admin-settings__field">
            <label htmlFor="musicVideoUrl">Music Background Video URL</label>
            <input
              type="text"
              id="musicVideoUrl"
              name="musicVideoUrl"
              placeholder="Enter video URL..."
              value={settings.musicVideoUrl}
              onChange={handleChange}
            />
          </div>

          <div className="admin-settings__field">
            <label htmlFor="galleryVideoUrl">
              Gallery Background Video URL
            </label>
            <input
              type="text"
              id="galleryVideoUrl"
              name="galleryVideoUrl"
              placeholder="Enter video URL..."
              value={settings.galleryVideoUrl}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="admin-settings__section">
          <h3>System Preferences & Controls</h3>

          <div className="admin-settings__checkbox-field">
            <label>
              <input
                type="checkbox"
                name="enableComments"
                checked={settings.enableComments}
                onChange={handleChange}
              />
              Enable public comments/interaction on entries
            </label>
          </div>

          <div className="admin-settings__checkbox-field">
            <label>
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
              Enable Maintenance Mode (Displays a temporary landing screen to
              visitors)
            </label>
          </div>
        </section>

        <div className="admin-settings__actions">
          <button type="submit" className="admin-settings__save-btn">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
