import { apiRequest } from "../utils/api";
import { settingsApi } from "./settingsData";

export const POSTS_UPDATED_EVENT = "tec_admin_posts_updated";

const PLATFORM_LABELS = {
  instagram: "Instagram",
  youtube: "YouTube",
  bandcamp: "Bandcamp",
  soundcloud: "SoundCloud",
  spotify: "Spotify",
};

function emitPostsUpdated(posts) {
  window.dispatchEvent(new CustomEvent(POSTS_UPDATED_EVENT, { detail: posts }));
}

function extractSocialLinks(socials) {
  if (!socials || typeof socials !== "object") return [];

  return Object.entries(PLATFORM_LABELS)
    .map(([key, platform]) => ({
      id: key,
      platform,
      url: typeof socials[key] === "string" ? socials[key].trim() : "",
    }))
    .filter((item) => Boolean(item.url));
}

function buildSocialPost(link) {
  return {
    title: `${link.platform} Update`,
    category: "Social",
    status: "Published",
    isFeatured: false,
    date: new Date().toISOString().split("T")[0],
    content: link.url,
    url: link.url,
    platform: link.platform,
    source: "social",
    socialKey: `social-${link.id}`,
  };
}

export const postsApi = {
  getPosts: async ({ includeDrafts = true } = {}) => {
    try {
      const endpoint = includeDrafts ? "/posts/all" : "/posts";
      const posts = await apiRequest(endpoint);
      return Array.isArray(posts) ? posts : [];
    } catch {
      // Fallback to public published posts if unauthenticated on /posts/all
      const posts = await apiRequest("/posts");
      return Array.isArray(posts) ? posts : [];
    }
  },

  savePost: async (formData, editingId) => {
    if (editingId) {
      await apiRequest(`/posts/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      const updated = await postsApi.getPosts();
      emitPostsUpdated(updated);
      return { success: true, message: "Post updated successfully!" };
    }

    const payload = {
      ...formData,
      date: formData.date || new Date().toISOString().split("T")[0],
    };
    await apiRequest("/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const updated = await postsApi.getPosts();
    emitPostsUpdated(updated);
    return { success: true, message: "Post created successfully!" };
  },

  deletePost: async (id) => {
    await apiRequest(`/posts/${id}`, {
      method: "DELETE",
    });
    const updated = await postsApi.getPosts();
    emitPostsUpdated(updated);
    return { success: true };
  },

  toggleFeatured: async (id) => {
    const currentPosts = await postsApi.getPosts();
    const target = currentPosts.find((post) => post.id === id);
    if (!target) return { success: false };

    await apiRequest(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isFeatured: !target.isFeatured }),
    });
    const updated = await postsApi.getPosts();
    emitPostsUpdated(updated);
    return { success: true };
  },

  getSocialLinks: async () => {
    const settings = await settingsApi.getSettings();
    return extractSocialLinks(settings?.socials);
  },

  syncFromSocialLinks: async (socialsOverride = null) => {
    const settings = socialsOverride
      ? { socials: socialsOverride }
      : await settingsApi.getSettings();
    const links = extractSocialLinks(settings?.socials);
    const current = await postsApi.getPosts();
    const existingSocialByKey = new Map(
      current
        .filter((post) => post.source === "social" && post.socialKey)
        .map((post) => [post.socialKey, post]),
    );

    for (const link of links) {
      const generated = buildSocialPost(link);
      const existing = existingSocialByKey.get(generated.socialKey);
      if (existing) {
        await apiRequest(`/posts/${existing.id}`, {
          method: "PUT",
          body: JSON.stringify({
            content: existing.content || generated.url,
            url: generated.url,
            platform: generated.platform,
          }),
        });
      } else {
        await apiRequest("/posts", {
          method: "POST",
          body: JSON.stringify(generated),
        });
      }
    }

    const nextPosts = await postsApi.getPosts();
    emitPostsUpdated(nextPosts);
    return nextPosts;
  },
};
