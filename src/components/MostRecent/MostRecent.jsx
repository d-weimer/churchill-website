import React from "react";
import ContentSection from "../ContentSection/ContentSection";
import ContentCard from "../ContentCard/ContentCard";
import "./MostRecent.css";

export default function MostRecent() {
  const recentItems = [
    {
      id: 3,
      title: "Recent Release",
      description: "Music",
      mediaClass: "placeholder-3",
      link: "#",
    },
    {
      id: 4,
      title: "Exhibition",
      description: "Gallery",
      mediaClass: "placeholder-4",
      link: "#",
    },
  ];

  return (
    <div className="most-recent-wrapper">
      <ContentSection title="Most Recent">
        {recentItems.map((item) => (
          <ContentCard
            key={item.id}
            title={item.title}
            description={item.description}
            mediaClass={item.mediaClass}
            link={item.link}
          />
        ))}
      </ContentSection>
    </div>
  );
}
