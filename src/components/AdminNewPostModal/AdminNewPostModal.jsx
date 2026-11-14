import "./AdminNewPostModal.css";

export default function AdminNewPostModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  editingId,
}) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3>{editingId ? "Edit Post" : "Create New Post"}</h3>
          <button className="admin-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="admin-modal__form">
          <div className="admin-modal__field">
            <label htmlFor="post-title">Title</label>
            <input
              id="post-title"
              type="text"
              placeholder="Enter post title..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="admin-modal__field-row">
            <div className="admin-modal__field">
              <label htmlFor="post-category">Category</label>
              <select
                id="post-category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Writing">Writing</option>
                <option value="Voice">Voice</option>
                <option value="Film">Film</option>
                <option value="Music">Music</option>
                <option value="Gallery">Gallery</option>
              </select>
            </div>

            <div className="admin-modal__field">
              <label htmlFor="post-status">Status</label>
              <select
                id="post-status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived / Hidden</option>
              </select>
            </div>
          </div>

          <div className="admin-modal__checkbox-field">
            <label>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
              />
              Mark as Featured Post
            </label>
          </div>

          <div className="admin-modal__field">
            <label htmlFor="post-content">Content</label>
            <textarea
              id="post-content"
              rows={5}
              placeholder="Write post content or description..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>

          <div className="admin-modal__form-actions">
            <button type="submit" className="admin-modal__submit-btn">
              {editingId ? "Update Post" : "Save Post"}
            </button>
            <button
              type="button"
              className="admin-modal__cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
