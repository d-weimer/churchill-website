import React from "react";
import "./ContentCard.css";

export default function ContentCard({ title, description, mediaClass, link }) {
  const cardContent = (
    <div className="content-card">
      <div className={`card-media ${mediaClass}`}></div>
      <p className="content-card__title">{title}</p>
      <p className="content-card__description">{description}</p>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="content-card-link"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
