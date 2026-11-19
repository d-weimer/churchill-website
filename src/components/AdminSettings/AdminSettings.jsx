import { useState, useEffect } from "react";

import "./AdminSettings.css";
import { settingsApi } from "../../data/settingsData";

export const SETTINGS_UPDATED_EVENT = "tec_admin_settings_updated";

const DEFAULT_SETTINGS = {
  siteTitle: "Thomas E. Churchill III",
  siteTagline: "",
  maintenanceMode: false,
  writingVideoUrl: "",
  voiceVideoUrl: "",
  filmVideoUrl: "",
  musicVideoUrl: "",
  galleryVideoUrl: "",
};

function applyDocumentTitle(title) {
  const trimmed = typeof title === "string" ? title.trim() : "";
  if (trimmed) {
    document.title = title;
  }
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await settingsApi.getSettings();
    const {
      postsPerPage: _removedPostsPerPage,
      enableComments: _removedEnableComments,
      ...rest
    } = data || {};
    const merged = { ...DEFAULT_SETTINGS, ...rest };
    setSettings(merged);
    applyDocumentTitle(merged.siteTitle);
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
    const normalized = {
      ...settings,
      siteTitle: (settings.siteTitle || "").trim(),
      siteTagline: (settings.siteTagline || "").trim(),
    };

    const res = await settingsApi.saveSettings(normalized);
    if (res.success) {
      setSettings(normalized);
      applyDocumentTitle(normalized.siteTitle);
      window.dispatchEvent(
        new CustomEvent(SETTINGS_UPDATED_EVENT, { detail: normalized }),
      );
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
