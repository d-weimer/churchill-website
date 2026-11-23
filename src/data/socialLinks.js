import instagramIcon from "../assets/instagram-white-icon.svg";
import youtubeIcon from "../assets/youtube-white-icon.svg";
import bandcampIcon from "../assets/bandcamp-white-icon.svg";
import soundcloudIcon from "../assets/soundcloud-white-icon.svg";
import spotifyIcon from "../assets/spotify-white-icon.svg";

export const SOCIALS_STORAGE_KEY = "tec_admin_socials";
export const SOCIALS_UPDATED_EVENT = "tec_admin_socials_updated";

export const SOCIAL_PLATFORMS = [
  { key: "instagram", label: "Instagram", icon: instagramIcon },
  { key: "youtube", label: "Youtube", icon: youtubeIcon },
  { key: "bandcamp", label: "Bandcamp", icon: bandcampIcon },
  { key: "soundcloud", label: "Soundcloud", icon: soundcloudIcon },
  { key: "spotify", label: "Spotify", icon: spotifyIcon },
];

export function getActiveSocialLinks() {
  try {
    const raw = window.localStorage.getItem(SOCIALS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return [];

    return SOCIAL_PLATFORMS.map((platform) => ({
      ...platform,
      url:
        typeof parsed[platform.key] === "string"
          ? parsed[platform.key].trim()
          : "",
    })).filter((item) => Boolean(item.url));
  } catch {
    return [];
  }
}
