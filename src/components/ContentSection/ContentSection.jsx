import React from "react";
import "./ContentSection.css";

export default function ContentSection({ title, children }) {
  return (
    <section className="content-section">
      <h2 className="section-title">{title}</h2>
      <div className="card-grid">{children}</div>
    </section>
  );
}
