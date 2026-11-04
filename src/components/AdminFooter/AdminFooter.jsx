import "./AdminFooter.css";

function AdminFooter({ onOpenContact }) {
  return (
    <footer className="admin-footer">
      <div className="admin-footer__container">
        <p className="admin-footer__title">&copy;2026 Developed by </p>
        <a
          href="https://www.danielweimer.net/"
          target="_blank"
          rel="noreferrer"
          className="admin-footer__link"
        >
          Daniel J. Weimer
        </a>
      </div>
      <button
        className="admin-footer__contact-button"
        onClick={onOpenContact}
        aria-label="Contact Developer"
        title="Contact Developer"
      >
        ✉
      </button>
    </footer>
  );
}

export default AdminFooter;
