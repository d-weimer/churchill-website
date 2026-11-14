const STORAGE_KEY = "tec_admin_settings";

const defaultSettings = {
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
};

export const settingsApi = {
  getSettings: async () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
    return { ...defaultSettings };
  },

  saveSettings: async (newSettings) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    window.dispatchEvent(new Event("storage"));
    return {
      success: true,
      message: "Settings and video backgrounds saved successfully!",
    };
  },
};
