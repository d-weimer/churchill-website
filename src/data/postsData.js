let mockPosts = [
  {
    id: "1",
    title: "Sample Writing Entry",
    category: "Writing",
    status: "Published",
    isFeatured: true,
    date: "2026-04-28",
    content: "Sample content...",
  },
  {
    id: "2",
    title: "New Film Preview",
    category: "Film",
    status: "Draft",
    isFeatured: false,
    date: "2026-04-29",
    content: "Preview content...",
  },
  {
    id: "3",
    title: "Behind the scenes update on location",
    category: "Social",
    status: "Published",
    isFeatured: false,
    date: "2026-04-30",
    content: "Quick update from the set! Check out the latest photos...",
  },
];

export const postsApi = {
  getPosts: async () => {
    return [...mockPosts];
  },

  savePost: async (formData, editingId) => {
    if (editingId) {
      mockPosts = mockPosts.map((post) =>
        post.id === editingId ? { ...post, ...formData } : post,
      );
      return { success: true, message: "Post updated successfully!" };
    } else {
      const newEntry = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
      };
      mockPosts = [newEntry, ...mockPosts];
      return { success: true, message: "Post created successfully!" };
    }
  },

  deletePost: async (id) => {
    mockPosts = mockPosts.filter((post) => post.id !== id);
    return { success: true };
  },

  toggleFeatured: async (id) => {
    mockPosts = mockPosts.map((post) =>
      post.id === id ? { ...post, isFeatured: !post.isFeatured } : post,
    );
    return { success: true };
  },
};
