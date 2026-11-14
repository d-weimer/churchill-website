import { useState, useEffect } from "react";

import "./AdminPosts.css";
import AdminNewPostModal from "../AdminNewPostModal/AdminNewPostModal";
import { postsApi } from "../../data/postsData";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedIds, setExpandedIds] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    category: "Writing",
    status: "Published",
    isFeatured: false,
    content: "",
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await postsApi.getPosts();
    setPosts(data);
  };

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Writing",
      status: "Published",
      isFeatured: false,
      content: "",
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      status: post.status,
      isFeatured: !!post.isFeatured,
      content: post.content || "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const res = await postsApi.savePost(formData, editingId);
    if (res.success) {
      alert(res.message);
      loadPosts();
    }

    handleCloseModal();
  };

  const handleDeletePost = async (post) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${post.title}"? This action cannot be undone.`,
    );
    if (!confirmed) return;

    await postsApi.deletePost(post.id);
    loadPosts();
  };

  const handleToggleFeatured = async (id) => {
    await postsApi.toggleFeatured(id);
    loadPosts();
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="admin-posts">
      <div className="admin-posts__header-row">
        <h2>Posts Workspace</h2>
        <button
          className="admin-posts__create-trigger-btn"
          onClick={handleOpenCreateModal}
        >
          + Create New Post
        </button>
      </div>

      <section className="admin-posts__section">
        <h3>Manage Posts</h3>
        {posts.length === 0 ? (
          <p className="admin-posts__empty">No posts available yet.</p>
        ) : (
          <div className="admin-posts__table-wrapper">
            <table className="admin-posts__table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  const isExpanded = !!expandedIds[post.id];
                  return (
                    <tr
                      key={post.id}
                      className={isExpanded ? "is-expanded" : "is-collapsed"}
                    >
                      <td
                        className="admin-posts__title-cell"
                        data-label="Title"
                        onClick={() => toggleExpand(post.id)}
                      >
                        <span className="admin-posts__title-text">
                          {post.title}
                        </span>
                        <span className="admin-posts__expand-indicator">
                          {isExpanded ? "▲" : "▼"}
                        </span>
                      </td>
                      <td data-label="Category">{post.category}</td>
                      <td data-label="Status">
                        <span
                          className={`admin-posts__badge admin-posts__badge--${post.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td data-label="Featured">
                        <button
                          className={`admin-posts__featured-toggle ${
                            post.isFeatured ? "is-featured" : ""
                          }`}
                          onClick={() => handleToggleFeatured(post.id)}
                          title="Click to toggle featured status"
                        >
                          {post.isFeatured ? "★ Featured" : "☆ Unfeatured"}
                        </button>
                      </td>
                      <td data-label="Date">{post.date}</td>
                      <td
                        className="admin-posts__actions-cell"
                        data-label="Actions"
                      >
                        <button
                          className="admin-posts__edit-btn"
                          onClick={() => handleEditClick(post)}
                        >
                          Edit
                        </button>
                        <button
                          className="admin-posts__delete-btn"
                          onClick={() => handleDeletePost(post)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <AdminNewPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        editingId={editingId}
      />
    </div>
  );
}
