import instagramIcon from "../assets/instagram-white-icon.svg";
import youtubeIcon from "../assets/youtube-white-icon.svg";
import bandcampIcon from "../assets/bandcamp-white-icon.svg";
import soundcloudIcon from "../assets/soundcloud-white-icon.svg";
import spotifyIcon from "../assets/spotify-white-icon.svg";
import { settingsApi } from "./settingsData";

export const SOCIALS_UPDATED_EVENT = "tec_admin_socials_updated";

export const SOCIAL_PLATFORMS = [
  { key: "instagram", label: "Instagram", icon: instagramIcon },
  { key: "youtube", label: "Youtube", icon: youtubeIcon },
  { key: "bandcamp", label: "Bandcamp", icon: bandcampIcon },
  { key: "soundcloud", label: "Soundcloud", icon: soundcloudIcon },
  { key: "spotify", label: "Spotify", icon: spotifyIcon },
];

export function getActiveSocialLinks(socialsObj = {}) {
  if (!socialsObj || typeof socialsObj !== "object") return [];

  return SOCIAL_PLATFORMS.map((platform) => ({
    ...platform,
    url:
      typeof socialsObj[platform.key] === "string"
        ? socialsObj[platform.key].trim()
        : "",
  })).filter((item) => Boolean(item.url));
}

export async function fetchActiveSocialLinks() {
  const settings = await settingsApi.getSettings();
  return getActiveSocialLinks(settings?.socials);
}
