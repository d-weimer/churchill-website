import { apiRequest } from "../utils/api";

export const defaultSettings = {
  siteTitle: "Thomas E. Churchill III",
  siteTagline: "Writer, Filmmaker, and Creator",
  postsPerPage: "10",
  enableComments: true,
  maintenanceMode: false,
  writingVideoUrl: "",
  voiceVideoUrl: "",
  filmVideoUrl: "",
  musicVideoUrl: "",
  galleryVideoUrl: "",
  socials: {
    instagram: "",
    youtube: "",
    bandcamp: "",
    soundcloud: "",
    spotify: "",
  },
};

function normalizeSettings(data = {}) {
  return {
    ...defaultSettings,
    ...data,
    siteTitle:
      typeof data.siteTitle === "string" && data.siteTitle.trim()
        ? data.siteTitle
        : defaultSettings.siteTitle,
    siteTagline:
      typeof data.siteTagline === "string"
        ? data.siteTagline
        : defaultSettings.siteTagline,
    maintenanceMode: Boolean(data.maintenanceMode),
    socials: {
      ...defaultSettings.socials,
      ...(data.socials && typeof data.socials === "object" ? data.socials : {}),
    },
  };
}

export const settingsApi = {
  getSettings: async () => {
    try {
      const data = await apiRequest("/settings");
      return normalizeSettings(data);
    } catch (err) {
      console.error("Failed to load settings from API:", err);
      return { ...defaultSettings };
    }
  },

  saveSettings: async (newSettings) => {
    const payload = {
      siteTitle: newSettings.siteTitle,
      siteTagline: newSettings.siteTagline,
      maintenanceMode: Boolean(newSettings.maintenanceMode),
      socials: {
        instagram: newSettings.socials?.instagram || "",
        youtube: newSettings.socials?.youtube || "",
        bandcamp: newSettings.socials?.bandcamp || "",
        soundcloud: newSettings.socials?.soundcloud || "",
        spotify: newSettings.socials?.spotify || "",
      },
    };

    const saved = await apiRequest("/settings", {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    const normalized = normalizeSettings({ ...newSettings, ...saved });
    window.dispatchEvent(new Event("storage"));

    return {
      success: true,
      settings: normalized,
      message: "Settings saved to database successfully!",
    };
  },
};
