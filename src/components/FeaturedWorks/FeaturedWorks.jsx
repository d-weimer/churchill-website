import React from "react";
import ContentSection from "../ContentSection/ContentSection";
import ContentCard from "../ContentCard/ContentCard";
import "./FeaturedWorks.css";

export default function FeaturedWorks() {
  const featuredItems = [
    {
      id: 1,
      title: "Featured Project 01",
      description: "Film & Sound Direction",
      mediaClass: "placeholder-1",
      link: "#",
    },
    {
      id: 2,
      title: "Featured Essay",
      description: "Writing",
      mediaClass: "placeholder-2",
      link: "#",
    },
  ];

  return (
    <div className="featured-works-wrapper">
      <ContentSection title="Featured Works">
        {featuredItems.map((item) => (
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
