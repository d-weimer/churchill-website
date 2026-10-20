import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <div className="footer__container">
        <p className="footer__title">&copy; 2026 Developed by </p>
        <a
          href="https://www.danielweimer.net/"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          Daniel J. Weimer
        </a>
      </div>
    </section>
  );
}

export default Footer;
