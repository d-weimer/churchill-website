const POSTS_STORAGE_KEY = "tec_admin_posts";
const SOCIALS_STORAGE_KEY = "tec_admin_socials";
export const POSTS_UPDATED_EVENT = "tec_admin_posts_updated";

const PLATFORM_LABELS = {
  instagram: "Instagram",
  youtube: "YouTube",
  bandcamp: "Bandcamp",
  soundcloud: "SoundCloud",
  spotify: "Spotify",
};

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writePosts(posts) {
  window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  window.dispatchEvent(new CustomEvent(POSTS_UPDATED_EVENT, { detail: posts }));
}

function loadCurrentPosts() {
  const stored = readJson(POSTS_STORAGE_KEY, null);
  if (Array.isArray(stored)) {
    return stored;
  }
  const initial = [];
  writePosts(initial);
  return initial;
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
    id: `social-${link.id}`,
    title: `${link.platform} Update`,
    category: "Social",
    status: "Published",
    isFeatured: false,
    date: new Date().toISOString().split("T")[0],
    content: link.url,
    url: link.url,
    platform: link.platform,
    source: "social",
  };
}

export const postsApi = {
  getPosts: async () => {
    return [...loadCurrentPosts()];
  },

  savePost: async (formData, editingId) => {
    const posts = loadCurrentPosts();
    if (editingId) {
      const updated = posts.map((post) =>
        post.id === editingId ? { ...post, ...formData } : post,
      );
      writePosts(updated);
      return { success: true, message: "Post updated successfully!" };
    } else {
      const newEntry = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
      };
      writePosts([newEntry, ...posts]);
      return { success: true, message: "Post created successfully!" };
    }
  },

  deletePost: async (id) => {
    const posts = loadCurrentPosts().filter((post) => post.id !== id);
    writePosts(posts);
    return { success: true };
  },

  toggleFeatured: async (id) => {
    const posts = loadCurrentPosts().map((post) =>
      post.id === id ? { ...post, isFeatured: !post.isFeatured } : post,
    );
    writePosts(posts);
    return { success: true };
  },

  getSocialLinks: () => {
    const socials = readJson(SOCIALS_STORAGE_KEY, {});
    return extractSocialLinks(socials);
  },

  syncFromSocialLinks: async (
    socialsOverride = null,
    { merge = true } = {},
  ) => {
    const socials = socialsOverride || readJson(SOCIALS_STORAGE_KEY, {});
    const links = extractSocialLinks(socials);
    const current = merge ? loadCurrentPosts() : [];
    const existingById = new Map(current.map((post) => [post.id, post]));

    const socialPosts = links.map((link) => {
      const generated = buildSocialPost(link);
      const existing = existingById.get(generated.id);
      if (existing) {
        return {
          ...existing,
          content: existing.content || generated.url,
          url: generated.url,
          platform: generated.platform,
        };
      }
      return generated;
    });

    const nextPosts = merge
      ? [...socialPosts, ...current.filter((post) => post.source !== "social")]
      : socialPosts;

    writePosts(nextPosts);
    return [...nextPosts];
  },
};
